export default function Logo() {
  return (
    <div className="flex items-center gap-2 select-none">
      <img
        src="/logo.png"
        alt="Forza Gym Pro"
        className="w-10 h-10 rounded-full object-cover bg-black"
      />
      <div className="flex flex-col leading-none">
        <span className="text-sm font-black tracking-tight text-white">
          FORZA
        </span>
        <span className="text-[10px] font-bold tracking-[0.2em] text-red-500 uppercase">
          Gym Pro
        </span>
      </div>
    </div>
  );
}
