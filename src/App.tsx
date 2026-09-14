import { useState, useEffect } from 'react'
const ROJO='#E10600'
const LOGO='/logo.png'
const getM=(n:string)=>{const x=n.toLowerCase();if(x.includes('pecho')||x.includes('press'))return'PECHO';if(x.includes('espalda')||x.includes('remo'))return'ESPALDA';if(x.includes('hombro'))return'HOMBROS';if(x.includes('bicep'))return'BICEPS';if(x.includes('tricep'))return'TRICEPS';return'FORZA'}
export default function App(){
 const [tab,setTab]=useState('rutinas')
 const [rutinas,setRutinas]=useState<any>(()=>{try{return JSON.parse(localStorage.getItem('fz_r')||'[]')}catch{return[]}})
 const [nR,setNR]=useState('');const [nE,setNE]=useState('');const [nD,setND]=useState('Lun')
 useEffect(()=>{localStorage.setItem('fz_r',JSON.stringify(rutinas))},[rutinas])
 return(
 <div style={{background:'#0A0A0A',minHeight:'100vh',color:'white',maxWidth:440,margin:'0 auto',paddingBottom:90,fontFamily:'system-ui'}}>
  <div style={{padding:10,background:'#000',borderBottom:`3px solid ${ROJO}`,display:'flex',alignItems:'center',gap:10,position:'sticky',top:0,zIndex:20}}>
   <div style={{width:48,height:48,background:'white',borderRadius:12,overflow:'hidden',padding:2,border:`2px solid ${ROJO}`}}>
     <img src={LOGO} alt="FORZA" style={{width:'100%',height:'100%',objectFit:'contain'}} onError={(e:any)=>{e.target.style.display='none'; e.target.parentElement.innerHTML='⚡'}}/>
   </div>
   <div><div style={{fontWeight:900,fontSize:18,letterSpacing:1}}>FORZA<span style={{color:ROJO}}>ZA</span> <span style={{fontSize:10,fontWeight:400,opacity:0.6}}>GYM PRO</span></div><div style={{fontSize:8,opacity:0.5}}>WILDE • OFICIAL</div></div>
  </div>
  <div style={{padding:12}}>
   <div style={{background:`linear-gradient(90deg, ${ROJO}, #600)`,padding:14,borderRadius:16,display:'flex',justifyContent:'space-between'}}><div><div style={{fontSize:9}}>🔔 HOY TE TOCA</div><div style={{fontWeight:900}}>{rutinas[0]?.nombre||'LUNES PECHO'}</div></div><button onClick={()=>Notification.requestPermission()} style={{background:'white',color:'black',border:'none',padding:'8px 12px',borderRadius:20,fontWeight:900,fontSize:10}}>ALARMA</button></div>
   <div style={{marginTop:12,background:'#111',padding:12,borderRadius:14,border:'1px solid #222'}}>
    <input value={nR} onChange={e=>setNR(e.target.value)} placeholder="LUNES PECHO" style={{width:'100%',background:'#000',border:'1px solid #333',color:'white',padding:10,borderRadius:10}}/>
    <div style={{display:'flex',gap:6,marginTop:6}}><input value={nE} onChange={e=>setNE(e.target.value)} placeholder="Press Banca" style={{flex:1,background:'#000',border:'1px solid #333',color:'white',padding:10,borderRadius:10}}/><select value={nD} onChange={e=>setND(e.target.value)} style={{background:'#000',border:'1px solid #333',color:'white',borderRadius:10}}><option>Lun</option><option>Mar</option><option>Mie</option><option>Jue</option><option>Vie</option></select><button onClick={()=>{if(!nR||!nE)return;setRutinas([...rutinas,{id:Date.now(),nombre:nR.toUpperCase(),dia:nD,ejercicios:[{nombre:nE}]}]);setNE('')}} style={{background:ROJO,border:'none',color:'white',padding:'0 16px',borderRadius:10,fontWeight:900}}>+</button></div>
   </div>
   {rutinas.map((r:any)=><div key={r.id} style={{marginTop:12,background:'#111',borderRadius:16,border:'1px solid #222'}}><div style={{padding:12,display:'flex',justifyContent:'space-between'}}><b style={{fontSize:12}}>{r.nombre} • {r.dia}</b><button onClick={()=>setRutinas(rutinas.filter((x:any)=>x.id!==r.id))} style={{background:'none',border:'none',color:'#666',fontSize:10}}>Borrar</button></div>{r.ejercicios.map((ej:any,i:number)=><div key={i} style={{display:'flex',gap:12,padding:12,borderTop:'1px solid #222',alignItems:'center'}}><div style={{width:80,height:80,background:ROJO,borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:11}}>{getM(ej.nombre)}</div><div><div style={{fontWeight:900}}>{ej.nombre.toUpperCase()}</div><div style={{fontSize:10,color:ROJO,fontWeight:900}}>● {getM(ej.nombre)}</div></div></div>)}</div>)}
  </div>
  <div style={{position:'fixed',bottom:0,left:0,right:0,maxWidth:440,margin:'0 auto',background:'#000',borderTop:'1px solid #222',display:'flex',justifyContent:'space-around',padding:'10px 0'}}>
   <button onClick={()=>setTab('rutinas')} style={{background:'none',border:'none',color:tab==='rutinas'?ROJO:'#555',fontSize:10,fontWeight:900}}>RUTINAS</button>
   <button onClick={()=>setTab('tienda')} style={{background:'none',border:'none',color:'#555',fontSize:10,fontWeight:900}}>TIENDA</button>
   <button onClick={()=>setTab('admin')} style={{background:'none',border:'none',color:'#555',fontSize:10,fontWeight:900}}>ADMIN</button>
   <button onClick={()=>setTab('planes')} style={{background:'none',border:'none',color:'#555',fontSize:10,fontWeight:900}}>PLANES</button>
  </div>
 </div>
 )
}
