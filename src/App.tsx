import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  'https://tuxuexyxjnuxxara.supabase.co',
  'TU_CLAVE_PUBLICA_AQUI' // dejá la que ya tenés
)

export default function App(){
  const [rutinas, setRutinas] = useState<any>([])
  const [ejercicios, setEjercicios] = useState<any>([])
  const [tab, setTab] = useState('rutinas')
  const [seleccionada, setSeleccionada] = useState<any>(null)
  const [detalle, setDetalle] = useState<any[]>([])

  useEffect(() => {
    supabase.from('rutinas_prearmadas').select('*').then(({ data }) => { if(data) setRutinas(data) })
    supabase.from('ejercicios').select('*').then(({ data }) => { if(data) setEjercicios(data) })
  }, [])

  const handleRutinaClick = (rutina: any) => {
    setSeleccionada(rutina)
    // filtra ejercicios que pertenecen a esa rutina
    const filtrados = ejercicios.filter((e:any) => e.rutina_id === rutina.id || e.categoria === rutina.categoria)
    setDetalle(filtrados)
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-4">
      {/* Header FORZA */}
      <div className="flex items-center justify-center py-4">
        <h1 className="font-black text-xl tracking-widest">FORZA <span className="text-[#FFC107]">PRO</span></h1>
        <span className="ml-auto text-[10px] py-1 px-2 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">LIVE</span>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        <button onClick={()=>setTab('rutinas')} className={`px-4 py-2 rounded-full text-xs font-bold ${tab==='rutinas'? 'bg-[#FFC107] text-black' : 'bg-white/10'}`}>RUTINAS</button>
        <button onClick={()=>setTab('precal')} className={`px-4 py-2 rounded-full text-xs font-bold ${tab==='precal'? 'bg-[#FFC107] text-black' : 'bg-white/10'}`}>PRECAL</button>
        <button onClick={()=>setTab('rehab')} className={`px-4 py-2 rounded-full text-xs font-bold ${tab==='rehab'? 'bg-[#FFC107] text-black' : 'bg-white/10'}`}>REHAB</button>
      </div>

      {/* Si hay rutina seleccionada, mostrar detalle */}
      {seleccionada? (
        <div>
          <button onClick={()=>setSeleccionada(null)} className="text-xs mb-4 text-white/60">← Volver</button>
          <h2 className="font-black text-2xl mb-1">{seleccionada.nombre}</h2>
          <p className="text-xs opacity-40 mb-4">{seleccionada.descripcion || 'Rutina FORZA'}</p>
          <div className="grid gap-2">
            {detalle.map((ex,i) => (
              <div key={i} className="bg-white/5 p-3 rounded-xl flex justify-between">
                <span className="text-sm font-bold">{ex.nombre || ex.ejercicio}</span>
                <span className="text-xs opacity-60">{ex.series || '3'}x{ex.reps || '12'}</span>
              </div>
            ))}
            {detalle.length===0 && <p className="text-xs opacity-50 text-center mt-10">No hay ejercicios cargados para esta rutina en Supabase</p>}
          </div>
        </div>
      ) : (
        <>
          {tab === 'rutinas' && (
            <div className="grid gap-3">
              {rutinas.map((r:any, i:number) => (
                <div key={r.id} onClick={()=>handleRutinaClick(r)} className="border border-white/10 rounded-2xl p-4 active:scale-[0.98] transition">
                  <div className="flex justify-between">
                    <span className="text-[10px] py-1 px-2 rounded-full bg-red-500/20 text-red-400">{r.nivel || 'PRO'}</span>
                  </div>
                  <h3 className="font-black mt-2">{r.nombre}</h3>
                  <p className="text-xs opacity-40">{r.descripcion}</p>
                </div>
              ))}
              {rutinas.length===0 && <p className="text-xs opacity-50 text-center mt-10">Cargando desde Supabase...</p>}
            </div>
          )}
          {tab === 'precal' && <div className="grid gap-2">{ejercicios.filter((e:any)=>e.categoria==='precalentamiento').map((e:any,i:number)=><div key={i} className="bg-white/5 p-3 rounded-xl flex justify-between"><span className="text-sm font-bold">{e.nombre}</span></div>)}</div>}
          {tab === 'rehab' && <div className="grid gap-2">{ejercicios.filter((e:any)=>e.categoria==='rehabilitacion').map((e:any,i:number)=><div key={i} className="bg-white/5 p-3 rounded-xl flex justify-between"><span className="text-sm font-bold">{e.nombre}</span></div>)}</div>}
        </>
      )}
    </div>
  )
}
