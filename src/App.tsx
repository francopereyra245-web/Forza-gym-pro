import { useState } from 'react';
type Dia = 'Dom' | 'Lun' | 'Mar' | 'Mie' | 'Jue' | 'Vie' | 'Sab';
type Tab = 'rutinas' | 'entrenar' | 'progreso' | 'planes';
const RUTINAS = [
  { dia: 'Lun' as Dia, nombre: 'PECHO + TRICEPS', ej: ['Press banca 4x10', 'Aperturas 3x12', 'Fondos 3x15'] },
  { dia: 'Mar' as Dia, nombre: 'ESPALDA + BICEPS', ej: ['Dominadas 4x8', 'Remo 4x10', 'Curl 3x12'] },
  { dia: 'Mie' as Dia, nombre: 'PIERNAS', ej: ['Sentadilla 4x10', 'Prensa 4x12', 'Gemelos 4x20'] },
  { dia: 'Jue' as Dia, nombre: 'HOMBROS + ABS', ej: ['Militar 4x10', 'Laterales 3x15', 'Plancha 3x60s'] },
  { dia: 'Vie' as Dia, nombre: 'FULL BODY', ej: ['Peso muerto 4x8', 'Burpees 3x15', 'Banca 3x10'] },
  { dia: 'Sab' as Dia, nombre: 'CARDIO + ABS', ej: ['Cinta 20min', 'Abs 4x25'] },
];
export default function App() {
  const [tab, setTab] = useState<Tab>('rutinas');
  const diaHoy = (['Dom','Lun','Mar','Mie','Jue','Vie','Sab'] as Dia[])[new Date().getDay()];
  const rutinaHoy = RUTINAS.find(r => r.dia === diaHoy) || null;
  return (
    <div style={{minHeight:'100vh', background:'#0a0a0a', color:'#fff', fontFamily:'system-ui', paddingBottom:80}}>
      <div style={{padding:14, borderBottom:'1px solid #222', display:'flex', justifyContent:'space-between', alignItems:'center', background:'#000', position:'sticky', top:0}}>
        <div style={{display:'flex', gap:10, alignItems:'center'}}>
          <img src="/logo.png" alt="FORZA" style={{width:36, height:36, objectFit:'contain'}} />
          <b>FORZA <span style={{color:'#dc2626'}}>GYM PRO</span></b>
        </div>
        <span style={{fontSize:10, color:'#666'}}>WILDE</span>
      </div>
      <div style={{padding:16}}>
        {tab==='rutinas' && <><h2 style={{fontWeight:900,fontSize:20}}>HOY: <span style={{color:'#dc2626'}}>{rutinaHoy? rutinaHoy.nombre : 'DESCANSO'}</span></h2>{rutinaHoy? rutinaHoy.ej.map((e,i)=><div key={i} style={{background:'#1a1a1a', border:'1px solid #2a2a2a', padding:14, borderRadius:12, marginTop:10, borderLeft:'3px solid #dc2626'}}>{e}</div>) : <div style={{marginTop:12, color:'#888', background:'#1a1a1a', padding:16, borderRadius:12}}>Domingo libre.</div>}</>}
        {tab==='entrenar' && <><h2 style={{fontWeight:900}}>ENTRENAR: {rutinaHoy?.nombre || 'DESCANSO'}</h2>{rutinaHoy?.ej.map((e,i)=><div key={i} style={{background:'#1a1a1a',padding:16,borderRadius:14,marginTop:12,display:'flex',gap:12,alignItems:'center'}}><div style={{width:36,height:36,background:'#dc2626',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900}}>{i+1}</div>{e}</div>)}<button style={{width:'100%',marginTop:20,background:'#dc2626',color:'#fff',fontWeight:900,padding:16,borderRadius:14,border:'none'}}>FINALIZAR</button></>}
        {tab==='progreso' && <><h2 style={{fontWeight:900}}>PROGRESO</h2><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginTop:12}}><div style={{background:'#1a1a1a',padding:16,borderRadius:14}}><div style={{color:'#666',fontSize:12}}>Entrenos</div><div style={{fontSize:24,fontWeight:900}}>24</div></div><div style={{background:'#1a1a1a',padding:16,borderRadius:14}}><div style={{color:'#666',fontSize:12}}>Racha</div><div style={{fontSize:24,fontWeight:900,color:'#dc2626'}}>5 días</div></div></div></>}
        {tab==='planes' && <><h2 style={{fontWeight:900}}>PLANES</h2><div style={{marginTop:12,background:'#dc2626',color:'#fff',borderRadius:16,padding:20}}><div style={{fontWeight:900,fontSize:18}}>FORZA PRO</div><div style={{fontSize:14,marginTop:4}}>$15.000 / mes</div><a href="https://wa.me/5491150000000" target="_blank" style={{display:'block',textAlign:'center',marginTop:16,background:'#000',color:'#fff',fontWeight:900,padding:14,borderRadius:12,textDecoration:'none'}}>ACTIVAR POR WHATSAPP</a></div></>}
      </div>
      <div style={{position:'fixed',bottom:0,left:0,right:0,background:'#000',borderTop:'1px solid #222',display:'flex',justifyContent:'space-around',padding:'8px 0'}}>
        {[{id:'rutinas',l:'Rutinas',i:'💪'},{id:'entrenar',l:'Entrenar',i:'▶️'},{id:'progreso',l:'Progreso',i:'📊'},{id:'planes',l:'Planes',i:'👑'}].map(t=><button key={t.id} onClick={()=>setTab(t.id as Tab)} style={{background:tab===t.id?'#dc26261a':'none',border:'none',color:tab===t.id?'#dc2626':'#666',display:'flex',flexDirection:'column',alignItems:'center',padding:'6px 16px',borderRadius:12}}><span style={{fontSize:18}}>{t.i}</span><span style={{fontSize:10,fontWeight:800}}>{t.l}</span></button>)}
      </div>
    </div>
  );
}
