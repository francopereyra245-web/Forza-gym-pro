import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'

const supabaseUrl = 'https://siuxeqradhojnnuoorrx.supabase.co'
// PEGA ACA ABAJO TU KEY QUE COPIASTE DE SUPABASE
const supabaseAnonKey = 'sb_publishable_TPm9pkKGm05SBBzXTivilg_PyAiU... PEGÁ TU KEY COMPLETA ACÁ' 

const supabase = createClient(supabaseUrl, supabaseAnonKey)

function App() {
  const [rutinas, setRutinas] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRutinas = async () => {
      const { data, error } = await supabase.from('rutinas').select('*')
      if (error) {
        console.error(error)
      } else {
        setRutinas(data)
      }
      setLoading(false)
    }
    fetchRutinas()
  }, [])

  if (loading) return <div style={{padding: 20}}>Cargando FORZA GYM PRO...</div>

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif', background: '#111', color: 'white', minHeight: '100vh' }}>
      <h1>FORZA GYM PRO 💪</h1>
      <p>Conectado a Supabase correctamente</p>
      
      <h2 style={{marginTop: 20}}>Rutinas:</h2>
      {rutinas.length === 0 ? <p>No hay rutinas aún. Crealas en Supabase.</p> : null}
      {rutinas.map((r) => (
        <div key={r.id} style={{ background: '#222', padding: 15, marginBottom: 10, borderRadius: 10 }}>
          <strong>{r.nombre}</strong> - {r.duracion_total || 0} min
        </div>
      ))}
    </div>
  )
}

export default App
