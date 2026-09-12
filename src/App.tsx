import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  'https://siuxeqradhojnuuoorrx.supabase.co',
  sb_publishable_TPm9pkKGm05SBBzXTivilg_PyAiUDxZ
)

export default function App(){
  const [rutinas, setRutinas] = useState<any>([])
  const [ejercicios, setEjercicios] = useState<any>([])
  const [tab, setTab] = useState('rutinas')
  const [seleccionada, setSeleccionada] = useState<any>(null)
  const [detalle, setDetalle] = useState<any>([])

  useEffect(() => {
    supabase.from('rutinas_prearmadas').select('*').then(({ data }) => { if(data) setRutinas(data) })
    supabase.from('ejercicios').select('*').then(({ data }) => { if(data) setEjercicios(data) })
  }, [])

  const verRutina = async (rutina: any) => {
    setSeleccionada(rutina)
    const { data } = await supabase.from('ejercicios').select('*').eq('rutina_id', rutina.id)
    setDetalle(data || [])
    setTab('detalle')
  }

  return (
    <div style={{background:'#111', color:'white', minHeight:'100vh', padding:20, fontFamily:'sans-serif'}}>
      <h1 style={{fontSize:28, fontWeight:'bold'}}>FORZA GYM PRO 💪</h1>
      
      {tab === 'rutinas' && (
        <div>
          <h2>Rutinas Prearmadas</h2>
          {rutinas.map((r:any) => (
            <div key={r.id} onClick={()=>verRutina(r)} style={{background:'#222', padding:15, borderRadius:12, marginBottom:10, cursor:'pointer'}}>
              <b>{r.nombre}</b><br/>
              <small>{r.objetivo} - {r.duracion_total || 60} min</small>
            </div>
          ))}
        </div>
      )}

      {tab === 'detalle' && seleccionada && (
        <div>
          <button onClick={()=>setTab('rutinas')} style={{marginBottom:15}}>← Volver</button>
          <h2>{seleccionada.nombre}</h2>
          <p>{seleccionada.descripcion}</p>
          <h3>Ejercicios ({detalle.length})</h3>
          {detalle.map((e:any)=>(
            <div key={e.id} style={{background:'#222', padding:12, borderRadius:10, marginBottom:8}}>
              {e.nombre} - {e.series} x {e.repeticiones} - {e.descanso_seg || 600}s descanso
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
