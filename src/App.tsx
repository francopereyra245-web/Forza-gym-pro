import { useState, useEffect } from 'react'

export default function App() {
  const [vista, setVista] = useState('home')
  const [sec, setSec] = useState(82)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const a = setInterval(() => setTick(t => t? 0 : 1), 850)
    return () => clearInterval(a)
  }, [])
  useEffect(() => {
    if (vista!== 'rutina' || sec === 0) return
    const id = setInterval(() => setSec(s => s - 1), 1000)
    return () => clearInterval(id)
  }, [vista, sec])

  const format = (t:number) => `0${Math.floor(t/60)}:${String(t%60).padStart(2,'0')}`

  if (vista === 'rutina') {
    return (
      <div className="min-h-screen bg-[#070a0c] text-white font-sans">
        <div className="h-[62vh] relative overflow-hidden rounded-b-[2.5rem] bg-gradient-to-b from-[#123a42] to-[#070a0c]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(0,220,255,0.3),transparent_60%)]" />
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[140%] h-[70%] bg-[#00d4ff]/15 blur-[90px] rounded-full" />

          <button onClick={() => setVista('home')} className="absolute top-6 left-5 z-20 bg-black/50 backdrop-blur px-4 py-2 rounded-full text-xs border border-white/10">← Volver</button>

          <div className={`absolute inset-0 flex items-center justify-center transition-transform duration-[850ms] ease-in-out ${tick? 'scale-[1.06] -translate-y-2' : 'scale-100 translate-y-1'}`}>
            <img src="/bench_press_anatomy_cyan_glow.webp" className="h-[88%] object-contain drop-shadow-[0_30px_60px_rgba(0,212,255,0.5)]" alt="ejercicio" />
          </div>

          <div className="absolute bottom-8 left-6 right-6 flex justify-between items-end z-10">
            <div>
              <h1 className="text-[28px] font-black italic leading-[0.9]">PRESS DE<br/>BANCA PLANO</h1>
              <div className="flex gap-2 mt-3">
                <span className="bg-[#00d4ff] text-black text-[10px] font-black px-3 py-1 rounded-full">PECHO</span>
                <span className="text-[10px] tracking-widest opacity-60 mt-1">MOVIMIENTO EN VIVO</span>
              </div>
            </div>
            <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl px-5 py-3 text-center">
              <p className="text-[8px] opacity-40">DESCANSO</p>
              <p className="text-2xl font-black">{format(sec)}</p>
            </div>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div className="bg-[#10181b] border border-[#1c3338] rounded-[20px] p-4 flex gap-4 items-center">
            <div className="w-16 h-20 bg-black rounded-xl border border-[#00d4ff]/20 flex items-center justify-center">
              <div className="w-8 h-12 bg-[#00d4ff] blur-[1px] rounded-full opacity-80" />
            </div>
            <div>
              <p className="text-[9px] opacity-40 tracking-widest font-bold">MÚSCULOS COMPROMETIDOS</p>
              <p className="text-[#00d4ff] font-black text-sm mt-1">Pecho - FAVORABLE</p>
              <p className="text-[11px] opacity-60">Iluminado en celeste como en tu foto</p>
            </div>
          </div>
          <button onClick={() => setVista('home')} className="w-full bg-[#00d4ff] text-black py-4 rounded-2xl font-black">FINALIZAR</button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex flex-col items-center pt-10">
        <div className="w-20 h-20 bg-white rounded-2xl" />
        <p className="font-black tracking-[0.3em] mt-3 text-sm">FORZA GYM PRO</p>
      </div>
      <div className="mx-4 mt-8 bg-[#10181b] border border-[#1c3338] rounded-2xl p-5 flex justify-between items-center">
        <div>
          <p className="font-bold text-sm">Press de banca plano</p>
          <p className="text-[11px] opacity-50">Estilo myfitcoach - ya arreglado</p>
        </div>
        <button onClick={() => setVista('rutina')} className="bg-[#00d4ff] text-black px-6 py-2.5 rounded-xl font-black text-xs">INICIAR</button>
      </div>
      <p className="text-center text-[10px] opacity-30 mt-10">Sin versiones. Esta es la definitiva.</p>
    </div>
  )
}
