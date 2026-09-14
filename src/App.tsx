import { useState, useEffect } from 'react'

const MI_ALIAS_MP = "forza.gym.pro"

const GIFS: any = {
  Pecho: "https://media.giphy.com/media/3o7aCTfyhYaw8g/giphy.gif",
  Piernas: "https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif",
  Brazos: "https://media.giphy.com/media/l1J9u3TZfpfeDLkdy/giphy.gif",
  Espalda: "https://media.giphy.com/media/xT9IgG50Fb7Mi0prBC/giphy.gif",
  Hombros: "https://media.giphy.com/media/3o6Zt6ML6BklcajjsA/giphy.gif",
}

export default function App() {
  const [vista, setVista] = useState('home')
  const [ejActual, setEjActual] = useState(0)
  const [segundos, setSegundos] = useState(90)
  const [nuevo, setNuevo] = useState('')
  const [musculoNuevo, setMusculoNuevo] = useState('Pecho')
  const [productos, setProductos] = useState([
    { id:1, nombre:'WHEY 2KG', precio:28500, stock:true, cat:'suplementos' },
    { id:2, nombre:'DIETA VOLUMEN', precio:15000, stock:true, cat:'dietas' },
    { id:3, nombre:'REMERA FORZA', precio:18900, stock:false, cat:'indumentaria' },
  ])
  const [ejercicios, setEjercicios] = useState([
    { nombre:'Press de banca plano', musculo:'Pecho', peso:'80', reps:'10' },
    { nombre:'Sentadilla libre', musculo:'Piernas', peso:'100', reps:'8' },
  ])

  useEffect(()=>{
    if(vista!=='rutina' || segundos===0) return
    const id=setInterval(()=>setSegundos(s=>s-1),1000)
    return ()=>clearInterval(id)
  },[vista, segundos])

  const formatTime=(t:number)=>`${String(Math.floor(t/60)).padStart(2,'0')}:${String(t%60).padStart(2,'0')}`
  const ej = ejercicios[ejActual]

  if(vista==='tienda'){
    return (
      <div className="min-h-screen bg-black text-white p-4 pb-24">
        <div className="flex justify-between"><h1 className="font-black">TIENDA FORZA GYM PRO</h1><button onClick={()=>setVista('home')} className="bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-full text-xs">Volver</button></div>
        {productos.map(p=>(
          <div key={p.id} className="mt-3 bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex justify-between">
            <div><p className="font-bold text-sm">{p.nombre}</p><p className="text-[10px] text-zinc-500">{p.cat} - ${p.precio}</p></div>
            <button onClick={()=>setProductos(productos.map(x=>x.id===p.id?{...x, stock:!x.stock}:x))} className={`px-3 py-1 rounded-full text-[10px] font-black ${p.stock?'bg-green-600':'bg-red-600'}`}>{p.stock?'ACTIVADO':'DESACTIVADO'}</button>
          </div>
        ))}
        <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 flex justify-around py-3 text-[10px]"><button onClick={()=>setVista('home')} className="text-zinc-500">Inicio</button><button onClick={()=>setVista('rutina')} className="text-zinc-500">Rutinas</button><button onClick={()=>setVista('tienda')} className="text-red-500 font-bold">Tienda</button><button onClick={()=>setVista('admin')} className="text-zinc-500">Admin</button></div>
      </div>
    )
  }

  if(vista==='admin'){
    return (
      <div className="min-h-screen bg-black text-white p-4">
        <h1 className="font-black">ADMIN FORZA GYM PRO</h1>
        <p className="text-[11px] text-zinc-400 mt-2">Acá ves quién está activo con luz verde 🟢</p>
        <button onClick={()=>setVista('home')} className="w-full bg-white text-black mt-6 py-3 rounded-xl font-black">VOLVER</button>
      </div>
    )
  }

  if(vista==='rutina'){
    return (
      <div className="min-h-screen bg-black text-white pb-24">
        {/* IMAGEN EN MOVIMIENTO */}
        <div className="h-[42vh] bg-zinc-900 relative flex items-center justify-center overflow-hidden">
          <button onClick={()=>setVista('home')} className="absolute top-4 left-4 z-10 bg-black/70 px-4 py-2 rounded-full text-xs">← Volver</button>
          <img src={GIFS[ej.musculo] || GIFS['Pecho']} className="w-full h-full object-contain" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end">
            <div><p className="text-red-500 font-black text-xs">{ejActual+1} / {ejercicios.length}</p><p className="font-black text-xl leading-none">{ej.nombre.toUpperCase()}</p><p className="text-[11px] text-zinc-300 mt-1">Músculo: {ej.musculo}</p></div>
            <div className="bg-black border border-zinc-700 rounded-2xl px-4 py-2 text-center"><p className="text-[9px] text-zinc-500 font-bold">DESCANSO</p><p className="font-black text-2xl">{formatTime(segundos)}</p></div>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* MUSCULOS COMPROMETIDOS MARCADOS */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
            <p className="text-[10px] font-black tracking-widest">\ MÚSCULOS COMPROMETIDOS /</p>
            <div className="flex gap-4 mt-3 items-center">
              <div className="w-24 h-28 bg-black rounded-xl border border-zinc-800 flex flex-col items-center justify-center relative">
                <div className="text-4xl">🧍</div>
                <div className={`mt-2 px-2 py-1 rounded-full text-[9px] font-black ${ej.musculo==='Pecho'?'bg-red-600':'bg-zinc-800'} ${ej.musculo==='Piernas'?'bg-red-600':'bg-zinc-800'}`}> {ej.musculo==='Pecho'?'PECHO 🔴':''}{ej.musculo==='Piernas'?'PIERNAS 🔴':''}{ej.musculo==='Brazos'?'BRAZOS 🔴':''}{ej.musculo==='Espalda'?'ESPALDA 🔴':''}{ej.musculo==='Hombros'?'HOMBROS 🔴':''} </div>
                <p className="text-[8px] text-zinc-500 mt-1">STICK FIGURE</p>
              </div>
              <div className="flex-1">
                <p className="font-black text-red-500 text-sm">{ej.musculo.toUpperCase()} - FAVORABLE</p>
                <p className="text-[11px] text-zinc-400 mt-1">Este ejercicio trabaja principalmente {ej.musculo}. Se ilumina en rojo favorablemente durante la ejecución.</p>
                <div className="mt-3 bg-black border border-zinc-800 rounded-xl p-2 flex gap-2">
                  <div className="flex-1"><p className="text-[8px] text-zinc-500">PESO</p><p className="font-black text-sm">{ej.peso}kg</p></div>
                  <div className="flex-1"><p className="text-[8px] text-zinc-500">REPS</p><p className="font-black text-sm">{ej.reps}</p></div>
                </div>
              </div>
            </div>
          </div>

          {/* TIEMPO Y CONTROL */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
            <p className="text-[10px] font-bold">TIEMPO DE EJERCICIO Y CONTROL DE PESO</p>
            <div className="flex gap-2 mt-3">
              <button onClick={()=>setSegundos(30)} className={`flex-1 py-3 rounded-xl font-black text-xs border ${segundos===30?'bg-red-600 border-red-600':'bg-black border-zinc-800'}`}>30s</button>
              <button onClick={()=>setSegundos(60)} className={`flex-1 py-3 rounded-xl font-black text-xs border ${segundos===60?'bg-red-600 border-red-600':'bg-black border-zinc-800'}`}>60s</button>
              <button onClick={()=>setSegundos(90)} className={`flex-1 py-3 rounded-xl font-black text-xs border ${segundos===90?'bg-red-600 border-red-600':'bg-black border-zinc-800'}`}>90s</button>
              <button onClick={()=>setSegundos(120)} className={`flex-1 py-3 rounded-xl font-black text-xs border ${segundos===120?'bg-red-600 border-red-600':'bg-black border-zinc-800'}`}>120s</button>
            </div>
          </div>

          {/* AGREGAR MANUAL */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
            <p className="text-[10px] font-black">AGREGAR EJERCICIO MANUALMENTE</p>
            <p className="text-[9px] text-zinc-500 mt-1">Al colocarlo aparece automáticamente la imagen en movimiento + músculo marcado</p>
            <div className="flex gap-2 mt-3">
              <input value={nuevo} onChange={e=>setNuevo(e.target.value)} placeholder="Ej: Curl biceps" className="flex-1 bg-black border border-zinc-800 rounded-xl p-3 text-sm" />
              <select value={musculoNuevo} onChange={e=>setMusculoNuevo(e.target.value)} className="bg-black border border-zinc-800 rounded-xl p-3 text-xs">
                <option>Pecho</option><option>Piernas</option><option>Brazos</option><option>Espalda</option><option>Hombros</option>
              </select>
            </div>
            <button onClick={()=>{ if(nuevo){ setEjercicios([...ejercicios,{nombre:nuevo, musculo:musculoNuevo, peso:'0', reps:'0'}]); setNuevo(''); } }} className="w-full bg-white text-black mt-3 py-3 rounded-xl font-black text-xs">+ GUARDAR - IMAGEN AUTOMÁTICA</button>
          </div>

          <button onClick={()=>{ if(ejActual<ejercicios.length-1){ setEjActual(ejActual+1); setSegundos(90)} else setVista('home') }} className="w-full bg-red-600 py-4 rounded-xl font-black text-sm">{ejActual<ejercicios.length-1?'SIGUIENTE EJERCICIO →':'FINALIZAR RUTINA 🏆'}</button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      <div className="flex justify-center items-center px-4 pt-6"><img src="/logo.png" className="w-20 h-20 bg-white rounded-2xl p-2 object-contain" /></div>
      <p className="font-black tracking-[0.3em] text-center mt-2 text-sm">FORZA GYM PRO</p>
      <div className="mx-4 mt-4 bg-[#ff4d2e] rounded-2xl p-4 flex gap-3"><span>🔔</span><div><p className="font-black text-sm">HOY TE TOCA ENTRENAR PECHO + TRÍCEPS</p><p className="text-[11px] opacity-80">Alarma 18:00 - No faltes</p></div></div>
      <div className="mx-4 mt-6 bg-zinc-900 border border-red-600/30 rounded-2xl p-4 flex justify-between items-center"><div><p className="font-bold text-sm">{ejercicios[0].nombre}</p><p className="text-xs text-zinc-400">{ejercicios.length} ejercicios • con stick figure</p></div><button onClick={()=>setVista('rutina')} className="bg-red-600 px-5 py-2 rounded-xl font-black text-xs">INICIAR</button></div>
      <div className="mx-4 mt-4 grid grid-cols-2 gap-2"><button onClick={()=>setVista('tienda')} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 text-left"><p className="font-black text-xs">TIENDA</p><p className="text-[10px] text-zinc-400">Dietas, suplementos, ropa</p></button><button onClick={()=>setVista('admin')} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 text-left"><p className="font-black text-xs">ADMIN</p><p className="text-[10px] text-zinc-400">Usuarios y pagos</p></button></div>
      <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 flex justify-around py-3 text-[10px]"><button className="text-red-500 font-bold">Inicio</button><button onClick={()=>setVista('rutina')} className="text-zinc-500">Rutinas</button><button onClick={()=>setVista('tienda')} className="text-zinc-500">Tienda</button><button onClick={()=>setVista('admin')} className="text-zinc-500">Admin</button></div>
    </div>
  )
}
