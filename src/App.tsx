import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://siuxeqradhojnnuoorrx.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpdXhlcXJhZGhvam5udW9vcnJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNjQzMTIsImV4cCI6MjA2OTk0MDMxMn0.YT5a2t9H5_qYHhBz9O0K1Q2w3E4R5T6Y7U8I9O0P1A2S3Q'
const supabase = createClient(supabaseUrl, supabaseKey)

export default function App() {
  const [rutinas, setRutinas] = useState<any[]>([])
  const [ejercicios, setEjercicios] = useState<any[]>([])
  const [tab, setTab] = useState('rutinas')

  useEffect(() => {
    supabase.from('rutinas_prearmadas').select('*').then(({ data }) => {
      if (data) setRutinas(data)
    })
    supabase.from('ejercicios').select('*').then(({ data }) => {
      if (data) setEjercicios(data)
    })
  }, [])

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white p-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center font-black text-xl">F</div>
        <h1 className="font-black text-xl">FORZA <span className="text-red-500">GYM PRO</span></h1>
        <span className="ml-auto text-[10px] px-2 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">● LIVE {rutinas.length}</span>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        <button onClick={() => setTab('rutinas')} className={`px-4 py-2 rounded-full text-xs font-black whitespace-nowrap ${tab === 'rutinas'? 'bg-red-600' : 'bg-white/10'}`}>RUTINAS</button>
        <button onClick={() => setTab('precal')} className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap ${tab === 'precal'? 'bg-red-600' : 'bg-white/10'}`}>PRECALENT</button>
        <button onClick={() => setTab('rehab')} className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap ${tab === 'rehab'? 'bg-red-600' : 'bg-white/10'}`}>REHAB</button>
      </div>

      {tab === 'rutinas' && (
        <div className="grid gap-3">
          {rutinas.map((r, i) => (
            <div key={i} className="bg-white/[0.06] border border-white/10 rounded-2xl p-4">
              <div className="flex gap-2">
                <span className="text-[10px] px-2 py-1 rounded-full bg-red-500/20 text-red-400">{r.nivel || 'PRO'}</span>
                <span className="text-[10px] opacity-50">{r.dias || r.dia}</span>
              </div>
              <h3 className="font-black mt-2">{r.nombre}</h3>
              <p className="text-xs opacity-60 mt-1">{r.descripcion || 'Rutina FORZA'}</p>
            </div>
          ))}
          {rutinas.length === 0 && <p className="text-xs opacity-50 text-center mt-10">Cargando desde Supabase...</p>}
        </div>
      )}

      {tab === 'precal' && (
        <div className="grid gap-2">
          {ejercicios.filter((e) => e.categoria === 'precalentamiento').map((e, i) => (
            <div key={i} className="bg-white/5 p-3 rounded-xl flex justify-between"><span className="text-sm font-bold">{e.nombre}</span><span>🔥</span></div>
          ))}
        </div>
      )}

      {tab === 'rehab' && (
        <div className="grid gap-2">
          {ejercicios.filter((e) => e.categoria === 'rehabilitacion').map((e, i) => (
            <div key={i} className="bg-white/5 p-3 rounded-xl flex justify-between"><span className="text-sm font-bold">{e.nombre}</span><span>🩹</span></div>
          ))}
        </div>
      )}
    </div>
  )
}
