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

  const get = (r:any, keys:string[]) => {
    for(let k of keys) if(r[k]) return r[k]
    return ''
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-black">FORZA <span className="text-red-600">GYM PRO</span> ({rutinas.length})</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
        {rutinas.map((r:any)=>(
          <div key={r.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <span className="text-xs bg-white text-black px-3 py-1 rounded-full font-bold">
              {get(r, ['Level','level'])}
            </span>
            <h2 className="font-black text-lg mt-4">{get(r, ['Number','number'])}</h2>
            <p className="text-sm text-zinc-400 mt-2">{get(r, ['Description','description'])}</p>
          </div>
        ))}
      </div>

      {rutinas.length===0 && <p className="text-zinc-500 mt-10">No hay rutinas. Andá a Supabase y cargá más en la tabla.</p>}
    </div>
  )
}
