import { useState } from 'react'
export default function App(){
  const [tab,setTab]=useState('Tienda')
  return (
    <div style={{background:'black',color:'white',minHeight:'100vh',paddingBottom:80}}>
      <h1 style={{textAlign:'center',padding:20}}>PRUEBA MENU - {tab}</h1>
      <div style={{padding:20,border:'2px solid red',margin:10,textAlign:'center'}}>
        {tab==='Tienda' && 'ESTAS EN TIENDA ✅'}
        {tab==='Categorías' && 'ESTAS EN CATEGORIAS ✅'}
        {tab==='Cuenta' && 'ESTAS EN CUENTA ✅ SOCIOS: Yo no se puede quitar'}
      </div>
      <div style={{position:'fixed',bottom:0,left:0,right:0,height:80,background:'#222',display:'flex',borderTop:'3px solid red'}}>
        <button onClick={()=>{alert('TOCaste TIENDA'); setTab('Tienda')}} style={{flex:1,background:'black',color:'white',fontSize:16}}>TIENDA</button>
        <button onClick={()=>{alert('TOCaste CATEGORIAS'); setTab('Categorías')}} style={{flex:1,background:'black',color:'white',fontSize:16}}>CATEGORIAS</button>
        <button onClick={()=>{alert('TOCaste CUENTA'); setTab('Cuenta')}} style={{flex:1,background:'black',color:'white',fontSize:16}}>CUENTA</button>
      </div>
    </div>
  )
}
