import { useState, useEffect } from 'react'

export default function App(){
  const [tab,setTab]=useState('Categorías')
  const [nivel,setNivel]=useState('prin')
  const [ejercicios,setEjercicios]=useState<any[]>(()=>JSON.parse(localStorage.getItem('fg-ex')||'[]'))
  const [socios,setSocios]=useState<any[]>(()=>JSON.parse(localStorage.getItem('fg-socios')||'[{"id":"yo","nombre":"Yo (Dueño)","rol":"PRINCIPAL","esYo":true}]'))
  const [nEj,setNEj]=useState('')
  const [nSocio,setNSocio]=useState('')
  const [chat,setChat]=useState(false)

  useEffect(()=>localStorage.setItem('fg-ex',JSON.stringify(ejercicios)),[ejercicios])
  useEffect(()=>localStorage.setItem('fg-socios',JSON.stringify(socios)),[socios])

  return (
    <div style={{background:'#0a0a0a',color:'white',minHeight:'100vh',fontFamily:'system-ui',paddingBottom:80}}>

      {/* TOP */}
      <div style={{padding:'10px 14px',display:'flex',justifyContent:'space-between',alignItems:'center',background:'#121212',borderBottom:'1px solid #222'}}>
        <b>FOR<span style={{color:'#ff1a1a'}}>ZA</span> gym pro</b>
        <div style={{background:'#00c851',padding:'6px 12px',borderRadius:20,fontSize:11,fontWeight:900}}>PRO ACTIVO</div>
      </div>

      {/* CUERPO */}
      <div style={{padding:12}}>
        {tab==='Tienda' && <div style={{padding:40,textAlign:'center',border:'2px dashed #444',borderRadius:12}}>TIENDA<br/>Productos ACTIVOS</div>}
        {tab==='Favoritos' && <div style={{padding:40,textAlign:'center',border:'2px dashed #444',borderRadius:12}}>Favoritos</div>}
        {tab==='Pedidos' && <div style={{padding:40,textAlign:'center',border:'2px dashed #444',borderRadius:12}}>Pedidos</div>}

        {tab==='Cuenta' && (
          <div style={{background:'#1a1a1a',border:'1.5px solid #ff1a1a',borderRadius:12,padding:12}}>
            <b>👥 SOCIOS</b>
            <div style={{fontSize:11,opacity:0.6,marginTop:2}}>Yo no me puedo quitar. Los demás sí.</div>
            <div style={{display:'flex',gap:6,marginTop:10}}>
              <input value={nSocio} onChange={e=>setNSocio(e.target.value)} placeholder="Nombre socio" style={{flex:1,background:'#000',border:'1px solid #333',borderRadius:8,padding:10,color:'white'}}/>
              <button onClick={()=>{if(nSocio){setSocios([...socios,{id:Date.now()+'',nombre:nSocio,rol:'SOCIO',esYo:false}]); setNSocio('')}}} style={{background:'#ff1a1a',border:0,borderRadius:8,padding:'0 14px',color:'white',fontWeight:900}}>+</button>
            </div>
            <div style={{marginTop:10}}>
              {socios.map((s:any)=>(
                <div key={s.id} style={{display:'flex',justifyContent:'space-between',alignItems:'center',background:s.esYo?'#2a0000':'#000',border:'1px solid '+(s.esYo?'#ff1a1a':'#333'),padding:10,borderRadius:8,marginTop:6}}>
                  <div><b>{s.esYo?'🔒 ':''}{s.nombre}</b> <span style={{fontSize:10,background:'#333',padding:'2px 6px',borderRadius:10,marginLeft:6}}>{s.rol}</span></div>
                  {s.esYo? <span style={{fontSize:10,opacity:0.4}}>NO SE QUITA</span> : <button onClick={()=>setSocios(socios.filter((x:any)=>x.id!==s.id))} style={{background:'#333',color:'white',border:0,width:24,height:24,borderRadius:4}}>x</button>}
                </div>
              ))}
            </div>
          </div>
        )}

        {tab==='Categorías' && (
          <>
            <div style={{display:'flex',gap:8,overflowX:'auto'}}>
              <div onClick={()=>setNivel('prin')} style={{minWidth:110,background:'#ff3b30',padding:14,borderRadius:14,textAlign:'center',border:nivel==='prin'?'3px solid white':'none'}}><b>PRINCIPIANTE</b><br/><span style={{fontSize:9,background:'#00c851',padding:'3px 8px',borderRadius:10}}>Blanco - GRATIS</span></div>
              <div onClick={()=>setNivel('medio')} style={{minWidth:110,background:'#8b0000',padding:14,borderRadius:14,textAlign:'center',border:nivel==='medio'?'3px solid white':'none'}}><b>MEDIO</b><br/><span style={{fontSize:9,background:'black',padding:'3px 8px',borderRadius:10}}>Gris - PRO 🔒</span></div>
              <div onClick={()=>setNivel('avanz')} style={{minWidth:110,background:'#0a84ff',padding:14,borderRadius:14,textAlign:'center',border:nivel==='avanz'?'3px solid white':'none'}}><b>AVANZADO</b><br/><span style={{fontSize:9,background:'black',padding:'3px 8px',borderRadius:10}}>Azul - PRO 🔒</span></div>
              <div onClick={()=>setNivel('extr')} style={{minWidth:110,background:'#af52de',padding:14,borderRadius:14,textAlign:'center',border:nivel==='extr'?'3px solid white':'none'}}><b>EXTREMO</b><br/><span style={{fontSize:9,background:'black',padding:'3px 8px',borderRadius:10}}>Dorado - PRO 🔒</span></div>
            </div>
            <div style={{background:'#1e1e1e',padding:12,borderRadius:12,marginTop:12}}>
              <b>AGREGAR EJERCICIO MANUAL</b>
              <div style={{display:'flex',gap:6,marginTop:8}}>
                <input value={nEj} onChange={e=>setNEj(e.target.value)} placeholder="Ej: Press Banca" style={{flex:1,background:'black',border:'1px solid #333',padding:10,borderRadius:8,color:'white'}}/>
                <button onClick={()=>{if(nEj){setEjercicios([...ejercicios,{id:Date.now(),nombre:nEj,nivel}]); setNEj('')}}} style={{background:'#ff1a1a',border:0,borderRadius:8,padding:'0 14px',fontWeight:900}}>+</button>
              </div>
              {ejercicios.filter((e:any)=>e.nivel===nivel).map((e:any)=><div key={e.id} style={{background:'white',color:'black',padding:8,borderRadius:8,marginTop:6}}>🏋️ {e.nombre}</div>)}
            </div>
          </>
        )}
      </div>

      {/* NUBE CHICA AL COSTADO */}
      <div onClick={()=>setChat(!chat)} style={{position:'fixed',right:12,bottom:90,width:48,height:48,borderRadius:50,background:'#ff1a1a',border:'2px solid white',display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,cursor:'pointer'}}>💬</div>
      {chat && <div style={{position:'fixed',right:12,bottom:145,width:220,background:'#111',border:'1px solid #ff1a1a',borderRadius:12,padding:10,fontSize:11}}>AUTOAYUDA FORZA GYM PRO<br/><br/>Preguntá: pecho, espalda, dieta, descanso</div>}

      {/* MENU QUE ANDABA - DIVS SIMPLES */}
      <div style={{position:'fixed',bottom:0,left:0,right:0,display:'flex',background:'#121212',borderTop:'1px solid #333',height:70}}>
        <div onClick={()=>setTab('Tienda')} style={{flex:1,textAlign:'center',paddingTop:10,color:tab==='Tienda'?'#ff1a1a':'#777'}}><div>🏠</div><div style={{fontSize:10,fontWeight:900}}>Tienda</div></div>
        <div onClick={()=>setTab('Categorías')} style={{flex:1,textAlign:'center',paddingTop:10,color:tab==='Categorías'?'#ff1a1a':'#777'}}><div>▦</div><div style={{fontSize:10,fontWeight:900}}>Categorías</div></div>
        <div onClick={()=>setTab('Favoritos')} style={{flex:1,textAlign:'center',paddingTop:10,color:tab==='Favoritos'?'#ff1a1a':'#777'}}><div>★</div><div style={{fontSize:10,fontWeight:900}}>Favoritos</div></div>
        <div onClick={()=>setTab('Pedidos')} style={{flex:1,textAlign:'center',paddingTop:10,color:tab==='Pedidos'?'#ff1a1a':'#777'}}><div>📦</div><div style={{fontSize:10,fontWeight:900}}>Pedidos</div></div>
        <div onClick={()=>setTab('Cuenta')} style={{flex:1,textAlign:'center',paddingTop:10,color:tab==='Cuenta'?'#ff1a1a':'#777'}}><div>👤</div><div style={{fontSize:10,fontWeight:900}}>Cuenta</div></div>
      </div>
    </div>
  )
}
