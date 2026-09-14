import { useState, useEffect } from 'react'

// TRADUCCIONES COMPLETAS
const T = {
  es: {
    buscar: "Buscar productos...",
    filtros: ['TODO','DIETA','SUPLEMENTOS','INDUMENTARIA','EQUIPAMIENTO'],
    nav: [
      {id:'Shop', label:'Tienda', icon:'🏠'},
      {id:'Categories', label:'Categorías', icon:'▦'},
      {id:'Favorites', label:'Favoritos', icon:'★'},
      {id:'Orders', label:'Pedidos', icon:'📦'},
      {id:'Account', label:'Cuenta', icon:'👤'},
    ],
    tiendaVacia: "Tienda vacía. Los productos aparecen solo cuando los subís y ponés ACTIVO.",
    activo: "ACTIVO", desactivado: "DESACTIVADO", sinFoto: "Sin foto (subí y activá)",
    hoyToca: "HOY TE TOCA ENTRENAR", agregarEj: "AGREGAR EJERCICIO MANUAL", placeholderEj: "Ej: Press Banca",
    musculoAuto: "Músculos marcados automáticamente en ROJO FORZA + stick figure en movimiento",
    autoayuda: "AUTOAYUDA FORZA GYM PRO", chatPlaceholder: "Escribí tu duda...",
    prodNombre: "Nombre producto", alias: "Alias socio", tel: "Tel comercial", guardar: "GUARDAR - QUEDA DESACTIVADO",
    configPro: "PRECIO PRO + MERCADO PAGO", link: "link.mercadopago.com.ar/forzagympro",
    gratisPro: "Gratis y Pro ven la tienda"
  },
  en: {
    buscar: "Search products...",
    filtros: ['ALL','DIET','SUPPLEMENTS','APPAREL','EQUIPMENT'],
    nav: [
      {id:'Shop', label:'Shop', icon:'🏠'},
      {id:'Categories', label:'Categories', icon:'▦'},
      {id:'Favorites', label:'Favorites', icon:'★'},
      {id:'Orders', label:'Orders', icon:'📦'},
      {id:'Account', label:'Account', icon:'👤'},
    ],
    tiendaVacia: "Empty store. Products appear only when you upload and set ACTIVE.",
    activo: "ACTIVE", desactivado: "INACTIVE", sinFoto: "No image",
    hoyToca: "TODAY'S WORKOUT", agregarEj: "ADD EXERCISE MANUAL", placeholderEj: "Ex: Bench Press",
    musculoAuto: "Muscles auto-highlighted in FORZA RED + moving stick figure",
    autoayuda: "FORZA GYM PRO HELP", chatPlaceholder: "Type your question...",
    prodNombre: "Product name", alias: "Partner alias", tel: "Business phone", guardar: "SAVE - STAYS INACTIVE",
    configPro: "PRO PRICE + PAYMENT", link: "link.mercadopago.com.ar/forzagympro",
    gratisPro: "Free and Pro can see the shop"
  }
}

export default function App(){
  const [idioma,setIdioma]=useState<'es'|'en'>('es') // ESPAÑOL POR DEFECTO
  const t = T[idioma]
  const [tab,setTab]=useState('Shop')
  const [cat,setCat]=useState(0) // index del filtro
  const [q,setQ]=useState('')
  const [productos,setProductos]=useState<any[]>(()=>JSON.parse(localStorage.getItem('fg-prod')||'[]'))
  const [ejercicios,setEjercicios]=useState<any[]>(()=>JSON.parse(localStorage.getItem('fg-ex')||'[]'))
  const [precioPro,setPrecioPro]=useState('15000')

  const NIVELES = [
    { id:'prin', nombre: idioma==='es'?'PRINCIPIANTE':'BEGINNER', bg:'#ff1a1a', card:'#ffffff', label: idioma==='es'?'Blanco':'White' },
    { id:'medio', nombre: idioma==='es'?'MEDIO':'INTERMEDIATE', bg:'#b80000', card:'#e5e5e5', label: idioma==='es'?'Gris':'Gray' },
    { id:'avanz', nombre: idioma==='es'?'AVANZADO':'ADVANCED', bg:'linear-gradient(135deg,#6b7280,#1e3a8a)', card:'#60a5fa', label: idioma==='es'?'Azul':'Blue' },
    { id:'extr', nombre: idioma==='es'?'EXTREMO':'EXTREME', bg:'linear-gradient(135deg,#7c3aed,#000)', card:'#facc15', label: idioma==='es'?'Dorado':'Gold' },
  ]

  return (
    <div style={{minHeight:'100vh',background:'#070707',color:'white',fontFamily:'system-ui',paddingBottom:85}}>
      {/* HEADER CON SELECTOR IDIOMA */}
      <div style={{display:'flex',justifyContent:'space-between',padding:12,background:'#0a0a0a',position:'sticky',top:0,zIndex:20,borderBottom:'1px solid #222'}}>
        <div style={{display:'flex',gap:10,alignItems:'center'}}>
          <img src="/logo.png" style={{width:42,height:42,borderRadius:50,border:'2px solid #ff1a1a',background:'black'}}/>
          <b>FORZA <span style={{color:'#ff1a1a'}}>GYM PRO</span></b>
        </div>
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          <button onClick={()=>setIdioma(idioma==='es'?'en':'es')} style={{background:idioma==='es'?'#ff1a1a':'#222',border:'1px solid #ff1a1a',color:'white',borderRadius:20,padding:'6px 12px',fontWeight:900,fontSize:12}}>
            {idioma==='es'? '🌐 ES → EN' : '🌐 EN → ES'}
          </button>
          <span>🛒</span>
        </div>
      </div>

      {/* BUSCADOR */}
      <div style={{padding:12}}>
        <div style={{background:'#1e1e1e',border:'1.5px solid #ff1a1a',borderRadius:24,padding:'12px 16px',display:'flex',gap:10}}>
          <span>🔍</span><input value={q} onChange={e=>setQ(e.target.value)} placeholder={t.buscar} style={{flex:1,background:'transparent',border:0,color:'white',outline:'none'}}/>
        </div>
      </div>

      {/* FILTROS */}
      <div style={{display:'flex',gap:8,padding:'0 12px 12px',overflowX:'auto'}}>
        {t.filtros.map((c,i)=><button key={c} onClick={()=>setCat(i)} style={{background:cat===i?'#ff1a1a':'#2a2a2a',border:0,color:'white',borderRadius:20,padding:'8px 16px',fontWeight:900,fontSize:12,whiteSpace:'nowrap'}}>{c}</button>)}
      </div>

      {/* TIENDA */}
      {tab==='Shop' && <div style={{padding:12,display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
        {productos.length===0? <div style={{gridColumn:'1/3',border:'1px dashed #333',borderRadius:16,padding:40,textAlign:'center',opacity:0.4}}>{t.tiendaVacia}<br/><small>{t.gratisPro}</small></div> :
          productos.map((p:any)=><div key={p.id} style={{background:'#121212',border:'1.5px solid #ff1a1a',borderRadius:16,padding:10,textAlign:'center'}}>
            <div style={{height:110,display:'flex',alignItems:'center',justifyContent:'center'}}>{p.img?<img src={p.img} style={{maxHeight:'100%'}}/>:<span style={{opacity:0.2}}>{t.sinFoto}</span>}</div>
            <div style={{fontWeight:900,fontSize:12,marginTop:8}}>{p.nombre}</div><div style={{color:'#ff1a1a',fontWeight:900}}>€{p.precio}</div>
            <div style={{marginTop:8,background:p.activo?'#00c851':'#ff1a1a',borderRadius:8,padding:6,fontWeight:900,fontSize:11}}>{p.activo?t.activo:t.desactivado}</div>
          </div>)
        }
      </div>}

      {/* BOTTOM NAV */}
      <div style={{position:'fixed',bottom:0,left:0,right:0,background:'#0a0a0a',borderTop:'1px solid #222',display:'flex',justifyContent:'space-around',padding:'8px 0'}}>
        {t.nav.map(b=>(
          <button key={b.id} onClick={()=>setTab(b.id)} style={{background:'none',border:0,color:tab===b.id?'#ff1a1a':'#666',display:'flex',flexDirection:'column',alignItems:'center',fontSize:10,fontWeight:900}}>
            <span style={{fontSize:20}}>{b.icon}</span>{b.label}
          </button>
        ))}
      </div>
    </div>
  )
}
