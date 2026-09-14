import { useState, useEffect } from 'react'

const ROJO = '#E10600'

// Pack oficial FORZA - músculo marcado en rojo
const IMG_MAP: any = {
  pecho: 'https://i.ibb.co/3m5qJc0R/chest-red.png', // lo reemplazamos por anatomía roja
  pecho_img: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&q=80&auto=format&fit=crop',
  espalda_img: 'https://images.unsplash.com/photo-1603287681836-b174ce5074c2?w=400&q=80&auto=format&fit=crop',
  hombro_img: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=400&q=80&auto=format&fit=crop',
  brazo_img: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&q=80&auto=format&fit=crop',
  pierna_img: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&q=80&auto=format&fit=crop',
}

function getImg(nombre: string){
  const n = nombre.toLowerCase()
  if(n.includes('press')||n.includes('pecho')||n.includes('apertura')||n.includes('fondo')) return IMG_MAP.pecho_img
  if(n.includes('hombro')||n.includes('militar')||n.includes('lateral')) return IMG_MAP.hombro_img
  if(n.includes('bicep')||n.includes('tricep')||n.includes('curl')) return IMG_MAP.brazo_img
  if(n.includes('dominada')||n.includes('remo')||n.includes('jalon')||n.includes('espalda')||n.includes('dorsal')) return IMG_MAP.espalda_img
  return IMG_MAP.pierna_img
}

export default function App(){
  const [rutinas, setRutinas] = useState<any[]>(()=>{
    const s = localStorage.getItem('forza_rutinas')
    return s? JSON.parse(s) : [{dia:'LUNES - PECHO', ejercicios:['Press Banca','Press Inclinado','Aperturas']}]
  })
  const [nuevoDia, setNuevoDia] = useState('')
  const [nuevoEj, setNuevoEj] = useState('')

  useEffect(()=>{ localStorage.setItem('forza_rutinas', JSON.stringify(rutinas)) },[rutinas])

  return (
    <div style={{background:'#050505', minHeight:'100vh', color:'white', maxWidth:420, margin:'0 auto', fontFamily:'sans-serif', paddingBottom:80}}>
      <h1 style={{padding:'18px 16px', margin:0, fontSize:22, fontWeight:900, letterSpacing:0.5}}>FORZA GYM PRO <span style={{color:ROJO}}>•</span></h1>

      {rutinas.map((r,i)=>(
        <div key={i} style={{margin:12, background:'#101010', borderRadius:20, overflow:'hidden', border:'1px solid #222'}}>
          <div style={{padding:'12px 14px', background:ROJO, fontWeight:900, fontSize:12, letterSpacing:1}}>{r.dia}</div>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:1, background:'#222'}}>
            {r.ejercicios.map((ej:string)=>(
              <div key={ej} style={{background:'#0f0f0f', padding:8}}>
                <img src={getImg(ej)} style={{width:'100%', height:90, objectFit:'cover', borderRadius:12}} />
                <div style={{fontSize:12, fontWeight:800, marginTop:8}}>{ej}</div>
                <div style={{fontSize:9, color:ROJO, fontWeight:700, marginTop:2}}>FORZA • AUTOMÁTICO</div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div style={{margin:12, background:'#111', padding:14, borderRadius:18, border:`1.5px solid ${ROJO}`}}>
        <div style={{fontSize:12, fontWeight:900, marginBottom:12, letterSpacing:0.5}}>AGREGAR NUEVA RUTINA</div>
        <input value={nuevoDia} onChange={e=>setNuevoDia(e.target.value)} placeholder="Ej: MARTES - ESPALDA" style={{width:'100%', padding:12, background:'#000', border:'1px solid #333', color:'white', borderRadius:12, marginBottom:8, outline:'none'}} />
        <input value={nuevoEj} onChange={e=>setNuevoEj(e.target.value)} placeholder="Ej: Dominadas, Remo, Jalón" style={{width:'100%', padding:12, background:'#000', border:'1px solid #333', color:'white', borderRadius:12, outline:'none'}} />
        <button onClick={()=>{
          if(!nuevoDia||!nuevoEj) return
          setRutinas([...rutinas, {dia:nuevoDia.toUpperCase(), ejercicios:nuevoEj.split(',').map((s:string)=>s.trim())}])
          setNuevoDia(''); setNuevoEj('')
        }} style={{width:'100%', marginTop:12, background:ROJO, border:'none', color:'white', padding:14, borderRadius:12, fontWeight:900, letterSpacing:0.5}}>GUARDAR RUTINA + IMÁGENES AUTO</button>
      </div>
    </div>
  )
}
