import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

export default function App() {
  const [rutinas, setRutinas] = useState<any[]>([])

  useEffect(() => {
    supabase.from('rutinas_prearmadas').select('*').then(({ data, error }) => {
      if (error) alert(error.message)
      else setRutinas(data || [])
    })
  }, [])

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-black">FORZA <span className="text-red-600">GYM PRO</span> ({rutinas.length})</h1>
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        {rutinas.map((r:any)=>(
          <div key={r.id} className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
            <h2 className="font-bold">{r.Number}</h2>
            <p className="text-sm text-zinc-400">{r.Description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
