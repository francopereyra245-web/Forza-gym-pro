import { useState, useEffect } from 'react'

export default function App(){
  const [tab,setTab]=useState('Categorías')
  const [cat,setCat]=useState('TODO')
  const [nivel,setNivel]=useState('prin')
  const [esPro,setEsPro]=useState(true) // LO DEJO ACTIVO PARA QUE VEAS TODO
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
    <div style={{minHeight:'100vh',background:'#070707',color:'white',fontFamily:'system-ui',paddingBottom:90}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:12,background:'#0a0a0a',borderBottom:'1px solid #222',position:'sticky',top:0,zIndex:10}}>
        <div style={{display:'flex',gap:10,alignItems:'center'}}>
          <img src="/logo.png" style={{width:38,height:38,borderRadius:50,border:'2px solid #ff1a1a'}}/>
          <b>FOR<span style={{color:'#ff1a1a'}}>ZA</span> gym pro</b>
        </div>
        <button onClick={()=>setEsPro(!esPro)} style={{background:esPro?'#00c851':'#333',border:0,borderRadius:20,padding:'8px 14px',color:'white',fontWeight:900,fontSize:11}}>
          {esPro?'PRO ACTIVO':'MODO GRATIS'}
        </button
