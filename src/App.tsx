import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

export default function App() {
  const [rutinas, setRutinas] = useState<any[]>([])
  useEffect(() => {
    supabase.from('rutinas_prearmadas').select('*').then(({data})=>{ if(data) setRutinas(data) })
  }, [])
  const hoy = rutinas[0]

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-24">
      {/* LOGO OFICIAL */}
      <div className="flex flex-col items-center pt-6 pb-2">
        <img src="/logo.png" alt="FORZA" className="w-28 h-28 object-contain" />
        <h1 className="font-black text-3xl tracking-tight mt-2">FOR<span className="text-red-600">ZA</span></h1>
        <p className="text-xs tracking-[0.4em] text-zinc-400 -mt-1">gym pro</p>
      </div>

      <div className="mx-4 mt-4 bg-gradient-to-r from-red-700 to-red-500 rounded-2xl p-5 flex gap-3 items-center">
        <span className="text-2xl">🔔</span>
        <div>
          <p className="font-black text-lg leading-5">HOY TE TOCA ENTRENAR</p>
          <p className="font-black text-lg leading-5">{hoy?.Number || 'PECHO + TRICEPS'} ⚡</p>
        </div>
      </div>

      <div className="mx-4 mt-6">
        <h2 className="font-black italic">\ TU RUTINA DE HOY /</h2>
        <div className="mt-3 bg-zinc-900 border border-red-600/50 rounded-xl p-4 flex justify-between items-center">
          <div>
            <p className="font-bold">🏋️ {hoy?.Description?.slice(0,25) || 'Press de banca - 4x10'}</p>
            <p className="text-xs text-zinc-400 mt-1">{hoy?.Level || 'Principiante'}</p>
          </div>
          <button className="bg-red-600 px-6 py-2 rounded-lg font-black text-sm">INICIAR</button>
        </div>
      </div>

      <div className="mx-4 mt-8">
        <div className="flex justify-between"><h2 className="font-black">🛍️ TIENDA</h2><span className="text-red-500 text-xs">Ver todo &gt;</span></div>
        <div className="grid grid-cols-3 gap-3 mt-3">
          <div className="bg-zinc-900 rounded-2xl p-3 text-center border border-zinc-800">
            <div className="text-3xl">🥤</div><p className="font-black text-[10px] mt-2">WHEY 2KG</p><p className="text-red-500 font-bold text-xs mt-1">$28.500</p>
            <button className="w-full bg-white text-black mt-2 py-1.5 rounded-lg text-[10px] font-black">COMPRAR</button>
          </div>
          <div className="bg-zinc-900 rounded-2xl p-3 text-center border border-zinc-800">
            <div className="text-3xl">💊</div><p className="font-black text-[10px] mt-2">CREATINA 300g</p><p className="text-red-500 font-bold text-xs mt-1">$8.200</p>
            <button className="w-full bg-white text-black mt-2 py-1.5 rounded-lg text-[10px] font-black">COMPRAR</button>
          </div>
          <div className="bg-zinc-900 rounded-2xl p-3 text-center border border-zinc-800">
            <div className="text-3xl">⚡</div><p className="font-black text-[10px] mt-2">PREWORK</p><p className="text-red-500 font-bold text-xs mt-1">$12.900</p>
            <button className="w-full bg-white text-black mt-2 py-1.5 rounded-lg text-[10px] font-black">COMPRAR</button>
          </div>
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
