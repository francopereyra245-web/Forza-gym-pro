import { useState, useEffect } from 'react'

export default function App(){
  const [tab,setTab]=useState('Categorías')
  const [cat,setCat]=useState('TODO')
  const [nivel,setNivel]=useState('prin')
  const [esPro,setEsPro]=useState(true)
  const [ejercicios,setEjercicios]=useState<any[]>(()=>JSON.parse(localStorage.getItem('fg-ex')||'[]'))
  const [productos,setProductos]=useState<any[]>(()=>JSON.parse(localStorage.getItem('fg-prod')||'[]'))
  const [nEj,setNEj]=useState('')
  const [q,setQ]=useState('')

  useEffect(()=>localStorage.setItem('fg-ex',JSON.stringify(ejercicios)),[ejercicios])
  useEffect(()=>localStorage.setItem('fg-prod',JSON.stringify(productos)),[productos])

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
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'
