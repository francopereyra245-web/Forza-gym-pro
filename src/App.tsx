import { useState, useEffect } from 'react';

type Rutina = { id: number; nombre: string; ejercicios: string; dias: string; }

export default function App(){
 const [tab,setTab]=useState('Tienda')
 const [rutinas,setRutinas]=useState<Rutina[]>(()=>{
  const s=localStorage.getItem('rutinas'); return s?JSON.parse(s):[]
 })
 const [nombre,setNombre]=useState('')
 const [ejercicios,setEjercicios]=useState('')
 const [dias,setDias]=useState('Lunes')

 useEffect(()=>{ localStorage.setItem('rutinas',JSON.stringify(rutinas)) },[rutinas])

 const crearRutina = () => {
  if(!nombre.trim()) return alert('Ponele nombre a la rutina');
  const nueva={ id: Date.now(), nombre, ejercicios, dias }
  setRutinas([...rutinas, nueva])
  setNombre(''); setEjercicios('');
  setTab('Cuenta')
 }

 return (
  <div style={{background:'black',color:'white',minHeight:'100vh',paddingBottom:70}}>
   <div style={{padding:16,textAlign:'center',fontWeight:900,borderBottom:'2px solid red',fontSize:20}}>
    FORZA GYM PRO - {tab.toUpperCase()}
   </div>

   <div style={{padding:20}}>
    {tab==='Tienda' && <div><h2>TIENDA</h2><p>Acá van tus productos.</p></div>}
    {tab==='Categorias' && <div><h2>CATEGORIAS</h2><p>Filtros por categoría.</p></div>}
    {tab==='Favoritos' && <div><h2>FAVORITOS</h2><p>Tus favoritos.</p></div>}
    {tab==='Pedidos' && (
     <div>
      <h2>CREAR RUTINA</h2>
      <div style={{display:'flex',flexDirection:'column',gap:12,marginTop:15}}>
       <input value={nombre} onChange={e=>setNombre(e.target.value)} placeholder="Nombre rutina (ej: Pecho y Triceps)" style={{padding:12,borderRadius:8,border:'none'}}/>
       <select value={dias} onChange={e=>setDias(e.target.value)} style={{padding:12,borderRadius:8,border:'none'}}>
        <option>Lunes</option><option>Martes</option><option>Miercoles</option><option>Jueves</option><option>Viernes</option><option>Sabado</option>
       </select>
       <textarea value={ejercicios} onChange={e=>setEjercicios(e.target.value)} placeholder="Ejercicios: 4x12 Press banca, 3x15 Aperturas..." style={{padding:12,borderRadius:8,border:'none',minHeight:100}}/>
       <button onClick={crearRutina} style={{padding:14,background:'red',color:'white',fontWeight:900,border:'none',borderRadius:10}}>GUARDAR RUTINA</button>
      </div>
     </div>
    )}
    {tab==='Cuenta' && (
     <div>
      <h2>MIS RUTINAS ({rutinas.length})</h2>
      {rutinas.length===0 && <p style={{opacity:0.6}}>No tenés rutinas. Creá una en Pedidos.</p>}
      {rutinas.map(r=>(
       <div key={r.id} style={{background:'#1a1a1a',padding:12,borderRadius:10,marginBottom:10,borderLeft:'4px solid red'}}>
        <b>{r.nombre}</b> - {r.dias}
        <div style={{fontSize:13,opacity:0.8,marginTop:5,whiteSpace:'pre-wrap'}}>{r.ejercicios}</div>
        <button onClick={()=>setRutinas(rutinas.filter(x=>x.id!==r.id))} style={{marginTop:8,background:'#333',color:'white',border:'none',padding:6,borderRadius:6}}>Borrar</button>
       </div>
      ))}
      <button onClick={()=>setTab('Pedidos')} style={{marginTop:10,padding:12,width:'100%',background:'white',color:'black',fontWeight:900,borderRadius:10}}> + NUEVA RUTINA</button>
     </div>
    )}
   </div>

   <div style={{position:'fixed',bottom:0,left:0,right:0,display:'flex',borderTop:'1px solid #333',background:'black'}}>
    {['Tienda','Categorias','Favoritos','Pedidos','Cuenta'].map(t=>(
     <div key={t} onClick={()=>setTab(t)} style={{flex:1,padding:12,textAlign:'center',fontSize:11,fontWeight:900,background:tab===t?'red':'#111'}}>{t==='Categorias'?'CAT':t==='Favoritos'?'FAV':t==='Pedidos'?'RUTINA':t.toUpperCase()}</div>
    ))}
   </div>
  </div>
 )
}
