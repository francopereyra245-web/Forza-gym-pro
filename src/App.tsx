import { useState, useEffect } from 'react'
const ROJO='#E10600'; const LOGO='/logo.png'
const getM=(n:string)=>{const x=n.toLowerCase();if(x.includes('pecho')||x.includes('press'))return'PECHO';if(x.includes('espalda')||x.includes('remo'))return'ESPALDA';if(x.includes('hombro'))return'HOMBROS';if(x.includes('bicep'))return'BICEPS';if(x.includes('tricep'))return'TRICEPS';if(x.includes('pierna'))return'PIERNAS';return'FORZA'}
type Prod={id:number;nombre:string;tipo:string;precio:string;alias:string;activo:boolean}
export default function App(){
 const [tab,setTab]=useState('rutinas')
 const [rutinas,setRutinas]=useState<any>(()=>{try{return JSON.parse(localStorage.getItem('fr')||'[]')}catch{return[]}})
 const [tienda,setTienda]=useState<Prod[]>(()=>{try{return JSON.parse(localStorage.getItem('ft')||'[]')}catch{return[{id:1,nombre:'Dieta Volumen',tipo:'dieta',precio:'5000',alias:'forza.mp',activo:true}]}})
 const [nR,setNR]=useState('');const [nE,setNE]=useState('');const [nD,setND]=useState('Lun')
 useEffect(()=>{localStorage.setItem('fr',JSON.stringify(rutinas))},[rutinas])
 useEffect(()=>{localStorage.setItem('ft',JSON.stringify(tienda))},[tienda])
 return(
 <div style={{background:'#0A0A0A',minHeight:'100vh',color:'white',maxWidth:440,margin:'0 auto',paddingBottom:90,fontFamily:'system-ui'}}>
  <div style={{padding:10,background:'#000',borderBottom:`3px solid ${ROJO}`,display:'flex',alignItems:'center',gap:10,position:'sticky',top:0,zIndex:20}}>
   <div style={{width:52,height:52,background:'#fff',borderRadius:12,overflow:'hidden',border:`2px solid ${ROJO}`,display:'flex',alignItems:'center',justifyContent:'center'}}>
     <img src={LOGO} style={{width:'90%',height:'90%',objectFit:'contain'}} onError={(e:any)=>{e.target.outerHTML='<div style=font-weight:900;color:#E10600>⚡</div>'}} />
   </div>
   <div><div style={{fontWeight:900,letterSpacing:1}}>FORZA <span style={{color:ROJO}}>GYM PRO</span></div><div style={{fontSize:8,opacity:0.5}}>TU LOGO OFICIAL • WILDE</div></div>
  </div>
  {tab==='rutinas'&&<div style={{padding:12}}>
   <div style={{background:ROJO,padding:14,borderRadius:16}}><div style={{fontSize:9}}>🔔 HOY TE TOCA</div><div style={{fontWeight:900}}>{rutinas[0]?.nombre||'LUNES PECHO'}</div></div>
   <div style={{marginTop:12,background:'#111',padding:12,borderRadius:14,border:'1px solid #222'}}>
    <input value={nR} onChange={e=>setNR(e.target.value)} placeholder="LUNES PECHO" style={{width:'100%',background:'#000',border:'1px solid #333',color:'white',padding:10,borderRadius:10}}/>
    <div style={{display:'flex',gap:6,marginTop:6}}><input value={nE} onChange={e=>setNE(e.target.value)} placeholder="Press Banca" style={{flex:1,background:'#000',border:'1px solid #333',color:'white',padding:10,borderRadius:10}}/><select value={nD} onChange={e=>setND(e.target.value)} style={{background:'#000',border:'1px solid #333',color:'white',borderRadius:10}}><option>Lun</option><option>Mar</option><option>Mie</option><option>Jue</option><option>Vie</option></select><button onClick={()=>{if(!nR||!nE)return;setRutinas([...rutinas,{id:Date.now(),nombre:nR.toUpperCase(),dia:nD,ejercicios:[{nombre:nE}]}]);setNE('')}} style={{background:ROJO,border:'none',color:'white',padding:'0 16px',borderRadius:10,fontWeight:900}}>+</button></div>
   </div>
   {rutinas.map((r:any)=><div key={r.id} style={{marginTop:12,background:'#111',borderRadius:16,border:'1px solid #222'}}><div style={{padding:12,display:'flex',justifyContent:'space-between'}}><b style={{fontSize:12}}>{r.nombre} • {r.dia}</b><button onClick={()=>setRutinas(rutinas.filter((x:any)=>x.id!==r.id))} style={{background:'none',border:'none',color:'#666',fontSize:10}}>Borrar</button></div>{r.ejercicios.map((ej:any,i:number)=><div key={i} style={{display:'flex',gap:12,padding:12,borderTop:'1px solid #222',alignItems:'center'}}><div style={{width:80,height:80,background:ROJO,borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900}}>{getM(ej.nombre)}</div><div><div style={{fontWeight:900}}>{ej.nombre.toUpperCase()}</div><div style={{fontSize:10,color:ROJO}}>● {getM(ej.nombre)}</div></div></div>)}</div>)}
  </div>}
  <div style={{position:'fixed',bottom:0,left:0,right:0,maxWidth:440,margin:'0 auto',background:'#000',borderTop:'1px solid #222',display:'flex',justifyContent:'space-around',padding:'10px 0'}}>
   <button onClick={()=>setTab('rutinas')} style={{background:'none',border:'none',color:ROJO,fontSize:10,fontWeight:900}}>RUTINAS</button><button style={{background:'none',border:'none',color:'#555',fontSize:10}}>TIENDA</button><button style={{background:'none',border:'none',color:'#555',fontSize:10}}>ADMIN</button><button style={{background:'none',border:'none',color:'#555',fontSize:10}}>PLANES</button>
  </div>
 </div>)
}
