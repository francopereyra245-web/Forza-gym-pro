export default function Logo() {
  return (
    <div className="flex items-center gap-2 select-none">
      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-lg shadow-yellow-500/30">
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-black">
          <path
            d="M6.5 6.5h11v11h-11v-11z M4.5 4.5h2v2h-2v-2z M17.5 4.5h2v2h-2v-2z M4.5 17.5h2v2h-2v-2z M17.5 17.5h2v2h-2v-2z"
            fill="currentColor"
          />
          <path
            d="M9 9h6v6H9z M7 7h2v2H7z M15 7h2v2h-2z M7 15h2v2H7z M15 15h2v2h-2z"
            fill="currentColor"
            opacity="0.5"
          />
        </svg>
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-xl font-black tracking-tight text-white">
          FORZA
        </span>
        <span className="text-[10px] font-bold tracking-[0.25em] text-yellow-400 uppercase">
          Gym Pro
        </span>
      </div>
    </div>
  );
}
