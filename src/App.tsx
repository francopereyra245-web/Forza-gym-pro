import { useState, useEffect } from 'react'

const MI_ALIAS_MP = "forza.gym.pro"

export default function App() {
  const [vista, setVista] = useState('home')
  const [ejActual, setEjActual] = useState(0)
  const [segundos, setSegundos] = useState(90)
  const [productos, setProductos] = useState([
    { id:1, nombre:'WHEY 2KG', precio:28500, stock:true, cat:'suplementos', alias:MI_ALIAS_MP },
    { id:2, nombre:'DIETA VOLUMEN', precio:15000, stock:true, cat:'dietas', alias:MI_ALIAS_MP },
    { id:3, nombre:'REMERA FORZA', precio:18900, stock:false, cat:'indumentaria', alias:MI_ALIAS_MP },
  ])
  const [ejercicios, setEjercicios] = useState([
    { nombre:'Press de banca', musculo:'Pecho' },
    { nombre:'Sentadilla', musculo:'Piernas' },
  ])
  const [nuevo, setNuevo] = useState('')

  useEffect(()=>{
    if(vista!=='rutina' || segundos===0) return
    const id=setInterval(()=>setSegundos(s=>s-1),1000)
    return ()=>clearInterval(id)
  },[vista, segundos])

  const formatTime=(t:number)=>`${String(Math.floor(t/60)).padStart(2,'0')}:${String(t%60).padStart(2,'0')}`

  if(vista==='tienda'){
    return (
      <div className="min-h-screen bg-black text-white p-4 pb-24">
        <div className="flex justify-between items-center">
          <h1 className="font-black">TIENDA FORZA GYM PRO</h1>
          <button onClick={()=>setVista('home')} className="bg-zinc-900 px-4 py-2 rounded-full text-xs border border-zinc-800">Volver</button>
        </div>
        {productos.map(p=>(
          <div key={p.id} className="mt-3 bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
            <div className="flex justify-between items-center">
              <p className="font-bold text-sm">{p.nombre} - ${p.precio}</p>
              <button onClick={()=>setProductos(productos.map(x=>x.id===p.id?{...x, stock:!x.stock}:x))} className={`px-3 py-1 rounded-full text-[10px] font-black ${p.stock?'bg-green-600':'bg-red-600'}`}>{p.stock?'ACTIVADO':'DESACTIVADO'}</button>
            </div>
            <p className="text-[10px] text-zinc-500 mt-1">{p.cat} • alias: {p.alias}</p>
            <input className="w-full bg-black border border-zinc-800 rounded-xl p-2 mt-2 text-xs" placeholder="Link foto o video del producto" />
            <a href={`https://mpago.la`} target="_blank" className="block text-center w-full bg-white text-black mt-2 py-2 rounded-xl font-black text-xs">PAGAR A {p.alias}</a>
          </div>
        ))}
        <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 flex justify-around py-3 text-[10px]">
          <button onClick={()=>setVista('home')} className="text-zinc-500">Inicio</button>
          <button onClick={()=>setVista('rutina')} className="text-zinc-500">Rutinas</button>
          <button onClick={()=>setVista('tienda')} className="text-red-500 font-bold">Tienda</button>
          <button onClick={()=>setVista('admin')} className="text-zinc-500">Admin</button>
        </div>
      </div>
    )
  }

  if(vista==='admin'){
    return (
      <div className="min-h-screen bg-black text-white p-4 pb-24">
        <h1 className="font-black">ADMIN FORZA GYM PRO</h1>
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 mt-4">
          <p className="text-sm font-bold">USUARIOS 🟢 ACTIVOS</p>
          <p className="text-xs mt-2">Juan Perez - 80kg - M - Ingresó hoy 13:31 - 22 días activo 🟢</p>
          <p className="text-xs mt-1">Pedro Gomez - 75kg - L - Ingresó ayer - 5 días activo 🔴</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 mt-4">
          <p className="text-sm font-bold">PRECIO PRO</p>
          <input defaultValue="8900" className="w-full bg-black border border-zinc-800 rounded-xl p-3 mt-2 text-sm" />
        </div>
        <button onClick={()=>setVista('home')} className="w-full bg-white text-black mt-6 py-3 rounded-xl font-black">VOLVER</button>
      </div>
    )
  }

  if(vista==='rutina'){
    const ej = ejercicios[ejActual]
    return (
      <div className="min-h-screen bg-black text-white pb-24">
        <div className="h-[40vh] bg-zinc-900 flex flex-col items-center justify-center relative">
          <button onClick={()=>setVista('home')} className="absolute top-4 left-4 bg-black px-4 py-2 rounded-full text-xs">← Volver</button>
          <p className="text-6xl animate-bounce">🏋️</p>
          <p className="font-black mt-2">{ej.nombre}</p>
          <p className="text-xs text-zinc-400 mt-1">Stick figure en movimiento - musculo: {ej.musculo}</p>
          <div className="mt-4 w-20 h-20 bg-black rounded-full border-4 border-zinc-800 border-t-red-600 flex items-center justify-center">
            <span className="font-black">{formatTime(segundos)}</span>
          </div>
        </div>
        <div className="p-4 space-y-3">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex gap-3">
            <div className="w-16 h-20 bg-black rounded-xl flex items-center justify-center text-[10px]">STICK<br/>{ej.musculo}</div>
            <div><p className="text-[10px] text-zinc-500 font-bold">MÚSCULO COMPROMETIDO</p><p className="font-black text-red-500">{ej.musculo.toUpperCase()}</p><p className="text-[10px] text-zinc-400">Marcado en rojo favorablemente</p></div>
          </div>
          <div className="flex gap-2">
            <button onClick={()=>setSegundos(30)} className="flex-1 bg-zinc-800 py-3 rounded-xl font-bold text-xs">30s</button>
            <button onClick={()=>setSegundos(60)} className="flex-1 bg-zinc-800 py-3 rounded-xl font-bold text-xs">60s</button>
            <button onClick={()=>setSegundos(90)} className="flex-1 bg-red-600 py-3 rounded-xl font-bold text-xs">90s</button>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
            <p className="text-[10px] font-bold">AGREGAR EJERCICIO MANUAL</p>
            <div className="flex gap-2 mt-2">
              <input value={nuevo} onChange={e=>setNuevo(e.target.value)} placeholder="Ej: Curl biceps" className="flex-1 bg-black border border-zinc-800 rounded-xl p-3 text-sm" />
              <button onClick={()=>{ if(nuevo){ setEjercicios([...ejercicios,{nombre:nuevo, musculo:'Brazos'}]); setNuevo('') } }} className="bg-white text-black px-4 rounded-xl font-black text-xs">+ ADD</button>
            </div>
            <p className="text-[9px] text-zinc-500 mt-2">Al agregarlo aparece automático imagen en movimiento + músculo marcado</p>
          </div>
          <button onClick={()=>{ if(ejActual<ejercicios.length-1) setEjActual(ejActual+1); else setVista('home') }} className="w-full bg-red-600 py-4 rounded-xl font-black">{ejActual<ejercicios.length-1?'SIGUIENTE →':'FINALIZAR'}</button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      <div className="flex justify-between items-center px-4 pt-5">
        <img src="/logo.png" className="w-14 h-14 bg-white rounded-xl p-1 object-contain" />
        <p className="font-black tracking-widest text-sm">FORZA GYM PRO</p>
        <div className="w-14"></div>
      </div>

      <div className="mx-4 mt-4 bg-red-600 rounded-2xl p-4">
        <p className="font-black text-sm">🔔 HOY TE TOCA ENTRENAR PECHO + TRÍCEPS</p>
        <p className="text-[11px] opacity-80 mt-1">Alarma 18:00 - No faltes</p>
      </div>

      <div className="mx-4 mt-6 bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex justify-between items-center">
        <div><p className="font-bold text-sm">{ejercicios[0].nombre}</p><p className="text-xs text-zinc-400">{ejercicios.length} ejercicios</p></div>
        <button onClick={()=>setVista('rutina')} className="bg-red-600 px-5 py-2 rounded-xl font-black text-xs">INICIAR</button>
      </div>

      <div className="mx-4 mt-4 grid grid-cols-2 gap-2">
        <button onClick={()=>setVista('tienda')} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 text-left"><p className="font-black text-xs">TIENDA</p><p className="text-[10px] text-zinc-400 mt-1">Dietas, suplementos, ropa</p></button>
        <button onClick={()=>setVista('admin')} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 text-left"><p className="font-black text-xs">ADMIN</p><p className="text-[10px] text-zinc-400 mt-1">Usuarios y pagos</p></button>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 flex justify-around py-3 text-[10px]">
        <button onClick={()=>setVista('home')} className="text-red-500 font-bold">Inicio</button>
        <button onClick={()=>setVista('rutina')} className="text-zinc-500">Rutinas</button>
        <button onClick={()=>setVista('tienda')} className="text-zinc-500">Tienda</button>
        <button onClick={()=>setVista('admin')} className="text-zinc-500">Admin</button>
      </div>
    </div>
  )
}
