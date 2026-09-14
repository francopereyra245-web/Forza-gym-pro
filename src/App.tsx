import { useState } from 'react';
export default function App(){
 const [tab,setTab]=useState('Tienda')
 return (
  <div style={{background:'black',color:'white',minHeight:'100vh'}}>
   <div style={{padding:20,textAlign:'center',fontSize:24,fontWeight:900,borderBottom:'2px solid red'}}>
    ESTAS EN: {tab}
   </div>
   <div style={{padding:20}}>
    {tab==='Tienda' && <h1>TIENDA ANDA</h1>}
    {tab==='Categorias' && <h1>CATEGORIAS ANDA</h1>}
    {tab==='Favoritos' && <h1>FAVORITOS ANDA</h1>}
    {tab==='Pedidos' && <h1>PEDIDOS ANDA</h1>}
    {tab==='Cuenta' && <h1>CUENTA ANDA</h1>}
   </div>
   <div style={{position:'fixed',bottom:0,left:0,right:0,display:'flex',borderTop:'1px solid #333'}}>
    <div onClick={()=>setTab('Tienda')} style={{flex:1,padding:15,textAlign:'center',background:tab==='Tienda'?'red':'#111'}}>TIENDA</div>
    <div onClick={()=>setTab('Categorias')} style={{flex:1,padding:15,textAlign:'center',background:tab==='Categorias'?'red':'#111'}}>CAT</div>
    <div onClick={()=>setTab('Favoritos')} style={{flex:1,padding:15,textAlign:'center',background:tab==='Favoritos'?'red':'#111'}}>FAV</div>
    <div onClick={()=>setTab('Pedidos')} style={{flex:1,padding:15,textAlign:'center',background:tab==='Pedidos'?'red':'#111'}}>PED</div>
    <div onClick={()=>setTab('Cuenta')} style={{flex:1,padding:15,textAlign:'center',background:tab==='Cuenta'?'red':'#111'}}>CUENTA</div>
   </div>
  </div>
 )
}
