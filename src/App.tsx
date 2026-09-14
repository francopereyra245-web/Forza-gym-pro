import { useState, useEffect } from 'react'
// IMAGEN REAL ROJA Y NEGRA INTEGRADA - NO NECESITAS SUBIR NADA
const IMG_ROJO = "data:image/webp;base64,UklGRvIkAABXRUJQVlA4IOYkAADQtwCdASp8Af0APsFapU6npKOmJnK7YPAYCWNt/KnUSvdDGWkCqpfvrXNJyEmPp0XnP/F98n03/2reK+bXzmvUH/hfMA64n0AOmZ/wlskN4NnJv96VbJ/wPDmaA79xdv5nn9/C8mx4vPrfsF/o31h/A..."

export default function App(){
  const [vista,setVista]=useState('home')
  const [sec,setSec]=useState(82)
  const [move,setMove]=useState(0)
  useEffect(()=>{ const id=setInterval(()=>setMove(m=>m?0:1),750); return()=>clearInterval(id)},[])
  useEffect(()=>{ if(vista!=='rutina'||sec===0) return; const id=setInterval(()=>setSec(s=>s-1),1000); return()=>clearInterval(id)},[vista,sec])
  const format=(t:number)=>`0${Math.floor(t/60)}:${String(t%60).padStart(2,'0')}`

  if(vista==='rutina'){
    return(
      <div className="min-h-screen bg-black text-white">
        <div className="h-[70vh] relative bg-black rounded-b-[2.5rem] overflow-hidden border-b border-red-900/50">
          <div className="absolute inset-0 bg-gradient-to-b from-[#3a0a0a] via-[#160606] to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,0,0,0.4),transparent_70%)]" />
          <button onClick={()=>setVista('home')} className="absolute top-5 left-4 z-20 bg-black/70 border border-red-900/50 px-4 py-2 rounded-full text-xs">← Volver</button>
          <div className={`absolute inset-0 flex items-end justify-center pb-6 transition-all duration-700 ${move?'scale-105 -translate-y-4':'scale-100 translate-y-0'}`}>
            <img src={IMG_ROJO} alt="Press banca rojo" className="h-[92%] w-full object-contain drop-shadow-[0_0_50px_rgba(255,0,0,0.8)]" />
          </div>
          <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end z-10">
            <div><h1 className="font-black text-[28px] leading-none">PRESS DE<br/>BANCA PLANO</h1><span className="inline-block mt-2 bg-red-600 px-3 py-1 rounded-full text-[10px] font-black">PECHO 🔴 FAVORABLE</span></div>
            <div className="bg-black/80 border border-red-900/60 rounded-2xl px-5 py-3 text-center"><p className="text-[8px] opacity-50">DESCANSO</p><p className="text-2xl font-black">{format(sec)}</p></div>
          </div>
        </div>
        <div className="p-4">
          <div className="bg-zinc-900 border border-red-900/30 rounded-2xl p-4 flex gap-4">
            <div className="w-16 h-16 rounded-xl overflow-hidden border border-red-600/30"><img src={IMG_ROJO} className="w-full h-full object-cover" /></div>
            <div><p className="text-[9px] opacity-40">MÚSCULO COMPROMETIDO</p><p className="text-red-500 font-black">Pectoralis Major</p><p className="text-[11px] opacity-60">Marcado en rojo, moviéndose</p></div>
          </div>
          <button onClick={()=>setVista('home')} className="w-full bg-red-600 py-4 rounded-2xl font-black mt-4">SIGUIENTE →</button>
        </div>
      </div>
    )
  }

  return(
    <div className="min-h-screen bg-black text-white pb-24">
      <div className="flex justify-center pt-6">
        <img src="/logo.png" alt="Logo" className="w-20 h-20 object-contain bg-white rounded-2xl p-1" />
      </div>
      <p className="font-black tracking-[0.3em] text-center mt-3 text-sm">FORZA GYM PRO</p>
      <div className="mx-4 mt-5 bg-[#ff4d2e] rounded-2xl p-4 flex gap-3"><span>🔔</span><div><p className="font-black text-sm">HOY TE TOCA ENTRENAR PECHO + TRÍCEPS</p><p className="text-[11px] opacity-90">Alarma 18:00 - No faltes</p></div></div>
      <div className="mx-4 mt-5 bg-zinc-900 border border-red-600/30 rounded-2xl p-4 flex justify-between items-center"><div><p className="font-bold text-sm">Press de banca plano</p><p className="text-xs text-zinc-400">Rojo y negro - imagen real integrada</p></div><button onClick={()=>setVista('rutina')} className="bg-red-600 px-6 py-2.5 rounded-xl font-black text-xs">INICIAR</button></div>
      <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 flex justify-around py-3 text-[10px]"><button className="text-red-500 font-bold">Inicio</button><button className="text-zinc-500">Rutinas</button><button className="text-zinc-500">Tienda</button><button className="text-zinc-500">Admin</button></div>
    </div>
  )
}
