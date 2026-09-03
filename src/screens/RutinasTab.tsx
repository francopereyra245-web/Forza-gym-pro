import { useState } from 'react';
import { Plus, Crown, Trash2, Dumbbell, Calendar } from 'lucide-react';
import type { Rutina, DiaSemana, NivelAcceso, NivelDificultad } from '../types';
import { DIAS_SEMANA, NIVELES_DIFICULTAD } from '../constants';
import Modal from '../components/Modal';

interface RutinasTabProps {
  rutinas: Rutina[];
  onAddRutina: (rutina: Rutina) => void;
  onDeleteRutina: (id: string) => void;
  esPro: boolean;
}

function getRutinaHoy(rutinas: Rutina[]): Rutina | null {
  const hoy = new Date().getDay();
  const diaMap: Record<number, DiaSemana> = {
    0: 'Dom', 1: 'Lun', 2: 'Mar', 3: 'Mie', 4: 'Jue', 5: 'Vie', 6: 'Sab',
  };
  const hoyLabel = diaMap[hoy];
  return rutinas.find((r) => r.dias.includes(hoyLabel)) ?? null;
}

export default function RutinasTab({ rutinas, onAddRutina, onDeleteRutina, esPro }: RutinasTabProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    nombre: '',
    nivelAcceso: 'Gratis' as NivelAcceso,
    nivelDificultad: 'Principiante' as NivelDificultad,
    dias: [] as DiaSemana[],
  });

  const rutinaHoy = getRutinaHoy(rutinas);

  const toggleDia = (dia: DiaSemana) => {
    setForm((f) => ({
      ...f,
      dias: f.dias.includes(dia) ? f.dias.filter((d) => d !== dia) : [...f.dias, dia],
    }));
  };

  const handleSubmit = () => {
    if (!form.nombre.trim() || form.dias.length === 0) return;
    const nuevaRutina: Rutina = {
      id: `rutina-${Date.now()}`,
      nombre: form.nombre.trim(),
      nivelAcceso: form.nivelAcceso,
      nivelDificultad: form.nivelDificultad,
      dias: form.dias,
      ejercicios: [],
      creadaEn: new Date().toISOString(),
    };
    onAddRutina(nuevaRutina);
    setForm({ nombre: '', nivelAcceso: 'Gratis', nivelDificultad: 'Principiante', dias: [] });
    setModalOpen(false);
  };

  return (
    <div className="px-4 pt-4 pb-2 space-y-5">
      {/* Banner Hoy */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-600 p-5 shadow-lg shadow-yellow-500/20">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-12 translate-x-12" />
        <div className="relative">
          <p className="text-xs font-bold text-black/60 uppercase tracking-wider">Hoy toca</p>
          <h2 className="text-2xl font-black text-black mt-1">
            {rutinaHoy ? rutinaHoy.nombre : 'Día de descanso'}
          </h2>
          {rutinaHoy && (
            <p className="text-sm font-semibold text-black/70 mt-1">
              {rutinaHoy.ejercicios.length} ejercicios · {rutinaHoy.nivelDificultad}
            </p>
          )}
        </div>
      </div>

      {/* Botón nueva rutina */}
      <button
        onClick={() => setModalOpen(true)}
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-yellow-400 text-black font-bold text-sm hover:bg-yellow-300 active:scale-[0.98] transition-all shadow-lg shadow-yellow-500/20"
      >
        <Plus className="w-5 h-5" strokeWidth={2.5} />
        Nueva rutina
      </button>

      {/* Lista de rutinas */}
      <div>
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
          Mis rutinas
        </h3>
        <div className="space-y-3">
          {rutinas.map((rutina) => {
            const bloqueada = rutina.nivelAcceso === 'Pro' && !esPro;
            return (
              <div
                key={rutina.id}
                className="group relative rounded-2xl bg-zinc-900 border border-white/5 p-4 hover:border-yellow-400/30 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-yellow-400/10 flex-shrink-0">
                      <Dumbbell className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-white truncate">{rutina.nombre}</h4>
                        {rutina.nivelAcceso === 'Pro' && (
                          <span className={`flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            bloqueada ? 'bg-gray-700 text-gray-400' : 'bg-yellow-400/20 text-yellow-400'
                          }`}>
                            <Crown className="w-3 h-3" fill="currentColor" />
                            PRO
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-500">
                        <span className="font-semibold">{rutina.nivelDificultad}</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {rutina.dias.join(', ')}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        {rutina.ejercicios.length} ejercicios
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => onDeleteRutina(rutina.id)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-600 hover:text-red-400 hover:bg-red-400/10 active:scale-90 transition-all flex-shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                {bloqueada && (
                  <div className="mt-3 flex items-center gap-2 text-xs text-yellow-400/80 bg-yellow-400/5 rounded-lg px-3 py-2">
                    <Crown className="w-3.5 h-3.5" />
                    Pasate a Pro para desbloquear esta rutina
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal nueva rutina */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Nueva rutina">
        <div className="space-y-5">
          {/* Nombre */}
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Nombre
            </label>
            <input
              type="text"
              value={form.nombre}
              onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))}
              placeholder="Ej: Pecho y Tríceps"
              className="w-full mt-1.5 px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-gray-600 focus:border-yellow-400 focus:outline-none transition-colors"
            />
          </div>

          {/* Nivel de acceso */}
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Nivel de acceso
            </label>
            <div className="flex gap-2 mt-1.5">
              {(['Gratis', 'Pro'] as NivelAcceso[]).map((nivel) => (
                <button
                  key={nivel}
                  onClick={() => setForm((f) => ({ ...f, nivelAcceso: nivel }))}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl font-bold text-sm transition-all ${
                    form.nivelAcceso === nivel
                      ? 'bg-yellow-400 text-black'
                      : 'bg-black/50 text-gray-400 border border-white/10'
                  }`}
                >
                  {nivel === 'Pro' && <Crown className="w-4 h-4" fill={form.nivelAcceso === nivel ? 'currentColor' : 'none'} />}
                  {nivel}
                </button>
              ))}
            </div>
          </div>

          {/* Nivel de dificultad */}
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Nivel
            </label>
            <div className="flex gap-2 mt-1.5">
              {NIVELES_DIFICULTAD.map((nivel) => (
                <button
                  key={nivel}
                  onClick={() => setForm((f) => ({ ...f, nivelDificultad: nivel }))}
                  className={`flex-1 py-3 rounded-xl font-bold text-xs transition-all ${
                    form.nivelDificultad === nivel
                      ? 'bg-yellow-400 text-black'
                      : 'bg-black/50 text-gray-400 border border-white/10'
                  }`}
                >
                  {nivel}
                </button>
              ))}
            </div>
          </div>

          {/* Días */}
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Días
            </label>
            <div className="flex gap-1.5 mt-1.5">
              {DIAS_SEMANA.map((dia) => {
                const selected = form.dias.includes(dia.key as DiaSemana);
                return (
                  <button
                    key={dia.key}
                    onClick={() => toggleDia(dia.key as DiaSemana)}
                    className={`flex-1 py-2.5 rounded-lg font-bold text-xs transition-all ${
                      selected
                        ? 'bg-yellow-400 text-black'
                        : 'bg-black/50 text-gray-400 border border-white/10'
                    }`}
                  >
                    {dia.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Botón crear */}
          <button
            onClick={handleSubmit}
            disabled={!form.nombre.trim() || form.dias.length === 0}
            className="w-full py-3.5 rounded-2xl bg-yellow-400 text-black font-bold text-sm hover:bg-yellow-300 active:scale-[0.98] transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-lg shadow-yellow-500/20"
          >
            Crear rutina
          </button>
        </div>
      </Modal>
    </div>
  );
}
