import { useState, useEffect } from 'react'

const ROJO = '#E10600'
const NEGRO = '#0A0A0A'
const LOGO = '/logo-forza.png' // TU LOGO REAL, el rojo/negro con rayo blanco
const IMG_PRO = '/logo-forza.png' // Por ahora usa tu logo como placeholder pro hasta que subas el pack pecho-pro.png, así nunca falla

function getMusculo(nombre:string){
  const n = nombre.toLowerCase()
  if(n.includes('pecho')||n.includes('press')||n.includes('banca')) return {label:'PECHO', img: IMG_PRO}
  if(n.includes('espalda')||n.includes('remo')||n.includes('dorsal')) return {label:'ESPALDA', img: IMG_PRO}
  if(n.includes('hombro')||n.includes('militar')) return {label:'HOMBROS', img: IMG_PRO}
  if(n.includes('bicep')) return {label:'BICEPS', img: IMG_PRO}
  if(n.includes('tricep')) return {label:'TRICEPS', img: IMG_PRO}
  if(n.includes('pierna')||n.includes('sentadilla')||n.includes('cuad')) return {label:'PIERNAS', img: IMG_PRO}
  return {label:'FORZA', img: IMG_PRO}
}

export default function App(){
  const [tab,setTab]=useState('rutinas')
  const [rutinas,setRutinas]=useState<any[]>(()=>JSON.parse(localStorage.getItem('forza_clean_rutinas')||'[]'))
  const [tienda,setTienda]=useState<any[]>(()=>JSON.parse(localStorage.getItem('forza_clean_tienda')||'[{"id":1,"nombre":"Dieta Volumen","tipo":"dieta","precio":"5000","activo":true,"alias":"forza.mp","foto":""},{"id":2,"nombre":"Whey Protein","tipo":"suplemento","precio":"25000","activo":true,"alias":"socio.mp","foto":""}]'))
  const [clientes,setClientes]=useState<any[]>(()=>JSON.parse(localStorage.getItem('forza_clean_clientes')||'[{"id":1,"nombre":"Juan Perez","peso":"80kg","talla":"M","activo":true,"ingreso":"14/09/2026","tiempoActivo":"4 dias","pro":true,"hasta":"30/09/2026"}]'))
  const [reviews,setReviews]=useState<any[]>(()=>JSON.parse(localStorage.getItem('forza_clean_reviews')||'[]'))
  const [precioPro,setPrecioPro]=useState(()=>localStorage.getItem('forza_clean_precio')||'4990')
  const [aliasMP,setAliasMP]=useState(()=>localStorage.getItem('forza_clean_alias')||'forza.mp')
  const [showTyC,setShowTyC]=useState(false)
  const [nRut,setNRut]=useState(''); const [nEj,setNEj]=useState(''); const [nDia,setNDia]=useState('Lun')

  useEffect(()=>localStorage.setItem('forza_clean_rutinas',JSON.stringify(rutinas)),[rutinas])
  useEffect(()=>localStorage.setItem('forza_clean_tienda',JSON.stringify(tienda)),[tienda])
  useEffect(()=>localStorage.setItem('forza_clean_clientes',JSON.stringify(clientes)),[clientes])
  useEffect(()=>localStorage.setItem('forza_clean_reviews',JSON.stringify(reviews)),[reviews])
  useEffect(()=>{localStorage.setItem('forza_clean_precio',precioPro); localStorage.setItem('forza_clean_alias',aliasMP)},[precioPro,aliasMP])

  return (
    <div style={{background:NEGRO, minHeight:'100vh', color:'white', maxWidth:440, margin:'0 auto', paddingBottom:90, fontFamily:'system-ui'}}>
      {/* HEADER CON TU LOGO REAL - GUARDADO */}
      <div style={{padding:12, background:'#000', borderBottom:`2px solid ${ROJO}`, display:'flex', alignItems:'center', gap:10, position:'sticky', top:0, zIndex:20}}>
        <img src={LOGO} style={{height:44, width:44, borderRadius:10, objectFit:'contain', background:'#000'}} alt="FORZA" />
        <div style={{lineHeight:1}}><div style={{fontWeight:900, fontSize:15}}>FORZA <span style={{color:ROJO}}>GYM PRO</span></div><div style={{fontSize:9, opacity:0.5, letterSpacing:2}}>gym pro</div></div>
        <div style={{marginLeft:'auto', fontSize:8, background:ROJO, padding:'5px 10px', borderRadius:20, fontWeight:900}}>TIENDA • MP {aliasMP}</div>
      </div>

      {tab==='rutinas' && (
        <div style={{padding:12}}>
          <div style={{background:`linear-gradient(90deg, ${ROJO}, #5a0000)`, padding:14, borderRadius:16, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div><div style={{fontSize:9, opacity:0.9}}>🔔 HOY TE TOCA</div><div style={{fontWeight:900, fontSize:18}}>{rutinas[0]?.nombre || 'PECHO'}</div><div style={{fontSize:9, opacity:0.7, marginTop:2}}>Alarma activa</div></div>
            <button onClick={()=>{ if(Notification.permission!=='granted') Notification.requestPermission(); else new Notification(`FORZA: Hoy toca ${rutinas[0]?.nombre || 'PECHO'}`)}} style={{background:'white', color:'black', border:'none', padding:'10px 16px', borderRadius:20, fontWeight:900, fontSize:11}}>ALARMA</button>
          </div>

          <div style={{marginTop:12, background:'#111', padding:12, borderRadius:14, border:'1px solid #222'}}>
            <div style={{fontSize:11, fontWeight:900}}>NUEVA RUTINA • MANUAL + IMAGEN PRO AUTO</div>
            <div style={{display:'flex', gap:6, marginTop:8}}>
              <input value={nRut} onChange={e=>setNRut(e.target.value)} placeholder="Nombre: LUNES PECHO" style={{flex:1, background:'#000', border:'1px solid #333', color:'white', padding:11, borderRadius:10, fontSize:12}}/>
              <select value={nDia} onChange={e=>setNDia(e.target.value)} style={{background:'#000', border:'1px solid #333', color:'white', borderRadius:10, fontSize:11, padding:'0 6px'}}><option>Lun</option><option>Mar</option><option>Mie</option><option>Jue</option><option>Vie</option><option>Sab</option><option>Dom</option></select>
            </div>
            <div style={{display:'flex', gap:6, marginTop:6}}>
              <input value={nEj} onChange={e=>setNEj(e.target.value)} placeholder="Ejercicio: Press Banca" style={{flex:1, background:'#000', border:'1px solid #333', color:'white', padding:11, borderRadius:10, fontSize:12}}/>
              <button onClick={()=>{ if(!nRut||!nEj) return; setRutinas([...rutinas,{id:Date.now(), nombre:nRut.toUpperCase(), dia:nDia, ejercicios:[{nombre:nEj, peso:'', reps:'', tiempo:60}]}]); setNEj('') }} style={{background:ROJO, border:'none', color:'white', padding:'0 18px', borderRadius:10, fontWeight:900, fontSize:16}}>+</button>
            </div>
          </div>

          {rutinas.map((r:any)=>(
            <div key={r.id} style={{marginTop:12, background:'#0f0f0f', borderRadius:18, border:'1px solid #1e1e1e', overflow:'hidden'}}>
              <div style={{padding:12, display:'flex', justifyContent:'space-between'}}><b style={{fontSize:12}}>{r.nombre} • {r.dia}</b><button onClick={()=>setRutinas(rutinas.filter(x=>x.id!==r.id))} style={{background:'none', border:'none', color:'#666', fontSize:10}}>Borrar / Editar</button></div>
              {r.ejercicios.map((ej:any, i:number)=>{
                const m = getMusculo(ej.nombre)
                return <div key={i} style={{display:'flex', gap:12, padding:12, borderTop:'1px solid #151515', background:'#0a0a0a'}}>
                  <div style={{width:100, height:100, background:'#000', borderRadius:14, border:'1px solid #222', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <img src={LOGO} style={{width:'100%', height:'100%', objectFit:'contain', padding:8}} alt={m.label}/>
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:900, fontSize:13}}>{ej.nombre.toUpperCase()}</div>
                    <div style={{fontSize:10, color:ROJO, fontWeight:900, marginTop:4}}>● {m.label} • MÚSCULO COMPROMETIDO</div>
                    <div style={{display:'flex', gap:6, marginTop:10}}>
                      <input placeholder="kg" style={{width:52, background:'#000', border:'1px solid #222', color:'white', padding:6, borderRadius:8, fontSize:11}}/>
                      <input placeholder="reps" style={{width:52, background:'#000', border:'1px solid #222', color:'white', padding:6, borderRadius:8, fontSize:11}}/>
                      <div style={{background:'#1a1a1a', padding:'6px 10px', borderRadius:8, fontSize:10}}>⏱ 60s</div>
                    </div>
                  </div>
                </div>
              })}
            </div>
          ))}
        </div>
      )}

      {tab==='tienda' && (
        <div style={{padding:12}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}><b style={{fontSize:12}}>TIENDA • GRATIS Y PRO LA VEN</b><button onClick={()=>{const n=prompt('Nombre'); if(!n) return; const tipo=prompt('Tipo: dieta / suplemento / indumentaria / elemento','suplemento')||'suplemento'; const precio=prompt('Precio','0')||'0'; const alias=prompt('Alias MP socio',aliasMP)||aliasMP; setTienda([...tienda,{id:Date.now(), nombre:n, tipo, precio, alias, activo:true, foto:''}])}} style={{background:ROJO, border:'none', color:'white', padding:'8px 12px', borderRadius:10, fontWeight:900, fontSize:10}}>+ PRODUCTO</button></div>
          {tienda.map((p:any)=>(
            <div key={p.id} style={{marginTop:10, background:'#121212', borderRadius:14, border:'1px solid #222', padding:12, opacity:p.activo?1:0.35}}>
              <div style={{display:'flex', gap:10, alignItems:'center'}}><img src={LOGO} style={{width:50, height:50, borderRadius:8, objectFit:'contain', background:'#000', padding:4}}/><div style={{flex:1}}><div style={{fontWeight:800, fontSize:12}}>{p.nombre} <span style={{fontSize:8, background:'#222', padding:'2px 6px', borderRadius:10}}>{p.tipo}</span></div><div style={{fontSize:11, color:ROJO}}>${p.precio} • {p.alias} {p.activo?'• ACTIVO':'• DESACTIVADO'}</div></div><button onClick={()=>setTienda(tienda.map(x=> x.id===p.id? {...x, activo:!x.activo}:x))} style={{border:'none', padding:'8px 12px', borderRadius:20, fontSize:10, fontWeight:900, background:p.activo?ROJO:'#333', color:'white'}}>{p.activo?'ACTIVO':'OFF'}</button></div>
            </div>
          ))}
        </div>
      )}

      {tab==='admin' && (
        <div style={{padding:12}}>
          <b>ADMIN FORZA</b>
          <div style={{marginTop:10, background:'#121212', padding:12, borderRadius:12, border:'1px solid #222'}}>
            <div style={{fontSize:10}}>ALIAS MP TUYO</div><input value={aliasMP} onChange={e=>setAliasMP(e.target.value)} style={{width:'100%', marginTop:4, background:'#000', border:'1px solid #333', color:'white', padding:8, borderRadius:8}}/>
            <div style={{fontSize:10, marginTop:8}}>PRECIO PRO</div><input value={precioPro} onChange={e=>setPrecioPro(e.target.value)} style={{width:'100%', marginTop:4, background:'#000', border:'1px solid #333', color:'white', padding:8, borderRadius:8}}/>
          </div>
          {clientes.map((c:any)=><div key={c.id} style={{marginTop:10, background:'#101010', padding:12, borderRadius:12, borderLeft:`4px solid ${c.activo?ROJO:'#333'}`}}><b style={{fontSize:12}}>{c.nombre} {c.pro?'👑 PRO':''} {c.activo?'● ACTIVO':'○ INACTIVO'}</b><div style={{fontSize:10, opacity:0.6, marginTop:4}}>Ingreso {c.ingreso} • {c.tiempoActivo} activo • {c.peso} • Talla {c.talla} • Hasta {c.hasta}</div></div>)}
          <div style={{marginTop:10, background:'#121212', padding:12, borderRadius:12}}><b style={{fontSize:11}}>REVIEWS • Con tu permiso</b>{reviews.map((r:any)=><div key={r.id} style={{marginTop:6, background:'#000', padding:8, borderRadius:8, fontSize:11}}>{'★'.repeat(r.estrellas)} {r.nombre} - {r.texto}</div>)}{reviews.length===0 && <div style={{fontSize:10, opacity:0.5, marginTop:6}}>Sin reviews</div>}</div>
          <button onClick={()=>setShowTyC(true)} style={{width:'100%', marginTop:12, background:'#1a1a1a', border:'1px solid #333', color:'white', padding:10, borderRadius:10, fontSize:10}}>Ver Términos y Condiciones</button>
        </div>
      )}

      {tab==='planes' && (
        <div style={{padding:12}}>
          <div style={{background:'#121212', border:'1px solid #333', borderRadius:16, padding:14}}><b>GRATIS $0</b><div style={{fontSize:11, opacity:0.6}}>Ve tienda y rutinas básicas</div></div>
          <div style={{marginTop:10, background:'#1a0505', border:`2px solid ${ROJO}`, borderRadius:16, padding:14}}><div style={{background:ROJO, display:'inline-block', fontSize:9, padding:'3px 8px', borderRadius:20, fontWeight:900}}>RECOMENDADO</div><div style={{fontWeight:900, marginTop:6}}>PRO ${precioPro} ARS / mes</div><div style={{fontSize:11, marginTop:4}}>MP directo a {aliasMP} • Débito automático • Aviso renovación</div><button onClick={()=>setShowTyC(true)} style={{width:'100%', marginTop:10, background:ROJO, border:'none', color:'white', padding:12, borderRadius:10, fontWeight:900}}>ACTIVAR PRO - PAGAR A {aliasMP}</button></div>
        </div>
      )}

      {showTyC && <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.95)', zIndex:50, padding:20, overflowY:'auto'}}><div style={{background:'#121212', padding:16, borderRadius:16, border:`1px solid ${ROJO}`}}><div style={{display:'flex', gap:10, alignItems:'center'}}><img src={LOGO} style={{width:40, height:40, borderRadius:8, objectFit:'contain'}}/><b>TyC FORZA</b></div><div style={{fontSize:11, opacity:0.7, marginTop:10, lineHeight:1.5}}>1. Datos reales peso/talla. 2. Pago a {aliasMP} MP. 3. Admin ve progreso, luces activo/inactivo, tiempos, puede dar/quitar PRO. 4. Tienda con activar/desactivar, fotos/videos, alias socio. 5. Reviews con aprobación. Acepto todo.</div><button onClick={()=>setShowTyC(false)} style={{width:'100%', marginTop:12, background:ROJO, border:'none', color:'white', padding:12, borderRadius:10, fontWeight:900}}>Acepto</button></div></div>}

      <div style={{position:'fixed', bottom:0, left:0, right:0, maxWidth:440, margin:'0 auto', background:'#000', borderTop:'1px solid #1a1a1a', display:'flex', justifyContent:'space-around', padding:'10px 0'}}>
        {[{id:'rutinas', l:'RUTINAS'},{id:'tienda', l:'TIENDA'},{id:'admin', l:'ADMIN'},{id:'planes', l:'PLANES'}].map(t=><button key={t.id} onClick={()=>setTab(t.id)} style={{background:'none', border:'none', color:tab===t.id?ROJO:'#555', fontSize:10, fontWeight:900}}>{t.l}</button>)}
      </div>
    </div>
  )
}
