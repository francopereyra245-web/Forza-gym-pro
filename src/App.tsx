import { useState, useEffect } from 'react'

export default function App(){
  const [vista,setVista]=useState('home')
  const [sec,setSec]=useState(72)
  const [move,setMove]=useState(0)

  useEffect(()=>{ const id=setInterval(()=>setMove(m=>m?0:1),850); return()=>clearInterval(id)},[])
  useEffect(()=>{ if(vista!=='rutina'||sec===0) return; const id=setInterval(()=>setSec(s=>s-1),1000); return()=>clearInterval(id)},[vista,sec])
  const fmt=(t:number)=>`0${Math.floor(t/60)}:${String(t%60).padStart(2,'0')}`

  if(vista==='rutina'){
    return(
      <div className="min-h-screen bg-black text-white">
        <div className="h-[70vh] relative bg-black rounded-b-[2.5rem] overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-b from-[#2b0a0a] to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,0,0,0.35),transparent_70%)]" />
          <button onClick={()=>setVista('home')} className="absolute top-5 left-4 z-30 bg-black/70 border border-white/10 px-4 py-2 rounded-full text-xs">← Volver</button>
          <div className={`relative z-10 w-full h-full flex items-end justify-center pb-2 transition-all duration-700 ${move?'scale-105':'scale-100'}`}>
            <img src="/forza-bench-rojo.jpg" alt="Press banca" className="h-[88%] w-auto max-w-[95%] object-contain drop-shadow-[0_0_50px_rgba(255,0,0,0.7)]" />
          </div>
          <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end z-20">
            <div>
              <h1 className="font-black text-[24px] leading-none">PRESS DE<br/>BANCA PLANO</h1>
              <span className="inline-block mt-2 bg-red-600 px-3 py-1 rounded-full text-[10px] font-black">PECHO 🔴 FAVORABLE</span>
            </div>
            <div className="bg-black/80 border border-red-900/60 rounded-2xl px-4 py-2 text-center">
              <p className="text-[8px] opacity-50">DESCANSO</p>
              <p className="text-xl font-black">{fmt(sec)}</p>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="bg-zinc-900 border border-red-900/30 rounded-2xl p-4 flex gap-4 items-center">
            <img src="/forza-bench-rojo.jpg" className="w-16 h-16 rounded-xl object-cover border border-red-600/30" />
            <div>
              <p className="text-[9px] opacity-40 font-bold tracking-widest">MÚSCULO TRABAJADO</p>
              <p className="text-red-500 font-black text-[15px]">Pecho - Pectoral Mayor</p>
              <p className="text-[11px] opacity-60">Marcado en rojo, moviéndose</p>
            </div>
          </div>
          <button onClick={()=>setVista('home')} className="w-full bg-red-600 py-4 rounded-2xl font-black mt-4">SIGUIENTE →</button>
        </div>
      </div>
    )
  }

  return(
    <div className="min-h-screen bg-black text-white pb-24">
      <div className="flex justify-center pt-8"><img src="/logo.png" className="w-20 h-20 bg-white rounded-2xl p-2 object-contain" /></div>
      <p className="font-black tracking-[0.3em] text-center mt-3 text-sm">FORZA GYM PRO</p>
      <div className="mx-4 mt-6 bg-[#ff4d2e] rounded-2xl p-4 flex gap-3"><span>🔔</span><div><p className="font-black text-sm">HOY TE TOCA ENTRENAR PECHO + TRÍCEPS</p></div></div>
      <div className="mx-4 mt-5 bg-zinc-900 border border-red-600/30 rounded-2xl p-4 flex justify-between items-center"><div><p className="font-bold text-sm">Press de banca plano</p><p className="text-xs text-zinc-400">Pecho en rojo - imagen real</p></div><button onClick={()=>setVista('rutina')} className="bg-red-600 px-6 py-3 rounded-xl font-black text-xs">INICIAR</button></div>
      <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 flex justify-around py-3 text-[10px]"><button className="text-red-500 font-bold">Inicio</button><button className="text-zinc-500">Rutinas</button><button className="text-zinc-500">Tienda</button><button className="text-zinc-500">Admin</button></div>
    </div>
  )
}
