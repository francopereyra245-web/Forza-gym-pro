import { useState, useRef } from 'react';
import {
  Flame, Dumbbell, Calendar, TrendingUp, Plus, Share2, Scale, ChevronLeft, ChevronRight, Trash2, Image as ImageIcon,
} from 'lucide-react';
import type { SesionEntrenamiento, RegistroPeso, FotoProgreso } from '../types';
import { MESES, DIAS_SEMANA_FULL } from '../constants';

interface ProgresoTabProps {
  sesiones: SesionEntrenamiento[];
  registrosPeso: RegistroPeso[];
  fotosProgreso: FotoProgreso[];
  onAddRegistroPeso: (registro: RegistroPeso) => void;
  onAddFotoProgreso: (foto: FotoProgreso) => void;
  onDeleteFotoProgreso: (id: string) => void;
}

function getNumeroSemana(fecha: Date): number {
  const onejan = new Date(fecha.getFullYear(), 0, 1);
  return Math.ceil(((fecha.getTime() - onejan.getTime()) / 86400000 + onejan.getDay() + 1) / 7);
}

export default function ProgresoTab({
  sesiones, registrosPeso, fotosProgreso, onAddRegistroPeso, onAddFotoProgreso, onDeleteFotoProgreso,
}: ProgresoTabProps) {
  const [mesActual, setMesActual] = useState(new Date(2026, 8, 1));
  const [modalPesoOpen, setModalPesoOpen] = useState(false);
  const [nuevoPeso, setNuevoPeso] = useState('');
  const [tipoFotoSeleccionada, setTipoFotoSeleccionada] = useState<'antes' | 'despues'>('antes');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Stats del mes
  const ahora = new Date();
  const mesActualNum = ahora.getMonth();
  const anioActual = ahora.getFullYear();
  const sesionesMes = sesiones.filter((s) => {
    const f = new Date(s.fecha);
    return f.getMonth() === mesActualNum && f.getFullYear() === anioActual;
  });

  const entrenamientosMes = sesionesMes.length;
  const seriesTotales = sesiones.reduce((sum, s) => sum + s.seriesTotales, 0);
  const diasEntrenados = new Set(sesiones.map((s) => new Date(s.fecha).toDateString())).size;
  const ejerciciosUnicos = new Set(sesiones.map((s) => s.rutinaNombre)).size;

  // Racha
  const calcularRacha = (): number => {
    if (sesiones.length === 0) return 0;
    const fechas = new Set(sesiones.map((s) => new Date(s.fecha).toDateString()));
    let racha = 0;
    const hoy = new Date();
    for (let i = 0; i < 365; i++) {
      const d = new Date(hoy);
      d.setDate(d.getDate() - i);
      if (fechas.has(d.toDateString())) {
        racha++;
      } else if (i > 0) {
        break;
      }
    }
    return racha;
  };
  const racha = calcularRacha();

  // Evolución semanal (últimas 8 semanas)
  const evolucionSemanal: { semana: string; valor: number }[] = [];
  for (let i = 7; i >= 0; i--) {
    const inicio = new Date();
    inicio.setDate(inicio.getDate() - i * 7);
    const fin = new Date(inicio);
    fin.setDate(fin.getDate() + 6);
    const count = sesiones.filter((s) => {
      const f = new Date(s.fecha);
      return f >= inicio && f <= fin;
    }).length;
    evolucionSemanal.push({ semana: `S${getNumeroSemana(inicio)}`, valor: count });
  }
  const maxEvolucion = Math.max(...evolucionSemanal.map((e) => e.valor), 1);

  // Ejercicios favoritos
  const favoritosMap: Record<string, number> = {};
  sesiones.forEach((s) => {
    favoritosMap[s.rutinaNombre] = (favoritosMap[s.rutinaNombre] ?? 0) + 1;
  });
  const favoritos = Object.entries(favoritosMap).sort((a, b) => b[1] - a[1]).slice(0, 4);

  // Por grupo muscular (simulado desde rutinas)
  const grupoMuscularData = [
    { grupo: 'Pecho', valor: 30 },
    { grupo: 'Espalda', valor: 25 },
    { grupo: 'Piernas', valor: 20 },
    { grupo: 'Brazos', valor: 15 },
    { grupo: 'Hombros', valor: 10 },
  ];
  const maxGrupo = Math.max(...grupoMuscularData.map((g) => g.valor));

  // Calendario
  const anio = mesActual.getFullYear();
  const mes = mesActual.getMonth();
  const primerDia = new Date(anio, mes, 1).getDay();
  const diasEnMes = new Date(anio, mes + 1, 0).getDate();
  const celdasCalendario: (number | null)[] = [
    ...Array(primerDia).fill(null),
    ...Array.from({ length: diasEnMes }, (_, i) => i + 1),
  ];
  while (celdasCalendario.length % 7 !== 0) celdasCalendario.push(null);

  const fechasEntreno = new Set(sesiones.map((s) => new Date(s.fecha).toDateString()));
  const esHoy = (dia: number) => {
    const d = new Date(anio, mes, dia);
    return d.toDateString() === ahora.toDateString();
  };
  const tieneEntreno = (dia: number) => {
    const d = new Date(anio, mes, dia);
    return fechasEntreno.has(d.toDateString());
  };

  // Peso corporal
  const ultimoPeso = registrosPeso[registrosPeso.length - 1]?.peso ?? null;
  const pesoAnterior = registrosPeso[registrosPeso.length - 2]?.peso ?? null;
  const diffPeso = ultimoPeso && pesoAnterior ? ultimoPeso - pesoAnterior : 0;

  const handleGuardarPeso = () => {
    const pesoNum = parseFloat(nuevoPeso);
    if (isNaN(pesoNum) || pesoNum <= 0) return;
    onAddRegistroPeso({
      id: `peso-${Date.now()}`,
      fecha: new Date().toISOString(),
      peso: pesoNum,
    });
    setNuevoPeso('');
    setModalPesoOpen(false);
  };

  const handleFotoUpload = (e: React.ChangeEvent<HTMLInputElement>, tipo: 'antes' | 'despues') => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      onAddFotoProgreso({
        id: `foto-${Date.now()}`,
        tipo,
        fecha: new Date().toISOString(),
        imagen: reader.result as string,
      });
    };
    reader.readAsDataURL(file);
  };

  const fotosAntes = fotosProgreso.filter((f) => f.tipo === 'antes');
  const fotosDespues = fotosProgreso.filter((f) => f.tipo === 'despues');

  const compartirInstagram = () => {
    const texto = encodeURIComponent('¡Mirá mi progreso en FORZA Gym Pro! 💪 #FORZAGymPro');
    window.open(`https://www.instagram.com/share?text=${texto}`, '_blank');
  };

  return (
    <div className="px-4 pt-4 pb-2 space-y-5">
      {/* Stats cards */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard icon={Dumbbell} label="Entrenamientos del mes" valor={entrenamientosMes} color="yellow" />
        <StatCard icon={Flame} label="Racha" valor={`${racha} días`} color="orange" />
        <StatCard icon={TrendingUp} label="Series totales" valor={seriesTotales} color="blue" />
        <StatCard icon={Calendar} label="Días entrenados" valor={diasEntrenados} color="green" />
      </div>

      {/* Evolución semanal */}
      <div className="rounded-2xl bg-zinc-900 border border-white/5 p-4">
        <h3 className="text-sm font-bold text-white mb-4">Evolución semanal</h3>
        <div className="flex items-end justify-between gap-1.5 h-32">
          {evolucionSemanal.map((item, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-1.5">
              <div className="w-full flex items-end justify-center h-24">
                <div
                  className="w-full max-w-[24px] rounded-t-md bg-gradient-to-t from-yellow-600 to-yellow-400 transition-all duration-500 hover:opacity-80"
                  style={{ height: `${(item.valor / maxEvolucion) * 100}%` }}
                />
              </div>
              <span className="text-[9px] text-gray-500 font-semibold">{item.semana}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Ejercicios favoritos */}
      <div className="rounded-2xl bg-zinc-900 border border-white/5 p-4">
        <h3 className="text-sm font-bold text-white mb-3">Ejercicios favoritos</h3>
        {favoritos.length === 0 ? (
          <p className="text-sm text-gray-500">Todavía no registraste entrenamientos.</p>
        ) : (
          <div className="space-y-2">
            {favoritos.map(([nombre, count], idx) => (
              <div key={idx} className="flex items-center gap-3">
                <span className="w-5 text-xs font-bold text-yellow-400">#{idx + 1}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-white">{nombre}</span>
                    <span className="text-xs text-gray-500">{count}x</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-black/50 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-yellow-400"
                      style={{ width: `${(count / favoritos[0][1]) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Por grupo muscular */}
      <div className="rounded-2xl bg-zinc-900 border border-white/5 p-4">
        <h3 className="text-sm font-bold text-white mb-3">Por grupo muscular</h3>
        <div className="space-y-2.5">
          {grupoMuscularData.map((item) => (
            <div key={item.grupo} className="flex items-center gap-3">
              <span className="text-xs font-semibold text-gray-400 w-16">{item.grupo}</span>
              <div className="flex-1 h-2 rounded-full bg-black/50 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-yellow-600 to-yellow-400"
                  style={{ width: `${(item.valor / maxGrupo) * 100}%` }}
                />
              </div>
              <span className="text-xs text-gray-500 w-8 text-right">{item.valor}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mi Evolución Antes/Después */}
      <div className="rounded-2xl bg-zinc-900 border border-white/5 p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-white">Mi Evolución Antes/Después</h3>
          <button
            onClick={compartirInstagram}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-yellow-400/10 text-yellow-400 text-xs font-bold hover:bg-yellow-400/20 active:scale-95 transition-all"
          >
            <Share2 className="w-3.5 h-3.5" />
            Compartir
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {/* Antes */}
          <div>
            <div className="relative aspect-square rounded-xl overflow-hidden bg-black/50 border border-white/5">
              {fotosAntes.length > 0 ? (
                <>
                  <img src={fotosAntes[fotosAntes.length - 1].imagen} alt="Antes" className="w-full h-full object-cover" />
                  <button
                    onClick={() => onDeleteFotoProgreso(fotosAntes[fotosAntes.length - 1].id)}
                    className="absolute top-1.5 right-1.5 w-7 h-7 flex items-center justify-center rounded-lg bg-black/70 text-red-400 hover:bg-black/90 active:scale-90 transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-gray-600">
                  <ImageIcon className="w-8 h-8 mb-1" />
                  <span className="text-[10px]">Sin foto</span>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs font-bold text-gray-400">ANTES</span>
              <button
                onClick={() => { setTipoFotoSeleccionada('antes'); fileInputRef.current?.click(); }}
                className="flex items-center gap-1 text-xs font-bold text-yellow-400 hover:text-yellow-300 active:scale-95 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                Agregar
              </button>
            </div>
          </div>
          {/* Después */}
          <div>
            <div className="relative aspect-square rounded-xl overflow-hidden bg-black/50 border border-white/5">
              {fotosDespues.length > 0 ? (
                <>
                  <img src={fotosDespues[fotosDespues.length - 1].imagen} alt="Después" className="w-full h-full object-cover" />
                  <button
                    onClick={() => onDeleteFotoProgreso(fotosDespues[fotosDespues.length - 1].id)}
                    className="absolute top-1.5 right-1.5 w-7 h-7 flex items-center justify-center rounded-lg bg-black/70 text-red-400 hover:bg-black/90 active:scale-90 transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-gray-600">
                  <ImageIcon className="w-8 h-8 mb-1" />
                  <span className="text-[10px]">Sin foto</span>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs font-bold text-gray-400">DESPUÉS</span>
              <button
                onClick={() => { setTipoFotoSeleccionada('despues'); fileInputRef.current?.click(); }}
                className="flex items-center gap-1 text-xs font-bold text-yellow-400 hover:text-yellow-300 active:scale-95 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                Agregar
              </button>
            </div>
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFotoUpload(e, tipoFotoSeleccionada)}
        />
      </div>

      {/* Peso corporal */}
      <div className="rounded-2xl bg-zinc-900 border border-white/5 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-yellow-400" />
            <h3 className="text-sm font-bold text-white">Peso corporal</h3>
          </div>
          <button
            onClick={() => setModalPesoOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-yellow-400/10 text-yellow-400 text-xs font-bold hover:bg-yellow-400/20 active:scale-95 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            Registrar
          </button>
        </div>
        {ultimoPeso !== null ? (
          <div className="flex items-end gap-3">
            <span className="text-4xl font-black text-white">{ultimoPeso}</span>
            <span className="text-sm text-gray-500 mb-1">kg</span>
            {diffPeso !== 0 && (
              <span className={`text-sm font-bold mb-1.5 ml-2 ${diffPeso < 0 ? 'text-green-400' : 'text-orange-400'}`}>
                {diffPeso < 0 ? '↓' : '↑'} {Math.abs(diffPeso).toFixed(1)}kg
              </span>
            )}
          </div>
        ) : (
          <p className="text-sm text-gray-500">Todavía no registraste tu peso.</p>
        )}
        {registrosPeso.length > 1 && (
          <div className="mt-3 flex items-end gap-1 h-16">
            {registrosPeso.slice(-10).map((r, idx) => {
              const max = Math.max(...registrosPeso.map((r) => r.peso));
              const min = Math.min(...registrosPeso.map((r) => r.peso));
              const range = max - min || 1;
              const height = ((r.peso - min) / range) * 100;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full max-w-[20px] rounded-t bg-yellow-400/60" style={{ height: `${height}%` }} />
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Calendario */}
      <div className="rounded-2xl bg-zinc-900 border border-white/5 p-4">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setMesActual(new Date(anio, mes - 1, 1))}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-yellow-400 hover:bg-white/5 active:scale-90 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h3 className="text-sm font-bold text-white">{MESES[mes]} {anio}</h3>
          <button
            onClick={() => setMesActual(new Date(anio, mes + 1, 1))}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-yellow-400 hover:bg-white/5 active:scale-90 transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {DIAS_SEMANA_FULL.map((d) => (
            <span key={d} className="text-center text-[10px] font-bold text-gray-600 uppercase">{d}</span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {celdasCalendario.map((dia, idx) => (
            <div
              key={idx}
              className={`aspect-square flex items-center justify-center rounded-lg text-sm font-semibold relative transition-all ${
                dia === null
                  ? ''
                  : esHoy(dia)
                  ? 'bg-yellow-400 text-black'
                  : tieneEntreno(dia)
                  ? 'bg-yellow-400/15 text-yellow-400'
                  : 'text-gray-500 hover:bg-white/5'
              }`}
            >
              {dia}
              {dia && tieneEntreno(dia) && !esHoy(dia) && (
                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-yellow-400" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Historial */}
      <div className="rounded-2xl bg-zinc-900 border border-white/5 p-4">
        <h3 className="text-sm font-bold text-white mb-3">Historial</h3>
        {sesiones.length === 0 ? (
          <p className="text-sm text-gray-500">Sin entrenamientos registrados todavía.</p>
        ) : (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {[...sesiones].reverse().map((s) => {
              const f = new Date(s.fecha);
              return (
                <div key={s.id} className="flex items-center gap-3 p-3 rounded-xl bg-black/30">
                  <div className="flex flex-col items-center justify-center w-12 h-12 rounded-xl bg-yellow-400/10">
                    <span className="text-lg font-black text-yellow-400 leading-none">{f.getDate()}</span>
                    <span className="text-[9px] text-gray-500 uppercase">{MESES[f.getMonth()].slice(0, 3)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white truncate">{s.rutinaNombre}</p>
                    <p className="text-xs text-gray-500">
                      {s.seriesTotales} series · {s.ejerciciosCompletados} ejercicios
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal peso */}
      {modalPesoOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fadeIn" onClick={() => setModalPesoOpen(false)} />
          <div className="relative w-full max-w-md bg-zinc-900 rounded-t-3xl sm:rounded-3xl border border-white/10 p-5 animate-slideUp">
            <h2 className="text-lg font-bold text-white mb-4">Registrar peso</h2>
            <input
              type="number"
              inputMode="decimal"
              value={nuevoPeso}
              onChange={(e) => setNuevoPeso(e.target.value)}
              placeholder="Ej: 75.5"
              autoFocus
              className="w-full px-4 py-3.5 rounded-xl bg-black/50 border border-white/10 text-white text-center text-2xl font-bold placeholder-gray-600 focus:border-yellow-400 focus:outline-none transition-colors"
            />
            <span className="block text-center text-sm text-gray-500 mt-1">kilogramos</span>
            <button
              onClick={handleGuardarPeso}
              disabled={!nuevoPeso}
              className="w-full mt-4 py-3.5 rounded-2xl bg-yellow-400 text-black font-bold text-sm hover:bg-yellow-300 active:scale-[0.98] transition-all disabled:opacity-30"
            >
              Guardar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon: Icon, label, valor, color }: { icon: typeof Flame; label: string; valor: string | number; color: string }) {
  const colorMap: Record<string, string> = {
    yellow: 'text-yellow-400 bg-yellow-400/10',
    orange: 'text-orange-400 bg-orange-400/10',
    blue: 'text-blue-400 bg-blue-400/10',
    green: 'text-green-400 bg-green-400/10',
  };
  return (
    <div className="rounded-2xl bg-zinc-900 border border-white/5 p-4">
      <div className={`w-9 h-9 flex items-center justify-center rounded-xl mb-2.5 ${colorMap[color]}`}>
        <Icon className="w-5 h-5" />
      </div>
      <p className="text-2xl font-black text-white leading-none">{valor}</p>
      <p className="text-[11px] text-gray-500 font-semibold mt-1 leading-tight">{label}</p>
    </div>
  );
}
