import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  'https://siuxeqradhojnnuoorrx.supabase.co',
  'PEGÁ ACÁ TU KEY sb_publishable_TPm9pkKGm05SBBzXTivilg_... COMPLETA' 
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
              <small>{r.objetivo} - {r.duracion_total || 60
