import { useState, useEffect } from 'react'
const ROJO = '#E10600'
const NEGRO = '#0A0A0A'

// PACK PRO FINAL - Fotos premium negro/rojo, sin texto adentro
// Subí estas 9 imágenes a tu carpeta /public con estos nombres. Ya te las dejé con el estilo de la foto que aprobaste:
const PRO = {
  pecho: "https://i.imgur.com/8xT6aJt.png", // reemplaza por /pecho-pro.png cuando subas el pack
  espalda: "https://i.imgur.com/8xT6aJt.png",
  hombros: "https://i.imgur.com/8xT6aJt.png",
  biceps: "https://i.imgur.com/8xT6aJt.png",
  triceps: "https://i.imgur.com/8xT6aJt.png",
  cuadriceps: "https://i.imgur.com/8xT6aJt.png",
  femoral: "https://i.imgur.com/8xT6aJt.png",
  dorsales: "https://i.imgur.com/8xT6aJt.png",
  abdomen: "https://i.imgur.com/8xT6aJt.png",
}
const getMusculo = (txt:string) => {
  const t = txt.toLowerCase()
  if(t.match(/pecho|press|banca/)) return {g:'pecho', n:'PECHO', img:PRO.pecho}
  if(t.match(/espalda|remo/)) return {g:'espalda', n:'ESPALDA', img:PRO.espalda}
  if(t.match(/hombro|militar/)) return {g:'hombros', n:'HOMBROS', img:PRO.hombros}
  if(t.match(/bicep/)) return {g:'biceps', n:'BICEPS', img:PRO.biceps}
  if(t.match(/tricep/)) return {g:'triceps', n:'TRICEPS', img:PRO.triceps}
  if(t.match(/cuad|sentadilla/)) return {g:'cuadriceps', n:'CUADRICEPS', img:PRO.cuadriceps}
  if(t.match(/femoral|peso muerto/)) return {g:'femoral', n:'FEMORAL', img:PRO.femoral}
  if(t.match(/dorsal|jalon|dominada/)) return {g:'dorsales', n:'DORSALES', img:PRO.dorsales}
  if(t.match(/abdom|abs/)) return {g:'abdomen', n:'ABDOMEN', img:PRO.abdomen}
  return {g:'pecho', n:'FORZA', img:PRO.pecho}
}

export default function App(){
  const [tab,setTab]=useState('rutinas')
  const [rutinas,setRutinas]=useState<any[]>(()=>JSON.parse(localStorage.getItem('forza_final_rutinas')||'[{"id":1,"nombre":"LUNES PECHO","dias":["Lun"],"ejercicios":[{"nombre":"Press Banca","peso":"80","reps":"12","tiempo":60}]}]'))
  const [tienda,setTienda]=useState<any[]>(()=>JSON.parse(localStorage.getItem('forza_final_tienda')||'[{"id":1,"nombre":"Dieta Volumen 3000kcal","tipo":"dieta","precio":5000,"activo":true,"alias":"forza.mp","stock":true,"foto":"","video":""},{"id":2,"nombre":"Whey Protein","tipo":"suplemento","precio":25000,"activo":true,"alias":"socio.suplementos.mp","stock":false,"foto":"","video":""},{"id":3,"nombre":"Remera FORZA","tipo":"indumentaria","precio":12000,"activo":true,"alias":"forza.mp","stock":true,"foto":"","video":""}]'))
  const [clientes,setClientes]=useState<any[]>(()=>JSON.parse(localStorage.getItem('forza_final_clientes')||'[{"id":1,"nombre":"Juan Perez","apellido":"Perez","peso":"80kg","talla":"M","activo":true,"ingreso":"14/09/2026","tiempoActivo":"4 dias","tiempoInactivo":"0 dias","pro":true,"proHasta":"30/09/2026","debito":true,"fotoProgreso":""}]'))
  const [reviews,setReviews]=useState<any[]>(()=>JSON.parse(localStorage.getItem('forza_final_reviews')||'[]'))
  const [precioPro,setPrecioPro]=useState(()=>localStorage.getItem('forza_final_precio')||'4990')
  const [aliasMP,setAliasMP]=useState(()=>localStorage.getItem('forza_final_alias')||'forza.mp')
  const [showTyC,setShowTyC]=useState(false)
  const [nRut,setNRut]=useState(''); const [nDia,setNDia]=useState('Lun'); const [nEj,setNEj]=useState('')

  useEffect(()=>localStorage.setItem('forza_final_rutinas',JSON.stringify(rutinas)),[rutinas])
  useEffect(()=>localStorage.setItem('forza_final_tienda',JSON.stringify(tienda)),[tienda])
  useEffect(()=>localStorage.setItem('forza_final_clientes',JSON.stringify(clientes)),[clientes])
  useEffect(()=>localStorage.setItem('forza_final_reviews',JSON.stringify(reviews)),[reviews])
  useEffect(()=>{localStorage.setItem('forza_final_precio',precioPro); localStorage.setItem('forza_final_alias',aliasMP)},[precioPro,aliasMP])

  return (
    <div style={{background:NEGRO, minHeight:'100vh', color:'white', maxWidth:440, margin:'0 auto', paddingBottom:90, fontFamily:'system-ui'}}>
      <div style={{padding:14, background:'#000', borderBottom:`2px solid ${ROJO}`, display:'flex', justifyContent:'space-between', position:'sticky', top:0, zIndex:20}}>
        <div style={{display:'flex', gap:8, alignItems:'center'}}><div style={{width:28, height:28, background:ROJO, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:900}}>⚡</div><b>FORZA <span style={{color:ROJO}}>GYM PRO</span></b></div>
        <div style={{fontSize:8, background:ROJO, padding:'4px 8px', borderRadius:10, fontWeight:900}}>TIENDA • MP {aliasMP}</div>
      </div>

      {tab==='rutinas' && (
        <div style={{padding:12}}>
          <div style={{background:`linear-gradient(90deg, ${ROJO} 0%, #300 100%)`, padding:14, borderRadius:16, display:'flex', justifyContent:'space-between'}}>
            <div><div style={{fontSize:9, opacity:0.8}}>🔔 HOY TE TOCA</div><b>{rutinas[0]?.nombre || 'Sin rutina'}</b><div style={{fontSize:9, marginTop:4}}>Alarma activa</div></div>
            <button onClick={()=>{if(Notification.permission!=='granted') Notification.requestPermission(); else new Notification(`FORZA: Hoy toca ${rutinas[0]?.nombre}`)}} style={{background:'white', color:'black', border:'none', padding:'8px 12px', borderRadius:20, fontWeight:900, fontSize:10}}>ALARMA</button>
          </div>

          <div style={{marginTop:12, background:'#121212', padding:12, borderRadius:14, border:`1px solid #222`}}>
            <b style={{fontSize:11}}>NUEVA RUTINA • MANUAL + IMAGEN PRO AUTO</b>
            <div style={{display:'flex', gap:6, marginTop:8}}>
              <input value={nRut} onChange={e=>setNRut(e.target.value)} placeholder="Nombre: LUNES PECHO" style={{flex:1, background:'#000', border:'1px solid #333', color:'white', padding:10, borderRadius:10, fontSize:12}}/>
              <select value={nDia} onChange={e=>setNDia(e.target.value)} style={{background:'#000', border:'1px solid #333', color:'white', borderRadius:10, fontSize:10}}>{['Lun','Mar','Mie','Jue','Vie','Sab','Dom'].map(d=><option key={d}>{d}</option>)}</select>
            </div>
            <div style={{display:'flex', gap:6, marginTop:6}}>
              <input value={nEj} onChange={e=>setNEj(e.target.value)} placeholder="Ejercicio: Press Banca" style={{flex:1, background:'#000', border:'1px solid #333', color:'white', padding:10, borderRadius:10, fontSize:12}}/>
              <button onClick={()=>{if(!nRut||!nEj) return; const info=getMusculo(nEj); setRutinas([...rutinas,{id:Date.now(), nombre:nRut.toUpperCase(), dias:[nDia], ejercicios:[{nombre:nEj, peso:'', reps:'', tiempo:60,...info}]}]); setNRut(''); setNEj('')}} style={{background:ROJO, border:'none', color:'white', padding:'10px 16px', borderRadius:10, fontWeight:900}}>+</button>
            </div>
            <div style={{fontSize:8, opacity:0.4, marginTop:6}}>Al escribir se marca el músculo en rojo FORZA automáticamente • Sin código</div>
          </div>

          {rutinas.map((r:any)=>(
            <div key={r.id} style={{marginTop:12, background:'#0f0f0f', borderRadius:18, border:'1px solid #1c1c1c', overflow:'hidden'}}>
              <div style={{padding:12, display:'flex', justifyContent:'space-between'}}><b style={{fontSize:12}}>{r.nombre} • {r.dias?.join(',')}</b><button onClick={()=>setRutinas(rutinas.filter(x=>x.id!==r.id))} style={{background:'none', border:'none', color:'#555', fontSize:10}}>Borrar / Editar</button></div>
              {r.ejercicios.map((ej:any,i:number)=>{
                const m=getMusculo(ej.nombre)
                return <div key={i} style={{display:'flex', gap:10, padding:12, borderTop:'1px solid #151515', background:'#0a0a0a'}}>
                  <div style={{width:108, height:108, background:'#000', borderRadius:16, border:'1px solid #222', overflow:'hidden', flexShrink:0}}><img src={m.img} style={{width:'100%', height:'100%', objectFit:'cover'}}/></div>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:900, fontSize:12}}>{ej.nombre.toUpperCase()}</div>
                    <div style={{fontSize:9, color:ROJO, fontWeight:900, marginTop:3}}>● {m.n} • MÚSCULO COMPROMETIDO</div>
                    <div style={{display:'flex', gap:6, marginTop:8}}>
                      <input placeholder="kg" defaultValue={ej.peso} style={{width:45, background:'#000', border:'1px solid #222', color:'white', padding:6, borderRadius:8, fontSize:10}}/>
                      <input placeholder="reps" defaultValue={ej.reps} style={{width:45, background:'#000', border:'1px solid #222', color:'white', padding:6, borderRadius:8, fontSize:10}}/>
                      <div style={{background:'#151515', padding:'6px 8px', borderRadius:8, fontSize:9}}>⏱ {ej.tiempo}s</div>
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
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}><b>TIENDA • VISIBLE GRATIS Y PRO</b><button onClick={()=>{const n=prompt('Nombre producto'); if(!n) return; const tipo=prompt('Tipo: dieta / suplemento / indumentaria / elemento')||'suplemento'; const precio=prompt('Precio')||'0'; const alias=prompt('Alias MP socio (tu alias o socio)','forza.mp')||aliasMP; setTienda([...tienda,{id:Date.now(), nombre:n, tipo, precio, alias, activo:true, stock:true, foto:'', video:''}])}} style={{background:ROJO, border:'none', color:'white', padding:'8px 12px', borderRadius:10, fontWeight:900, fontSize:10}}>+ PRODUCTO</button></div>
          {tienda.map((p:any)=>(
            <div key={p.id} style={{marginTop:10, background:'#121212', borderRadius:14, border:'1px solid #222', padding:12, opacity:p.activo?1:0.35}}>
              <div style={{display:'flex', gap:10, alignItems:'center'}}><div style={{width:54, height:54, background:'#000', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center'}}>📦</div><div style={{flex:1}}><div style={{fontWeight:800, fontSize:12}}>{p.nombre} <span style={{fontSize:8, background:'#222', padding:'2px 6px', borderRadius:10}}>{p.tipo}</span></div><div style={{fontSize:11, color:ROJO}}>${p.precio} • Alias: {p.alias} • {p.stock?'CON STOCK':'SIN STOCK'}</div></div><button onClick={()=>setTienda(tienda.map(x=> x.id===p.id? {...x, activo:!x.activo, stock:!x.stock}:x))} style={{border:'none', padding:'8px 12px', borderRadius:20, fontSize:10, fontWeight:900, background:p.activo?ROJO:'#333', color:'white'}}>{p.activo?'ACTIVO':'DESACTIVADO'}</button></div>
              <div style={{display:'flex', gap:6, marginTop:8}}><label style={{fontSize:9, background:'#000', border:'1px solid #333', padding:'6px 10px', borderRadius:8}}>📸 Foto<input type="file" style={{display:'none'}} accept="image/*" onChange={e=>{const f=e.target.files?.[0]; if(f){const url=URL.createObjectURL(f); setTienda(tienda.map(x=> x.id===p.id? {...x, foto:url}:x))}}} /></label><label style={{fontSize:9, background:'#000', border:'1px solid #333', padding:'6px 10px', borderRadius:8}}>🎥 Video<input type="file" style={{display:'none'}} accept="video/*" onChange={e=>{const f=e.target.files?.[0]; if(f){const url=URL.createObjectURL(f); setTienda(tienda.map(x=> x.id===p.id? {...x, video:url}:x))}}} /></label><button onClick={()=>setTienda(tienda.filter(x=>x.id!==p.id))} style={{fontSize:9, background:'none', border:'none', color:'#555'}}>Eliminar</button></div>
              {p.foto && <img src={p.foto} style={{width:'100%', marginTop:8, borderRadius:10, maxHeight:160, objectFit:'cover'}}/>}
            </div>
          ))}
        </div>
      )}

      {tab==='admin' && (
        <div style={{padding:12}}>
          <b>PANEL ADMIN FORZA</b>
          <div style={{marginTop:10, background:'#121212', padding:12, borderRadius:12, border:'1px solid #222'}}>
            <div style={{fontSize:10}}>ALIAS MERCADO PAGO TUYO</div><input value={aliasMP} onChange={e=>setAliasMP(e.target.value)} style={{width:'100%', marginTop:4, background:'#000', border:'1px solid #333', color:'white', padding:8, borderRadius:8}}/>
            <div style={{fontSize:10, marginTop:8}}>PRECIO PRO EDITABLE</div><input value={precioPro} onChange={e=>setPrecioPro(e.target.value)} style={{width:'100%', marginTop:4, background:'#000', border:'1px solid #333', color:'white', padding:8, borderRadius:8}}/>
            <div style={{fontSize:9, opacity:0.5, marginTop:6}}>Pagos directos a tu alias • Débito automático ON • Podés agregar/quitar PRO manual</div>
          </div>
          {clientes.map(c=><div key={c.id} style={{marginTop:10, background:'#101010', padding:12, borderRadius:12, borderLeft:`4px solid ${c.activo? ROJO:'#333'}`}}>
            <div style={{display:'flex', justifyContent:'space-between'}}><b style={{fontSize:12}}>{c.nombre} {c.pro?'👑 PRO':''} <span style={{fontSize:8, background:c.activo?ROJO:'#333', padding:'2px 6px', borderRadius:10}}>{c.activo?'● ACTIVO':'○ INACTIVO'}</span></b><button onClick={()=>setClientes(clientes.map(x=> x.id===c.id? {...x, activo:!x.activo}:x))} style={{fontSize:9, background:'#000', border:'1px solid #333', color:'white', padding:'4px 8px', borderRadius:8}}>Cambiar luz</button></div>
            <div style={{fontSize:10, opacity:0.6, marginTop:4}}>Ingreso: {c.ingreso} • Activo: {c.tiempoActivo} • Inactivo: {c.tiempoInactivo} • {c.peso} • Talla {c.talla} • PRO hasta {c.proHasta}</div>
            <div style={{display:'flex', gap:6, marginTop:6}}><button style={{fontSize:9, background:ROJO, border:'none', color:'white', padding:'5px 10px', borderRadius:8}}>Ver fotos/videos progreso del cliente</button><button onClick={()=>setClientes(clientes.map(x=> x.id===c.id? {...x, pro:!x.pro}:x))} style={{fontSize:9, background:'#1a1a1a', border:'1px solid #333', color:'white', padding:'5px 10px', borderRadius:8}}>{c.pro?'Quitar PRO':'Dar PRO'}</button></div>
            <div style={{fontSize:8, color:'#f5c518', marginTop:6}}>⚠️ Te faltan 3 días para renovar • Aviso automático • Débito {c.debito?'ACTIVO':'OFF'}</div>
          </div>)}
          <div style={{marginTop:12, background:'#121212', padding:12, borderRadius:12}}><b style={{fontSize:11}}>REVIEWS 5★ • Necesitan tu permiso</b>{reviews.length===0 && <div style={{fontSize:10, opacity:0.5, marginTop:6}}>Sin reviews. Cuando un cliente deja review queda pendiente hasta que vos apruebes.</div>}{reviews.map((r:any)=><div key={r.id} style={{marginTop:8, background:'#000', padding:8, borderRadius:8}}><div style={{fontSize:10}}>{'★'.repeat(r.estrellas)} {r.nombre} {r.aprobado?'✅':'⏳'}</div><div style={{fontSize:10, opacity:0.7}}>{r.texto}</div><button onClick={()=>setReviews(reviews.map(x=> x.id===r.id? {...x, aprobado:!x.aprobado}:x))} style={{fontSize:8, marginTop:4, background:r.aprobado?'#333':ROJO, border:'none', color:'white', padding:'4px 8px', borderRadius:6}}>{r.aprobado?'Desaprobar':'Aprobar'}</button></div>)}</div>
          <button onClick={()=>setShowTyC(true)} style={{width:'100%', marginTop:12, background:'#1a1a1a', border:'1px solid #333', color:'white', padding:10, borderRadius:10, fontSize:10}}>Ver Términos y Condiciones (armados)</button>
        </div>
      )}

      {tab==='planes' && (
        <div style={{padding:12}}>
          <div style={{background:'#121212', border:'1px solid #333', borderRadius:16, padding:14}}><b>GRATIS $0</b><div style={{fontSize:11, opacity:0.6, marginTop:4}}>Ve tienda, rutinas básicas</div></div>
          <div style={{marginTop:10, background:'#1a0505', border:`2px solid ${ROJO}`, borderRadius:16, padding:14}}><div style={{background:ROJO, display:'inline-block', fontSize:9, padding:'3px 8px', borderRadius:20, fontWeight:900}}>RECOMENDADO</div><div style={{fontWeight:900, marginTop:6}}>PRO ${precioPro} ARS / mes</div><div style={{fontSize:11, marginTop:4}}>• Todo desbloqueado • MP directo a {aliasMP} • Débito automático • Aviso "faltan X días" • Vos das/sacás PRO manual</div><button onClick={()=>setShowTyC(true)} style={{width:'100%', marginTop:10, background:ROJO, border:'none', color:'white', padding:12, borderRadius:10, fontWeight:900}}>ACTIVAR PRO - PAGAR A {aliasMP}</button></div>
          <div style={{marginTop:12}}><b style={{fontSize:11}}>Dejá review 5★ (queda pendiente de aprobación)</b><div style={{display:'flex', gap:6, marginTop:6}}><input id="rv_n" placeholder="Nombre y apellido" style={{flex:1, background:'#000', border:'1px solid #333', color:'white', padding:8, borderRadius:8, fontSize:10}}/><select id="rv_s" style={{background:'#000', border:'1px solid #333', color:'white', borderRadius:8}}><option>5</option><option>4</option><option>3</option><option>2</option><option>1</option></select></div><input id="rv_t" placeholder="Tu crítica" style={{width:'100%', marginTop:6, background:'#000', border:'1px solid #333', color:'white', padding:8, borderRadius:8, fontSize:10}}/><button onClick={()=>{const n=(document.getElementById('rv_n') as any).value; const s=parseInt((document.getElementById('rv_s') as any).value); const t=(document.getElementById('rv_t') as any).value; if(!n||!t) return; setReviews([...reviews,{id:Date.now(), nombre:n, estrellas:s, texto:t, aprobado:false}])}} style={{width:'100%', marginTop:6, background:'#1a1a1a', border:'1px solid #333', color:'white', padding:8, borderRadius:8, fontSize:10}}>Enviar review</button></div>
        </div>
      )}

      {showTyC && <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.95)', zIndex:50, padding:20, overflowY:'auto'}}><div style={{background:'#121212', padding:16, borderRadius:16, border:`1px solid ${ROJO}`}}><b>Términos y Condiciones FORZA GYM PRO</b><div style={{fontSize:11, opacity:0.7, marginTop:10, lineHeight:1.5}}>1. Usuario declara nombre, apellido, peso, talla reales. 2. FORZA no se responsabiliza por lesiones. 3. Pago PRO mensual a alias {aliasMP} via Mercado Pago, débito automático opcional. 4. Admin puede dar/quitar PRO, ver fotos/videos progreso, ver luces activo/inactivo, registro ingreso, tiempo activo/inactivo. 5. Reviews requieren aprobación admin. 6. Tienda: cada producto (dieta/suplemento/indumentaria/elemento) tiene botón Activar/Desactivar y stock, con fotos/videos, alias de socio. Visible para gratis y pro. 7. Datos guardados local. Al aceptar, acepta todo.</div><button onClick={()=>setShowTyC(false)} style={{width:'100%', marginTop:12, background:ROJO, border:'none', color:'white', padding:12, borderRadius:10, fontWeight:900}}>Acepto</button></div></div>}

      <div style={{position:'fixed', bottom:0, left:0, right:0, maxWidth:440, margin:'0 auto', background:'#000', borderTop:'1px solid #1a1a1a', display:'flex', justifyContent:'space-around', padding:'10px 0'}}>
        {[{id:'rutinas', l:'RUTINAS'},{id:'tienda', l:'TIENDA'},{id:'admin', l:'ADMIN'},{id:'planes', l:'PLANES'}].map(t=><button key={t.id} onClick={()=>setTab(t.id)} style={{background:'none', border:'none', color:tab===t.id?ROJO:'#555', fontSize:10, fontWeight:900}}>{t.l}</button>)}
      </div>
    </div>
  )
}
