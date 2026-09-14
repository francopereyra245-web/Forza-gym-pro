import { useState, useEffect } from 'react'

export default function App() {
  const [vista, setVista] = useState('home')
  const [sec, setSec] = useState(82)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const a = setInterval(() => setTick(t => t? 0 : 1), 800)
    return () => clearInterval(a)
  }, [])
  useEffect(() => {
    if (vista!== 'rutina' || sec === 0) return
    const id = setInterval(() => setSec(s => s - 1), 1000)
    return () => clearInterval(id)
  }, [vista, sec])

  const format = (t: number) => `0${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}`

  if (vista === 'rutina') {
    return (
      <div className="min-h-screen bg-black text-white">
        {/* FONDO ROJO Y NEGRO COMO FORZA */}
        <div className="h-[65vh] relative overflow-hidden rounded-b-[2.5rem] bg-gradient-to-b from-[#2a0a0a] via-[#120505] to-black">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,0,0,0.35),transparent_60%)]" />
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[140%] h-[60%] bg-red-600/20 blur-[80px] rounded-full" />

          <button onClick={() => setVista('home')} className="absolute top-6 left-5 z-20 bg-black/60 border border-white/10 px-4 py-2 rounded-full text-xs">← Volver</button>

          {/* IMAGEN MÓVIENDOSE EN ROJO */}
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out ${tick? 'scale-[1.05] -translate-y-2' : 'scale-100 translate-y-1'}`}>
            <img src="/image.webp" className="h-[90%] object-contain drop-shadow-[0_0_50px_rgba(255,0,0,0.6)]" />
          </div>

          <div className="absolute bottom-7 left-6 right-6 flex justify-between items-end z-10">
            <div>
              <h1 className="text-[26px] font-black leading-none">PRESS DE<br/>BANCA</h1>
              <div className="flex gap-2 mt-2">
                <span className="bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-full">PECHO 🔴</span>
              </div>
            </div>
            <div className="bg-black/70 border border-red-900/50 rounded-2xl px-5 py-3 text-center backdrop-blur">
              <p className="text-[8px] opacity-50">DESCANSO</p>
              <p className="text-2xl font-black">{format(sec)}</p>
            </div>
          </div>
        </div>

        <div className="p-5">
          <div className="bg-zinc-900 border border-red-900/30 rounded-2xl p-4 flex gap-4">
            <div className="w-16 h-16 bg-black rounded-xl border border-red-600/30 flex items-center justify-center">
              <div className="w-10 h-8 bg-red-600 rounded-full blur-[2px] animate-pulse" />
            </div>
            <div>
              <p className="text-[9px] opacity-40 font-bold">MÚSCULO COMPROMETIDO</p>
              <p className="text-red-500 font-black text-sm">Pecho - FAVORABLE</p>
              <p className="text-[11px] opacity-60">Marcado en rojo, como pediste</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center pt-16">
      <div className="w-20 h-20 bg-white rounded-2xl" />
      <p className="font-black tracking-[0.3em] mt-3 text-sm">FORZA GYM PRO</p>
      <div className="w-full px-4 mt-8">
        <div className="bg-zinc-900 border border-red-900/30 rounded-2xl p-5 flex justify-between items-center">
          <div><p className="font-bold text-sm">Press de banca plano</p><p className="text-[11px] opacity-50">Rojo y negro - moviéndose</p></div>
          <button onClick={() => setVista('rutina')} className="bg-red-600 px-6 py-2.5 rounded-xl font-black text-xs">INICIAR</button>
        </div>
      </div>
    </div>
  )
}
