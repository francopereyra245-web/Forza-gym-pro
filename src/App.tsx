import { useState, useEffect } from 'react'

export default function App(){
  const [tab,setTab]=useState('Categorías')
  const [nivel,setNivel]=useState('prin')
  const [esPro,setEsPro]=useState(true)
  const [ejercicios,setEjercicios]=useState<any[]>(()=>JSON.parse(localStorage.getItem('fg-ex')||'[]'))
  const [socios,setSocios]=useState<any[]>(()=>JSON.parse(localStorage.getItem('fg-socios')||'[{"id":"yo","nombre":"Yo (Dueño)","rol":"PRINCIPAL","esYo":true}]'))
  const [nSocio,setNSocio]=useState('')
  const [nEj,setNEj]=useState('')
  const [chatOpen,setChatOpen]=useState(false)

  useEffect(()=>localStorage.setItem('fg-ex',JSON.stringify(ejercicios)),[ejercicios])
  useEffect(()=>localStorage.setItem('fg-socios',JSON.stringify(socios)),[socios])

  const NIVELES = [
    {id:'prin', nombre:'PRINCIPIANTE', tipo:'GRATIS', color:'#ff1a1a'},
    {id:'medio', nombre:'MEDIO', tipo:'PRO', color:'#8b0000'},
    {id:'avanz', nombre:'AVANZADO', tipo:'PRO', color:'#1e3a8a'},
    {id:'extr', nombre:'EXTREMO', tipo:'PRO', color:'#581c87'},
  ]

  const cambiarTab = (t:string)=>{
    setTab(t)
    window.scrollTo(0,0)
  }

  return (
    <div style={{minHeight:'100vh',background:'#070707',color:'white',fontFamily:'system-ui',paddingBottom:110}}>
      <div style={{padding:12,display:'flex',justifyContent:'space-between',background:'#0a0a0a',borderBottom:'1px solid #222'}}>
        <b>FOR<span style={{color:'#ff1a1a'}}>ZA</span> gym pro</b>
        <button onClick={()=>setEsPro(!esPro)} style={{background:esPro?'#00c851':'#333',border:0,borderRadius:20,padding:'8px 12px',color:'white',fontWeight:900,fontSize:11}}>{esPro?'PRO ACTIVO':'MODO GRATIS'}</button>
      </div>

      <div style={{padding:12}}>
        {tab==='Tienda' && <div style={{background:'#121212',padding:40,textAlign:'center',borderRadius:12,border:'2px solid #ff1a1a'}}>✅ TIENDA ANDA<br/>Si ves esto es porque el botón de abajo SÍ funciona</div>}
        {tab==='Favoritos' && <div style={{background:'#121212',padding:40,textAlign:'center',borderRadius:12}}>Favoritos vacío</div>}
        {tab==='Pedidos' && <div style={{background:'#121212',padding:40,textAlign:'center',borderRadius:12}}>Pedidos vacío</div>}
        {tab==='Cuenta' && (
          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            <div style={{background:'#1a1a1a',borderRadius:12,padding:12,border:'1.5px solid #ff1a1a'}}>
              <b>👥 SOCIOS - Vos no te podés quitar</b>
              <div style={{display:'flex',gap:6,marginTop:10}}>
                <input value={nSocio} onChange={e=>setNSocio(e.target.value)} placeholder="Nombre socio" style={{flex:1,background:'#0e0e0e',border:'1px solid #333',borderRadius:8,padding:10,color:'white'}}/>
                <button onClick={()=>{if(!nSocio)return; setSocios([...socios,{id:Date.now()+'',nombre:nSocio,rol:'SOCIO',esYo:false}]); setNSocio('')}} style={{background:'#ff1a1a',border:0,borderRadius:8,padding:'0 14px',fontWeight:900}}>+</button>
              </div>
              {socios.map(s=>(
                <div key={s.id} style={{display:'flex',justifyContent:'space-between',alignItems:'center',background:s.esYo?'#2a0000':'#0e0e0e',border:'1px solid '+(s.esYo?'#ff1a1a':'#333'),padding:10,borderRadius:10,marginTop:6}}>
                  <b>{s.esYo?'🔒 ':''}{s.nombre} - {s.rol}</b>
                  {s.esYo? <small style={{opacity:0.5}}>NO SE QUITA</small> : <button onClick={()=>setSocios(socios.filter(x=>x.id!==s.id))} style={{background:'#333',border:0,color:'white',borderRadius:6,width:28,height:28}}>x</button>}
                </div>
              ))}
            </div>
            <div style={{background:'#1a1a1a',padding:12,borderRadius:12,textAlign:'center',opacity:0.6}}>Cuenta - Tienda / Productos</div>
          </div>
        )}
        {tab==='Categorías' && (
          <div>
            <div style={{background:'#b80000',padding:12,borderRadius:12}}>🔔 {NIVELES.find(n=>n.id===nivel)?.nombre} - {NIVELES.find(n=>n.id===nivel)?.tipo}</div>
            <div style={{display:'flex',gap:8,overflowX:'auto',margin:'12px 0'}}>
              {NIVELES.map(n=><button key={n.id} onClick={()=>setNivel(n.id)} style={{minWidth:110,background:n.color,border:nivel===n.id?'3px solid white':'0',borderRadius:12,padding:10,color:'white',fontWeight:900}}>{n.nombre}<br/><small>{n.tipo}</small></button>)}
            </div>
            <div style={{background:'#1a1a1a',padding:12,borderRadius:12}}>
              <div style={{display:'flex',gap:6}}>
                <input value={nEj} onChange={e=>setNEj(e.target.value)} placeholder="Ej: Press Banca" style={{flex:1,background:'#0e0e0e',border:'1px solid #333',borderRadius:8,padding:10,color:'white'}}/>
                <button onClick={()=>{if(nEj){setEjercicios([...ejercicios,{id:Date.now(),nombre:nEj,nivel}]); setNEj('')}}} style={{background:'#ff1a1a',border:0,borderRadius:8,padding:'0 14px',fontWeight:900}}>+</button>
              </div>
              {ejercicios.filter(e=>e.nivel===nivel).map(e=><div key={e.id} style={{background:'white',color:'black',padding:8,borderRadius:8,marginTop:6}}>🏋️ {e.nombre}</div>)}
            </div>
          </div>
        )}
      </div>

      {/* NUBE */}
      <div style={{position:'fixed',right:14,bottom:100,zIndex:9998}}>
        {!chatOpen? <button onClick={()=>setChatOpen(true)} style={{width:52,height:52,borderRadius:50,background:'#ff1a1a',border:'2px solid white',fontSize:22}}>💬</button> :
        <div style={{width:240,background:'#111',border:'1.5px solid #ff1a1a',borderRadius:12}}><div style={{background:'#ff1a1a',padding:6,display:'flex',justifyContent:'space-between'}}><b style={{fontSize:10}}>AUTOAYUDA</b><button onClick={()=>setChatOpen(false)} style={{background:'black',border:0,color:'white',borderRadius:20,width:18,height:18}}>x</button></div><div style={{padding:10,fontSize:11,opacity:0.7}}>Escribí: pecho, espalda, pierna, dieta</div></div>}
      </div>

      {/* MENU ABAJO - AHORA CON Z-INDEX 9999 Y FORZADO */}
      <nav style={{position:'fixed',bottom:0,left:0,right:0,height:80,background:'#000',borderTop:'3px solid #ff1a1a',display:'flex',zIndex:9999,pointerEvents:'auto'}}>
        <button onTouchStart={()=>cambiarTab('Tienda')} onClick={()=>cambiarTab('Tienda')} style={{flex:1,background:tab==='Tienda'?'#1a0000':'#000',border:0,color:tab==='Tienda'?'#ff1a1a':'#888',fontWeight:900,fontSize:10,pointerEvents:'auto'}}><span style={{fontSize:22,display:'block'}}>🏠</span>Tienda</button>
        <button onTouchStart={()=>cambiarTab('Categorías')} onClick={()=>cambiarTab('Categorías')} style={{flex:1,background:tab==='Categorías'?'#1a0000':'#000',border:0,color:tab==='Categorías'?'#ff1a1a':'#888',fontWeight:900,fontSize:10,pointerEvents:'auto'}}><span style={{fontSize:22,display:'block'}}>▦</span>Categorías</button>
        <button onTouchStart={()=>cambiarTab('Favoritos')} onClick={()=>cambiarTab('Favoritos')} style={{flex:1,background:tab==='Favoritos'?'#1a0000':'#000',border:0,color:tab==='Favoritos'?'#ff1a1a':'#888',fontWeight:900,fontSize:10,pointerEvents:'auto'}}><span style={{fontSize:22,display:'block'}}>★</span>Favoritos</button>
        <button onTouchStart={()=>cambiarTab('Pedidos')} onClick={()=>cambiarTab('Pedidos')} style={{flex:1,background:tab==='Pedidos'?'#1a0000':'#000',border:0,color:tab==='Pedidos'?'#ff1a1a':'#888',fontWeight:900,fontSize:10,pointerEvents:'auto'}}><span style={{fontSize:22,display:'block'}}>📦</span>Pedidos</button>
        <button onTouchStart={()=>cambiarTab('Cuenta')} onClick={()=>cambiarTab('Cuenta')} style={{flex:1,background:tab==='Cuenta'?'#1a0000':'#000',border:0,color:tab==='Cuenta'?'#ff1a1a':'#888',fontWeight:900,fontSize:10,pointerEvents:'auto'}}><span style={{fontSize:22,display:'block'}}>👤</span>Cuenta</button>
      </nav>
    </div>
  )
}
