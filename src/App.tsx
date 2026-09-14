import { useState, useEffect } from 'react'

type Ejercicio = { id:string, nombre:string, nivel:string, musculos:string[], tiempo:number, peso:number }
type Producto = { id:string, nombre:string, cat:string, precio:string, activo:boolean, img:string, alias:string, tel:string, tipo:'dieta'|'suplemento'|'indumentaria'|'deportivo' }

const NIVELES = [
  { id:'prin', nombre:'PRINCIPIANTE', bg:'#ff1a1a', card:'#ffffff', label:'Blanco - colores app' },
  { id:'medio', nombre:'MEDIO', bg:'#a50000', card:'#d1d1d1', label:'Gris - color fuerte' },
  { id:'avanz', nombre:'AVANZADO', bg:'linear-gradient(135deg,#6b7280,#1e3a8a)', card:'#60a5fa', label:'Azul - gris+azul metalizado' },
  { id:'extr', nombre:'EXTREMO', bg:'linear-gradient(135deg,#7c3aed,#000000)', card:'#facc15', label:'Dorado - violeta+negro' },
]

export default function App(){
  const [tab,setTab]=useState('Shop')
  const [cat,setCat]=useState('ALL')
  const [nivel,setNivel]=useState('prin')
  const [q,setQ]=useState('')
  const [ejercicios,setEjercicios]=useState<Ejercicio[]>(()=>JSON.parse(localStorage.getItem('fg-ex')||'[]'))
  const [productos,setProductos]=useState<Producto[]>(()=>JSON.parse(localStorage.getItem('fg-prod')||'[]'))
  const [precioPro,setPrecioPro]=useState(()=>localStorage.getItem('fg-precio')||'15000')
  const [socios,setSocios]=useState<string[]>(()=>JSON.parse(localStorage.getItem('fg-soc')||'[]'))
  const [alerta,setAlerta]=useState('')
  const [nEj,setNEj]=useState(''); const [nTiempo,setNTiempo]=useState(60)
  const [nProd,setNProd]=useState({nombre:'',cat:'SUPPLEMENTS',precio:'',alias:'',tel:''})
  const [chat,setChat]=useState(''); const [chatR,setChatR]=useState('Hola, soy FORZA IA. Preguntame: rutina pecho, espalda, dieta, descanso.')

  useEffect(()=>localStorage.setItem('fg-ex',JSON.stringify(ejercicios)),[ejercicios])
  useEffect(()=>localStorage.setItem('fg-prod',JSON.stringify(productos)),[productos])

  const musculos = (n:string)=>{
    const s=n.toLowerCase()
    if(s.includes('pecho')||s.includes('press')||s.includes('banca')) return ['PECHO','TRICEPS','HOMBRO']
    if(s.includes('sentadilla')||s.includes('pierna')) return ['CUADRICEPS','GLUTEO']
    if(s.includes('espalda')||s.includes('dominada')||s.includes('remo')) return ['DORSAL','BICEPS']
    return ['BICEPS','ANTEBRAZO']
  }

  const addEjercicio=()=>{
    if(!nEj) return
    const m=musculos(nEj)
    setEjercicios([...ejercicios,{id:Date.now()+'',nombre:nEj,nivel,musculos:m,tiempo:nTiempo,peso:0}])
    setNEj(''); setAlerta('Ejercicio agregado con stick figure + músculos rojo FORZA'); setTimeout(()=>setAlerta(''),3000)
  }

  const filtered = productos.filter(p=>{
    const c = cat==='ALL' || p.cat===cat
    return c && p.nombre.toLowerCase().includes(q.toLowerCase()) && p.activo // solo activos se ven en Shop
  })

  return (
    <div style={{minHeight:'100vh',background:'#070707',color:'white',fontFamily:'system-ui',paddingBottom:85}}>
      {/* HEADER COMO FOTO */}
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:12,background:'#0a0a0a',position:'sticky',top:0,zIndex:20,borderBottom:'1px solid #1a1a1a'}}>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <div style={{width:44,height:44,borderRadius:50,border:'2px solid #ff1a1a',background:'black',display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden'}}>
            <img src="/logo.png" alt="logo" style={{width:'100%',height:'100%',objectFit:'cover'}} onError={e=> (e.target as any).style.display='none'}/>
            <span style={{fontWeight:900,color:'#ff1a1a'}}>⚡</span>
          </div>
          <div><div style={{fontWeight:900,fontSize:24,lineHeight:1}}>FOR<span style={{color:'#ff1a1a'}}>ZA</span></div><div style={{fontSize:11,opacity:0.5,letterSpacing:3,marginTop:-4}}>gym pro</div></div>
        </div>
        <div style={{display:'flex',gap:14,fontSize:20,opacity:0.8}}>🔍 🛒 👤</div>
      </div>

      {alerta && <div style={{background:'#ff1a1a',padding:8,textAlign:'center',fontWeight:900,fontSize:12}}>⚠️ {alerta}</div>}

      {/* SEARCH */}
      <div style={{padding:'12px 16px'}}>
        <div style={{display:'flex',alignItems:'center',gap:10,background:'#1e1e1e',border:'1.5px solid #ff1a1a',borderRadius:24,padding:'12px 16px'}}>
          <span>🔍</span><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search products..." style={{flex:1,background:'transparent',border:0,color:'white',outline:'none'}}/>
        </div>
      </div>

      {/* CATS */}
      <div style={{display:'flex',gap:8,padding:'0 16px 12px',overflowX:'auto'}}>
        {['ALL','DIET','SUPPLEMENTS','APPAREL','EQUIPMENT'].map(c=><button key={c} onClick={()=>setCat(c)} style={{background:cat===c?'#ff1a1a':'#2a2a2a',border:0,color:'white',borderRadius:20,padding:'8px 16px',fontWeight:900,fontSize:12,whiteSpace:'nowrap'}}>{c}</button>)}
      </div>

      {tab==='Shop' && (
        <div style={{padding:12,display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
          {filtered.length===0? <div style={{gridColumn:'1/3',border:'1px dashed #333',borderRadius:16,padding:40,textAlign:'center',opacity:0.35}}>Tienda vacía. Los productos aparecen acá solo cuando los subís y ponés ACTIVE.<br/>Gratis y Pro la ven.</div> :
            filtered.map(p=>(
              <div key={p.id} style={{background:'#121212',border:'1.5px solid #ff1a1a',borderRadius:18,padding:10,position:'relative',textAlign:'center'}}>
                <div style={{position:'absolute',top:8,right:8,background:'#5a0000',fontSize:9,padding:'4px 8px',borderRadius:8,fontWeight:900}}>{p.cat}</div>
                <div style={{height:120,display:'flex',alignItems:'center',justifyContent:'center',marginTop:10}}>{p.img?<img src={p.img} style={{maxHeight:'100%',objectFit:'contain'}}/>:<span style={{opacity:0.2}}>Sin imagen</span>}</div>
                <div style={{fontWeight:900,fontSize:12,marginTop:8}}>{p.nombre.toUpperCase()}</div>
                <div style={{color:'#ff1a1a',fontWeight:900,marginTop:2}}>€{p.precio}</div>
                <div style={{fontSize:9,opacity:0.5,marginTop:2}}>Socio: {p.alias||'vos'} Tel: {p.tel||'-'}</div>
                <div style={{display:'flex',gap:6,marginTop:10}}>
                  <div style={{flex:1,background:p.activo?'#00c851':'#ff1a1a',borderRadius:8,padding:'8px 0',fontWeight:900,fontSize:12}}>{p.activo?'ACTIVE':'DESACTIVADO'}</div>
                </div>
              </div>
            ))
          }
        </div>
      )}

      {tab==='Categories' && (
        <div style={{padding:12}}>
          <div style={{background:NIVELES.find(n=>n.id===nivel)?.bg as any,padding:14,borderRadius:14,marginBottom:12}}><small>🔔 ALARMA HOY TE TOCA</small><div style={{fontWeight:900,fontSize:16}}>{NIVELES.find(n=>n.id===nivel)?.nombre} - {ejercicios.filter(e=>e.nivel===nivel).length} ejercicios</div><small style={{opacity:0.8}}>Principiante Blanco | Medio Gris | Avanzado Azul | Extremo Dorado</small></div>
          <div style={{display:'flex',gap:6,overflowX:'auto',marginBottom:12}}>{NIVELES.map(n=><button key={n.id} onClick={()=>setNivel(n.id)} style={{minWidth:110,padding:10,borderRadius:12,background:n.bg as any,border:nivel===n.id?'2px solid white':'1px solid #333',fontWeight:900,fontSize:10}}>{n.nombre}<br/><span style={{background:n.card,color:'black',padding:'2px 6px',borderRadius:4,fontSize:8}}>{n.label}</span></button>)}</div>

          <div style={{background:'#1a1a1a',borderRadius:12,padding:10}}>
            <b style={{fontSize:12}}>AGREGAR EJERCICIO MANUAL - STICK FIGURE + MÚSCULOS ROJO FORZA</b>
            <div style={{display:'flex',gap:6,marginTop:8}}>
              <input value={nEj} onChange={e=>setNEj(e.target.value)} placeholder="Ej: Press Banca" style={{flex:1,background:'#0e0e0e',border:'1px solid #333',borderRadius:8,padding:10,color:'white'}}/>
              <input type="number" value={nTiempo} onChange={e=>setNTiempo(Number(e.target.value))} style={{width:70,background:'#0e0e0e',border:'1px solid #333',borderRadius:8,padding:10,color:'white'}}/>
              <button onClick={addEjercicio} style={{background:'#ff1a1a',border:0,borderRadius:8,padding:'0 14px',fontWeight:900}}>+</button>
            </div>
            <small style={{opacity:0.5}}>Al agregar, aparece automáticamente imagen en movimiento + músculos marcados en rojo. Opción subir video propio / Instagram</small>
          </div>

          {ejercicios.filter(e=>e.nivel===nivel).map(e=>(
            <div key={e.id} style={{background:NIVELES.find(n=>n.id===e.nivel)?.card as any,color:'black',borderRadius:12,padding:10,marginTop:8,display:'flex',gap:10}}>
              <div style={{width:70,height:70,background:'white',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',fontSize:30,animation:'pulse 1s infinite'}}>🏋️</div>
              <div style={{flex:1}}><b>{e.nombre}</b> <small style={{background:'black',color:'white',padding:'2px 6px',borderRadius:4}}>{e.tiempo}s</small><div style={{marginTop:4,display:'flex',flexWrap:'wrap',gap:3}}>{e.musculos.map(m=><span key={m} style={{background:'#ff1a1a',color:'white',fontSize:9,padding:'2px 6px',borderRadius:4}}>{m}</span>)}</div><small style={{fontSize:9}}>Control peso • Series • Tiempo • Video opcional</small></div>
              <button onClick={()=>setEjercicios(ejercicios.filter(x=>x.id!==e.id))} style={{background:'black',color:'white',border:0,borderRadius:6,height:26}}>x</button>
            </div>
          ))}

          <div style={{background:'#111',border:'1px solid #ff1a1a',borderRadius:12,padding:10,marginTop:16}}>
            <b>💬 AUTOAYUDA FORZA GYM PRO (no WhatsApp personal)</b>
            <div style={{background:'black',padding:10,borderRadius:8,margin:'8px 0',fontSize:12}}>{chatR}</div>
            <div style={{display:'flex',gap:6}}><input value={chat} onChange={e=>setChat(e.target.value)} placeholder="Escribí duda..." style={{flex:1,background:'#0e0e0e',border:'1px solid #333',borderRadius:8,padding:10,color:'white'}}/><button onClick={()=>{const q=chat.toLowerCase(); if(q.includes('pecho'))setChatR('Pecho: 4x12 press, músculo PECHO en ROJO'); else if(q.includes('dieta'))setChatR('Dieta en Tienda > DIET'); else setChatR(`Hoy ${NIVELES.find(n=>n.id===nivel)?.nombre}: ${ejercicios.filter(e=>e.nivel===nivel).length} ejercicios`); setChat('')}} style={{background:'#ff1a1a',border:0,borderRadius:8,padding:'0 12px'}}>➤</button></div>
          </div>
        </div>
      )}

      {tab==='Account' && (
        <div style={{padding:12}}>
          <div style={{background:'#1a1a1a',borderRadius:12,padding:12,marginBottom:10}}>
            <b>TIENDA - SUBIR FOTO/VIDEO POR PRODUCTO + SOCIO + TEL COMERCIAL</b>
            <input value={nProd.nombre} onChange={e=>setNProd({...nProd,nombre:e.target.value})} placeholder="Nombre producto" style={{width:'100%',marginTop:8,background:'#0e0e0e',border:'1px solid #333',borderRadius:8,padding:10,color:'white'}}/>
            <div style={{display:'flex',gap:6,marginTop:6}}>
              <select value={nProd.cat} onChange={e=>setNProd({...nProd,cat:e.target.value})} style={{flex:1,background:'#0e0e0e',border:'1px solid #333',borderRadius:8,padding:10,color:'white'}}><option>DIET</option><option>SUPPLEMENTS</option><option>APPAREL</option><option>EQUIPMENT</option></select>
              <input value={nProd.precio} onChange={e=>setNProd({...nProd,precio:e.target.value})} placeholder="€" style={{width:80,background:'#0e0e0e',border:'1px solid #333',borderRadius:8,padding:10,color:'white'}}/>
            </div>
            <input value={nProd.alias} onChange={e=>setNProd({...nProd,alias:e.target.value})} placeholder="Alias socio vendedor (FORZA o Tienda)" style={{width:'100%',marginTop:6,background:'#0e0e0e',border:'1px solid #333',borderRadius:8,padding:10,color:'white'}}/>
            <input value={nProd.tel} onChange={e=>setNProd({...nProd,tel:e.target.value})} placeholder="Tel comercial tienda (no tu personal)" style={{width:'100%',marginTop:6,background:'#0e0e0e',border:'1px solid #333',borderRadius:8,padding:10,color:'white'}}/>
            <input type="file" accept="image/*,video/*" onChange={e=>{const file=e.target.files?.[0]; if(!file)return; const r=new FileReader(); r.onload=()=>{const img=r.result as string; (nProd as any).img=img; setNProd({...nProd} as any)}; r.readAsDataURL(file)}} style={{marginTop:8,width:'100%'}}/>
            <button onClick={()=>{if(!nProd.nombre)return; setProductos([...productos,{id:Date.now()+'',nombre:nProd.nombre,cat:nProd.cat,precio:nProd.precio,activo:false,img:(nProd as any).img||'',alias:nProd.alias,tel:nProd.tel,tipo:'suplemento' as any}]); setNProd({nombre:'',cat:'SUPPLEMENTS',precio:'',alias:'',tel:''}); setAlerta('Producto creado DESACTIVADO - actívalo cuando tengas stock')}} style={{width:'100%',marginTop:8,background:'#ff1a1a',border:0,borderRadius:8,padding:10,fontWeight:900}}>GUARDAR - QUEDA DESACTIVADO</button>
            <div style={{marginTop:10}}>{productos.map(p=><div key={p.id} style={{display:'flex',justifyContent:'space-between',alignItems:'center',background:'#0e0e0e',padding:8,borderRadius:8,marginTop:6}}><span style={{fontSize:12}}>{p.nombre} - {p.cat} - €{p.precio}</span><div style={{display:'flex',gap:6}}><button onClick={()=>setProductos(productos.map(x=>x.id===p.id?{...x,activo:!x.activo}:x))} style={{background:p.activo?'#00c851':'#ff1a1a',border:0,borderRadius:6,padding:'4px 10px',color:'white',fontSize:10,fontWeight:900}}>{p.activo?'ACTIVE':'DESACTIVADO'}</button><button onClick={()=>setProductos(productos.filter(x=>x.id!==p.id))} style={{background:'#333',border:0,borderRadius:6,color:'white'}}>x</button></div></div>)}</div>
          </div>

          <div style={{background:'#1a1a1a',borderRadius:12,padding:12,marginBottom:10}}>
            <b>PRECIO PRO EDITABLE + MP + DÉBITO AUTOMÁTICO</b>
            <div style={{display:'flex',gap:6,marginTop:8}}><input value={precioPro} onChange={e=>setPrecioPro(e.target.value)} style={{flex:1,background:'#0e0e0e',border:'1px solid #333',borderRadius:8,padding:10,color:'white'}}/><a href="https://link.mercadopago.com.ar/forzagympro" target="_blank" style={{background:'#009ee3',color:'white',padding:'10px 14px',borderRadius:8,textDecoration:'none',fontWeight:900}}>LINK MP</a></div>
            <small style={{opacity:0.6}}>Aviso: Te faltan X días para renovar + opción débito automático mensual</small>
          </div>

          <div style={{background:'#1a1a1a',borderRadius:12,padding:12,marginBottom:10}}>
            <b>SOCIOS FORZA / TIENDA - ALERTA CUANDO CAMBIAN</b>
            <div style={{display:'flex',gap:6,marginTop:8}}><input id="socIn" placeholder="Alias socio" style={{flex:1,background:'#0e0e0e',border:'1px solid #333',borderRadius:8,padding:10,color:'white'}}/><button onClick={()=>{const v=(document.getElementById('socIn')as any).value; if(!v)return; setSocios([...socios,v]); setAlerta('ALERTA SOCIO: '+v+' hizo un cambio'); (document.getElementById('socIn')as any).value=''}} style={{background:'#ff1a1a',border:0,borderRadius:8,padding:'0 12px',fontWeight:900}}>ADD</button></div>
            {socios.map(s=><div key={s} style={{display:'flex',justifyContent:'space-between',background:'#000',padding:8,borderRadius:8,marginTop:6}}><span>{s}</span><button onClick={()=>setSocios(socios.filter(x=>x!==s))} style={{background:'#333',border:0,borderRadius:6,color:'white'}}>Quitar X</button></div>)}
          </div>

          <div style={{background:'#0e0e0e',border:'1px solid #333',borderRadius:12,padding:10,fontSize:10}}>
            <b>TÉRMINOS Y CONDICIONES FORZA GYM PRO</b><br/>
            1. Al registrarse acepta brindar nombre, apellido, peso, talla, tiempo entrenando.<br/>
            2. Fotos/videos progreso solo visibles por admin para control físico.<br/>
            3. Luces: verde activo, rojo inactivo, registro ingreso y tiempo activo/desactivado.<br/>
            4. Pagos vía Mercado Pago link.mercadopago.com.ar/forzagympro, precio editable por admin.<br/>
            5. Opción débito automático mensual para asegurar pago.<br/>
            6. Gratis y Pro: tienda visible para todos, rutinas Pro bloqueadas.<br/>
            7. Reseñas 5 estrellas requieren aprobación admin antes de publicarse.<br/>
            8. FORZA no responsable por lesiones, uso bajo responsabilidad.
          </div>
        </div>
      )}

      {/* BOTTOM NAV COMO FOTO */}
      <div style={{position:'fixed',bottom:0,left:0,right:0,background:'#0a0a0a',borderTop:'1px solid #222',display:'flex',justifyContent:'space-around',padding:'8px 0'}}>
        {[
          {id:'Shop',icon:'🏠',label:'Shop'},
          {id:'Categories',icon:'▦',label:'Categories'},
          {id:'Favorites',icon:'★',label:'Favorites'},
          {id:'Orders',icon:'📦',label:'Orders'},
          {id:'Account',icon:'👤',label:'Account'},
        ].map(b=>(
          <button key={b.id} onClick={()=>setTab(b.id)} style={{background:'none',border:0,color:tab===b.id?'#ff1a1a':'#666',display:'flex',flexDirection:'column',alignItems:'center',fontSize:10,fontWeight:900}}>
            <span style={{fontSize:20}}>{b.icon}</span>{b.label}
          </button>
        ))}
      </div>
      <style>{`@keyframes pulse{0%{transform:scale(1)}50%{transform:scale(1.08)}100%{transform:scale(1)}}`}</style>
    </div>
  )
}
