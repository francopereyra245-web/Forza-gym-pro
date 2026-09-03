import { useState, useEffect, useRef } from 'react';
import { Check, Play, Pause, RotateCcw, Dumbbell, Flame, Trophy } from 'lucide-react';
import type { Rutina, SesionEntrenamiento } from '../types';

interface EntrenarTabProps {
  rutinaHoy: Rutina | null;
  onCompleteSesion: (sesion: SesionEntrenamiento) => void;
}

interface SerieState {
  completada: boolean;
  peso: string;
  reps: string;
}

export default function EntrenarTab({ rutinaHoy, onCompleteSesion }: EntrenarTabProps) {
  const [ejercicioActual, setEjercicioActual] = useState(0);
  const [series, setSeries] = useState<Record<string, SerieState[]>>({});
  const [timerSegundos, setTimerSegundos] = useState(60);
  const [timerActivo, setTimerActivo] = useState(false);
  const [sesionCompletada, setSesionCompletada] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (timerActivo && timerSegundos > 0) {
      intervalRef.current = setInterval(() => {
        setTimerSegundos((s) => {
          if (s <= 1) {
            setTimerActivo(false);
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [timerActivo, timerSegundos]);

  if (!rutinaHoy) {
    return (
      <div className="px-4 pt-4 pb-2">
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-2xl bg-zinc-900 flex items-center justify-center mb-4">
            <Dumbbell className="w-8 h-8 text-gray-600" />
          </div>
          <h3 className="text-lg font-bold text-white">Día de descanso</h3>
          <p className="text-sm text-gray-500 mt-1 max-w-xs">
            No tenés rutina asignada para hoy. Creá una rutina en la pestaña Rutinas.
          </p>
        </div>
      </div>
    );
  }

  const ejercicio = rutinaHoy.ejercicios[ejercicioActual];
  const ejercicioKey = ejercicio?.id ?? '';

  if (!series[ejercicioKey]) {
    setSeries((s) => ({
      ...s,
      [ejercicioKey]: Array.from({ length: ejercicio.series }, () => ({
        completada: false,
        peso: '',
        reps: '',
      })),
    }));
  }

  const seriesEjercicio = series[ejercicioKey] ?? [];

  const toggleSerie = (idx: number) => {
    setSeries((s) => {
      const arr = [...(s[ejercicioKey] ?? [])];
      arr[idx] = { ...arr[idx], completada: !arr[idx].completada };
      return { ...s, [ejercicioKey]: arr };
    });
  };

  const updateSerie = (idx: number, field: 'peso' | 'reps', value: string) => {
    setSeries((s) => {
      const arr = [...(s[ejercicioKey] ?? [])];
      arr[idx] = { ...arr[idx], [field]: value };
      return { ...s, [ejercicioKey]: arr };
    });
  };

  const setTimer = (seg: number) => {
    setTimerSegundos(seg);
    setTimerActivo(false);
  };

  const toggleTimer = () => {
    if (timerSegundos === 0) {
      setTimerSegundos(60);
      setTimerActivo(true);
    } else {
      setTimerActivo(!timerActivo);
    }
  };

  const resetTimer = () => {
    setTimerActivo(false);
    setTimerSegundos(60);
  };

  const seriesCompletadasTotal = Object.values(series).flat().filter((s) => s.completada).length;
  const ejerciciosCompletados = Object.entries(series).filter(([, arr]) =>
    arr.length > 0 && arr.every((s) => s.completada)
  ).length;

  const finalizarSesion = () => {
    const sesion: SesionEntrenamiento = {
      id: `sesion-${Date.now()}`,
      rutinaId: rutinaHoy.id,
      rutinaNombre: rutinaHoy.nombre,
      fecha: new Date().toISOString(),
      seriesTotales: seriesCompletadasTotal,
      ejerciciosCompletados: ejerciciosCompletados,
    };
    onCompleteSesion(sesion);
    setSesionCompletada(true);
    setTimeout(() => {
      setSesionCompletada(false);
      setEjercicioActual(0);
      setSeries({});
    }, 2500);
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const timerProgress = ((timerSegundos / 90) * 100).toFixed(1);

  return (
    <div className="px-4 pt-4 pb-2 space-y-4">
      {/* Header entrenamiento */}
      <div>
        <p className="text-xs font-bold text-yellow-400 uppercase tracking-wider">
          Entrenar hoy
        </p>
        <h2 className="text-2xl font-black text-white mt-0.5">{rutinaHoy.nombre}</h2>
        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-yellow-400" />
            {seriesCompletadasTotal} series completadas
          </span>
          <span>{ejerciciosCompletados}/{rutinaHoy.ejercicios.length} ejercicios</span>
        </div>
      </div>

      {/* Indicador de ejercicios */}
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {rutinaHoy.ejercicios.map((ex, idx) => (
          <button
            key={ex.id}
            onClick={() => setEjercicioActual(idx)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              idx === ejercicioActual
                ? 'bg-yellow-400 text-black'
                : 'bg-zinc-900 text-gray-500 border border-white/5'
            }`}
          >
            {idx + 1}
          </button>
        ))}
      </div>

      {/* Card de ejercicio */}
      {ejercicio && (
        <div className="rounded-2xl overflow-hidden bg-zinc-900 border border-white/5">
          {/* Imagen */}
          <div className="relative h-52 overflow-hidden">
            <img
              src={ejercicio.imagen}
              alt={ejercicio.nombre}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <span className="inline-block px-2 py-0.5 rounded-md bg-yellow-400/20 text-yellow-400 text-[10px] font-bold uppercase tracking-wider">
                {ejercicio.grupoMuscular}
              </span>
              <h3 className="text-xl font-black text-white mt-1.5">{ejercicio.nombre}</h3>
              <p className="text-xs text-gray-400 mt-0.5">
                {ejercicio.series} series · {ejercicio.reps} reps
              </p>
            </div>
          </div>

          {/* Series */}
          <div className="p-4 space-y-2">
            <div className="grid grid-cols-12 gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-wider px-2">
              <span className="col-span-2">Serie</span>
              <span className="col-span-4 text-center">Peso (kg)</span>
              <span className="col-span-4 text-center">Reps hechas</span>
              <span className="col-span-2 text-right">Check</span>
            </div>
            {seriesEjercicio.map((serie, idx) => (
              <div
                key={idx}
                className={`grid grid-cols-12 gap-2 items-center p-2 rounded-xl transition-all ${
                  serie.completada ? 'bg-yellow-400/5' : 'bg-black/30'
                }`}
              >
                <span className="col-span-2 text-sm font-bold text-gray-400">{idx + 1}</span>
                <input
                  type="number"
                  inputMode="decimal"
                  value={serie.peso}
                  onChange={(e) => updateSerie(idx, 'peso', e.target.value)}
                  placeholder="0"
                  className="col-span-4 px-2 py-2 rounded-lg bg-black/50 border border-white/10 text-white text-center text-sm focus:border-yellow-400 focus:outline-none transition-colors"
                />
                <input
                  type="number"
                  inputMode="numeric"
                  value={serie.reps}
                  onChange={(e) => updateSerie(idx, 'reps', e.target.value)}
                  placeholder="0"
                  className="col-span-4 px-2 py-2 rounded-lg bg-black/50 border border-white/10 text-white text-center text-sm focus:border-yellow-400 focus:outline-none transition-colors"
                />
                <button
                  onClick={() => toggleSerie(idx)}
                  className={`col-span-2 w-8 h-8 ml-auto flex items-center justify-center rounded-lg transition-all active:scale-90 ${
                    serie.completada
                      ? 'bg-yellow-400 text-black'
                      : 'bg-white/5 text-gray-500 hover:text-yellow-400'
                  }`}
                >
                  <Check className="w-4 h-4" strokeWidth={2.5} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Timer */}
      <div className="rounded-2xl bg-zinc-900 border border-white/5 p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-bold text-white">Descanso</h4>
          <button
            onClick={resetTimer}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-yellow-400 hover:bg-white/5 active:scale-90 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
        <div className="relative flex items-center justify-center mb-4">
          <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
            <circle
              cx="50" cy="50" r="44" fill="none" stroke="#FFC107" strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 44}`}
              strokeDashoffset={`${2 * Math.PI * 44 * (1 - Number(timerProgress) / 100)}`}
              className="transition-all duration-300"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-3xl font-black text-white tabular-nums">{formatTime(timerSegundos)}</span>
            <span className="text-[10px] text-gray-500 uppercase tracking-wider">segundos</span>
          </div>
        </div>
        <div className="flex gap-2 mb-3">
          {[30, 60, 90].map((seg) => (
            <button
              key={seg}
              onClick={() => setTimer(seg)}
              className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all ${
                timerSegundos === seg && !timerActivo
                  ? 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30'
                  : 'bg-black/50 text-gray-400 border border-white/10'
              }`}
            >
              {seg}s
            </button>
          ))}
        </div>
        <button
          onClick={toggleTimer}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-yellow-400 text-black font-bold text-sm hover:bg-yellow-300 active:scale-[0.98] transition-all"
        >
          {timerActivo ? <Pause className="w-5 h-5" fill="currentColor" /> : <Play className="w-5 h-5" fill="currentColor" />}
          {timerActivo ? 'Pausar' : timerSegundos === 0 ? 'Reiniciar' : 'Iniciar'}
        </button>
      </div>

      {/* Navegación ejercicios */}
      <div className="flex gap-2">
        <button
          onClick={() => setEjercicioActual((e) => Math.max(0, e - 1))}
          disabled={ejercicioActual === 0}
          className="flex-1 py-3 rounded-2xl bg-zinc-900 text-gray-300 font-bold text-sm border border-white/5 disabled:opacity-30 active:scale-[0.98] transition-all"
        >
          Anterior
        </button>
        <button
          onClick={() => setEjercicioActual((e) => Math.min(rutinaHoy.ejercicios.length - 1, e + 1))}
          disabled={ejercicioActual === rutinaHoy.ejercicios.length - 1}
          className="flex-1 py-3 rounded-2xl bg-zinc-900 text-gray-300 font-bold text-sm border border-white/5 disabled:opacity-30 active:scale-[0.98] transition-all"
        >
          Siguiente
        </button>
      </div>

      {/* Finalizar */}
      <button
        onClick={finalizarSesion}
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold text-sm hover:opacity-90 active:scale-[0.98] transition-all shadow-lg shadow-yellow-500/20"
      >
        <Trophy className="w-5 h-5" />
        Finalizar entrenamiento
      </button>

      {/* Overlay completado */}
      {sesionCompletada && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="flex flex-col items-center animate-bounceIn">
            <div className="w-20 h-20 rounded-full bg-yellow-400 flex items-center justify-center mb-4 shadow-lg shadow-yellow-500/40">
              <Trophy className="w-10 h-10 text-black" fill="currentColor" />
            </div>
            <h3 className="text-2xl font-black text-white">¡Bien hecho!</h3>
            <p className="text-sm text-gray-400 mt-1">Entrenamiento completado</p>
          </div>
        </div>
      )}
    </div>
  );
}
