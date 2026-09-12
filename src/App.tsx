import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://siuxeqradhojnuuoorrx.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpdXhlcXJhZGhvam5udW9vcnJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgyMjM5ODksImV4cCI6MjEwMzc5OTk4OX0.Tz9em0VoaQwwvPqvEv5FiUV7hcnWa31ryaGvVzts45I'
const supabase = createClient(supabaseUrl, supabaseKey)

type Tab = 'rutinas' | 'entrenar' | 'progreso' | 'planes' | 'admin'

export default function App(){
  const [tab,setTab]=useState<Tab>('rutinas')
  const [rutinas,setRutinas]=useState<any[]>([])
  const [ejercicios,setEjercicios]=useState<any[]>([])
  const [sel,setSel]=useState<any>(null)
  const [loading,setLoading]=useState(true)
  const [precio,setPrecio]=useState(()=>localStorage.getItem('forza_precio')||'35000')
  const [wsp,setWsp]=useState(()=>localStorage.getItem('forza_wsp')||'5491123201025')

  useEffect(()=>{
    async function load(){
      setLoading(true)
      const {data:r}=await supabase.from('rutinas_prearmadas').select('*').order('id')
      if(r) setRutinas(r)
      const {data:e}=await supabase.from('ejercicios').select('*').order('id')
      if(e) setEjercicios(e)
      setLoading(false)
    }
    load()
  },[])

  useEffect(()=>{localStorage.setItem('forza_precio',precio)},[precio])
  useEffect(()=>{localStorage.setItem('forza_wsp',wsp)},[wsp])

  const listaEj = sel? ejercicios.filter((x:any)=> x.rutina_id===sel.id || x.rutina_prearmada_id===sel.id) : []

  return(
    <div style={{minHeight:'100vh',background:'#0a0a0a',color:'#fff',fontFamily:'system-ui',paddingBottom:80}}>
      <div style={{padding:14,background:'#000',borderBottom:'1px solid #222',display:'flex',justifyContent:'space-between',alignItems:'center',position:'sticky',top:0,zIndex:20}}>
        <div style={{fontWeight:900,letterSpacing:1,fontSize:18}}>FORZA <span style={{color:'#dc2626'}}>GYM PRO</span></div>
        <div style={{fontSize:11,background:'#dc2626',padding:'4px 10px',borderRadius:20,fontWeight:800}}>PRO</div>
      </div>

      <div style={{padding:16,maxWidth:600,margin:'0 auto'}}>
        {tab==='rutinas'&&!sel&&(
          <>
            <h2 style={{fontWeight:900,marginBottom:4}}>RUTINAS PREARMADAS</h2>
            <p style={{fontSize:12,color:'#666',marginBottom:12}}>De Supabase • {rutinas.length} rutinas • Toca para ver</p>
            {loading?<p style={{color:'#666'}}>Cargando...</p>:
            rutinas.length===0?<div style={{background:'#dc26261a',padding:14,borderRadius:12,color:'#ff6b6b'}}>No hay rutinas. Creá una en Supabase {'>'} rutinas_prearmadas {'>'} Insert row</div>:
            <div style={{display:'grid',gap:12}}>
              {rutinas.map((r:any)=>(
                <div key={r.id} onClick={()=>setSel(r)} style={{background:'#161616',border:'1px solid #262626',borderLeft:'4px solid #dc2626',padding:16,borderRadius:14,cursor:'pointer'}}>
                  <div style={{fontWeight:900,color:'#fff'}}>{r.nombre}</div>
                  <div style={{fontSize:13,opacity:0.7,marginTop:4}}>{r.descripcion||r.objetivo||'Rutina FORZA'}</div>
                  <div style={{display:'flex',gap:8,marginTop:8}}>
                    <span style={{fontSize:10,background:'#000',padding:'3px 8px',borderRadius:10,border:'1px solid #333'}}>{r.nivel||'INTERMEDIO'}</span>
                    <span style={{fontSize:10,background:'#dc2626',padding:'3px 8px',borderRadius:10}}>{r.duracion_semanas||4} SEM</span>
                  </div>
                </div>
              ))}
            </div>}
          </>
        )}

        {tab==='rutinas'&&sel&&(
          <div style={{background:'#161616',padding:18,borderRadius:16,border:'1px solid #222'}}>
            <button onClick={()=>setSel(null)} style={{background:'#222',border:'none',color:'#fff',padding:'6px 12px',borderRadius:8,marginBottom:12}}>← Volver</button>
            <h2 style={{color:'#dc2626',fontWeight:900}}>{sel.nombre}</h2>
            <p style={{opacity:0.7,fontSize:13}}>{sel.descripcion}</p>
            <h3 style={{marginTop:18,fontWeight:800,fontSize:14}}>EJERCICIOS ({listaEj.length||'Todos'})</h3>
            {(listaEj.length>0?listaEj:ejercicios.slice(0,8)).map((e:any,i:number)=>(
              <div key={e.id||i} style={{background:'#0a0a0a',border:'1px solid #222',padding:12,borderRadius:10,marginTop:8,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <span style={{fontSize:13}}><b style={{color:'#dc2626'}}>{i+1}.</b> {e.nombre} <span style={{opacity:0.5,fontSize:11}}> • {e.grupo_muscular||e.categoria||'GYM'}</span></span>
                <span style={{fontWeight:800,color:'#dc2626',fontSize:12}}>{e.series||4}x{e.repeticiones||12}</span>
              </div>
            ))}
            <button onClick={()=>setTab('entrenar')} style={{width:'100%',marginTop:18,background:'#dc2626',border:'none',color:'#fff',fontWeight:900,padding:14,borderRadius:12}}>EMPEZAR AHORA ▶️</button>
          </div>
        )}

        {tab==='entrenar'&&(
          <><h2 style={{fontWeight:900}}>ENTRENAR</h2>
          <div style={{background:'#161616',padding:24,borderRadius:16,marginTop:12,textAlign:'center',border:'1px solid #222'}}>
            <div style={{fontSize:42}}>🔥</div>
            <div style={{fontWeight:900,marginTop:8,fontSize:18}}>{sel?sel.nombre:'Elegí una rutina'}</div>
            <div style={{opacity:0.6,fontSize:12,marginTop:4}}>{sel?`Objetivo: ${sel.objetivo||'Fuerza'}`:'Andá a RUTINAS y toca una'}</div>
            <button style={{width:'100%',marginTop:18,background:'#dc2626',border:'none',color:'#fff',fontWeight:900,padding:14,borderRadius:12}}>FINALIZAR ENTRENO ✓</button>
          </div></>
        )}

        {tab==='progreso'&&(<><h2 style={{fontWeight:900}}>PROGRESO</h2><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginTop:12}}><div style={{background:'#161616',padding:16,borderRadius:14,border:'1px solid #222'}}><div style={{color:'#666',fontSize:10}}>ENTRENOS</div><div style={{fontWeight:900,fontSize:24}}>24</div></div><div style={{background:'#161616',padding:16,borderRadius:14,border:'1px solid #222'}}><div style={{color:'#666',fontSize:10}}>RACHA</div><div style={{fontWeight:900,fontSize:24,color:'#dc2626'}}>5 días</div></div></div></>)}

        {tab==='planes'&&(<><h2 style={{fontWeight:900}}>PLANES</h2><div style={{marginTop:12,background:'linear-gradient(135deg,#dc2626,#991b1b)',borderRadius:16,padding:20,textAlign:'center'}}><div style={{fontWeight:900,fontSize:20}}>FORZA PRO 👑</div><div style={{fontSize:36,fontWeight:900,marginTop:6}}>${precio}</div><div style={{opacity:0.9,fontSize:13}}>/ mes • Acceso total • Rutinas ilimitadas</div><a href={`https://wa.me/${wsp}?text=Hola%20FORZA%20quiero%20el%20plan%20PRO%20$${precio}`} target="_blank" style={{display:'block',marginTop:16,background:'#000',color:'#fff',fontWeight:900,padding:14,borderRadius:12,textDecoration:'none'}}>ACTIVAR POR WHATSAPP</a></div></>)}

        {tab==='admin'&&(
          <div>
            <h2 style={{fontWeight:900,color:'#dc2626'}}>ADMIN - PANEL DE VENTAS</h2>
            <p style={{fontSize:11,color:'#666'}}>Solo vos ves esto. Cambias precio y WhatsApp y se actualiza al toque para tus clientes.</p>
            <div style={{background:'#161616',padding:16,borderRadius:12,marginTop:12,border:'1px solid #222'}}>
              <label style={{fontSize:10,color:'#888'}}>PRECIO PLAN PRO</label>
              <input value={precio} onChange={e=>setPrecio(e.target.value)} style={{width:'100%',marginTop:6,background:'#000',border:'1px solid #333',color:'#fff',padding:10,borderRadius:8}}/>
              <label style={{fontSize:10,color:'#888',marginTop:12,display:'block'}}>WHATSAPP VENTAS (con 549)</label>
              <input value={wsp} onChange={e=>setWsp(e.target.value)} style={{width:'100%',marginTop:6,background:'#000',border:'1px solid #333',color:'#fff',padding:10,borderRadius:8}}/>
              <div style={{marginTop:12,fontSize:11,color:'#666'}}>Rutinas cargadas: {rutinas.length} • Ejercicios: {ejercicios.length}</div>
            </div>
            <div style={{background:'#dc26261a',padding:12,borderRadius:10,marginTop:12,fontSize:11,color:'#ff6b6b'}}>Para agregar más rutinas: Supabase {'>'} Table Editor {'>'} rutinas_prearmadas {'>'} Insert Row. Aparecen solas en la app.</div>
          </div>
        )}
      </div>

      <div style={{position:'fixed',bottom:0,left:0,right:0,background:'#000',borderTop:'1px solid #222',display:'flex',justifyContent:'space-around',padding:'8px 0'}}>
        {[{id:'rutinas',l:'RUTINAS',i:'💪'},{id:'entrenar',l:'ENTRENAR',i:'▶️'},{id:'progreso',l:'PROGRESO',i:'📊'},{id:'planes',l:'PLANES',i:'👑'},{id:'admin',l:'ADMIN',i:'⚙️'}].map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id as any)} style={{background:tab===t.id?'#dc26261a':'transparent',border:'none',color:tab===t.id?'#dc2626':'#666',display:'flex',flexDirection:'column',alignItems:'center',padding:'6px 10px',borderRadius:10}}>
            <span>{t.i}</span><span style={{fontSize:9,fontWeight:800}}>{t.l}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
