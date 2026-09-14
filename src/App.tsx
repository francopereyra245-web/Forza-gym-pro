import { useState, useEffect } from 'react'

export default function App(){
  const [tab,setTab]=useState('Categorías')
  const [cat,setCat]=useState('TODO')
  const [nivel,setNivel]=useState('prin')
  const [esPro,setEsPro]=useState(false)
  const [ejercicios,setEjercicios]=useState<any[]>(()=>JSON.parse(localStorage.getItem('fg-ex')||'[]'))
  const [nEj,setNEj]=useState('')

  const filtros = ["TODO","DIETA","SUPLEMENTOS","INDUMENTARIA","EQUIPAMIENTO"]

  useEffect(()=>localStorage.setItem('fg-ex',JSON.stringify(ejercicios)),[ejercicios])

  const NIVELES = [
    {id:'prin', nombre:'PRINCIPIANTE', sub:'Blanco - colores app', tipo:'GRATIS', color:'#ff1a1a', card:'#ffffff'},
    {id:'medio', nombre:'MEDIO', sub:'Gris - color fuerte', tipo:'PRO 🔒', color:'#8b0000', card:'#d1d1d1'},
    {id:'avanz', nombre:'AVANZADO', sub:'Azul - gris+azul metalizado', tipo:'PRO 🔒', color:'#1e3a8a', card:'#60a5fa'},
    {id:'extr', nombre:'EXTREMO', sub:'Dorado - violeta+negro', tipo:'PRO 🔒', color:'#581c87', card:'#facc15'},
  ]

  const bloqueado = nivel!=='prin' &&!esPro

  return (
    <div style={{minHeight:'100vh',background:'#070707',color:'white',fontFamily:'system-ui',paddingBottom:80}}>
      <div style={{display:'flex',justifyContent:'space-between',padding:12,background:'#0a0a0a',borderBottom:'1px solid #222'}}>
        <div style={{display:'flex',gap:10,alignItems:'center'}}>
          <img src="/logo.png" style={{width:42,height:42,borderRadius:50,border:'2px solid #ff1a1a'}}/>
          <b>FOR<span style={{color:'#ff1a1a'}}>ZA</span> gym pro</b>
        </div>
        <button onClick={()=>setEsPro(!esPro)} style={{background:esPro?'#00c851':'#333',border:0,borderRadius:20,padding:'8px 14px',color:'white',fontWeight:900,fontSize:11}}>{esPro?'PRO ACTIVO':'MODO GRATIS'}</button>
      </div>

      <div style={{padding:12}}>
        <div style={{background:'#1e1e1e',border:'1.5px solid #ff1a1a',borderRadius:24,padding:'12px 16px',display:'flex',gap:10}}>
          <span>🔍</span><input placeholder="Buscar productos..." style={{flex:1,background:'transparent',border:0,color:'white',outline:'none'}}/>
        </div>
      </div>

      <div style={{display:'flex',gap:8,padding:'0 12px 12px',overflowX:'auto'}}>
        {filtros.map(f=><button key={f} onClick={()=>setCat(f)} style={{background:cat===f?'#ff1a1a':'#2a2a2a',border:0,color:'white',borderRadius:20,padding:'8px 16px',fontWeight:900,fontSize:12,whiteSpace:'nowrap'}}>{f}</button>)}
      </div>

      <div style={{padding:12}}>
        <div style={{background:'#b80000',padding:14,borderRadius:14}}>
          <div>🔔 ALARMA HOY TE TOCA</div><div style={{fontWeight:900,fontSize:18}}>{NIVELES.find(n=>n.id===nivel)?.nombre} - {ejercicios.filter(e=>e.nivel===nivel).length} ejercicios</div>
          <div style={{fontSize:11,opacity:0.8}}>Principiante Blanco | Medio Gris | Avanzado Azul | Extremo Dorado</div>
        </div>

        <div style={{display:'flex',gap:8,overflowX:'auto',margin:'12px 0'}}>
          {NIVELES.map(n=>(
            <button key={n.id} onClick={()=>setNivel(n.id)} style={{minWidth:120,background:n.color,border:nivel===n.id?'3px solid white':'0',borderRadius:14,padding:'14px 10px',color:'white',fontWeight:900,fontSize:11}}>
              {n.nombre}<br/>
              <span style={{background:'white',color:'black',fontSize:9,padding:'3px 8px',borderRadius:10,marginTop:6,display:'inline-block'}}>{n.sub}</span><br/>
              <span style={{background:n.tipo==='GRATIS'?'#00c851':'black',color:'white',fontSize:10,padding:'4px 10px',borderRadius:10,marginTop:6,display:'inline-block'}}>{n.tipo}</span>
            </button>
          ))}
        </div>

        {bloqueado? (
          <div style={{background:'#1a0000',border:'2px solid #ff1a1a',borderRadius:16,padding:24,textAlign:'center'}}>
            <div style={{fontSize:40}}>🔒</div>
            <div style={{fontWeight:900,marginTop:8}}>ESTE NIVEL ES PRO</div>
            <div style={{fontSize:12,opacity:0.7,marginTop:4}}>Principiante es GRATIS.<br/>Medio, Avanzado y Extremo necesitan PRO.</div>
            <a href="https://link.mercadopago.com.ar/forzagympro" target="_blank" style={{display:'block',marginTop:14,background:'#009ee3',color:'white',padding:12,borderRadius:10,textDecoration:'none',fontWeight:900}}>PAGAR PRO - $15000</a>
          </div>
        ) : (
          <div style={{background:'#1a1a1a',borderRadius:12,padding:12}}>
            <b style={{fontSize:12}}>AGREGAR EJERCICIO MANUAL - STICK FIGURE + MÚSCULOS ROJO FORZA</b>
            <div style={{display:'flex',gap:6,marginTop:10}}>
              <input value={nEj} onChange={e=>setNEj(e.target.value)} placeholder="Ej: Press Banca" style={{flex:1,background:'#0e0e0e',border:'1px solid #333',borderRadius:8,padding:12,color:'white'}}/>
              <div style={{background:'#0e0e0e',border:'1px solid #333',borderRadius:8,padding:'12px 14px',fontWeight:900}}>60</div>
              <button onClick={()=>{if(!nEj)return; setEjercicios([...ejercicios,{id:Date.now()+'',nombre:nEj,nivel}]); setNEj('')}} style={{background:'#ff1a1a',border:0,borderRadius:10,padding:'0 18px',fontWeight:900,fontSize:20}}>+</button>
            </div>
            <div style={{fontSize:11,opacity:0.5,marginTop:6}}>Al agregar, aparece automáticamente imagen en movimiento + músculos marcados en rojo.</div>
          </div>
        )}
      </div>

      <div style={{position:'fixed',bottom:0,left:0,right:0,background:'#0a0a0a',borderTop:'1px solid #222',display:'flex',justifyContent:'space-around',padding:'8px 0'}}>
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',color:'#666',fontSize:10}}><span style={{fontSize:20}}>🏠</span>Tienda</div>
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',color:'#ff1a1a',fontSize:10,fontWeight:900}}><span style={{fontSize:20}}>▦</span>Categorías</div>
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',color:'#666',fontSize:10}}><span style={{fontSize:20}}>★</span>Favoritos</div>
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',color:'#666',fontSize:10}}><span style={{fontSize:20}}>📦</span>Pedidos</div>
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',color:'#666',fontSize:10}}><span style={{fontSize:20}}>👤</span>Cuenta</div>
      </div>
    </div>
  )
}
