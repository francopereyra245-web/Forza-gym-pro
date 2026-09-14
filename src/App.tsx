import { useState, useEffect } from 'react'
import logoForza from '/public/logo-forza.png' // <-- Guardá la imagen que me pasaste como logo-forza.png en /public

const ROJO = '#E10600'
const NEGRO = '#0A0A0A'

// ... todo el código que ya tenés ...

// EN EL HEADER, AHORA ASÍ, CON TU LOGO REAL:
<div style={{padding:12, background:'#000', borderBottom:`2px solid ${ROJO}`, display:'flex', alignItems:'center', gap:10, position:'sticky', top:0, zIndex:20}}>
  <img src={logoForza} style={{height:48, width:48, borderRadius:12, objectFit:'contain'}} alt="FORZA GYM PRO" />
  <div><div style={{fontWeight:900, fontSize:16, letterSpacing:1}}>FORZA <span style={{color:ROJO}}>GYM PRO</span></div><div style={{fontSize:9, opacity:0.5}}>gym pro</div></div>
  <div style={{marginLeft:'auto', fontSize:8, background:ROJO, padding:'4px 8px', borderRadius:10, fontWeight:900}}>PRO</div>
</div>
