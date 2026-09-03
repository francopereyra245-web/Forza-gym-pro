import { Check, Crown, Zap, Star } from 'lucide-react';

interface PlanesTabProps {
  esPro: boolean;
  onComprarPro: () => void;
}

const FEATURES_FREE = [
  'Hasta 3 rutinas personalizadas',
  'Registro de entrenamientos',
  'Timer de descanso',
  'Seguimiento de progreso básico',
];

const FEATURES_PRO = [
  'Rutinas ilimitadas',
  'Rutinas exclusivas PRO',
  'Gráficos de evolución avanzados',
  'Fotos Antes/Después ilimitadas',
  'Historial completo sin límites',
  'Exportar y compartir progreso',
  'Prioridad en nuevas funciones',
];

export default function PlanesTab({ esPro, onComprarPro }: PlanesTabProps) {
  return (
    <div className="px-4 pt-4 pb-2 space-y-5">
      <div className="text-center pt-2">
        <h2 className="text-2xl font-black text-white">Elegí tu plan</h2>
        <p className="text-sm text-gray-500 mt-1">Desbloqueá todo el potencial de FORZA</p>
      </div>

      {/* Plan Gratis */}
      <div className={`rounded-3xl border p-5 transition-all ${
        esPro
          ? 'bg-zinc-900 border-white/5 opacity-50'
          : 'bg-zinc-900 border-white/10'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-700">
                <Zap className="w-4 h-4 text-gray-300" />
              </div>
              <h3 className="text-lg font-black text-white">Plan Gratis</h3>
            </div>
          </div>
          {!esPro && (
            <span className="px-2.5 py-1 rounded-full bg-green-400/10 text-green-400 text-[10px] font-bold uppercase tracking-wider">
              Tu plan actual
            </span>
          )}
        </div>
        <div className="flex items-baseline gap-1 mb-5">
          <span className="text-4xl font-black text-white">$0</span>
          <span className="text-sm text-gray-500">/mes</span>
        </div>
        <div className="space-y-2.5">
          {FEATURES_FREE.map((feat, idx) => (
            <div key={idx} className="flex items-start gap-2.5">
              <div className="w-5 h-5 flex items-center justify-center rounded-full bg-gray-700 flex-shrink-0 mt-0.5">
                <Check className="w-3 h-3 text-gray-300" strokeWidth={3} />
              </div>
              <span className="text-sm text-gray-400">{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Plan Pro */}
      <div className={`relative rounded-3xl border-2 p-5 transition-all ${
        esPro
          ? 'bg-gradient-to-b from-yellow-400/10 to-zinc-900 border-yellow-400'
          : 'bg-gradient-to-b from-yellow-400/5 to-zinc-900 border-yellow-400/50'
      }`}>
        {/* Badge recomendado */}
        {!esPro && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <span className="flex items-center gap-1 px-4 py-1.5 rounded-full bg-yellow-400 text-black text-[10px] font-black uppercase tracking-wider shadow-lg shadow-yellow-500/30">
              <Star className="w-3 h-3" fill="currentColor" />
              Recomendado
            </span>
          </div>
        )}

        <div className="flex items-center justify-between mb-4 mt-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-yellow-400">
              <Crown className="w-4 h-4 text-black" fill="currentColor" />
            </div>
            <h3 className="text-lg font-black text-white">Plan Pro</h3>
          </div>
          {esPro && (
            <span className="px-2.5 py-1 rounded-full bg-yellow-400 text-black text-[10px] font-bold uppercase tracking-wider">
              Activo
            </span>
          )}
        </div>

        <div className="flex items-baseline gap-1 mb-1">
          <span className="text-4xl font-black text-yellow-400">$4.990</span>
          <span className="text-sm text-gray-400 font-semibold">ARS</span>
        </div>
        <p className="text-xs text-gray-500 mb-5">Pago único · Sin suscripción · Acceso de por vida</p>

        <div className="space-y-2.5 mb-6">
          {FEATURES_PRO.map((feat, idx) => (
            <div key={idx} className="flex items-start gap-2.5">
              <div className="w-5 h-5 flex items-center justify-center rounded-full bg-yellow-400 flex-shrink-0 mt-0.5">
                <Check className="w-3 h-3 text-black" strokeWidth={3} />
              </div>
              <span className="text-sm text-white font-medium">{feat}</span>
            </div>
          ))}
        </div>

        {!esPro && (
          <button
            onClick={onComprarPro}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-yellow-400 text-black font-black text-sm hover:bg-yellow-300 active:scale-[0.98] transition-all shadow-lg shadow-yellow-500/30"
          >
            <Crown className="w-5 h-5" fill="currentColor" />
            Comprar Pro
          </button>
        )}
      </div>

      {/* Comparación rápida */}
      <div className="rounded-2xl bg-zinc-900 border border-white/5 p-4">
        <h3 className="text-sm font-bold text-white mb-3">¿Por qué PRO?</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 rounded-xl bg-black/30">
            <p className="text-2xl font-black text-gray-500">3</p>
            <p className="text-[10px] text-gray-600 uppercase tracking-wider mt-0.5">Rutinas gratis</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-yellow-400/10">
            <p className="text-2xl font-black text-yellow-400">∞</p>
            <p className="text-[10px] text-yellow-400/70 uppercase tracking-wider mt-0.5">Rutinas PRO</p>
          </div>
        </div>
      </div>

      <p className="text-center text-[11px] text-gray-600 pb-2">
        FORZA Gym Pro · Hecho con pasión para entrenadores
      </p>
    </div>
  );
}
