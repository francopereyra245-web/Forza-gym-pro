import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

export default function App() {
  const [rutinas, setRutinas] = useState<any[]>([])
  const [vista, setVista] = useState<'home' | 'rutina' | 'progreso'>('home')
  const [ejercicioActual, setEjercicioActual] = useState(0)
  const [segundos, setSegundos] = useState(90)
  const [pesos, setPesos] = useState<{[key:number]: string}>({})
  const [reps, setReps] = useState<{[key:number]: string}>({})
  const [checks, setChecks] = useState<{[key:number]: boolean}>({})

  useEffect(() => {
    supabase.from('rutinas_prearmadas').select('*').then(({data})=>{ if(data) setRutinas(data) })
  }, [])

  // Timer que baja solo
  useEffect(() => {
    if (vista!== 'rutina') return
    if (segundos === 0) {
      if ('vibrate' in navigator) navigator.vibrate(200)
      return
    }
    const id = setInterval(() => setSegundos(s => s - 1), 1000)
    return () => clearInterval(id)
  }, [vista, segundos])

  useEffect(() => { setSegundos(90) }, [ejercicioActual])

  const hoy = rutinas[0]
  const ejercicios = [
    { nombre: hoy?.Description || 'Press de banca - 4x10', series: '4x10', descanso: '90s', img: '🏋️' },
    { nombre: 'Aperturas con mancuernas - 3x12', series: '3x12', descanso: '60s', img: '💪' },
    { nombre: 'Fondos en paralelas - 3x15', series: '3x15', descanso: '90s', img: '🔥' },
  ]

  // VISTA RUTINA DETALLE
  if (vista === 'rutina') {
    const ej = ejercicios[ejercicioActual]
    return (
      <div className="min-h-screen bg-black text-white p-4 pb-24">
        <div className="flex justify-between items-center">
          <button onClick={()=>setVista('home')} className="text-zinc-400">← Volver</button>
          <a href="https://wa.me/5491123201025" target="_blank" className="bg-green-600 px-3 py-1 rounded-full text-xs font-bold">WHATSAPP</a>
        </div>

        <div className="text-center mt-4">
          <div className="text-7xl">{ej.img}</div>
          <h2 className="font-black text-xl mt-3">{ej.nombre}</h2>
          <p className="text-red-500 font-bold mt-1">{ej.series} | Descanso {ej.descanso}</p>

          <div className="mt-6 bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
            <p className="text-5xl font-black">00:{String(segundos).padStart(2,'0')}</p>
            <p className="text-zinc-400 text-xs mt-1">TIEMPO DE DESCANSO</p>
            <div className="flex gap-2 mt-4 justify-center">
              <button onClick={()=>setSegundos(30)} className="bg-zinc-800 px-3 py-1 rounded text-xs">30s</button>
              <button onClick={()=>setSegundos(60)} className="bg-zinc-800 px-3 py-1 rounded text-xs">60s</button>
              <button onClick={()=>setSegundos(90)} className="bg-red-600 px-3 py-1 rounded text-xs font-bold">90s</button>
            </div>
          </div>

          <div className="mt-6 bg-zinc-900 rounded-xl p-4 border border-zinc-800 text-left">
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="text-[10px] text-zinc-500">PESO KG</label>
                <input value={pesos[ejercicioActual]||''} onChange={e=>setPesos({...pesos, [ejercicioActual]: e.target.value})} placeholder="80" className="w-full bg-black border border-zinc-700 rounded-lg p-2 mt-1 text-center font-bold" />
              </div>
              <div className="flex-1">
                <label className="text-[10px] text-zinc-500">REPS HECHAS</label>
                <input value={reps[ejercicioActual]||''} onChange={e=>setReps({...reps, [ejercicioActual]: e.target.value})} placeholder="10" className="w-full bg-black border border-zinc-700 rounded-lg p-2 mt-1 text-center font-bold" />
              </div>
              <div className="flex items-end">
                <button onClick={()=>setChecks({...checks, [ejercicioActual]:!checks[ejercicioActual]})} className={`w-12 h-12 rounded-lg font-black text-xl ${checks[ejercicioActual]? 'bg-green-600' : 'bg-zinc-800'}`}>✓</button>
              </div>
            </div>
          </div>

          <button
            onClick={()=> {
              if(ejercicioActual < ejercicios.length-1) setEjercicioActual(ejercicioActual+1)
              else { alert('¡Rutina guardada! 🏆'); setVista('progreso') }
            }}
            className="w-full bg-red-600 mt-6 py-4 rounded-xl font-black text-lg"
          >
            {ejercicioActual < ejercicios.length-1? 'SIGUIENTE EJERCICIO →' : 'FINALIZAR ENTRENO 🏆'}
          </button>

          <div className="flex gap-2 justify-center mt-4">
            {ejercicios.map((_,i)=>(<div key={i} className={`h-2 w-8 rounded ${i===ejercicioActual? 'bg-red-600' : 'bg-zinc-700'}`} />))}
          </div>
        </div>
      </div>
    )
  }

  // VISTA PROGRESO
  if (vista === 'progreso') {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white p-4 pb-24">
        <button onClick={()=>setVista('home')} className="text-zinc-400">← Volver</button>
        <h1 className="font-black text-xl mt-3">PROGRESO 📊</h1>

        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800"><p className="text-[10px] text-zinc-500">ENTRENAMIENTOS MES</p><p className="text-2xl font-black mt-1">12</p></div>
          <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800"><p className="text-[10px] text-zinc-500">RACHA</p><p className="text-2xl font-black mt-1 text-red-500">5 días 🔥</p></div>
        </div>

        <div className="mt-6 bg-zinc-900 rounded-xl p-4 border border-zinc-800">
          <p className="font-bold text-sm">CALENDARIO</p>
          <div className="grid grid-cols-7 gap-2 mt-3 text-center text-xs">
            {[...Array(30)].map((_,i)=><div key={i} className={`p-2 rounded ${[1,2,4,5,8,12,15].includes(i)? 'bg-red-600 font-bold' : 'bg-zinc-800'}`}>{i+1}</div>)}
          </div>
        </div>

        <div className="mt-6 bg-zinc-900 rounded-xl p-4 border border-zinc-800">
          <p className="font-bold text-sm">MI EVOLUCIÓN</p>
          <button className="w-full bg-white text-black mt-3 py-3 rounded-xl font-black text-sm">+ AGREGAR FOTO</button>
          <div className="mt-3 flex gap-2">
            <div className="flex-1 bg-zinc-800 h-32 rounded-lg flex items-center justify-center text-3xl">📷</div>
            <div className="flex-1 bg-zinc-800 h-32 rounded-lg flex items-center justify-center text-3xl">📷</div>
          </div>
          <div className="mt-4">
            <label className="text-[10px] text-zinc-500">PESO CORPORAL KG</label>
            <input placeholder="78.5" className="w-full bg-black border border-zinc-700 rounded-lg p-3 mt-1 font-bold" />
          </div>
        </div>
      </div>
    )
  }

  // VISTA HOME
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-24">
      <div className="flex justify-between items-center px-4 pt-5 pb-2">
        <a href="https://wa.me/5491123201025" target="_blank" className="text-xs bg-green-600 px-3 py-1 rounded-full font-bold">WhatsApp</a>
        <img src="/logo.png" alt="FORZA" className="w-20 h-20 object-contain" />
        <div className="w-[72px]"></div>
      </div>

      <div className="mx-4 bg-gradient-to-r from-red-700 to-red-500 rounded-2xl p-4 flex gap-3 items-center">
        <span className="text-xl">🔔</span>
        <div>
          <p className="font-black text-[15px] leading-4">HOY TE TOCA ENTRENAR</p>
          <p className="font-black text-[15px] leading-4">{hoy?.Number || 'PECHO + TRICEPS'} ⚡</p>
        </div>
      </div>

      <div className="mx-4 mt-6">
        <div className="flex justify-between items-center">
          <h2 className="font-black italic text-sm">\ TU RUTINA DE HOY /</h2>
          <div className="flex gap-1">
            <span className="text-[9px] bg-zinc-800 px-2 py-1 rounded">Principiante</span>
            <span className="text-[9px] bg-zinc-800 px-2 py-1 rounded">Intermedio</span>
            <span className="text-[9px] bg-red-600 px-2 py-1 rounded">Avanzado</span>
          </div>
        </div>
        <div className="mt-3 bg-zinc-900 border border-red-600/50 rounded-xl p-4 flex justify-between items-center">
          <div>
            <p className="font-bold text-sm">🏋️ {hoy?.Description?.slice(0,25) || 'Press de banca - 4x10'}</p>
            <p className="text-xs text-zinc-400 mt-1">{hoy?.Level || 'Principiante'}</p>
          </div>
          <button onClick={()=>setVista('rutina')} className="bg-red-600 px-5 py-2 rounded-lg font-black text-xs">INICIAR</button>
        </div>
      </div>

      <div className="mx-4 mt-8">
        <div className="flex justify-between"><h2 className="font-black text-sm">🛍️ TIENDA</h2><span className="text-red-500 text-[11px]">Ver todo {'>'}</span></div>
        <div className="grid grid-cols-3 gap-2 mt-3">
          <div className="bg-zinc-900 rounded-2xl p-3 text-center border border-zinc-800"><div className="text-2xl">🥤</div><p className="font-black text-[9px] mt-2">WHEY 2KG</p><p className="text-red-500 font-bold text-xs mt-1">$28.500</p><button className="w-full bg-white text-black mt-2 py-2 rounded-lg text-[9px] font-black">COMPRAR</button></div>
          <div className="bg-zinc-900 rounded-2xl p-3 text-center border border-zinc-800"><div className="text-2xl">💊</div><p className="font-black text-[9px] mt-2">CREATINA 300g</p><p className="text-red-500 font-bold text-xs mt-1">$8.200</p><button className="w-full bg-white text-black mt-2 py-2 rounded-lg text-[9px] font-black">COMPRAR</button></div>
          <div className="bg-zinc-900 rounded-2xl p-3 text-center border border-zinc-800"><div className="text-2xl">⚡</div><p className="font-black text-[9px] mt-2">PREWORK</p><p className="text-red-500 font-bold text-xs mt-1">$12.900</p><button className="w-full bg-white text-black mt-2 py-2 rounded-lg text-[9px] font-black">COMPRAR</button></div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 flex justify-around py-3 text-[10px]">
        <button onClick={()=>setVista('home')} className="text-red-500 font-bold text-center">🏠<br/>Inicio</button>
        <button onClick={()=>setVista('rutina')} className="text-zinc-500 text-center">🏋️<br/>Rutinas</button>
        <button onClick={()=>setVista('progreso')} className="text-zinc-500 text-center">📊<br/>Progreso</button>
        <div className="text-zinc-500 text-center">🛍️<br/>Tienda</div>
        <div className="text-zinc-500 text-center">👤<br/>Perfil</div>
      </div>
    </div>
  )
}
