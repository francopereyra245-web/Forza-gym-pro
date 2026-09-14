import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

export default function App() {
  const [rutinas, setRutinas] = useState<any[]>([])

  useEffect(() => {
    supabase.from('rutinas_prearmadas').select('*').then(({ data }) => {
      if(data) setRutinas(data)
    })
  }, [])

  const hoy = rutinas[0]

  return (
    <div className="min-h-screen bg-[#111] text-white p-4 pb-24">
      <div className="flex justify-center items-center gap-3 py-4">
        <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center text-2xl">⚡</div>
        <h1 className="font-black text-2xl">FORZA<br/><span className="text-xs font-normal tracking-widest text-zinc-400">GYM PRO</span></h1>
      </div>

      <div className="bg-red-600 rounded-2xl p-5 mt-4">
        <p className="font-black text-xl">HOY TE TOCA ENTRENAR</p>
        <p className="font-black text-xl">{hoy?.Number || 'PECHO + TRICEPS'} ⚡</p>
      </div>

      <div className="mt-6">
        <h2 className="font-black italic">/ TU RUTINA DE HOY /</h2>
        <div className="mt-3 bg-zinc-900 border border-red-600 rounded-xl p-4 flex justify-between items-center">
          <div>
            <p className="font-bold">🏋️ {hoy?.Description || 'Press banca 4x10'}</p>
            <p className="text-sm text-zinc-400">{hoy?.Level || 'Nivel Principiante'}</p>
          </div>
          <button className="bg-red-600 px-5 py-2 rounded-lg font-black">INICIAR</button>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="font-black text-xl">🛍️ TIENDA</h2>
        <div className="grid grid-cols-3 gap-3 mt-3">
          <div className="bg-zinc-900 rounded-xl p-3 text-center border border-zinc-800">
            <div className="text-4xl">💊</div>
            <p className="font-black text-xs mt-2">WHEY 2KG</p>
            <p className="text-red-500 font-bold text-sm">$28.500</p>
            <button className="w-full bg-red-600 mt-2 py-2 rounded-lg text-xs font-black">COMPRAR</button>
          </div>
          <div className="bg-zinc-900 rounded-xl p-3 text-center border border-zinc-800">
            <div className="text-4xl">💊</div>
            <p className="font-black text-xs mt-2">CREATINA</p>
            <p className="text-red-500 font-bold text-sm">$8.200</p>
            <button className="w-full bg-red-600 mt-2 py-2 rounded-lg text-xs font-black">COMPRAR</button>
          </div>
          <div className="bg-zinc-900 rounded-xl p-3 text-center border border-zinc-800">
            <div className="text-4xl">⚡</div>
            <p className="font-black text-xs mt-2">PREWORK</p>
            <p className="text-red-500 font-bold text-sm">$12.900</p>
            <button className="w-full bg-red-600 mt-2 py-2 rounded-lg text-xs font-black">COMPRAR</button>
          </div>
        </div>
      </div>
    </div>
  )
}
