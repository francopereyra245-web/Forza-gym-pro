import { useState, useEffect } from 'react'

type Ejercicio = { id:string, nombre:string, nivel:string, musculos:string[], tiempo:number }
type Producto = { id:string, nombre:string, cat:string, precio:string, activo:boolean, img:string, alias:string, tel:string }

export default function App(){
  const [idioma,setIdioma]=useState<'es'|'en'>('es')
  const [tab,setTab]=useState('Shop')
  const [catIdx,setCatIdx]=useState(0)
  const [q,setQ]=useState('')
  const [nivel,setNivel]=useState('prin')
  const [ejercicios,setEjercicios]=useState<Ejercicio[]>(()=>JSON.parse(localStorage.getItem('fg-ex')||'[]'))
  const [productos,setProductos]=useState<Producto[]>(()=>JSON.parse(localStorage.getItem('fg-prod')||'[]'))
  const [precioPro,setPrecioPro]=useState(()=>localStorage.getItem('fg-precio')||'15000')
  const [nEj,setNEj]=useState(''); const [nTiempo,setNTiempo]=useState(60)
  const [nProd,setNProd]=useState({nombre:'',cat:'SUPLEMENTOS',precio:'',alias:'',tel:'',img:''})
  const [socios,setSocios]=useState<string[]>(()=>JSON.parse(localStorage.getItem('fg-soc')||'[]'))
  const [chat,setChat]=useState(''); const [chatR,setChatR]=useState('')

  const DIC = {
    es: {
      buscar:"Buscar productos...", todo:"TODO", dieta:"DIETA", sup:"SUPLEMENTOS", indu:"INDUMENTARIA", equip:"EQUIPAMIENTO",
      vacia:"Tienda vacía. Los productos aparecen acá solo cuando los subís y ponés ACTIVO. Gratis y Pro la ven.",
      nav1:"Tienda", nav2:"Categorías", nav3:"Favoritos", nav4:"Pedidos", nav5:"Cuenta",
      activo:"ACTIVO", desact:"DESACTIVADO", sinFoto:"Sin foto - subí y activá",
      hoy:"HOY TE TOCA ENTRENAR", addEj:"AGREGAR EJERCICIO - AUTOMÁTICO ROJO + MOVIMIENTO",
      placeholderEj:"Ej: Press Banca", tiempo:"Seg", musc:"Músculos en rojo FORZA",
      tiendaTitulo:"TIENDA - FOTO/VIDEO + SOCIO + TEL COMERCIAL", prodNom:"Nombre producto", precio:"Precio €",
      alias:"Alias socio vendedor", telCom:"Tel comercial", guardar:"GUARDAR - QUEDA DESACTIVADO",
      proTitulo:"PRECIO PRO EDITABLE + MP", aviso:"Aviso: Te faltan X días para renovar + débito automático",
      socioTitulo:"SOCIOS FORZA / TIENDA - ALERTA", add:"AGREGAR", ayuda:"AUTOAYUDA FORZA GYM PRO (sin WhatsApp personal)",
      ayudaPlace:"Escribí tu duda..."
    },
    en: {
      buscar:"Search products...", todo:"ALL", dieta:"DIET", sup:"SUPPLEMENTS", indu:"APPAREL", equip:"EQUIPMENT",
      vacia:"Empty store. Products appear only when you upload and set ACTIVE. Free and Pro can see it.",
      nav1:"Shop", nav2:"Categories", nav3:"Favorites", nav4:"Orders", nav5:"Account",
      activo:"ACTIVE", desact:"INACTIVE", sinFoto:"No image - upload and activate",
      hoy:"TODAY'S WORKOUT", addEj:"ADD EXERCISE - AUTO RED + MOVEMENT",
      placeholderEj:"Ex: Bench Press", tiempo:"Sec", musc:"Muscles in FORZA RED",
      tiendaTitulo:"SHOP - PHOTO/VIDEO + PARTNER + BUSINESS PHONE", prodNom:"Product name", precio:"Price €",
      alias:"Partner alias", telCom:"Business phone", guardar:"SAVE - STAYS INACTIVE",
      proTitulo:"PRO PRICE EDITABLE + MP", aviso:"Alert: X days left to renew + auto-debit",
      socioTitulo:"PARTNERS - ALERT", add:"ADD", ayuda:"FORZA GYM PRO HELP (no personal WhatsApp)",
      ayudaPlace:"Type your question..."
    }
  } as const
  const t = DIC[idioma]
