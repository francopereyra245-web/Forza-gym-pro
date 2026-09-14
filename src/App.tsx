import { useState, useEffect } from 'react'

const ROJO = '#E10600'
const NEGRO = '#0A0A0A'

const getMusculo = (nombre:string) => {
  const n = nombre.toLowerCase()
  if(n.includes('pecho')||n.includes('press')||n.includes('banca')) return 'PECHO'
  if(n.includes('espalda')||n.includes('remo')) return 'ESPALDA'
  if(n.includes('hombro')||n.includes('militar')) return 'HOMBROS'
  if(n.includes('bicep')) return 'BICEPS'
  if(n.includes('tricep')) return 'TRICEPS'
  if(n.includes('pierna')||n.includes('sentadilla')||n.includes('cuad')) return 'CUADRICEPS'
  if(n.includes('femoral')||n.includes('peso muerto')) return 'FEMORAL'
  if(n.includes('dorsal')||n.includes('jalon')) return 'DORSALES'
  if(n.includes('abdom')) return 'ABDOMEN'
  return 'FORZA'
}

export default function App(){
  const [tab,setTab]=useState('rutinas')
  const [rutinas,setRutinas]=useState<any[]>(()=>JSON.parse(localStorage.getItem('forza_final_rut')||'[{"id":1,"nombre":"LUNES PECHO","dia":"Lun","ejercicios":[{"nombre":"Press Banca"}]}]'))
  const [tienda,setTienda]=useState<any[]>(()=>JSON.parse(localStorage.getItem('forza_final_tienda')||'[{"id":1,"nombre":"Dieta Volumen 3000kcal","tipo":"dieta","precio":"5000","activo":true,"alias":"forza.mp","stock":true},{"id":2,"nombre":"Whey Protein","tipo":"suplemento","precio":"25000","activo":true,"alias":"socio.suplementos.mp","stock":false},{"id":3,"nombre":"Remera FORZA","tipo":"indumentaria","precio":"12000","activo":true,"alias":"forza.mp","stock":true}]'))
  const [clientes,setClientes]=useState<any[]>(()=>JSON.parse(localStorage.getItem('forza_final_cli')||'[{"id":1,"nombre":"Juan Perez","apellido":"Perez","peso":"80kg","talla":"M","activo":true,"ingreso":"14/09/2026","tiempoActivo":"4 dias","tiempoInactivo":"0 dias","pro":true,"hasta":"30/09/2026","debito":true}]'))
  const [reviews,setReviews]=useState<any[]>(()=>JSON.parse(localStorage.getItem('forza_final_rev')||'[]'))
  const [precioPro,setPrecioPro]=useState(()=>localStorage.getItem('forza_final_precio')||'4990')
  const [aliasMP,setAliasMP]=useState(()=>localStorage.getItem('forza_final_alias')||'forza.mp')
  const [nRut,setNRut]=useState(''); const [nEj,setNEj]=useState(''); const [nDia,setNDia]=useState('Lun')
  const [showTyC,setShowTyC]=useState(false)

  useEffect(()=>localStorage.setItem('forza_final_rut',JSON.stringify(rutinas)),[rutinas])
  useEffect(()=>localStorage.setItem('forza_final_tienda',JSON.stringify(tienda)),[tienda])
  useEffect(()=>localStorage.setItem('forza_final_cli',JSON.stringify(clientes)),[clientes])
  useEffect(()=>localStorage.setItem('forza_final_rev',JSON.stringify(reviews)),[reviews])
  useEffect(()=>{localStorage.setItem('forza_final_precio',precioPro); localStorage.setItem('forza_final_alias',aliasMP)},[precioPro,aliasMP])

  return (
    <div style={{background:NEGRO, minHeight:'100vh', color:'white', maxWidth:440, margin:'0 auto', paddingBottom:90, fontFamily:'system-ui, sans-serif'}}>
      {/* HEADER CON TU LOGO - SIN IMAGEN EXTERNA */}
      <div style={{padding:12, background:'#000', borderBottom:`2px solid ${ROJO}`, display:'flex', alignItems:'center', gap:10, position:'sticky', top:0, zIndex:20}}>
        <div style={{width:38, height:38, background:ROJO, borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:900, fontSize:18}}>⚡</div>
        <div style={{lineHeight:1}}><div style={{fontWeight:900, fontSize:15, letterSpacing:0.5}}>FORZA <span style={{color:ROJO}}>GYM PRO</span></div><div style={{fontSize:8, opacity:0.5, letterSpacing:2}}>GYM PRO</div></div>
        <div style={{marginLeft:'auto', fontSize:8, background:ROJO, padding:'6px 10px', borderRadius:20, fontWeight:900}}>MP {aliasMP}</div>
      </div>

      {tab==='rutinas' && (
        <div style={{padding:12}}>
          <div style={{background:`linear-gradient(90deg, ${ROJO} 0%, #600 100%)`, padding:14, borderRadius:16, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div><div style={{fontSize:10, opacity:0.9}}>🔔 HOY TE TOCA</div><div style={{fontWeight:900, fontSize:18, marginTop:2}}>{rutinas[0]?.nombre || 'LUNES PECHO'}</div><div style={{fontSize:9, opacity:0.7, marginTop:4}}>Alarma activa</div></div>
            <button onClick={()=>{ if(Notification.permission!=='granted') Notification.requestPermission(); else new Notification(`FORZA: Hoy toca ${rutinas[0]?.nombre || 'PECHO'}`)}} style={{background:'white', color:'black', border:'none', padding:'10px 16px', borderRadius:20, fontWeight:900, fontSize:11}}>ALARMA</button>
          </div>

          <div style={{marginTop:12, background:'#111', padding:12, borderRadius:14, border:'1px solid #222'}}>
            <div style={{fontSize:11, fontWeight:900}}>NUEVA RUTINA • MANUAL + IMAGEN PRO AUTO</div>
            <div style={{display:'flex', gap:6, marginTop:8}}>
              <input value={nRut} onChange={e=>setNRut(e.target.value)} placeholder="Nombre: LUNES PECHO" style={{flex:1, background:'#000', border:'1px solid #333', color:'white', padding:11, borderRadius:10, fontSize:12}}/>
              <select value={nDia} onChange={e=>setNDia(e.target.value)} style={{background:'#000', border:'1px solid #333', color:'white', borderRadius:10, fontSize:11, padding:'0 8px'}}><option>Lun</option><option>Mar</option><option>Mie</option><option>Jue</option><option>Vie</option><option>Sab</option><option>Dom</option></select>
            </div>
            <div style={{display:'flex', gap:6, marginTop:6}}>
              <input value={nEj} onChange={e=>setNEj(e.target.value)} placeholder="Ejercicio: Press Banca" style={{flex:1, background:'#000', border:'1px solid #333', color:'white', padding:11, borderRadius:10, fontSize:12}}/>
              <button onClick={()=>{ if(!nRut||!nEj) return; setRutinas([...rutinas,{id:Date.now(), nombre:nRut.toUpperCase(), dia:nDia, ejercicios:[{nombre:nEj, peso:'80', reps:'12', tiempo:60}]}]); setNRut(''); setNEj('') }} style={{background:ROJO, border:'none', color:'white', padding:'0 18px', borderRadius:10, fontWeight:900, fontSize:18}}>+</button>
            </div>
          </div>

          {rutinas.map((r:any)=>(
            <div key={r.id} style={{marginTop:12, background:'#0f0f0f', borderRadius:18, border:'1px solid #1e1e1e', overflow:'hidden'}}>
              <div style={{padding:12, display:'flex', justifyContent:'space-between', alignItems:'center'}}><b style={{fontSize:12}}>{r.nombre} • {r.dia}</b><button onClick={()=>setRutinas(rutinas.filter((x:any)=>x.id!==r.id))} style={{background:'none', border:'none', color:'#666', fontSize:10}}>Borrar / Editar</button></div>
              {r.ejercicios.map((ej:any,i:number)=>(
                <div key={i} style={{display:'flex', gap:12, padding:12, borderTop:'1px solid #151515', background:'#0a0a0a', alignItems:'center'}}>
                  <div style={{width:96, height:96, background:`linear-gradient(135deg, ${ROJO}, #300)`, borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:900, fontSize:12, textAlign:'center', flexShrink:0}}>{getMusculo(ej.nombre)}</div>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:900, fontSize:13}}>{ej.nombre.toUpperCase()}</div>
                    <div style={{fontSize:10, color:ROJO, fontWeight:900, marginTop:4}}>● {getMusculo(ej.nombre)} • MÚSCULO COMPROMETIDO</div>
                    <div style={{display:'flex', gap:6, marginTop:10}}>
                      <input placeholder="80 kg" defaultValue={ej.peso} style={{width:54, background:'#000', border:'1px solid #222', color:'white', padding:6, borderRadius:8, fontSize:11}}/>
                      <input placeholder="12 reps" defaultValue={ej.reps} style={{width:54, background:'#000', border:'1px solid #222', color:'white', padding:6, borderRadius:8, fontSize:11}}/>
                      <div style={{background:'#1a1a1a', padding:'6px 10px', borderRadius:8, fontSize:10}}>⏱ 60s</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {tab==='tienda' && (
        <div style={{padding:12}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}><b style={{fontSize:12}}>TIENDA • GRATIS Y PRO LA VEN</b><button onClick={()=>{ const n=prompt('Nombre producto'); if(!n) return; const tipo=prompt('Tipo: dieta / suplemento / indumentaria / elemento','suplemento')||'suplemento'; const precio=prompt('Precio','0')||'0'; const alias=prompt('Alias MP socio',aliasMP)||aliasMP; setTienda([...tienda,{id:Date.now(), nombre:n, tipo, precio, alias, activo:true, stock:true}]) }} style={{background:ROJO, border:'none', color:'white', padding:'8px 12px', borderRadius:10, fontWeight:900, fontSize:10}}>+ PRODUCTO</button></div>
          {tienda.map((p:any)=>(
            <div key={p.id} style={{marginTop:10, background:'#121212', borderRadius:14, border:'1px solid #222', padding:12, opacity:p.activo?1:0.4}}>
              <div style={{display:'flex', gap:10, alignItems:'center'}}><div style={{width:48, height:48, background:'#000', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20}}>📦</div><div style={{flex:1}}><div style={{fontWeight:800, fontSize:12}}>{p.nombre} <span style={{fontSize:8, background:'#222', padding:'2px 6px', borderRadius:10}}>{p.tipo}</span></div><div style={{fontSize:11, color:ROJO}}>${p.precio} • Alias: {p.alias} • {p.stock?'CON STOCK':'SIN STOCK'}</div></div><button onClick={()=>setTienda(tienda.map((x:any)=> x.id===p.id? {...x, activo:!x.activo, stock:!x.stock}:x))} style={{border:'none', padding:'8px 12px', borderRadius:20, fontSize:10, fontWeight:900, background:p.activo?ROJO:'#333', color:'white'}}>{p.activo?'ACTIVO':'OFF'}</button></div>
              <div style={{display:'flex', gap:6, marginTop:8}}><button onClick={()=>setTienda(tienda.filter((x:any)=>x.id!==p.id))} style={{fontSize:9, background:'none', border:'none', color:'#555'}}>Eliminar producto</button><span style={{fontSize:9, opacity:0.3}}>• Editable • Foto/Video opcional</span></div>
            </div>
          ))}
        </div>
      )}

      {tab==='admin' && (
        <div style={{padding:12}}>
          <b>ADMIN FORZA</b>
          <div style={{marginTop:10, background:'#121212', padding:12, borderRadius:12, border:'1px solid #222'}}>
            <div style={{fontSize:10}}>ALIAS MERCADO PAGO TUYO</div><input value={aliasMP} onChange={e=>setAliasMP(e.target.value)} style={{width:'100%', marginTop:4, background:'#000', border:'1px solid #333', color:'white', padding:8, borderRadius:8}}/>
            <div style={{fontSize:10, marginTop:8}}>PRECIO PRO EDITABLE</div><input value={precioPro} onChange={e=>setPrecioPro(e.target.value)} style={{width:'100%', marginTop:4, background:'#000', border:'1px solid #333', color:'white', padding:8, borderRadius:8}}/>
            <div style={{fontSize:9, opacity:0.5, marginTop:6}}>Pagos directos a tu alias • Débito auto ON • Das/sacas PRO manual</div>
          </div>
          {clientes.map((c:any)=><div key={c.id} style={{marginTop:10, background:'#101010', padding:12, borderRadius:12, borderLeft:`4px solid ${c.activo?ROJO:'#333'}`}}>
            <div style={{display:'flex', justifyContent:'space-between'}}><b style={{fontSize:12}}>{c.nombre} {c.apellido} {c.pro?'👑 PRO':''} <span style={{fontSize:8, background:c.activo?ROJO:'#333', padding:'2px 6px', borderRadius:10}}>{c.activo?'● ACTIVO':'○ INACTIVO'}</span></b><button onClick={()=>setClientes(clientes.map((x:any)=> x.id===c.id? {...x, activo:!x.activo}:x))} style={{fontSize:9, background:'#000', border:'1px solid #333', color:'white', padding:'4px 8px', borderRadius:8}}>Cambiar luz</button></div>
            <div style={{fontSize:10, opacity:0.6, marginTop:4}}>Ingreso: {c.ingreso} • Activo: {c.tiempoActivo} • Inactivo: {c.tiempoInactivo} • {c.peso} • Talla {c.talla} • PRO hasta {c.hasta}</div>
            <div style={{display:'flex', gap:6, marginTop:6}}><button style={{fontSize:9, background:ROJO, border:'none', color:'white', padding:'5px 10px', borderRadius:8}}>Ver fotos/videos progreso</button><button onClick={()=>setClientes(clientes.map((x:any)=> x.id===c.id? {...x, pro:!x.pro}:x))} style={{fontSize:9, background:'#1a1a1a', border:'1px solid #333', color:'white', padding:'5px 10px', borderRadius:8}}>{c.pro?'Quitar PRO':'Dar PRO'}</button></div>
            <div style={{fontSize:8, color:'#f5c518', marginTop:6}}>⚠️ Te faltan 3 días para renovar • Aviso automático • Débito {c.debito?'ACTIVO':'OFF'}</div>
          </div>)}
          <div style={{marginTop:12, background:'#121212', padding:12, borderRadius:12}}><b style={{fontSize:11}}>REVIEWS 5★ • Con tu permiso</b><div style={{fontSize:10, opacity:0.5, marginTop:6}}>{reviews.length===0?'Sin reviews pendientes':'Reviews:'}</div>{reviews.map((r:any)=><div key={r.id} style={{marginTop:8, background:'#000', padding:8, borderRadius:8, fontSize:11}}>{'★'.repeat(r.estrellas)} {r.nombre}: {r.texto}</div>)}</div>
          <button onClick={()=>setShowTyC(true)} style={{width:'100%', marginTop:12, background:'#1a1a1a', border:'1px solid #333', color:'white', padding:10, borderRadius:10, fontSize:10}}>Ver Términos y Condiciones</button>
        </div>
      )}

      {tab==='planes' && (
        <div style={{padding:12}}>
          <div style={{background:'#121212', border:'1px solid #333', borderRadius:16, padding:14}}><b>GRATIS $0</b><div style={{fontSize:11, opacity:0.6, marginTop:4}}>Ve tienda, rutinas básicas</div></div>
          <div style={{marginTop:10, background:'#1a0505', border:`2px solid ${ROJO}`, borderRadius:16, padding:14}}><div style={{background:ROJO, display:'inline-block', fontSize:9, padding:'3px 8px', borderRadius:20, fontWeight:900}}>RECOMENDADO</div><div style={{fontWeight:900, marginTop:6}}>PRO ${precioPro} ARS / mes</div><div style={{fontSize:11, marginTop:4}}>• Todo desbloqueado • MP directo a {aliasMP} • Débito automático • Aviso "faltan X días" • Vos das/sacás PRO manual</div><button onClick={()=>setShowTyC(true)} style={{width:'100%', marginTop:10, background:ROJO, border:'none', color:'white', padding:12, borderRadius:10, fontWeight:900}}>ACTIVAR PRO - PAGAR A {aliasMP}</button></div>
        </div>
      )}

      {showTyC && <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.95)', zIndex:50, padding:20, overflowY:'auto'}}><div style={{background:'#121212', padding:16, borderRadius:16, border:`1px solid ${ROJO}`}}><b>TyC FORZA GYM PRO</b><div style={{fontSize:11, opacity:0.7, marginTop:10, lineHeight:1.5}}>1. Usuario declara nombre, apellido, peso, talla. 2. Pago PRO a {aliasMP} via MP. 3. Admin ve progreso, luces activo/inactivo, tiempos, da/quita PRO. 4. Tienda: activar/desactivar y stock por producto, alias socio, visible gratis y pro. 5. Reviews con aprobación.</div><button onClick={()=>setShowTyC(false)} style={{width:'100%', marginTop:12, background:ROJO, border:'none', color:'white', padding:12, borderRadius:10, fontWeight:900}}>Acepto</button></div></div>}

      <div style={{position:'fixed', bottom:0, left:0, right:0, maxWidth:440, margin:'0 auto', background:'#000', borderTop:'1px solid #1a1a1a', display:'flex', justifyContent:'space-around', padding:'10px 0'}}>
        {[{id:'rutinas', l:'RUTINAS'},{id:'tienda', l:'TIENDA'},{id:'admin', l:'ADMIN'},{id:'planes', l:'PLANES'}].map((t:any)=><button key={t.id} onClick={()=>setTab(t.id)} style={{background:'none', border:'none', color:tab===t.id?ROJO:'#555', fontSize:10, fontWeight:900}}>{t.l}</button>)}
      </div>
    </div>
  )
}
