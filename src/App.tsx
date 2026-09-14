import { useState, useEffect } from 'react'

export default function App(){
  const [vista,setVista]=useState('home')
  const [sec,setSec]=useState(82)
  const [move,setMove]=useState(0)

  useEffect(()=>{ const id=setInterval(()=>setMove(m=>m?0:1),700); return()=>clearInterval(id)},[])
  useEffect(()=>{ if(vista!=='rutina'||sec===0) return; const id=setInterval(()=>setSec(s=>s-1),1000); return()=>clearInterval(id)},[vista,sec])

  if(vista==='rutina'){
    return(
      <div className="min-h-screen bg-black text-white overflow-hidden">
        {/* FONDO ROJO Y NEGRO - COMO FORZA */}
        <div className="h-[65vh] relative bg-gradient-to-b from-[#2b0a0a] via-[#160606] to-black rounded-b-[2.5rem] overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,0,0,0.35),transparent_60%)]" />
          <button onClick={()=>setVista('home')} className="absolute top-5 left-4 z-20 bg-black/60 border border-red-900/50 px-4 py-2 rounded-full text-xs">← Volver</button>
          <p className="absolute top-6 left-1/2 -translate-x-1/2 text-[10px] tracking-widest font-black opacity-60">FORZA GYM PRO</p>

          {/* CUERPO 3D SIMULADO ROJO - SE MUEVE */}
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${move?'translate-y-[-12px] scale-105':'translate-y-[8px] scale-100'}`}>
            <div className="relative">
              <div className="absolute -inset-10 bg-red-600/30 blur-[40px] rounded-full animate-pulse" />
              {/* Figura */}
              <div className="relative w-52 h-72 flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-zinc-800 border-2 border-zinc-600" />
                <div className="w-20 h-24 mt-2 relative">
                  <div className="absolute inset-0 bg-zinc-300 rounded-[18px]" />
                  <div className="absolute inset-2 bg-red-600 rounded-[12px] shadow-[0_0_25px_rgba(255,0,0,0.9)] animate-pulse flex items-center justify-center">
                    <span className="text-[9px] font-black text-white">PECHO</span>
                  </div>
                </div>
                <div className="flex gap-10 mt-[-10px]">
                  <div className={`w-3 h-16 rounded-full transition-all ${move?'rotate-12':'-rotate-12'} bg-zinc-300`} />
                  <div className={`w-3 h-16 rounded-full transition-all ${move?'-rotate-12':'rotate-12'} bg-zinc-300`} />
                </div>
                <div className="flex gap-12 mt-1">
                  <div className="w-3 h-20 bg-zinc-400 rounded-full" />
                  <div className="w-3 h-20 bg-zinc-400 rounded-full" />
                </div>
                {/* Barra */}
                <div className={`absolute top-[88px] left-[-30px] right-[-30px] h-3 bg-white rounded-full shadow-[0_0_20px_white] transition-all duration-700 ${move?'top-[70px]':'top-[100px]'}`} />
              </div>
            </div>
          </div>

          <div className="absolute bottom-6 left-5 right-5 flex justify-between items-end z-10">
            <div>
              <h1 className="font-black text-[26px] leading-none">PRESS DE<br/>BANCA</h1>
              <span className="inline-block mt-2 bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-full">PECHO 🔴</span>
            </div>
            <div className="bg-black/80 border border-red-900/60 rounded-2xl px-5 py-3 text-center">
              <p className="text-[8px] opacity-50">DESCANSO</p>
              <p className="text-2xl font-black">{`0${Math.floor(sec/60)}:${String(sec%60).padStart(2,'0')}`}</p>
            </div>
          </div>
        </div>

        <div className="p-5">
          <div className="bg-zinc-900 border border-red-900/30 rounded-2xl p-4 flex gap-4">
            <div className="w-14 h-14 bg-black rounded-xl border border-red-600/40 flex items-center justify-center"><div className="w-8 h-6 bg-red-600 rounded-full blur-[1px] animate-pulse" /></div>
            <div><p className="text-[9px] opacity-40 font-bold">MÚSCULO COMPROMETIDO</p><p className="text-red-500 font-black text-sm">Pecho - FAVORABLE</p><p className="text-[11px] opacity-60">Marcado en rojo, como pediste</p></div>
          </div>
        </div>
      </div>
    )
  }

  return(
    <div className="min-h-screen bg-black text-white flex flex-col items-center pt-12">
      <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center"><span className="text-black font-black">FORZA</span></div>
      <p className="font-black tracking-[0.3em] mt-3 text-sm">FORZA GYM PRO</p>
      <div className="w-full px-4 mt-10">
        <div className="bg-zinc-900 border border-red-900/30 rounded-2xl p-5 flex justify-between items-center">
          <div><p className="font-bold text-sm">Press de banca plano</p><p className="text-[11px] opacity-50">Rojo con negro - ya sin imagen rota</p></div>
          <button onClick={()=>setVista('rutina')} className="bg-red-600 px-6 py-2.5 rounded-xl font-black text-xs">INICIAR</button>
        </div>
      </div>
      <p className="text-[9px] opacity-20 mt-8">Definitiva - sin v2 v3 - rojo y negro</p>
    </div>
  )
}
