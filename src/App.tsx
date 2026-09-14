import { useState } from 'react'

export default function App(){
  const [tab,setTab]=useState('Categorías')
  const [nivel,setNivel]=useState('prin')
  const [esPro,setEsPro]=useState(true)
  const [nEj,setNEj]=useState('')
  const [ejercicios,setEjercicios]=useState<any[]>([])
  const [chatOpen,setChatOpen]=useState(false)
  const [chatMsg,setChatMsg]=useState('')
  const [chatHist,setChatHist]=useState(['Hola soy FORZA IA. Preguntame: pecho, espalda, dieta'])

  const NIVELES = [
    {id:'prin', nombre:'PRINCIPIANTE', sub:'Blanco', tipo:'GRATIS', color:'#ff1a1a'},
    {id:'medio', nombre:'MEDIO', sub:'Gris', tipo:'PRO', color:'#8b0000'},
    {id:'avanz', nombre:'AVANZADO', sub:'Azul', tipo:'PRO', color:'#1e3a8a'},
    {id:'extr', nombre:'EXTREMO', sub:'Dorado', tipo:'PRO', color:'#581c87'},
  ]

  return (
    <div style={{minHeight:'100vh',background:'#070707',color:'white',fontFamily:'system-ui',paddingBottom:100}}>
      
      <div style={{display:'flex',justifyContent:'space-between',padding:12,background:'#0a0a0a',borderBottom:'1px solid #222'}}>
        <b>FOR<span style={{color:'#ff1a1a'}}>ZA</span> gym pro</b>
        <button onClick={()=>setEsPro(!esPro)} style={{background:esPro?'#00c851':'#333',border:0,borderRadius:20,padding:'8px 12px',color:'white',fontWeight:900,fontSize:11}}>{esPro?'PRO ACTIVO':'MODO GRATIS'}</button>
      </div>

      <div style={{padding:12}}>
        <div style={{background:'#1e1e1e',border:'1.5px solid #ff1a1a',borderRadius:24,padding:12,display:'flex',gap:8}}>
          <span>🔍</span><input placeholder="Buscar productos..." style={{flex:1,background:'transparent',border:0,color:'white',outline:'none'}} autoComplete="off"/>
        </div>
      </div>

      <div style={{display:'flex',gap:8,padding:'0 12px',overflowX:'auto'}}>
        {["TODO","DIETA","SUPLEMENTOS","INDUMENTARIA","EQUIPAMIENTO"].map(f=><button key={f} style={{background:f==='TODO'?'#ff1a1a':'#2a2a2a',border:0,color:'white',borderRadius:20,padding:'8px 14px',fontWeight:900,fontSize:12}}>{f}</button>)}
      </div>

      {/* CONTENIDO SEGUN TAB */}
      <div style={{padding:12, marginTop:8}}>
        {tab==='Tienda' && <div style={{border:'1px dashed #444',padding:30,textAlign:'center',borderRadius:12}}>TIENDA - Acá aparecen productos ACTIVOS<br/>Gratis y Pro la ven</div>}
        {tab==='Favoritos' && <div style={{border:'1px dashed #444',padding:30,textAlign:'center',borderRadius:12}}>Favoritos vacío</div>}
        {tab==='Pedidos' && <div style={{border:'1px dashed #444',padding:30,textAlign:'center',borderRadius:12}}>Pedidos - Sin pedidos</div>}
        {tab==='Cuenta' && <div style={{border:'1px dashed #444',padding:30,textAlign:'center',borderRadius:12}}>Cuenta - Subir productos / Precio PRO<br/>link.mercadopago.com.ar/forzagympro</div>}
        
        {tab==='Categorías' && (
          <div>
            <div style={{background:'#b80000',padding:12,borderRadius:12}}>
              <div>🔔 HOY TE TOCA - {NIVELES.find(n=>n.id===nivel)?.nombre} ({NIVELES.find(n=>n.id===nivel)?.tipo})</div>
              <div style={{fontSize:11}}>Principiante GRATIS | Medio/Avanzado/Extremo PRO</div>
            </div>
            <div style={{display:'flex',gap:8,overflowX:'auto',margin:'12px 0'}}>
              {NIVELES.map(n=>(
                <button key={n.id} onClick={()=>setNivel(n.id)} style={{minWidth:110,background:n.color,border:nivel===n.id?'3px solid white':'0',borderRadius:12,padding:10,color:'white',fontWeight:900}}>
                  {n.nombre}<br/><small>{n.sub}</small><br/><small style={{background:n.tipo==='GRATIS'?'#00c851':'black',padding:'2px 8px',borderRadius:10}}>{n.tipo}</small>
                </button>
              ))}
            </div>
            <div style={{background:'#1a1a1a',padding:12,borderRadius:12}}>
              <b>AGREGAR EJERCICIO</b>
              <div style={{display:'flex',gap:6,marginTop:8}}>
                <input value={nEj} onChange={e=>setNEj(e.target.value)} placeholder="Ej: Press Banca" style={{flex:1,background:'#0e0e0e',border:'1px solid #333',borderRadius:8,padding:10,color:'white'}}/>
                <button onClick={()=>{if(nEj){setEjercicios([...ejercicios,{id:Date.now(),nombre:nEj,nivel}]); setNEj('')}}} style={{background:'#ff1a1a',border:0,borderRadius:8,padding:'0 14px',fontWeight:900}}>+</button>
              </div>
              {ejercicios.filter(e=>e.nivel===nivel).map(e=><div key={e.id} style={{background:'white',color:'black',padding:8,borderRadius:8,marginTop:6}}>🏋️ {e.nombre}</div>)}
            </div>
          </div>
        )}
      </div>

      {/* NUBE AUTOAYUDA COSTADO */}
      <div style={{position:'fixed',right:14,bottom:90,zIndex:100}}>
        {!chatOpen? (
          <button onClick={()=>setChatOpen(true)} style={{width:54,height:54,borderRadius:50,background:'#ff1a1a',border:'2px solid white',fontSize:24}}>💬</button>
        ) : (
          <div style={{width:250,background:'#111',border:'1.5px solid #ff1a1a',borderRadius:14,overflow:'hidden'}}>
            <div style={{background:'#ff1a1a',padding:8,display:'flex',justifyContent:'space-between'}}><b style={{fontSize:11}}>AUTOAYUDA FORZA</b><button onClick={()=>setChatOpen(false)} style={{background:'black',border:0,color:'white',borderRadius:20,width:18,height:18}}>x</button></div>
            <div style={{maxHeight:150,overflowY:'auto',padding:8,fontSize:11}}>{chatHist.map((c,i)=><div key={i} style={{background:'#1a0000',marginTop:4,padding:6,borderRadius:6}}>{c}</div>)}</div>
            <div style={{display:'flex',gap:4,padding:6}}><input value={chatMsg} onChange={e=>setChatMsg(e.target.value)} placeholder="pecho, espalda..." style={{flex:1,background:'#222',border:'1px solid #333',borderRadius:6,padding:6,color:'white',fontSize:11}}/><button onClick={()=>{if(!chatMsg)return; setChatHist([...chatHist,'Vos: '+chatMsg,'FORZA: '+chatMsg+' -> PECHO ROJO 4x12']); setChatMsg('')}} style={{background:'#ff1a1a',border:0,borderRadius:6,padding:'0 8px'}}>➤</button></div>
          </div>
        )}
      </div>

      {/* MENU ABAJO - ESTE ES EL QUE NO ANDABA - AHORA CON ONCLICK REAL */}
      <div style={{position:'fixed',bottom:0,left:0,right:0,background:'#0a0a0a',borderTop:'2px solid #ff1a1a',display:'flex',zIndex:99}}>
        <button onClick={()=>{setTab('Tienda'); window.scrollTo(0,0)}} style={{flex:1,background:tab==='Tienda'?'#1a0000':'transparent',border:0,color:tab==='Tienda'?'#ff1a1a':'#666',padding:'12px 0',fontWeight:900,fontSize:10,display:'flex',flexDirection:'column',alignItems:'center',gap:2}}>
          <span style={{fontSize:22}}>🏠</span>Tienda
        </button>
        <button onClick={()=>{setTab('Categorías'); window.scrollTo(0,0)}} style={{flex:1,background:tab==='Categorías'?'#1a0000':'transparent',border:0,color:tab==='Categorías'?'#ff1a1a':'#666',padding:'12px 0',fontWeight:900,fontSize:10,display:'flex',flexDirection:'column',alignItems:'center',gap:2}}>
          <span style={{fontSize:22}}>▦</span>Categorías
