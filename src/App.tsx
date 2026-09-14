import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

const TIENDA = [
  { id: 1, nombre: "WHEY PROTEIN\n2KG", precio: "$28.500 ARS", img: "https://i.imgur.com/8Km9tLL.png" },
  { id: 2, nombre: "CREATINA\nMONOHIDRATADA\n300g", precio: "$8.200 ARS", img: "https://i.imgur.com/8Km9tLL.png" },
  { id: 3, nombre: "PREWORKOUT\nFRUIT PUNCH", precio: "$12.900 ARS", img: "https://i.imgur.com/8Km9tLL.png" },
]

export default function App() {
  const [rutinas, setRutinas] = useState<any[]>([])

  useEffect(() => {
    supabase.from('rutinas_prearmadas').select('*').then(({ data }) => {
      if(data) setRutinas(data)
    })
  }, [])

  const hoy = rutinas[0]

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white pb-24 font-sans">
      {/* HEADER */}
      <div className="flex items-center justify-center p-5">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center text-2xl">⚡</div>
          <h1 className="text-3xl font-black leading-none">FORZA<br/><span className="text-sm font-normal tracking-[0.3em] text-zinc-400">gym pro</span></h1>
        </div>
      </div>

      {/* BANNER ROJO */}
      <div className="mx-4 bg-gradient-to-r from-red-700 to-red-500 rounded-2xl p-5 flex items-center gap-4">
        <span className="text-3xl">🔔</span>
        <div>
          <p className="font-black text-[22px] leading-6">HOY TE TOCA ENTRENAR</p>
          <p className="font-black text-[22px] leading-6">{hoy?.Number || "PECHO + TRICEPS"} ⚡</p>
        </div>
      </div>

      {/* TU RUTINA DE HOY */}
      <div className="mx-4 mt-6">
        <h2 className="font-black text-xl italic">\ TU RUTINA DE HOY /</h2>
        <div className="mt-3 border border-red-600/60 rounded-xl p-4 flex justify-between items-center bg-zinc-900">
          <div>
            <p className="font-bold flex gap-2">🏋️ {hoy?.Description?.slice(0,30) || "Press de banca - 4x10"}</p>
            <p className="text-sm text-zinc-400 ml-8">{hoy? hoy.Level : "Extensión tríceps cuerda - 3x12"}</p>
          </div>
          <button className="bg-red-600 px-6 py-2 rounded-lg font-black text-sm">INICIAR</button>
        </div>
      </div>

      {/* TIENDA */}
      <div className="mx-4 mt-8">
        <div className="flex justify-between items-center">
          <h2 className="font-black text-xl flex gap-2">🛍️ TIENDA</h2>
          <span className="text-red-500 text-sm">Ver todo {'>'}</span>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-4">
          {TIENDA.map(p=>(
            <div key={p.id} className="bg-zinc-900 rounded-2xl p-3 text-center border border-zinc-800">
              <img src={p.img} className="h-20 mx-auto object-contain"/>
              <p className="font-black text-[11px] mt-3 whitespace-pre-line leading-3">{p.nombre}</p>
              <p className="text-red-500 font-black text-sm mt-2">{p.precio}</p>
              <div className="bg-[#fff3a1] text-[9px] text-black rounded-full px-2 py-1 mt-2 font-bold">mercado pago</div>
              <button className="w-full bg-red-600 mt-2 py-2 rounded-lg font-black text-xs">COMPRAR</button>
            </div>
          ))}
        </div>
      </div>

      {/* PAGO RAPIDO */}
      <div className="mx-4 mt-8">
        <h2 className="font-black text-xl">PAGO RÁPIDO</h2>
        <div className="flex gap-3 mt-3">
          <div className="flex-1 bg-[#009ee3] rounded-full py-3 px-4 font-black text-sm flex items-center gap-2">
            <span className="bg-white rounded-full p-1">🤝</span> Pagar con<br/>Mercado Pago
          </div>
          <div className="flex-1 border border-zinc-600 rounded-full py-3 px-4 font-bold text-sm flex items-center justify-center gap-2">
            ◎ Escanea QR
          </div>
        </div>
      </div>

      {/* BOTTOM NAV */}
      <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 flex justify-around py-3">
        <div className="text-red-500 text-center text-[11px] font-bold">🏠<br/>Inicio</div>
        <div className="text-zinc-500 text-center text-[11px]">🏋️<br/>Rutinas</div>
        <div className="text-zinc-500 text-center text-[11px]">🗄️<br/>Tienda</div>
        <div className="text-zinc-500 text-center text-[11px]">🛒<br/>Carrito</div>
        <div className="text-zinc-500 text-center text-[11px]">👤<br/>Perfil</div>
      </div>
    </div>
  )
}
