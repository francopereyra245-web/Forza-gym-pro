import { useState, useEffect } from 'react'

export default function App(){
  const [tab,setTab]=useState('Categorías')
  const [nivel,setNivel]=useState('prin')
  const [esPro,setEsPro]=useState(false)
  const [ejercicios,setEjercicios]=useState<any[]>(()=>JSON.parse(localStorage.getItem('fg-ex')||'[]'))
  const [socios,setSocios]=useState<any[]>(()=>JSON.parse(localStorage.getItem('fg-socios')||'[{"id":"yo","nombre":"Yo (Dueño)","rol":"PRINCIPAL","esYo":true}]'))
  const [nEj,setNEj]=useState('')
  const [nSocio,setNSocio]=useState('')
  const [chatOpen,setChatOpen]=useState(false)

  useEffect(()=>localStorage.setItem('fg-ex',JSON.stringify(ejercicios)),[ejercicios])
  useEffect(()=>localStorage.setItem('fg-socios',JSON.stringify(socios)),[socios])

  const NIVELES = [
    {id:'prin', nombre:'PRINCIPIANTE', color:'#ff3b30', badge:'GRATIS'},
    {id:'medio', nombre:'MEDIO', color:'#8b0000', badge:'PRO 🔒'},
    {id:'avanz', nombre:'AVANZADO', color:'#0a84ff', badge:'PRO 🔒'},
    {id:'extr', nombre:'EXTREMO', color:'#af52de', badge:'PRO 🔒'},
  ]

  return (
    <div style={{background:'#0a0a0a',color:'white',minHeight:'100vh',paddingBottom:90,fontFamily:'system-ui'}}>
      <div style={{padding:12,background:'#111',display:'flex',justifyContent:'space-between',borderBottom:'1px solid #222'}}>
        <b>FOR<span style={{color:'#ff1a1a'}}>ZA</span> gym pro</b>
        <button onClick={()=>setEsPro(!esPro)} style={{background:esPro?'#00c851':'#333',color:'white',border:0,borderRadius:20,padding:'6px 12px',fontWeight:900,fontSize:11}}>{esPro?'PRO ACTIVO':'MODO GRATIS'}</button>
      </div>

      {/* CONTENIDO */}
      <div style={{padding:12}}>
        {tab==='Tienda' && <div style={{padding:30,border:'2px dashed #333',borderRadius:12,textAlign:'center'}}>TIENDA - Productos activos<br/>Gratis y Pro la ven</div>}
        {tab==='Favoritos' && <div style={{padding:30,border:'2px dashed #333',borderRadius:12,textAlign:'center'}}>Favoritos vacío</div>}
        {tab==='Pedidos' && <div style={{padding:30,border:'2px dashed #333',borderRadius:12,textAlign:'center'}}>Pedidos vacío</div>}
        {tab==='Cuenta' && (
          <div style={{background:'#1a1a1a',padding:12,borderRadius:12,border:'1.5px solid #ff1a1a'}}>
            <b>👥 SOCIOS</b><br/><small style={{opacity:0.6}}>Vos (PRINCIPAL) no te podés quitar. Los otros sí.</small>
            <div style={{display:'flex',gap:6,marginTop:10}}>
              <input value={nSocio} onChange={e=>setNSocio(e.target.value)} placeholder="Nombre socio" style={{flex:1,background:'#000',border:'1px solid #333',borderRadius:8,padding:10,color:'white'}}/>
              <button onClick={()=>{if(!nSocio)return; setSocios([...socios,{id:Date.now()+'',nombre:nSocio,rol:'SOCIO',esYo:false}]); setNSocio('')}} style={{background:'#ff1a1a',border:0,borderRadius:8,padding:'0 14px',fontWeight:900}}>+</button>
            </div>
            {socios.map(s=>(
              <div key={s.id} style={{display:'flex',justifyContent:'space-between',alignItems:'center',background:s.esYo?'#2a0000':'#000',padding:10,borderRadius:8,marginTop:6,border:'1px solid '+(s.esYo?'#ff1a1a':'#333')}}>
                <span>{s.esYo?'🔒 ':''}{s.nombre} - {s.rol}</span>
                {s.esYo? <span style={{fontSize:10,opacity:0.5}}>NO SE QUITA</span> : <button onClick={()=>setSocios(socios.filter(x=>x.id!==s.id))} style={{background:'#333',border:0,color:'white',borderRadius:5,width:24,height:24}}>x</button>}
              </div>
            ))}
          </div>
        )}

        {tab==='Categorías' && (
          <div>
            <div style={{display:'flex',gap:8,overflowX:'auto',paddingBottom:8}}>
              {NIVELES.map(n=>(
                <div key={n.id} onClick={()=>setNivel(n.id)} style={{minWidth:120,background:n.color,borderRadius:16,padding:14,textAlign:'center',border:nivel===n.id?'3px solid white':'none',cursor:'pointer'}}>
                  <div style={{fontWeight:900}}>{n.nombre}</div>
                  <div style={{marginTop:6,fontSize:10,background:n.badge==='GRATIS'?'#00c851':'black',display:'inline-block',padding:'4px 10px',borderRadius:20}}>{n.badge}</div>
                </div>
              ))}
            </div>

            <div style={{background:'#1e1e1e',padding:12,borderRadius:12,marginTop:8}}>
              <b>AGREGAR EJERCICIO MANUAL</b>
              <div style={{display:'flex',gap:6,marginTop:8}}>
                <input value={nEj} onChange={e=>setNEj(e.target.value)} placeholder="Ej: Press Banca" style={{flex:1,background:'black',border:'1px solid #333',padding:10,borderRadius:8,color:'white'}}/>
                <button onClick={()=>{if(nEj){setEjercicios([...ejercicios,{id:Date.now(),nombre:nEj,nivel}]); setNEj('')}}} style={{background:'#ff1a1a',border:0,borderRadius:8,padding:'0 14px',fontWeight:900}}>+</button>
              </div>
              {ejercicios.filter(e=>e.nivel===nivel).map(e=><div key={e.id} style={{background:'white',color:'black',padding:8,borderRadius:8,marginTop:6}}>🏋️ {e.nombre}</div>)}
            </div>
          </div>
        )}
      </div>

      {/* NUBE AUTOAYUDA COSTADO - NO TAPA */}
      <button onClick={()=>setChatOpen(!chatOpen)} style={{position:'fixed',right:12,bottom:92,width:50,height:50,borderRadius:50,background:'#ff1a1a',border:'2px solid white',fontSize:22,zIndex:50}}>💬</button>
      {chatOpen && <div style={{position:'fixed',right:12,bottom:150,width:240,background:'#111',border:'1px solid #ff1a1a',borderRadius:12,padding:8,zIndex:50}}><b style={{fontSize:11}}>AUTOAYUDA FORZA</b><div style={{fontSize:11,opacity:0.7,marginTop:4}}>Preguntá: pecho, espalda, pierna, dieta</div></div>}

      {/* MENU ABAJO QUE ANDABA - RESTAURADO */}
      <div style={{position:'fixed',left:0,right:0,bottom:0,background:'#121212',borderTop:'1px solid #333',display:'flex',height:76}}>
        <div onClick={()=>setTab('Tienda')} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',color:tab==='Tienda'?'#ff1a1a':'#777',cursor:'pointer'}}><span>🏠</span><span style={{fontSize:10,fontWeight:900}}>Tienda</span></div>
        <div onClick={()=>setTab('Categorías')} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',color:tab==='Categorías'?'#ff1a1a':'#777',cursor:'pointer'}}><span>▦</span><span style={{fontSize:10,fontWeight:900}}>Categorías</span></div>
        <div onClick={()=>setTab('Favoritos')} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',color:tab==='Favoritos'?'#ff1a1a':'#777',cursor:'pointer'}}><span>★</span><span style={{fontSize:10,fontWeight:900}}>Favoritos</span></div>
        <div onClick={()=>setTab('Pedidos')} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',color:tab==='Pedidos'?'#ff1a1a':'#777',cursor:'pointer'}}><span>📦</span><span style={{fontSize:10,fontWeight:900}}>Pedidos</span></div>
        <div onClick={()=>setTab('Cuenta')} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',color:tab==='Cuenta'?'#ff1a1a':'#777',cursor:'pointer'}}><span>👤</span><span style={{fontSize:10,fontWeight:900}}>Cuenta</span></div>
      </div>
    </div>
  )
}
