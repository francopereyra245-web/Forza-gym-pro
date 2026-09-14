import { useState, useEffect } from 'react'

export default function App() {
  const [vista, setVista] = useState('home')
  const [ejActual, setEjActual] = useState(0)
  const [segundos, setSegundos] = useState(90)
  const [nuevo, setNuevo] = useState('')
  const [musculoNuevo, setMusculoNuevo] = useState('Pecho')
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

  if(vista==='rutina'){
    return (
      <div className="min-h-screen bg-black text-white pb-24">
        {/* ANIMACION REAL - NO GIF - ANDA SIEMPRE */}
        <div className="h-[46vh] bg-gradient-to-b from-zinc-900 to-black relative flex items-center justify-center">
          <button onClick={()=>setVista('home')} className="absolute top-4 left-4 z-10 bg-black/70 px-4 py-2 rounded-full text-xs">← Volver</button>

          <div className="text-center">
            {/* STICK FIGURE ANIMADO EN CODIGO */}
            <div className="w-32 h-40 mx-auto relative">
              <div className="w-10 h-10 rounded-full border-4 border-white mx-auto animate-bounce" />
              <div className={`w-1 h-14 mx-auto mt-1 ${ej.musculo==='Pecho'?'bg-red-600':'bg-white'}`} />
              <div className="flex justify-center -mt-10">
                <div className="w-10 h-1 bg-white rotate-45 origin-left animate-pulse" />
                <div className="w-10 h-1 bg-white -rotate-45 origin-right animate-pulse" />
              </div>
              <div className="flex justify-center mt-6 gap-6">
                <div className={`w-1 h-12 ${ej.musculo==='Piernas'?'bg-red-600':'bg-white'} rotate-12`} />
                <div className={`w-1 h-12 ${ej.musculo==='Piernas'?'bg-red-600':'bg-white'} -rotate-12`} />
              </div>
              {/* Barra de press animada */}
              <div className="absolute top-14 -left-6 -right-6 h-2 bg-white animate-[ping_1s_ease-in-out_infinite]" />
            </div>

            <p className="font-black text-xl mt-4">{ej.nombre.toUpperCase()}</p>
            <p className="text-xs text-red-500 font-black mt-1 animate-pulse">● MOVIMIENTO EN VIVO - {ej.musculo.toUpperCase()}</p>
          </div>

          <div className="absolute bottom-3 right-4 bg-black border border-zinc-700 rounded-2xl px-4 py-2 text-center">
            <p className="text-[9px] text-zinc-500 font-bold">DESCANSO</p>
            <p className="font-black text-2xl">{formatTime(segundos)}</p>
          </div>
        </div>

        <div className="p-4 space-y-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
            <p className="text-[10px] font-black">\ MÚSCULOS COMPROMETIDOS /</p>
            <div className="flex gap-3 mt-3">
              <div className="w-20 h-24 bg-black rounded-xl border border-zinc-800 flex flex-col items-center justify-center">
                <span className="text-2xl">🧍</span>
                <span className="bg-red-600 text-[8px] font-black px-2 py-1 rounded-full mt-1">{ej.musculo.toUpperCase()} 🔴</span>
              </div>
              <div><p className="font-black text-red-500 text-sm">{ej.musculo} - FAVORABLE</p><p className="text-[11px] text-zinc-400 mt-1">Se ilumina en rojo favorablemente durante la ejecución. Sin gifs externos.</p></div>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
            <p className="text-[10px] font-bold">AGREGAR EJERCICIO MANUAL - IMAGEN AUTOMÁTICA</p>
            <div className="flex gap-2 mt-3">
              <input value={nuevo} onChange={e=>setNuevo(e.target.value)} placeholder="Ej: Curl biceps" className="flex-1 bg-black border border-zinc-800 rounded-xl p-3 text-sm" />
              <select value={musculoNuevo} onChange={e=>setMusculoNuevo(e.target.value)} className="bg-black border border-zinc-800 rounded-xl p-3 text-xs"><option>Pecho</option><option>Piernas</option><option>Brazos</option><option>Espalda</option><option>Hombros</option></select>
            </div>
            <button onClick={()=>{ if(nuevo){ setEjercicios([...ejercicios,{nombre:nuevo, musculo:musculoNuevo, peso:'0', reps:'0'}]); setNuevo('') } }} className="w-full bg-white text-black mt-3 py-3 rounded-xl font-black text-xs">+ GUARDAR Y VER ANIMACIÓN</button>
          </div>

          <button onClick={()=>{ if(ejActual<ejercicios.length-1){ setEjActual(ejActual+1); setSegundos(90)} else setVista('home') }} className="w-full bg-red-600 py-4 rounded-xl font-black">{ejActual<ejercicios.length-1?'SIGUIENTE →':'FINALIZAR'}</button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      <div className="flex justify-center pt-6"><img src="/logo.png" className="w-20 h-20 bg-white rounded-2xl p-2" /></div>
      <p className="font-black tracking-[0.3em] text-center mt-2 text-sm">FORZA GYM PRO</p>
      <div className="mx-4 mt-4 bg-[#ff4d2e] rounded-2xl p-4"><p className="font-black text-sm">HOY TE TOCA ENTRENAR PECHO + TRÍCEPS</p></div>
      <div className="mx-4 mt-6 bg-zinc-900 border border-red-600/30 rounded-2xl p-4 flex justify-between"><div><p className="font-bold text-sm">{ejercicios[0].nombre}</p><p className="text-xs text-zinc-400">{ejercicios.length} ejercicios</p></div><button onClick={()=>setVista('rutina')} className="bg-red-600 px-5 py-2 rounded-xl font-black text-xs">INICIAR</button></div>
      <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 flex justify-around py-3 text-[10px]"><button className="text-red-500 font-bold">Inicio</button><button onClick={()=>setVista('rutina')} className="text-zinc-500">Rutinas</button><button className="text-zinc-500">Tienda</button><button className="text-zinc-500">Admin</button></div>
    </div>
  )
}
