import { useState, useEffect } from 'react'

type Ejercicio = { id:number; nombre:string; musculo:string; desc:string; img:string }

// ACÁ ESTÁ LA MAGIA: según qué músculo escribas, pone la imagen sola
const getImagen = (musculo:string) => {
  const m = musculo.toLowerCase()
  if(m.includes('pecho') || m.includes('pectoral')) return '/forza-modelo.jpg'
  if(m.includes('espalda') || m.includes('dorsal')) return '/forza-modelo.jpg' // después ponés /espalda.jpg
  if(m.includes('hombro')) return '/forza-modelo.jpg'
  if(m.includes('bicep') || m.includes('brazo')) return '/forza-modelo.jpg'
  if(m.includes('tricep')) return '/forza-modelo.jpg'
  if(m.includes('pierna') || m.includes('cuadri')) return '/forza-modelo.jpg'
  return '/forza-modelo.jpg'
}

export default function App(){
  const [vista,setVista] = useState<'home'|'admin'|'detalle'>('home')
  const [sel,setSel] = useState<Ejercicio|null>(null)
  const [pulse,setPulse] = useState(false)
  const [ejercicios,setEjercicios] = useState<Ejercicio[]>(()=>{
    const g = localStorage.getItem('forza-ejercicios-v3')
    if(g) return JSON.parse(g)
    return [
      {id:1, nombre:'Press inclinado con barra', musculo:'Pecho - Pectoral Mayor', desc:'Banco inclinado 30°. Baja la barra al pecho y empuja explosivo. El pecho se marca en rojo porque es el músculo principal. 4x10 repeticiones.', img:'/forza-modelo.jpg'},
      {id:2, nombre:'Apertura con mancuernas', musculo:'Pecho Superior', desc:'Abre los brazos con ligera flexión, estira bien el pecho y cierra apretando arriba. Ideal para definir.', img:'/forza-modelo.jpg'},
    ]
  })
  const [form,setForm] = useState({nombre:'', musculo:'', desc:''})

  useEffect(()=>{ localStorage.setItem('forza-ejercicios-v3', JSON.stringify(ejercicios)) },[ejercicios])
  useEffect(()=>{ const id=setInterval(()=>setPulse(p=>!p),700); return()=>clearInterval(id) },[])

  const agregar = () => {
    if(!form.nombre ||!form.musculo) return alert('Poné nombre y músculo')
    const nuevo: Ejercicio = {
      id: Date.now(),
      nombre: form.nombre,
      musculo: form.musculo,
      desc: form.desc || `Ejercicio para ${form.musculo}. Realiza 3 series de 12 repeticiones controladas.`,
      img: getImagen(form.musculo)
    }
    setEjercicios([...ejercicios, nuevo])
    setForm({nombre:'', musculo:'', desc:''})
    setVista('home')
  }

  if(vista==='detalle' && sel){
    return(
      <div className="min-h-screen bg-black text-white flex flex-col">
        <div className="flex-1 relative bg-black rounded-b-[2.5rem] overflow-hidden flex items-center justify-center h-[68vh]">
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 to-black" />
          <button onClick={()=>setVista('home')} className="absolute top-5 left-4 z-20 bg-black/70 px-4 py-2 rounded-full text-xs border border-white/10">← Volver</button>

          {/* EFECTO TIPO GIF - late y brilla */}
          <div className={`relative z-10 w-full h-full flex items-end justify-center transition-all duration-700 ${pulse?'scale-[1.04] brightness-110':'scale-100'}`}>
            <img src={sel.img} alt={sel.nombre} className="h-full w-full object-cover object-top" />
            <div className={`absolute inset-0 bg-red-600/10 mix-blend-screen transition-opacity duration-700 ${pulse?'opacity-30':'opacity-10'}`} />
          </div>

          <div className="absolute bottom-5 left-5 right-5 z-20 flex justify-between items-end">
            <div>
              <h1 className="font-black text-[22px] leading-none">{sel.nombre.toUpperCase()}</h1>
              <span className="inline-block mt-2 bg-red-600 px-3 py-1 rounded-full text-[10px] font-black animate-pulse">{sel.musculo.toUpperCase()} 🔴 EN ACCIÓN</span>
            </div>
          </div>
        </div>

        <div className="p-5">
          <div className="bg-zinc-900 border border-red-900/30 rounded-2xl p-4">
            <p className="text-[9px] opacity-40 font-bold tracking-widest">CÓMO HACERLO</p>
            <p className="text-sm mt-1 leading-relaxed">{sel.desc}</p>
            <div className="mt-3 flex gap-2 items-center">
              <img src={sel.img} className="w-12 h-12 rounded-lg object-cover border border-red-600/30" />
              <p className="text-xs text-zinc-400">La zona en rojo brillante es el músculo que trabaja. Imagen asignada automáticamente.</p>
            </div>
          </div>
          <button onClick={()=>setVista('home')} className="w-full bg-red-600 py-4 rounded-2xl font-black mt-4">SIGUIENTE EJERCICIO →</button>
        </div>
      </div>
    )
  }

  if(vista==='admin'){
    return(
      <div className="min-h-screen bg-black text-white p-4">
        <button onClick={()=>setVista('home')} className="bg-zinc-800 px-4 py-2 rounded-full text-xs">← Volver</button>
        <h1 className="font-black text-xl mt-6">AGREGAR EJERCICIO NUEVO</h1>
        <p className="text-xs opacity-50">La imagen se pone sola según el músculo</p>

        <div className="mt-6 flex flex-col gap-3">
          <input value={form.nombre} onChange={e=>setForm({...form, nombre:e.target.value})} placeholder="Ej: Curl de bíceps con barra" className="bg-zinc-900 border border-zinc-700 rounded-xl p-3 text-sm" />
          <input value={form.musculo} onChange={e=>setForm({...form, musculo:e.target.value})} placeholder="Ej: Pecho, Espalda, Bíceps, Hombro" className="bg-zinc-900 border border-zinc-700 rounded-xl p-3 text-sm" />
          <textarea value={form.desc} onChange={e=>setForm({...form, desc:e.target.value})} placeholder="Explicación del ejercicio" className="bg-zinc-900 border border-zinc-700 rounded-xl p-3 text-sm h-24" />

          <div className="bg-zinc-900 rounded-xl p-3">
            <p className="text-xs opacity-60">Vista previa automática - tipo gif:</p>
            <div className={`mt-2 rounded-xl overflow-hidden border border-red-900/30 transition-all duration-700 ${pulse?'scale-[1.02]':''}`}>
              <img src={getImagen(form.musculo)} className="w-full h-48 object-cover object-top" />
            </div>
            <p className="text-xs mt-2">Músculo detectado: <b className="text-red-500">{form.musculo || '...'}</b></p>
          </div>

          <button onClick={agregar} className="bg-red-600 py-4 rounded-xl font-black">GUARDAR → APARECERÁ SOLO</button>
        </div>
      </div>
    )
  }

  return(
    <div className="min-h-screen bg-black text-white pb-20">
      <div className="flex justify-between items-center px-4 pt-6">
        <div className="flex items-center gap-2">
          <img src="/logo.png" className="w-10 h-10 bg-white rounded-xl p-1 object-contain" />
          <p className="font-black tracking-widest text-xs">FORZA GYM PRO</p>
        </div>
        <button onClick={()=>setVista('admin')} className="bg-red-600 px-4 py-2 rounded-full text-xs font-black">+ AGREGAR</button>
      </div>

      <div className="mx-4 mt-6 bg-[#ff4d2e] rounded-2xl p-4">
        <p className="font-black text-sm">HOY TOCA PECHO + TRÍCEPS</p>
        <p className="text-xs opacity-80">Modelo final con FORZA GYM atrás y pecho en rojo brillante</p>
      </div>

      <div className="px-4 mt-5 space-y-3">
        {ejercicios.map(ej=>(
          <div key={ej.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-3 flex gap-3 items-center">
            <img src={ej.img} className="w-16 h-16 rounded-xl object-cover" />
            <div className="flex-1">
              <p className="font-bold text-sm leading-tight">{ej.nombre}</p>
              <p className="text-xs text-red-400">{ej.musculo}</p>
            </div>
            <button onClick={()=>{setSel(ej); setVista('detalle')}} className="bg-white text-black px-4 py-2 rounded-xl text-xs font-black">VER</button>
          </div>
        ))}
      </div>
    </div>
  )
}
