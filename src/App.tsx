import { useState } from 'react'

export default function App(){
  const [tab, setTab] = useState('Tienda')
  console.log('TAB ACTUAL:', tab)

  return (
    <div style={{background:'black', color:'white', minHeight:'100vh'}}>
      <div style={{padding:20, textAlign:'center', fontSize:24, fontWeight:900, borderBottom:'2px solid red'}}>
        ESTAS EN: {tab}
      </div>

      <div style={{padding:20}}>
        {tab==='Tienda' && <h1>✅ TIENDA ANDA</h1>}
        {tab==='Categorías' && <h1>✅ CATEGORIAS ANDA</h1>}
        {tab==='Favoritos' && <h1>✅ FAVORITOS ANDA</h1>}
        {tab==='Pedidos' && <h1>✅ PEDIDOS ANDA</h1>}
        {tab==='Cuenta' && <h1>✅ CUENTA ANDA</h1>}
      </div>

      <div style={{position:'fixed', bottom:0, left:0, right:0, height:70, background:'#111', display:'flex', borderTop:'2px solid red'}}>
        <div onClick={()=>setTab('Tienda')} style={{flex:1, background:tab==='Tienda'?'red':'#111', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:900}}>TIENDA</div>
        <div onClick={()=>setTab('Categorías')} style={{flex:1, background:tab==='Categorías'?'red':'#111', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:900}}>CATEGORIAS</div>
        <div onClick={()=>setTab('Cuenta')} style={{flex:1, background:tab==='Cuenta'?'red':'#111', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:900}}>CUENTA</div>
      </div>
    </div>
  )
}
