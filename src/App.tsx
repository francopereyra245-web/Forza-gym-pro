import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

export default function App() {
  const [rutinas, setRutinas] = useState<any[]>([])
  const [vista, setVista] = useState<'home' | 'rutina'>('home')
  const [ejercicioActual, setEjercicioActual] = useState(0)

  useEffect(() => {
    supabase.from('rutinas_prearmadas').select('*').then(({data})=>{ if(data) setRutinas(data) })
  }, [])

  const hoy = rutinas[0]
  // ejercicios ejemplo - después los sacamos de tu tabla
  const ejercicios = [
    { nombre: hoy?.Description || 'Press de banca - 4x10', series: '4x10', descanso: '90s', img: '🏋️' },
    { nombre: 'Aperturas con mancuernas - 3x12', series: '3x12', descanso: '60s', img: '💪' },
    { nombre: 'Fondos en paralelas - 3x15', series: '3x15', descanso: '90s', img: '🔥' },
  ]

  if (vista === 'rutina') {
    const ej = ejercicios[ejercicioActual]
    return (
      <div className="min-h-screen bg-black text-white p-4 pb-24">
        <button onClick={()=>setVista('home')} className="text-zinc-400 mb-4">← Volver</button>
        <div className="text-center mt-2">
          <div className="text-8xl">{ej.img}</div>
          <h2 className="font-black text-2xl mt-4">{ej.nombre}</h2>
          <p className="text-red-500 font-bold text-xl mt-2">{ej.series} | Descanso {ej.descanso}</p>

          <div className="mt-8 bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
            <p className="text-5xl font-black">00:42</p>
            <p className="text-zinc-400 text-sm mt-1">TIEMPO DE DESCANSO</p>
          </div>

          <button
            onClick={()=> { if(ejercicioActual < ejercicios.length-1) setEjercicioActual(ejercicioActual+1); else setVista('home') }}
            className="w-full bg-red-600 mt-8 py-4 rounded-xl font-black text-lg"
          >
            {ejercicioActual < ejercicios.length-1? 'SIGUIENTE EJERCICIO →' : '¡TERMINAR RUTINA! 🏆'}
          </button>

          <div className="flex gap-2 justify-center mt-4">
            {ejercicios.map((_,i)=>(<div key={i} className={`h-2 w-8 rounded ${i===ejercicioActual? 'bg-red-600' : 'bg-zinc-700'}`} />))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-24">
      <div className="flex justify-center pt-5 pb-2">
        <img src="/logo.png" alt="FORZA" className="w-24 h-24 object-contain" />
      </div>

      <div className="mx-4 bg-gradient-to-r from-red-700 to-red-500 rounded-2xl p-4 flex gap-3 items-center">
        <span className="text-xl">🔔</span>
        <div>
          <p className="font-black text-[15px] leading-4">HOY TE TOCA ENTRENAR</p>
          <p className="font-black text-[15px] leading-4">{hoy?.Number || 'PECHO + TRICEPS'} ⚡</p>
        </div>
      </div>

      <div className="mx-4 mt-6">
        <h2 className="font-black italic text-sm">\ TU RUTINA DE HOY /</h2>
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
        <div className="text-red-500 font-bold text-center">🏠<br/>Inicio</div>
        <div className="text-zinc-500 text-center">🏋️<br/>Rutinas</div>
        <div className="text-zinc-500 text-center">🛍️<br/>Tienda</div>
        <div className="text-zinc-500 text-center">🛒<br/>Carrito</div>
        <div className="text-zinc-500 text-center">👤<br/>Perfil</div>
      </div>
    </div>
  )
}
