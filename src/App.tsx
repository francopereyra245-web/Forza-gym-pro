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
    <div style={{minHeight:'100vh', background:'#000', color:'#fff', fontFamily:'system-ui', paddingBottom:80}}>
      <div style={{padding:16, borderBottom:'1px solid #222', display:'flex', justifyContent:'space-between'}}>
        <div style={{display:'flex', gap:8, alignItems:'center'}}><div style={{width:32,height:32,background:'#facc15',borderRadius:8,color:'#000',fontWeight:900,display:'flex',alignItems:'center',justifyContent:'center'}}>F</div><b>FORZA <span style={{color:'#facc15'}}>GYM PRO</span></b></div>
        <span style={{fontSize:10,color:'#666'}}>WILDE</span>
      </div>

      <div style={{padding:16}}>
        {tab==='rutinas' && <>
          <h2 style={{fontWeight:900,fontSize:20}}>HOY: {rutinaHoy? rutinaHoy.nombre : 'DESCANSO'}</h2>
          {rutinaHoy? rutinaHoy.ej.map((e,i)=><div key={i} style={{background:'#18181b',padding:14,borderRadius:12,marginTop:10}}>{e}</div>) : <div style={{marginTop:12,color:'#888'}}>Domingo libre, campeón.</div>}
          <h3 style={{marginTop:24,color:'#888',fontSize:12,letterSpacing:1}}>SEMANA COMPLETA</h3>
          {RUTINAS.map(r=><div key={r.dia} style={{background:'#111',padding:12,borderRadius:10,marginTop:8,display:'flex',justifyContent:'space-between'}}><span>{r.dia} - {r.nombre}</span><span style={{color:'#555'}}>{r.ej.length} ej</span></div>)}
        </>}

        {tab==='entrenar' && <>
          <h2 style={{fontWeight:900,fontSize:20}}>{rutinaHoy?.nombre || 'HOY NO SE ENTRENA'}</h2>
          {rutinaHoy?.ej.map((e,i)=><div key={i} style={{background:'#18181b',padding:16,borderRadius:16,marginTop:12,display:'flex',gap:12,alignItems:'center'}}><div style={{width:36,height:36,background:'#facc15',color:'#000',fontWeight:900,borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center'}}>{i+1}</div><b>{e}</b></div>)}
          {rutinaHoy && <button style={{width:'100%',marginTop:20,background:'#facc15',color:'#000',fontWeight:900,padding:16,borderRadius:16,border:'none'}}>FINALIZAR ENTRENAMIENTO</button>}
        </>}

        {tab==='progreso' && <>
          <h2 style={{fontWeight:900,fontSize:20}}>PROGRESO</h2>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginTop:12}}>
            <div style={{background:'#18181b',padding:16,borderRadius:16}}><div style={{color:'#888',fontSize:12}}>Entrenos</div><div style={{fontSize:24,fontWeight:900}}>24</div></div>
            <div style={{background:'#18181b',padding:16,borderRadius:16}}><div style={{color:'#888',fontSize:12}}>Racha</div><div style={{fontSize:24,fontWeight:900,color:'#facc15'}}>5 días</div></div>
          </div>
        </>}

        {tab==='planes' && <>
          <h2 style={{fontWeight:900,fontSize:20}}>PLANES</h2>
          <div style={{marginTop:12,background:'#facc15',color:'#000',borderRadius:16,padding:20}}>
            <div style={{fontWeight:900,fontSize:18}}>FORZA PRO</div><div style={{fontSize:14,marginTop:4}}>Personalizado + seguimiento con Franco</div><div style={{fontWeight:900,fontSize:22,marginTop:12}}>$15.000 / mes</div>
            <a href="https://wa.me/5491150000000" target="_blank" style={{display:'block',textAlign:'center',marginTop:16,background:'#000',color:'#facc15',fontWeight:900,padding:14,borderRadius:12,textDecoration:'none'}}>ACTIVAR POR WHATSAPP</a>
          </div>
        </>}
      </div>

      <div style={{position:'fixed',bottom:0,left:0,right:0,background:'#18181b',borderTop:'1px solid #222',display:'flex',justifyContent:'space-around',padding:'8px 0'}}>
        {[{id:'rutinas',l:'Rutinas',i:'💪'},{id:'entrenar',l:'Entrenar',i:'▶️'},{id:'progreso',l:'Progreso',i:'📊'},{id:'planes',l:'Planes',i:'👑'}].map(t=><button key={t.id} onClick={()=>setTab(t.id as Tab)} style={{background:tab===t.id?'#facc1520':'none',border:'none',color:tab===t.id?'#facc15':'#888',display:'flex',flexDirection:'column',alignItems:'center',padding:'6px 16px',borderRadius:12}}><span style={{fontSize:18}}>{t.i}</span><span style={{fontSize:10,fontWeight:800}}>{t.l}</span></button>)}
      </div>
    </div>
  );
}
