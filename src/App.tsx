// COPIÁ ESTO ENTERO EN src/App.tsx
import { useState, useEffect } from 'react'

const ROJO = '#E10600'
const IMG_MAP: any = {
  pecho: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400',
  hombro: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=400',
  biceps: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400',
  triceps: 'https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?w=400',
  espalda: 'https://images.unsplash.com/photo-1603287681836-b174ce5074c2?w=400',
  piernas: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400',
}

function getImg(nombre: string){
  const n = nombre.toLowerCase()
  if(n.includes('press')||n.includes('pecho')||n.includes('apertura')) return IMG_MAP.pecho
  if(n.includes('hombro')||n.includes('militar')||n.includes('lateral')) return IMG_MAP.hombro
  if(n.includes('bicep')||n.includes('curl')) return IMG_MAP.biceps
  if(n.includes('tricep')||n.includes('fondo')) return IMG_MAP.triceps
  if(n.includes('dominada')||n.includes('remo')||n.includes('espalda')) return IMG_MAP.espalda
  return IMG_MAP.piernas
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
    <div style={{background:'#050505', minHeight:'100vh', color:'white', maxWidth:420, margin:'0 auto', paddingBottom:80}}>
      <h1 style={{padding:16, margin:0, fontSize:22, fontWeight:900}}>FORZA GYM PRO <span style={{color:ROJO}}>•</span></h1>

      {rutinas.map((r,i)=>(
        <div key={i} style={{margin:12, background:'#101010', borderRadius:20, overflow:'hidden', border:'1px solid #222'}}>
          <div style={{padding:12, background:ROJO, fontWeight:900, fontSize:12}}>{r.dia}</div>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:1, background:'#222'}}>
            {r.ejercicios.map((ej:string)=>(
              <div key={ej} style={{background:'#0f0f0f', padding:8}}>
                <img src={getImg(ej)} style={{width:'100%', height:80, objectFit:'cover', borderRadius:12}} />
                <div style={{fontSize:11, fontWeight:700, marginTop:6}}>{ej}</div>
                <div style={{fontSize:9, color:ROJO}}>AUTOMÁTICO</div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div style={{margin:12, background:'#111', padding:14, borderRadius:16, border:`1px solid ${ROJO}`}}>
        <div style={{fontSize:12, fontWeight:900, marginBottom:8}}>AGREGAR NUEVA RUTINA (sin código)</div>
        <input value={nuevoDia} onChange={e=>setNuevoDia(e.target.value)} placeholder="Ej: MARTES - ESPALDA" style={{width:'100%', padding:10, background:'#000', border:'1px solid #333', color:'white', borderRadius:10, marginBottom:8}} />
        <input value={nuevoEj} onChange={e=>setNuevoEj(e.target.value)} placeholder="Ej: Dominadas, Remo, Jalón (separados por coma)" style={{width:'100%', padding:10, background:'#000', border:'1px solid #333', color:'white', borderRadius:10}} />
        <button onClick={()=>{
          if(!nuevoDia||!nuevoEj) return
          setRutinas([...rutinas, {dia:nuevoDia.toUpperCase(), ejercicios:nuevoEj.split(',').map((s:string)=>s.trim())}])
          setNuevoDia(''); setNuevoEj('')
        }} style={{width:'100%', marginTop:10, background:ROJO, border:'none', color:'white', padding:12, borderRadius:12, fontWeight:900}}>GUARDAR RUTINA + IMÁGENES AUTO</button>
      </div>
    </div>
  )
}
