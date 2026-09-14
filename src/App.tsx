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
      if (data) setRutinas(data)
    })
  }, [])

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-black">FORZA <span className="text-red-600">GYM PRO</span></h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
        {rutinas.map((r:any)=>(
          <div key={r.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <span className="text-xs bg-white text-black px-3 py-1 rounded-full font-bold">
              {r.Level || r.level}
            </span>
            <h2 className="font-black text-lg mt-4">{r.Number || r.number}</h2>
            <p className="text-sm text-zinc-400 mt-2">{r.Description || r.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
