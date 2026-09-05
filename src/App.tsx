import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://siuxeqradhojnnuoorrx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpdXhlcXJhZGhvam5udW9vcnJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNjQzMTIsImV4cCI6MjA2OTk0MDMxMn0.YT5a2t9H5_qYHhBz9O0K1Q2w3E4R5T6Y7U8I9O0P1A2S'
)

export default function App() {
  const [rutinas, setRutinas] = useState<any[]>([])
  const [ejercicios, setEjercicios] = useState<any[]>([])
  const [tab, setTab] = useState('rutinas')
  const [timer, setTimer] = useState(90)

  useEffect(()=>{
    supabase.from('rutinas_prearmadas').select('*').then(({data})=> data && setRutinas(data))
    supabase.from('ejercicios').select('*').then(({data})=> data && setEjercicios(data))
  },[])

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white p-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center font-black">F</div>
        <h1 className="font-black text-xl">FORZA <span className="text-red-500">GYM PRO</span></h1>
        <span className="ml-auto text-[10px] px-2 py-1 rounded-full bg-green-500/20 text-green-400">● LIVE</span>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto">
        {['rutinas','precalentamiento','rehabilitacion','atletismo'].map(t=>(
          <button key={t} onClick={()=>setTab(t)} className={`px-4 py-2 rounded-full text-xs font-bold capitalize ${tab===t?'bg-red-600':'bg-white/10'}`}>{t}</button>
        ))}
      </div>

      {tab==='rutinas' && <div className="grid gap-3">
        {rutinas.map((r,i)=>(
          <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <span className="text-[10px] px-2 py-1 rounded-full bg-red-500/20 text-red-400">{r.nivel}</span>
            <h3 className="font-black mt-2">{r.nombre}</h3>
            <p className="text-xs opacity-60 mt-1">{r.dias || r.dia}</p>
          </div>
        ))}
      </div>}

      {tab==='precalentamiento' && <div className="grid gap-2">
        {ejercicios.filter(e=>e.categoria==='precalentamiento').map((e,i)=><div key={i} className="bg-white/5 p-3 rounded-xl flex justify-between"><span className="text-sm font-bold">{e.nombre}</span><span>🔥</span></div>)}
      </div>}

      {tab==='rehabilitacion' && <div className="grid gap-2">
        {ejercicios.filter(e=>e.categoria==='rehabilitacion').map((e,i)=><div key={i} className="bg-white/5 p-3 rounded-xl flex justify-between"><span className="text-sm font-bold">{e.nombre}</span><span>🩹</span></div>)}
      </div>}

      {tab==='atletismo' && <div className="bg-white/5 p-5 rounded-2xl text-center">
        <div className="text-6xl font-black">{Math.floor(timer/60)}:{String(timer%60).padStart(2,'0')}</div>
        <button onClick={()=>setTimer(90)} className="mt-4 w-full bg-red-600 py-3 rounded-xl font-black">TIMER 1:30 DESCANSO</button>
      </div>}
    </div>
  )
}
