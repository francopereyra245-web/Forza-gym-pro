import { MessageCircle, Instagram, Crown, LogOut } from 'lucide-react';
import Logo from './Logo';

interface HeaderProps {
  esPro: boolean;
  onLogout: () => void;
}

export default function Header({ esPro, onLogout }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/5">
      <div className="flex items-center justify-between px-4 py-3 max-w-md mx-auto">
        <Logo />
        <div className="flex items-center gap-1">
          <button
            className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-400 hover:text-yellow-400 hover:bg-white/5 active:scale-90 transition-all"
            aria-label="Chat"
          >
            <MessageCircle className="w-5 h-5" />
          </button>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-400 hover:text-yellow-400 hover:bg-white/5 active:scale-90 transition-all"
            aria-label="Instagram"
          >
            <Instagram className="w-5 h-5" />
          </a>
<button
  className={`w-9 h-9 flex items-center justify-center rounded-lg active:scale-90 transition-all ${esPro ? 'text-yellow-400 bg-yellow-400/10' : 'text-gray-500 hover:text-yellow-400 hover:bg-white/5'}`}
  onClick={onProClick}
  aria-label="Plan Pro"
>
            <Crown className="w-5 h-5" fill={esPro ? 'currentColor' : 'none'} />
          </button>
          <button
            onClick={onLogout}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-400 hover:bg-white/5 active:scale-90 transition-all"
            aria-label="Cerrar sesión"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
