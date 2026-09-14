import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

type Rutina = {
  id: string
  Number: string
  Description: string
  Level: string
}

const LEVELS = [
  { key: 'all', label: 'TODAS', color: 'bg-white text-black' },
  { key: 'Beginner', label: 'BASE BLANCA', color: 'bg-white text-black border' },
  { key: 'Intermediate', label: 'BASE GRIS', color: 'bg-zinc-400 text-black' },
  { key: 'Advanced', label: 'BASE AZUL', color: 'bg-blue-600 text-white' },
  { key: 'Elite', label: 'BASE DORADA', color: 'bg-gradient-to-r from-yellow-400 to-amber-600 text-black' },
]

export default function App() {
  const [rutinas, setRutinas] = useState<Rutina[]>([])
  const [filtro, setFiltro] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const { data, error } = await supabase.from('rutinas_prearmadas').select('*')
      if (error) {
        console.error(error)
        alert('Error Supabase: ' + error.message)
      } else {
        setRutinas(data as any || [])
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  const filtradas = filtro === 'all' ? rutinas : rutinas.filter(r => r.Level === filtro)

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-zinc-800 p-6 flex justify-between items-center sticky top-0 bg-black/90 backdrop-blur">
        <h1 className="text-2xl font-black tracking-widest">FORZA <span className="text-red-600">GYM PRO</span></h1>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        <div className="flex flex-wrap gap-3 mb-8 mt-4">
          {LEVELS.map(l => (
            <button
              key={l.key}
              onClick={() => setFiltro(l.key)}
              className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all ${l.color} ${filtro === l.key ? 'ring-2 ring-red-600 scale-105' : 'opacity-70 hover:opacity-100'}`}
            >
              {l.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20 text-zinc-500 animate-pulse">Cargando rutinas desde Supabase...</div>
        ) : filtradas.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl mb-4">No hay rutinas con ese filtro.</p>
            <p className="text-zinc-500 text-sm">Tabla: rutinas_prearmadas | Registros totales: {rutinas.length}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtradas.map(r => (
              <div key={r.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-red-600/50 transition">
                <div className="flex justify-between items-start mb-4">
                  <span className={`text-[10px] px-2 py-1 rounded-full font-bold ${LEVELS.find(x=>x.key===r.Level)?.color}`}>
                    {LEVELS.find(x=>x.key===r.Level)?.label || r.Level}
                  </span>
                </div>
                <h3 className="font-black text-lg leading-tight mb-2">{r.Number}</h3>
                <p className="text-sm text-zinc-400 mb-4">{r.Description}</p>
                <div className="bg-black rounded-xl p-3 text-xs text-zinc-300">
                  <p className="font-bold text-white mb-1">Incluye:</p>
                  <p>✓ Remo con Banda, Press, Sentadilla</p>
                  <p className="mt-2 text-red-500 font-bold">→ VER RUTINA COMPLETA</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 p-6 bg-gradient-to-r from-red-600 to-red-900 rounded-2xl text-center">
          <h2 className="text-2xl font-black mb-2">¿LISTO PARA VENDER FORZA PRO?</h2>
          <p className="text-sm">Tu app ya está en: forza-gym-pro-f1y3.vercel.app</p>
        </div>
      </main>
    </div>
  )
}
