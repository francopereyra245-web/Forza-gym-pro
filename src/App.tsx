import { useState, useEffect } from 'react'

export default function App(){
  const [tab,setTab]=useState('rutinas')
  const [rutinas,setRutinas]=useState(()=>{try{return JSON.parse(localStorage.getItem('fr')||'[]')}catch{return []}})
  const [nR,setNR]=useState(''); const [nE,setNE]=useState(''); const [nD,setND]=useState('Lun')
  const ROJO='#E10600'

  useEffect(()=>{localStorage.setItem('fr',JSON.stringify(rutinas))},[rutinas])

  const getM=(n:string)=>{
    const x=n.toLowerCase()
    if(x.includes('pecho')||x.includes('press')||x.includes('banca')) return 'PECHO'
    if(x.includes('espalda')||x.includes('remo')) return 'ESPALDA'
    if(x.includes('hombro')) return 'HOMBROS'
    if(x.includes('bicep')) return 'BICEPS'
    if(x.includes('tricep')) return 'TRICEPS'
    if(x.includes('pierna')||x.includes('sentadilla')) return 'PIERNAS'
    return 'FORZA'
  }

  return(
    <div style={{background:'#0A0A0A',minHeight:'100vh',color:'white',maxWidth:440,margin:'0 auto',paddingBottom:90,fontFamily:'system-ui'}}>
      <div style={{padding:12,background:'#000',borderBottom:`2px solid ${ROJO}`,display:'flex',alignItems:'center',gap:10,position:'sticky',top:0}}>
        <div style={{width:36,height:36,background:ROJO,borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900}}>⚡</div>
        <div style={{fontWeight:900}}>FORZA <span style={{color:ROJO}}>GYM PRO</span></div>
      </div>

      {tab==='rutinas' && (
        <div style={{padding:12}}>
          <div style={{background:ROJO,padding:14,borderRadius:16}}>
            <div style={{fontSize:10}}>HOY TE TOCA</div>
            <div style={{fontWeight:900,fontSize:18}}>{rutinas[0]?.nombre || 'LUNES PECHO'}</div>
          </div>

          <div style={{marginTop:12,background:'#111',padding:12,borderRadius:14,border:'1px solid #222'}}>
            <input value={nR} onChange={e=>setNR(e.target.value)} placeholder="Nombre: LUNES PECHO" style={{width:'100%',background:'#000',border:'1px solid #333',color:'white',padding:10,borderRadius:10}}/>
            <div style={{display:'flex',gap:6,marginTop:6}}>
              <input value={nE} onChange={e=>setNE(e.target.value)} placeholder="Ejercicio: Press Banca" style={{flex:1,background:'#000',border:'1px solid #333',color:'white',padding:10,borderRadius:10}}/>
              <select value={nD} onChange={e=>setND(e.target.value)} style={{background:'#000',border:'1px solid #333',color:'white',borderRadius:10}}><option>Lun</option><option>Mar</option><option>Mie</option><option>Jue</option><option>Vie</option></select>
              <button onClick={()=>{if(!nR||!nE) return; setRutinas([...rutinas,{id:Date.now(),nombre:nR.toUpperCase(),dia:nD,ejercicios:[{nombre:nE}]}]); setNE('')}} style={{background:ROJO,border:'none',color:'white',padding:'0 16px',borderRadius:10,fontWeight:900}}>+</button>
            </div>
          </div>

          {rutinas.map((r:any)=>(
            <div key={r.id} style={{marginTop:12,background:'#111',borderRadius:16,border:'1px solid #222'}}>
              <div style={{padding:12,display:'flex',justifyContent:'space-between'}}><b style={{fontSize:12}}>{r.nombre} • {r.dia}</b><button onClick={()=>setRutinas(rutinas.filter((x:any)=>x.id!==r.id))} style={{background:'none',border:'none',color:'#666',fontSize:10}}>Borrar</button></div>
              {r.ejercicios.map((ej:any,i:number)=>(
                <div key={i} style={{display:'flex',gap:12,padding:12,borderTop:'1px solid #222',alignItems:'center'}}>
                  <div style={{width:80,height:80,background:ROJO,borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:11}}>{getM(ej.nombre)}</div>
                  <div><div style={{fontWeight:900}}>{ej.nombre.toUpperCase()}</div><div style={{fontSize:10,color:ROJO,fontWeight:900}}>● {getM(ej.nombre)}</div></div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {tab==='tienda' && <div style={{padding:12}}><b>TIENDA • GRATIS Y PRO</b><div style={{marginTop:10,background:'#111',padding:12,borderRadius:12}}>Activa</div></div>}
      {tab==='admin' && <div style={{padding:12}}><b>ADMIN</b><div style={{marginTop:10,background:'#111',padding:12,borderRadius:12}}>Panel OK</div></div>}
      {tab==='planes' && <div style={{padding:12}}><b>PLANES</b><div style={{marginTop:10,background:'#111',padding:12,borderRadius:12,border:`1px solid ${ROJO}`}}>PRO $4990</div></div>}

      <div style={{position:'fixed',bottom:0,left:0,right:0,maxWidth:440,margin:'0 auto',background:'#000',borderTop:'1px solid #222',display:'flex',justifyContent:'space-around',padding:'10px 0'}}>
        <button onClick={()=>setTab('rutinas')} style={{background:'none',border:'none',color:tab==='rutinas'?ROJO:'#555',fontSize:10,fontWeight:900}}>RUTINAS</button>
        <button onClick={()=>setTab('tienda')} style={{background:'none',border:'none',color:tab==='tienda'?ROJO:'#555',fontSize:10,fontWeight:900}}>TIENDA</button>
        <button onClick={()=>setTab('admin')} style={{background:'none',border:'none',color:tab==='admin'?ROJO:'#555',fontSize:10,fontWeight:900}}>ADMIN</button>
        <button onClick={()=>setTab('planes')} style={{background:'none',border:'none',color:tab==='planes'?ROJO:'#555',fontSize:10,fontWeight:900}}>PLANES</button>
      </div>
    </div>
  )
}
