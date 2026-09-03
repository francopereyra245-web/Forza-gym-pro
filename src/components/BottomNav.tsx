import { Dumbbell, Play, BarChart3, CreditCard } from 'lucide-react';
import type { TabActiva } from '../types';

interface BottomNavProps {
  tabActiva: TabActiva;
  onTabChange: (tab: TabActiva) => void;
}

const TABS: { key: TabActiva; label: string; icon: typeof Dumbbell }[] = [
  { key: 'rutinas', label: 'Rutinas', icon: Dumbbell },
  { key: 'entrenar', label: 'Entrenar', icon: Play },
  { key: 'progreso', label: 'Progreso', icon: BarChart3 },
  { key: 'planes', label: 'Planes', icon: CreditCard },
];

export default function BottomNav({ tabActiva, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-xl border-t border-white/5 pb-safe">
      <div className="flex items-center justify-around max-w-md mx-auto px-2 py-2">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const activa = tabActiva === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => onTabChange(tab.key)}
              className="relative flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg active:scale-90 transition-transform"
            >
              {activa && (
                <span className="absolute -top-2 w-8 h-0.5 rounded-full bg-yellow-400" />
              )}
              <Icon
                className={`w-5 h-5 transition-colors ${
                  activa ? 'text-yellow-400' : 'text-gray-500'
                }`}
                fill={activa && tab.key === 'entrenar' ? 'currentColor' : 'none'}
                strokeWidth={activa ? 2.5 : 2}
              />
              <span
                className={`text-[10px] font-bold tracking-wide transition-colors ${
                  activa ? 'text-yellow-400' : 'text-gray-500'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
