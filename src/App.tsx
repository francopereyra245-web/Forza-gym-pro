import { useState, useEffect } from 'react'

export default function App(){
  const [vista,setVista]=useState('home')
  const [sec,setSec]=useState(82)
  const [move,setMove]=useState(0)
  const [ejActual,setEjActual]=useState(0)
  const [ejercicios,setEjercicios]=useState(()=>{
    const s=localStorage.getItem('forza_ej')
    return s? JSON.parse(s): [
      {id:1,nombre:'Press de banca plano',musculo:'Pecho',peso:'80',reps:'10'},
      {id:2,nombre:'Sentadilla libre',musculo:'Piernas',peso:'100',reps:'8'},
    ]
  })

  useEffect(()=>{ const id=setInterval(()=>setMove(m=>m?0:1),800); return()=>clearInterval(id)},[])
  useEffect(()=>{ if(vista!=='rutina'||sec===0) return; const id=setInterval(()=>setSec(s=>s-1),1000); return()=>clearInterval(id)},[vista,sec])
  useEffect(()=>{ localStorage.setItem('forza_ej',JSON.stringify(ejercicios))},[ejercicios])

  const format=(t:number)=>`0${Math.floor(t/60)}:${String(t%60).padStart(2,'0')}`
  const ej = ejercicios[ejActual]

  // RUTINA - ARREGLADA EN ROJO Y NEGRO CON IMAGEN REAL
  if(vista==='rutina'){
    return(
      <div className="min-h-screen bg-black text-white">
        <div className="h-[64vh] relative bg-black rounded-b-[2.5rem] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#3a0a0a] via-[#160606] to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,0,0,0.35),transparent_70%)]" />

          <button onClick={()=>setVista('home')} className="absolute top-5 left-4 z-20 bg-black/60 border border-red-900/50 px-4 py-2 rounded-full text-xs">← Volver</button>

          <div className={`absolute inset-0 flex items-end justify-center pb-8 transition-all duration-700 ${move?'scale-105 -translate-y-3':'scale-100 translate-y-0'}`}>
            <img src="/forza-bench-rojo.webp" onError={(e:any)=>{ e.target.style.display='none'; e.target.nextSibling.style.display='flex' }} className="h-[90%] w-full object-contain drop-shadow-[0_0_60px_rgba(255,0,0,0.7)]" />
            {/* Fallback si no subiste la imagen */}
            <div className="hidden h-[80%] w-[80%] bg-zinc-900 border-2 border-red-600 rounded-3xl items-center justify-center flex-col">
              <span className="text-6xl">🏋️</span>
              <p className="text-red-500 font-black mt-2">PECHO EN ROJO</p>
              <p className="text-[10px] opacity-50">Subí forza-bench-rojo.webp a public/</p>
            </div>
          </div>

          <div className="absolute bottom-6 left-5 right-5 flex justify-between items-end z-10">
            <div>
              <h1 className="font-black text-[26px] leading-none">{ej.nombre.toUpperCase()}</h1>
              <span className="inline-block mt-2 bg-red-600 px-3 py-1 rounded-full text-[10px] font-black">{ej.musculo.toUpperCase()} 🔴 FAVORABLE</span>
            </div>
            <div className="bg-black/80 border border-red-900/60 rounded-2xl px-5 py-3 text-center">
              <p className="text-[8px] opacity-50">DESCANSO</p>
              <p className="text-2xl font-black">{format(sec)}</p>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="bg-zinc-900 border border-red-900/30 rounded-2xl p-4 flex gap-4">
            <div className="w-16 h-16 bg-black rounded-xl border border-red-600/30 flex items-center justify-center"><div className="w-8 h-6 bg-red-600 rounded-full animate-pulse shadow-[0_0_15px_red]" /></div>
            <div><p className="text-[9px] opacity-40 font-bold">MÚSCULO COMPROMETIDO</p><p className="text-red-500 font-black text-sm">Pecho - FAVORABLE</p><p className="text-[11px] opacity-60">Marcado en rojo, como pediste</p></div>
          </div>
          <button onClick={()=>{ if(ejActual<ejercicios.length-1){ setEjActual(ejActual+1); setSec(90)} else setVista('home') }} className="w-full bg-red-600 py-4 rounded-2xl font-black mt-4">{ejActual<ejercicios.length-1?'SIGUIENTE →':'FINALIZAR'}</button>
        </div>
      </div>
    )
  }

  // INICIO ORIGINAL - COMO LO TENÍAS ANTES
  return(
    <div className="min-h-screen bg-black text-white pb-24">
      <div className="flex justify-center pt-6">
        <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center"><span className="text-black font-black text-xs">FORZA</span></div>
      </div>
      <p className="font-black tracking-[0.3em] text-center mt-2 text-sm">FORZA GYM PRO</p>

      <div className="mx-4 mt-4 bg-[#ff4d2e] rounded-2xl p-4 flex gap-3">
        <span>🔔</span>
        <div>
          <p className="font-black text-sm leading-tight">HOY TE TOCA ENTRENAR PECHO + TRÍCEPS</p>
          <p className="text-[11px] mt-1 opacity-80">Alarma 18:00 - No faltes</p>
        </div>
      </div>

      <div className="mx-4 mt-5 bg-zinc-900 border border-red-600/30 rounded-2xl p-4 flex justify-between items-center">
        <div>
          <p className="font-bold text-sm">{ejercicios[0].nombre}</p>
          <p className="text-xs text-zinc-400">{ejercicios.length} ejercicios • 18:00</p>
        </div>
        <button onClick={()=>setVista('rutina')} className="bg-red-600 px-6 py-2.5 rounded-xl font-black text-xs">INICIAR</button>
      </div>

      <div className="mx-4 mt-4 grid grid-cols-2 gap-3">
        <button onClick={()=>setVista('home')} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 text-left"><p className="font-black text-xs">RUTINAS</p><p className="text-[10px] opacity-50">Ver ejercicios</p></button>
        <button className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 text-left"><p className="font-black text-xs">TIENDA</p><p className="text-[10px] opacity-50">Suplementos y ropa</p></button>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 flex justify-around py-3 text-[10px]">
        <button className="text-red-500 font-bold">Inicio</button>
        <button onClick={()=>setVista('rutina')} className="text-zinc-500">Rutinas</button>
        <button className="text-zinc-500">Tienda</button>
        <button className="text-zinc-500">Admin</button>
      </div>
    </div>
  )
}
