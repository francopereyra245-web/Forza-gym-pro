import { useState, useEffect } from 'react'

type Ejercicio = { id:string, nombre:string, nivel:string, musculos:string[], tiempo:number }
type Producto = { id:string, nombre:string, cat:string, precio:string, activo:boolean, img:string, alias:string, tel:string }

export default function App(){
  const [idioma,setIdioma]=useState<'es'|'en'>('es') // ESPAÑOL POR DEFECTO
  const [tab,setTab]=useState('Shop')
  const [catIdx,setCatIdx]=useState(0)
  const [q,setQ]=useState('')
  const [nivel,setNivel]=useState('prin')
  const [esPro,setEsPro]=useState(()=>localStorage.getItem('fg-isPro')==='true')
  const [ejercicios,setEjercicios]=useState<Ejercicio[]>(()=>JSON.parse(localStorage.getItem('fg-ex')||'[]'))
  const [productos,setProductos]=useState<Producto[]>(()=>JSON.parse(localStorage.getItem('fg-prod')||'[]'))
  const [precioPro,setPrecioPro]=useState(()=>localStorage.getItem('fg-precio')||'15000')
  const [nEj,setNEj]=useState(''); const [nTiempo,setNTiempo]=useState(60)
  const [nProd,setNProd]=useState({nombre:'',cat:'',precio:'',alias:'',tel:'',img:''})

  const T = idioma==='es' ? {
    buscar:"Buscar productos...",
    filtros:["TODO","DIETA","SUPLEMENTOS","INDUMENTARIA","EQUIPAMIENTO"],
    vacia:"Tienda vacía. Los productos aparecen acá solo cuando los subís y ponés ACTIVO. Gratis y Pro la ven.",
    tienda:"Tienda", categorias:"Categorías", fav:"Favoritos", pedidos:"Pedidos", cuenta:"Cuenta",
    activo:"ACTIVO", desact:"DESACTIVADO", sinFoto:"Sin foto",
    hoy:"HOY TE TOCA ENTRENAR", gratis:"GRATIS", pro:"PRO",
    principiante:"PRINCIPIANTE", medio:"MEDIO", avanzado:"AVANZADO", extremo:"EXTREMO",
    addEj:"Agregar ejercicio", placeholderEj:"Ej: Press banca",
    bloq:"Este nivel es PRO. Pagá para desbloquear.",
    pagar:"Pagar PRO con Mercado Pago",
    idiomaBtn:"🌐 ES → EN"
  } : {
    buscar:"Search products...",
    filtros:["ALL","DIET","SUPPLEMENTS","APPAREL","EQUIPMENT"],
    vacia:"Empty store. Products appear only when you upload and set ACTIVE.",
    tienda:"Shop", categorias:"Categories", fav:"Favorites", pedidos:"Orders", cuenta:"Account",
    activo:"ACTIVE", desact:"INACTIVE", sinFoto:"No image",
    hoy:"TODAY'S WORKOUT", gratis:"FREE", pro:"PRO",
    principiante:"BEGINNER", medio:"MIDDLE", avanzado:"ADVANCED", extremo:"EXTREME",
    addEj:"Add exercise", placeholderEj:"Ex: Bench press",
    bloq:"This level is PRO. Pay to unlock.",
    pagar:"Pay PRO with Mercado Pago",
    idiomaBtn:"🌐 EN → ES
