import { useState, useEffect } from 'react'

export default function App(){
  const [tab,setTab]=useState('Tienda')
  const [cat,setCat]=useState('TODO')
  const [q,setQ]=useState('')
  const [nivel,setNivel]=useState('prin')
  const [esPro,setEsPro]=useState(false)
  const [ejercicios,setEjercicios]=useState<any[]>(()=>JSON.parse(localStorage.getItem('fg-ex')||'[]'))
  const [productos,setProductos]=useState<any[]>(()=>JSON.parse(localStorage.getItem('fg-prod')||'[]'))
  const [precioPro]=useState('15000')
  const [nEj,setNEj]=useState('')
  const [idioma,setIdioma]=useState('es')

  useEffect(()=>localStorage.setItem('fg-ex',JSON.stringify(ejercicios)),[ejercicios])
  useEffect(()=>localStorage.setItem('fg-prod',JSON.stringify(productos)),[productos])

  const filtros = idioma==='es'? ["TODO","DIETA","SUPLEMENTOS","INDUMENTARIA","EQUIPAMIENTO"] : ["ALL","DIET","SUPPLEMENTS","APPAREL","EQUIPMENT"]
  const t = idioma==='es'? {
    buscar:"Buscar productos...",
    tienda:"Tienda", cat:"Categorías", fav:"Favoritos", ped:"Pedidos", cue:"Cuenta",
    vacia:"Tienda vacía. Subí productos desde Cuenta y actívalos.",
    activo:"ACTIVO", desact:"DESACTIVADO", hoy:"ALARMA HOY TE TOCA",
    prin:"PRINCIPIANTE", medio:"MEDIO", avanz:"AVANZADO", extr:"EXTREMO",
    gratis:"GRATIS - Blanco", gris:"GRIS - color fuerte", azul:"Azul - gris+azul metalizado", dorado:"Dorado - violeta+negro",
    add:"AGREGAR EJERCICIO MANUAL - STICK FIGURE + MÚSCULOS ROJO FORZA",
    bloq:"Este nivel es PRO. Principiante es GRATIS, los demás requieren pago.",
    pagar:"PAGAR PRO"
  } : {
    buscar:"Search products...",
    tienda:"Shop", cat:"Categories", fav:"Favorites", ped:"Orders", cue:"Account",
    vacia:"Empty store.", activo:"ACTIVE", desact:"INACTIVE", hoy:"ALARM TODAY",
    prin:"BEGINNER", medio:"MIDDLE", avanz:"ADVANCED", extr:"EXTREME",
    gratis:"FREE - White", gris:"GRAY", azul:"Blue - metallic", dorado:"Gold",
    add:"ADD MANUAL EXERCISE", bloq:"PRO level", pagar:"PAY PRO"
  }

  const bloqueado = nivel!=='prin' &&!esPro

  return (
    <div style={{minHeight:'100vh',background:'#070707',color:'white',fontFamily:'system-ui',paddingBottom:80}}>
      <div style={{display:'flex',justifyContent:'space-between',padding:12,background:'#0a0a0a',position:'sticky',top:0,zIndex:10,borderBottom:'1px solid #222'}}>
        <div style={{display:'flex',gap:10,alignItems:'center'}}>
          <img src="/logo.png" style={{width:42,height:42,borderRadius:50,border:'2px solid #ff1a1a'}} onError={e=>{(e.target as any).style.display='none'}}/>
          <b>FOR<span style={{color:'#ff1a1a'}}>ZA</span> gym pro</b>
        </div>
        <div style={{display:'flex',gap:6}}>
          <button onClick={()=>setEsPro(!esPro)} style={{background:esPro?'#00c851':'#444',border:0,borderRadius:20,padding:'6px 10px',color:'white',fontWeight:900,fontSize:10}}>{esPro?'PRO':'GRATIS'}</button>
          <button onClick={()=>setIdioma(idioma==='es'?'en':'es')} style={{background:'#1a1a1a',border:'1px solid #ff1a1a',borderRadius:20,padding:'6px 10px',color:'white',fontSize:10}}>{idioma==='es'?'ES→EN':'EN→ES'}</button>
        </div>
      </div>

      <div style={{padding:12}}>
        <div style={{background:'#1e1e1e',border:'1.5px solid #ff1a1a',borderRadius:24,padding:'12px 16px',display:'flex',gap:10}}>
          <span>🔍</span><input value={q} onChange={e=>setQ(e.target.value)} placeholder={t.buscar} style={{flex:1,background:'transparent',border:0,color:'white',outline:'none'}}/>
        </div>
      </div>

      <div style={{display:'flex',gap:8,padding:'0 12px 12px',overflowX:'auto'}}>
        {filtros.map(f=><button key={f} onClick={()=>setCat(f)} style={{background:cat===f?'#ff1a1a':'#2a2a2a',border:0,color:'white',borderRadius:20,padding:'8px 16px',fontWeight:900,fontSize:12,whiteSpace:'nowrap'}}>{f}</button>)}
      </div>

      {tab==='Tienda' || tab==='Shop'? (
        <div style={{padding:12,display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
          {productos.filter(p=>p.activo).length===0? <div style={{gridColumn:'1/3',border:'1px dashed #333',borderRadius:12,padding:30,textAlign:'center',opacity:0.5}}>{t.vacia}</div> :
            productos.filter(p=>p.activo).map(p=><div key={p.id} style={{background:'#121212',border:'1.5px solid #ff1a1a',borderRadius:16,padding:10,textAlign:'center'}}><div style={{height:100,display:'flex',alignItems:'center',justifyContent:'center'}}>{p.img?<img src={p.img} style={{maxHeight:'100%'}}/>:null}</div><div style={{fontWeight:900,fontSize:12}}>{p.nombre}</div><div style={{color:'#ff1a1a',fontWeight:900}}>€{p.precio}</div><div style={{background:'#00c851',borderRadius:6,padding:6,marginTop:6,fontSize:10,fontWeight:900}}>{t.activo}</div></div>)
          }
        </div>
      ) : (
        <div style={{padding:12}}>
          <div style={{background:'#b80000',padding:14,borderRadius:14}}>
            <div>🔔 {t.hoy}</div><div style={{fontWeight:900,fontSize:18}}>{nivel==='prin'?t.prin:nivel==='medio'?t.medio:nivel==='avanz'?t.avanz:t.extr} - {ejercicios.filter(e=>e.nivel===nivel).length} ejercicios</div>
            <div style={{fontSize:11,opacity:0.8}}>Principiante {t.gratis} | Medio {t.gris} | Avanzado {t.azul} | Extremo {t.dorado}</div>
          </div>
          <div style={{display:'flex',gap:8,overflowX:'auto',margin:'12px 0'}}>
            <button onClick={()=>setNivel('prin')} style={{minWidth:110,background:nivel==='prin'?'#ff1a1a':'#3a0000',border:nivel==='prin'?'2px solid white':'0',borderRadius:12,padding:10,color:'white',fontWeight:900,fontSize:11}}>{t.prin}<br/><span style={{background:'white',color:'black',fontSize:8,padding:'2px 6px',borderRadius:4}}>{t.gratis}</span></button>
            <button onClick={()=>setNivel('medio')} style={{minWidth:110,background:nivel==='medio'?'#ff1a1a':'#5a0000',border:nivel==='medio'?'2px solid white':'0',borderRadius:12,padding:10,color:'white',fontWeight:900,fontSize:11}}>{t.medio}<br/><span style={{background:'#ddd',color:'black',fontSize:8,padding:'2px 6px',borderRadius:4}}>{t.gris}</span></button>
            <button onClick={()=>setNivel('avanz')} style={{minWidth:110,background:'linear-gradient(135deg,#6b7280,#1e3a8a)',border:nivel==='avanz'?'2px solid white':'0',borderRadius:12,padding:10,color:'white',fontWeight:900,fontSize:11}}>{t.avanz}<br/><span style={{background:'#93c5fd',color:'black',fontSize:8,padding:'2px 6px',borderRadius:4}}>{t.azul}</span></button>
            <button onClick={()=>setNivel('extr')} style={{minWidth:110,background:'linear-gradient(135deg,#7c3aed,#000)',border:nivel==='extr'?'2px solid white':'0',borderRadius:12,padding:10,color:'white',fontWeight:900,fontSize:11}}>{t.extr}<br/><span style={{background:'#facc15',color:'black',fontSize:8,padding:'2px 6px',borderRadius:4}}>{t.dorado}</span></button>
          </div>

          {bloqueado? (
            <div style={{background:'#1a0000',border:'2px solid #ff1a1a',borderRadius:16,padding:30,textAlign:'center'}}>
              <div style={{fontSize:40}}>🔒</div><div style={{fontWeight:900}}>{t.bloq}</div>
              <a href="https://link.mercadopago.com.ar/forzagympro" target="_blank" style={{display:'block',marginTop:14,background:'#009ee3',color:'white',padding:12,borderRadius:10,textDecoration:'none',fontWeight:900}}>{t.pagar} ${precioPro}</a>
            </div>
          ) : (
            <div style={{background:'#1a1a1a',borderRadius:12,padding:10}}>
              <b style={{fontSize:12}}>{t.add}</b>
              <div style={{display:'flex',gap:6,marginTop:8}}>
                <input value={nEj} onChange={e=>setNEj(e.target.value)} placeholder="Ej: Press Banca" style={{flex:1,background:'#0e0e0e',border:'1px solid #333',borderRadius:8,padding:10,color:'white'}}/>
                <button onClick={()=>{if(!nEj)return; setEjercicios([...ejercicios,{id:Date.now()+'',nombre:nEj,nivel,musculos:['PECHO','TRICEPS'],tiempo:60}]); setNEj('')}} style={{background:'#ff1a1a',border:0,borderRadius:8,padding:'0 14px',fontWeight:900}}>+</button>
              </div>
              {ejercicios.filter(e=>e.nivel===nivel).map(e=><div key={e.id} style={{background:'white',color:'black',borderRadius:10,padding:8,marginTop:8,display:'flex',gap:8}}><div style={{fontSize:24}}>🏋️</div><div><b>{e.nombre}</b><div style={{display:'flex',gap:4}}>{e.musculos.map(m=><span key={m} style={{background:'#ff1a1a',color:'white',fontSize:8,padding:'2px 4px',borderRadius:4}}>{m}</span>)}</div></div></div>)}
            </div>
          )}
        </div>
      )}

      <div style={{position:'fixed',bottom:0,left:0,right:0,background:'#0a0a0a',borderTop:'1px solid #222',display:'flex',justifyContent:'space-around',padding:'8px 0'}}>
        {[
          {k:'Tienda',label:t.tienda,icon:'🏠'},
          {k:'Categorías',label:t.cat,icon:'▦'},
          {k:'Favoritos',label:t.fav,icon:'★'},
          {k:'Pedidos',label:t.ped,icon:'📦'},
          {k:'Cuenta',label:t.cue,icon:'👤'},
        ].map(b=><button key={b.k} onClick={()=>setTab(b.k==='Tienda'?'Tienda':'Categorías')} style={{background:'none',border:0,color:'#666',fontWeight:900,fontSize:10,display:'flex',flexDirection:'column',alignItems:'center'}}><span style={{fontSize:20}}>{b.icon}</span>{b.label}</button>)}
      </div>
    </div>
  )
}
