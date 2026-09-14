import { useState, useEffect } from 'react'

type Ejercicio = { id:number; nombre:string; musculo:string; desc:string; video:string }

const getVideo = (musculo:string) => {
  // Por ahora usamos el mismo video para todos, después agregamos más
  return '/forza-animado.mp4'
}

export default function App(){
  const [vista,setVista]=useState<'home'|'admin'|'detalle'>('home')
  const [sel,setSel]=useState<Ejercicio|null>(null)
  const [ejercicios,setEjercicios]=useState<Ejercicio[]>(()=>{
    const g = localStorage.getItem('forza-v4')
    if(g) return JSON.parse(g)
    return [
      {id:1, nombre:'Press inclinado con barra', musculo:'Pecho - Pectoral Mayor', desc:'Banco inclinado 30°. Baja la barra al pecho y empuja explosivo. 4x10 repeticiones.', video:'/forza-animado.mp4'},
    ]
  })
  const [form,setForm]=useState({nombre:'', musculo:'', desc:''})

  useEffect(()=>{ localStorage.setItem('forza-v4', JSON.stringify(ejercicios)) },[ejercicios])

  const agregar = () => {
    if(!form.nombre ||!form.musculo) return alert('Falta nombre y músculo')
    const nuevo:Ejercicio = {
      id: Date.now(),
      nombre: form.nombre,
      musculo: form.musculo,
      desc: form.desc || `Ejercicio para ${form.musculo}. 3x12 repeticiones controladas.`,
      video: getVideo(form.musculo)
    }
    setEjercicios([...ejercicios, nuevo])
    setForm({nombre:'', musculo:'', desc:''})
    setVista('home')
  }

  if(vista==='detalle' && sel){
    return(
      <div className="min-h-screen bg-black text-white">
        <div className="h-[70vh] relative bg-black rounded-b-[3rem] overflow-hidden">
          <button onClick={()=>setVista('home')} className="absolute top-5 left-4 z-20 bg-black/70 px-4 py-2 rounded-full text-xs border border-white/20">← Volver</button>

          {/* VIDEO REAL EN MOVIMIENTO TIPO GIF */}
          <video src={sel.video} autoPlay loop muted playsInline className="w-full h-full object-cover object-top" />

          <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end">
            <div>
              <h1 className="font-black text-[22px] leading-none">{sel.nombre.toUpperCase()}</h1>
              <span className="inline-block mt-2 bg-red-600 px-3 py-1 rounded-full text-[10px] font-black animate-pulse">{sel.musculo.toUpperCase()} 🔴</span>
            </div>
          </div>
        </div>
        <div className="p-5">
          <p className="text-sm">{sel.desc}</p>
          <p className="text-[10px] opacity-40 mt-3">Video en movimiento real, no imagen fija. Se asigna solo al agregar ejercicio nuevo.</p>
        </div>
      </div>
    )
  }

  if(vista==='admin'){
    return(
      <div className="min-h-screen bg-black text-white p-4">
        <button onClick={()=>setVista('home')} className="bg-zinc-800 px-4 py-2 rounded-full text-xs">← Volver</button>
        <h1 className="font-black text-xl mt-6">AGREGAR EJERCICIO</h1>
        <p className="text-xs opacity-50">El video se pone solo</p>
        <div className="mt-6 flex flex-col gap-3">
          <input value={form.nombre} onChange={e=>setForm({...form,nombre:e.target.value})} placeholder="Ej: Curl de bíceps" className="bg-zinc-900 border border-zinc-700 rounded-xl p-3 text-sm" />
          <input value={form.musculo} onChange={e=>setForm({...form,musculo:e.target.value})} placeholder="Ej: Pecho, Espalda, Bíceps" className="bg-zinc-900 border border-zinc-700 rounded-xl p-3 text-sm" />
          <textarea value={form.desc} onChange={e=>setForm({...form,desc:e.target.value})} placeholder="Descripción" className="bg-zinc-900 border border-zinc-700 rounded-xl p-3 text-sm h-24" />
          <button onClick={agregar} className="bg-red-600 py-4 rounded-xl font-black">GUARDAR → SE PONE SOLO</button>
          <video src={getVideo(form.musculo)} autoPlay loop muted playsInline className="w-full h-48 object-cover rounded-xl mt-2" />
        </div>
      </div>
    )
  }

  return(
    <div className="min-h-screen bg-black text-white pb-20">
      <div className="flex justify-between items-center px-4 pt-6">
        <div className="flex items-center gap-2"><img src="/logo.png" className="w-10 h-10 bg-white rounded-xl p-1" /><p className="font-black text-xs tracking-widest">FORZA GYM PRO</p></div>
        <button onClick={()=>setVista('admin')} className="bg-red-600 px-4 py-2 rounded-full text-xs font-black">+ AGREGAR</button>
      </div>
      <div className="px-4 mt-6 space-y-3">
        {ejercicios.map(ej=>(
          <div key={ej.id} className="bg-zinc-900 rounded-2xl p-3 flex gap-3 items-center">
            <video src={ej.video} autoPlay loop muted playsInline className="w-16 h-16 rounded-xl object-cover" />
            <div className="flex-1"><p className="font-bold text-sm">{ej.nombre}</p><p className="text-xs text-red-400">{ej.musculo}</p></div>
            <button onClick={()=>{setSel(ej); setVista('detalle')}} className="bg-white text-black px-4 py-2 rounded-xl text-xs font-black">VER</button>
          </div>
        ))}
      </div>
    </div>
  )
}
