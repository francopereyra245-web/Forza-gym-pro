import { useState, useEffect } from 'react'

const ROJO = '#E10600'
const NEGRO = '#0A0A0A'

const MUSCULOS = [
  { id: 'pecho', nombre: 'PECHO' },
  { id: 'hombros', nombre: 'HOMBROS' },
  { id: 'biceps', nombre: 'BICEPS' },
  { id: 'abdomen', nombre: 'ABDOMEN' },
  { id: 'espalda', nombre: 'ESPALDA' },
  { id: 'dorsales', nombre: 'DORSALES' },
  { id: 'triceps', nombre: 'TRICEPS' },
  { id: 'cuads', nombre: 'CUÁDRICEPS' },
  { id: 'femoral', nombre: 'FEMORAL' },
]

const IMG: any = {
  pecho: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600',
  hombros: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=600',
  biceps: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600',
  triceps: 'https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?w=600',
  espalda: 'https://images.unsplash.com/photo-1603287681836-b174ce5074c2?w=600',
  piernas: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600',
}

function getImg(txt: string){
  const t = txt.toLowerCase()
  if(t.includes('pecho')||t.includes('press')||t.includes('apertura')) return IMG.pecho
  if(t.includes('hombro')||t.includes('militar')) return IMG.hombros
  if(t.includes('bicep')||t.includes('curl')) return IMG.biceps
  if(t.includes('tricep')||t.includes('fondo')) return IMG.triceps
  if(t.includes('espalda')||t.includes('dorsal')||t.includes('remo')||t.includes('dominada')) return IMG.espalda
  return IMG.piernas
}

export default function App(){
  const [tab, setTab] = useState('rutinas')
  const [musculoSel, setMusculoSel] = useState(MUSCULOS[0])
  const [showModal, setShowModal] = useState(false)
  const [rutinas, setRutinas] = useState<any[]>(()=>{
    const s = localStorage.getItem('forza_final')
    return s? JSON.parse(s) : [{id:1, nombre:'FULL BODY', dias:['Lun','Mie','Vie'], musculo:'pecho', ejercicios:['Press Banca','Sentadilla','Dominadas']}]
  })
  const [nombre, setNombre] = useState('')
  const [dias, setDias] = useState<string[]>([])

  useEffect(()=> localStorage.setItem('forza_final', JSON.stringify(rutinas)), [rutinas])

  return (
    <div style={{background:NEGRO, minHeight:'100vh', color:'white', maxWidth:430, margin:'0 auto', fontFamily:'system-ui', paddingBottom:80}}>

      {/* HEADER */}
      <div style={{padding:'14px 16px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'1px solid #1a1a1a', position:'sticky', top:0, background:NEGRO, zIndex:10}}>
        <div style={{fontWeight:900, fontSize:20, letterSpacing:1}}>FORZA <span style={{color:ROJO}}>GYM PRO</span></div>
        <div style={{display:'flex', gap:12, fontSize:18}}>💬 📸 👑</div>
      </div>

      {/* TABS CONTENIDO */}
      {tab==='rutinas' && (
        <>
          <div style={{margin:12, background:`linear-gradient(135deg, ${ROJO}, #8a0000)`, padding:16, borderRadius:18}}>
            <div style={{fontSize:12, opacity:0.8}}>HOY TOCA</div>
            <div style={{fontSize:20, fontWeight:900}}>{musculoSel.nombre} • FULL BODY</div>
            <button onClick={()=>setShowModal(true)} style={{marginTop:12, background:'white', color:'black', border:'none', padding:'10px 16px', borderRadius:20, fontWeight:900, fontSize:12}}> + NUEVA RUTINA</button>
          </div>

          <div style={{padding:'0 12px', fontWeight:800, fontSize:12, letterSpacing:1, display:'flex', justifyContent:'space-between'}}>
            <span>GRUPOS MUSCULARES</span><span style={{color:ROJO, fontSize:10}}>SELECCIONADO: {musculoSel.nombre}</span>
          </div>

          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:2, background:'#1a1a1a', padding:2, margin:'8px 12px', borderRadius:16, overflow:'hidden'}}>
            {MUSCULOS.map(m=>{
              const active = musculoSel.id===m.id
              return <button key={m.id} onClick={()=>setMusculoSel(m)} style={{aspectRatio:'0.9', background: active? '#1a0505':'#0f0f0f', border: active? `1.5px solid ${ROJO}`:'1px solid #222', color:'white', padding:8}}>
                <div style={{width:'100%', height:50, background: active? ROJO:'#1e1e1e', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', fontSize:9, fontWeight:900}}>{m.nombre}</div>
                <div style={{marginTop:6, fontSize:8, fontWeight:900, color: active? ROJO:'#777'}}>{m.nombre}</div>
              </button>
            })}
          </div>

          <div style={{padding:12}}>
            {rutinas.filter(r=>!musculoSel || r.musculo===musculoSel.id || musculoSel.id==='pecho').map((r:any)=>(
              <div key={r.id} style={{background:'#121212', border:'1px solid #222', borderLeft:`4px solid ${ROJO}`, borderRadius:14, padding:12, marginBottom:10}}>
                <div style={{fontWeight:900, fontSize:14}}>{r.nombre} <span style={{fontSize:10, background:ROJO, padding:'2px 6px', borderRadius:10, marginLeft:6}}>{r.dias.join(' ')}</span></div>
                <div style={{display:'flex', gap:6, marginTop:8, overflowX:'auto'}}>
                  {r.ejercicios.map((ej:string)=>(<div key={ej} style={{minWidth:90}}><img src={getImg(ej)} style={{width:90, height:60, objectFit:'cover', borderRadius:10}}/><div style={{fontSize:9, marginTop:4}}>{ej}</div></div>))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {tab==='entrenar' && (
        <div style={{padding:12}}>
          <div style={{background:'#121212', borderRadius:18, overflow:'hidden', border:'1px solid #222'}}>
            <img src={getImg(musculoSel.nombre)} style={{width:'100%', height:200, objectFit:'cover'}}/>
            <div style={{padding:14}}>
              <div style={{fontWeight:900}}>Press Banca • {musculoSel.nombre}</div>
              <div style={{display:'flex', gap:8, marginTop:12}}>
                <input placeholder="Peso kg" style={{flex:1, background:'#000', border:'1px solid #333', color:'white', padding:10, borderRadius:10}}/>
                <input placeholder="Reps" style={{flex:1, background:'#000', border:'1px solid #333', color:'white', padding:10, borderRadius:10}}/>
                <div style={{width:36, height:36, background:ROJO, borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center'}}>✓</div>
              </div>
              <div style={{marginTop:14, display:'flex', gap:8, alignItems:'center'}}>
                <button style={{flex:1, background:'#1a1a1a', border:'1px solid #333', color:'white', padding:10, borderRadius:12}}>30s</button>
                <button style={{flex:1, background:ROJO, border:'none', color:'white', padding:10, borderRadius:12, fontWeight:900}}>60s ⏱</button>
                <button style={{flex:1, background:'#1a1a1a', border:'1px solid #333', color:'white', padding:10, borderRadius:12}}>90s</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab==='progreso' && (
        <div style={{padding:12, display:'grid', gap:10}}>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
            <div style={{background:'#121212', padding:14, borderRadius:14, border:'1px solid #222'}}><div style={{fontSize:10, opacity:0.5}}>ENTRENAMIENTOS</div><div style={{fontSize:22, fontWeight:900, color:ROJO}}>24</div></div>
            <div style={{background:'#121212', padding:14, borderRadius:14, border:'1px solid #222'}}><div style={{fontSize:10, opacity:0.5}}>RACHA</div><div style={{fontSize:22, fontWeight:900}}>🔥 7 días</div></div>
          </div>
          <div style={{background:'#121212', padding:14, borderRadius:14, border:'1px solid #222'}}><div style={{fontSize:12, fontWeight:800}}>MI EVOLUCIÓN</div><div style={{height:60, background:'#0a0a0a', borderRadius:10, marginTop:10, display:'flex', alignItems:'end', gap:4, padding:8}}><div style={{flex:1, background:ROJO, height:'40%'}}/><div style={{flex:1, background:ROJO, height:'70%'}}/><div style={{flex:1, background:ROJO, height:'55%'}}/><div style={{flex:1, background:ROJO, height:'90%'}}/></div></div>
          <div style={{background:'#121212', padding:14, borderRadius:14, border:'1px solid #222', textAlign:'center'}}><div>📸 ANTES / DESPUÉS</div><button style={{marginTop:8, background:ROJO, border:'none', color:'white', padding:'8px 14px', borderRadius:20, fontWeight:700}}>Agregar foto</button></div>
        </div>
      )}

      {tab==='planes' && (
        <div style={{padding:16, display:'grid', gap:12}}>
          <div style={{background:'#121212', border:'1px solid #333', borderRadius:18, padding:16}}><div style={{fontWeight:900}}>PLAN GRATIS $0</div><div style={{fontSize:12, opacity:0.6, marginTop:6}}>• 3 rutinas • Sin progreso • Con anuncios</div></div>
          <div style={{background:`linear-gradient(180deg, #1a0505, #0f0f0f)`, border:`2px solid ${ROJO}`, borderRadius:18, padding:16}}><div style={{background:ROJO, color:'white', fontSize:10, padding:'4px 8px', borderRadius:20, display:'inline-block', fontWeight:900}}>RECOMENDADO</div><div style={{fontWeight:900, marginTop:8, fontSize:18}}>PLAN PRO $4.990 ARS</div><div style={{fontSize:12, marginTop:6}}>• Rutinas ilimitadas • Progreso completo • Grilla músculos en rojo • Sin anuncios • Pago único</div><button style={{width:'100%', marginTop:12, background:ROJO, color:'white', border:'none', padding:14, borderRadius:12, fontWeight:900}}>ACTIVAR PRO</button></div>
        </div>
      )}

      {/* MODAL NUEVA RUTINA - SIN CODIGO */}
      {showModal && (
        <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.8)', display:'flex', alignItems:'end', zIndex:50}}>
          <div style={{background:'#121212', width:'100%', borderRadius:'24px 24px 0 0', padding:16, borderTop:`3px solid ${ROJO}`}}>
            <div style={{fontWeight:900, marginBottom:12}}>AGREGAR NUEVA RUTINA</div>
            <input value={nombre} onChange={e=>setNombre(e.target.value)} placeholder="Nombre: Lunes Pecho" style={{width:'100%', padding:12, background:'#000', border:'1px solid #333', color:'white', borderRadius:12, marginBottom:8}}/>
            <div style={{display:'flex', gap:6, flexWrap:'wrap', marginBottom:12}}>
              {['Lun','Mar','Mie','Jue','Vie','Sab','Dom'].map(d=><button key={d} onClick={()=>setDias(dias.includes(d)? dias.filter(x=>x!==d):[...dias,d])} style={{padding:'6px 10px', borderRadius:20, border:'1px solid #333', background: dias.includes(d)? ROJO:'#000', color:'white', fontSize:11}}>{d}</button>)}
            </div>
            <button onClick={()=>{
              if(!nombre) return
              setRutinas([...rutinas,{id:Date.now(), nombre:nombre.toUpperCase(), dias, musculo:musculoSel.id, ejercicios:['Press Banca','Press Inclinado','Aperturas']}])
              setShowModal(false); setNombre(''); setDias([])
            }} style={{width:'100%', background:ROJO, color:'white', border:'none', padding:14, borderRadius:12, fontWeight:900}}>GUARDAR RUTINA</button>
            <button onClick={()=>setShowModal(false)} style={{width:'100%', background:'transparent', color:'#777', border:'none', padding:12, marginTop:6}}>Cancelar</button>
          </div>
        </div>
      )}

      {/* BOTTOM NAV */}
      <div style={{position:'fixed', bottom:0, left:0, right:0, maxWidth:430, margin:'0 auto', background:'#0f0f0f', borderTop:'1px solid #222', display:'flex', justifyContent:'space-around', padding:'10px 0'}}>
        {[
          {id:'rutinas', label:'Rutinas', icon:'📋'},
          {id:'entrenar', label:'Entrenar', icon:'🏋️'},
          {id:'progreso', label:'Progreso', icon:'📈'},
          {id:'planes', label:'Planes', icon:'👑'},
        ].map(t=><button key={t.id} onClick={()=>setTab(t.id)} style={{background:'none', border:'none', color: tab===t.id? ROJO:'#777', fontSize:11, fontWeight:900}}><div style={{fontSize:18}}>{t.icon}</div>{t.label}</button>)}
      </div>
    </div>
  )
}
