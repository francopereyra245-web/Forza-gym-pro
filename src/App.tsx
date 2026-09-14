import { useState, useEffect } from 'react'

export default function App(){
  const [tab,setTab]=useState('Categorías')
  const [cat,setCat]=useState('TODO')
  const [nivel,setNivel]=useState('prin')
  const [esPro,setEsPro]=useState(true)
  const [ejercicios,setEjercicios]=useState<any[]>(()=>JSON.parse(localStorage.getItem('fg-ex')||'[]'))
  const [nEj,setNEj]=useState('')

  useEffect(()=>localStorage.setItem('fg-ex',JSON.stringify(ejercicios)),[ejercicios])

  const filtros = ["TODO","DIETA","SUPLEMENTOS","INDUMENTARIA","EQUIPAMIENTO"]
  const NIVELES = [
    {id:'prin', nombre:'PRINCIPIANTE', sub:'Blanco - colores app', tipo:'GRATIS', color:'#ff1a1a'},
    {id:'medio', nombre:'MEDIO', sub:'Gris - color fuerte', tipo:'PRO', color:'#8b0000'},
    {id:'avanz', nombre:'AVANZADO', sub:'Azul - gris+azul metalizado', tipo:'PRO', color:'#1e3a8a'},
    {id:'extr', nombre:'EXTREMO', sub:'Dorado - violeta+negro', tipo:'PRO', color:'#581c87'},
  ]

  const nivelActual = NIVELES.find(n=>n.id===nivel)!
  const bloqueado = nivelActual.tipo==='PRO' &&!esPro

  return (
    <div style={{minHeight:'100vh',background:'#070707',color:'white',fontFamily:'system-ui',paddingBottom:95}}>
      {/* HEADER */}
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:12,background:'#0a0a0a',borderBottom:'1px solid #222',position:'sticky',top:0,zIndex:20}}>
        <div style={{display:'flex',gap:10,alignItems:'center'}}>
          <div style={{width:38,height:38,borderRadius:50,border:'2px solid #ff1a1a',background:'black',display:'flex',alignItems:'center',justifyContent:'center'}}>⚡</div>
          <b>FOR<span style={{color:'#ff1a1a'}}>ZA</span> gym pro</b>
        </div>
        <button onClick={()=>setEsPro(!esPro)} style={{background:esPro?'#00c851':'#333',border:0,borderRadius:20,padding:'8px 14px',color:'white',fontWeight:900,fontSize:11}}>
          {esPro?'PRO ACTIVO':'MODO GRATIS'}
        </button>
      </div>

      <div style={{padding:12}}>
        <div style={{background:'#1e1e1e',border:'1.5px solid #ff1a1a',borderRadius:24,padding:'12px 16px',display:'flex',gap:10}}>
          <span>🔍</span><input placeholder="Buscar productos..." style={{flex:1,background:'transparent',border:0,color:'white',outline:'none'}}/>
        </div>
      </div>

      <div style={{display:'flex',gap:8,padding:'0 12px 12px',overflowX:'auto'}}>
        {filtros.map(f=><button key={f} onClick={()=>setCat(f)} style={{background:cat===f?'#ff1a1a':'#2a2a2a',border:0,color:'white',borderRadius:20,padding:'8px 16px',fontWeight:900,fontSize:12,whiteSpace:'nowrap'}}>{f}</button>)}
      </div>

      {tab==='Categorías' && (
        <div style={{padding:12}}>
          <div style={{background:'#b80000',padding:14,borderRadius:14}}>
            <div>🔔 ALARMA HOY TE TOCA</div>
            <div style={{fontWeight:900,fontSize:18}}>{nivelActual.nombre} - {ejercicios.filter(e=>e.nivel===nivel).length} ejercicios {nivelActual.tipo==='GRATIS'?'(GRATIS)':'(PRO)'}</div>
            <div style={{fontSize:11,opacity:0.8}}>Principiante Blanco | Medio Gris | Avanzado Azul | Extremo Dorado</div>
          </div>

          <div style={{display:'flex',gap:8,overflowX:'auto',margin:'12px 0',paddingBottom:4}}>
            {NIVELES.map(n=>(
              <button key={n.id} on
