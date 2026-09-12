import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"

// CONFIGURACION SUPABASE
const supabaseUrl = 'https://siuxeqradhojnuuoorrx.supabase.co'
const supabaseKey = 'sb_publishable_TPm9pkKGm05SBBzXTivilg_PyAiUDxZ' // <-- PEGÁ ACÁ TU KEY COMPLETA DE SUPABASE (API Keys -> anon public eyJ...)

const supabase = createClient(supabaseUrl, supabaseKey)

export default function App() {
  const [rutinas, setRutinas] = useState<any[]>([])
  const [ejercicios, setEjercicios] = useState<any[]>([])
  const [tab, setTab] = useState('rutinas')
  const [seleccionada, setSeleccionada] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function cargar() {
      setLoading(true)
      const { data: dataRutinas, error: errRutinas } = await supabase
        .from('rutinas_prearmadas')
        .select('*')
      
      if (errRutinas) console.log('Error rutinas:', errRutinas)
      else if (dataRutinas) setRutinas(dataRutinas)

      const { data: dataEj, error: errEj } = await supabase
        .from('ejercicios')
        .select('*')
      
      if (errEj) console.log('Error ejercicios:', errEj)
      else if (dataEj) setEjercicios(dataEj)
      
      setLoading(false)
    }
    cargar()
  }, [])

  const ejerciciosDeRutina = seleccionada 
    ? ejercicios.filter((e: any) => e.rutina_id === seleccionada.id || e.rutina_prearmada_id === seleccionada.id)
    : []

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', color: 'white', fontFamily: 'Arial', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', fontSize: '28px', fontWeight: 'bold' }}>FORZA GYM PRO 💪</h1>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', margin: '20px 0' }}>
        <button onClick={() => {setTab('rutinas'); setSeleccionada(null)}} style={{ padding: '10px 20px', background: tab === 'rutinas' ? '#ff4500' : '#333', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer' }}>RUTINAS</button>
        <button onClick={() => {setTab('ejercicios'); setSeleccionada(null)}} style={{ padding: '10px 20px', background: tab === 'ejercicios' ? '#ff4500' : '#333', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer' }}>EJERCICIOS</button>
      </div>

      {loading && <p style={{ textAlign: 'center' }}>Cargando...</p>}

      {!loading && !seleccionada && tab === 'rutinas' && (
        <div style={{ display: 'grid', gap: '15px', maxWidth: '600px', margin: '0 auto' }}>
          {rutinas.length === 0 && <p style={{textAlign:'center'}}>No hay rutinas. Revisá Supabase Table Editor.</p>}
          {rutinas.map((r: any) => (
            <div key={r.id} onClick={() => setSeleccionada(r)} style={{ background: '#1e1e1e', padding: '15px', borderRadius: '12px', cursor: 'pointer', border: '1px solid #333' }}>
              <h3 style={{ margin: 0, color: '#ff4500' }}>{r.nombre || r.titulo}</h3>
              <p style={{ margin: '5px 0 0', opacity: 0.7 }}>{r.descripcion || r.objetivo || 'Sin descripción'}</p>
              <p style={{ margin: '5px 0 0', fontSize: '12px', opacity: 0.5 }}>Nivel: {r.nivel || 'General'}</p>
            </div>
          ))}
        </div>
      )}

      {!loading && !seleccionada && tab === 'ejercicios' && (
        <div style={{ display: 'grid', gap: '10px', maxWidth: '600px', margin: '0 auto' }}>
          {ejercicios.map((e: any) => (
            <div key={e.id} style={{ background: '#1e1e1e', padding: '12px', borderRadius: '10px' }}>
              <strong>{e.nombre}</strong> - <span style={{opacity:0.7}}>{e.grupo_muscular || e.musculo}</span>
              <p style={{fontSize:'13px', opacity:0.6}}>{e.descripcion}</p>
            </div>
          ))}
        </div>
      )}

      {seleccionada && (
        <div style={{ maxWidth: '600px', margin: '0 auto', background: '#1e1e1e', padding: '20px', borderRadius: '12px' }}>
          <button onClick={() => setSeleccionada(null)} style={{ background: '#333', color: 'white', border: 'none', padding: '5px 15px', borderRadius: '6px', cursor: 'pointer', marginBottom: '15px' }}>← Volver</button>
          <h2 style={{ color: '#ff4500' }}>{seleccionada.nombre}</h2>
          <p>{seleccionada.descripcion}</p>
          <h3 style={{ marginTop: '20px' }}>Ejercicios de esta rutina ({ejerciciosDeRutina.length})</h3>
          {ejerciciosDeRutina.length === 0 ? <p style={{opacity:0.6}}>Esta rutina no tiene ejercicios vinculados por rutina_id. Mostrando todos.</p> : null}
          {(ejerciciosDeRutina.length > 0 ? ejerciciosDeRutina : ejercicios).map((e: any) => (
            <div key={e.id} style={{ background: '#2a2a2a', padding: '10px', borderRadius: '8px', marginTop: '8px' }}>
              <strong>{e.nombre}</strong> - {e.series || '3'}x{e.repeticiones || '12'} - Desc: {e.descanso_seg || 60}seg
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
