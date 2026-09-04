import { useState, useEffect, useRef } from 'react';
type Dia = 'Dom' | 'Lun' | 'Mar' | 'Mie' | 'Jue' | 'Vie' | 'Sab';
type Tab = 'rutinas' | 'entrenar' | 'progreso' | 'planes' | 'admin';
type Rutina = { dia: Dia; nombre: string; ej: string[]; imagen?: string; pro?: boolean; };
const DEFAULT_RUTINAS: Rutina[] = [
  { dia: 'Lun', nombre: 'PECHO + TRICEPS', ej: ['Press banca 4x10', 'Aperturas 3x12'], pro: false },
  { dia: 'Mar', nombre: 'ESPALDA + BICEPS', ej: ['Dominadas 4x8'], pro: false },
  { dia: 'Mie', nombre: 'PIERNAS', ej: ['Sentadilla 4x10'], pro: true },
];
type ProgresoFoto = { id: number, fecha: string, foto: string };
export default function App(){
  const [tab, setTab] = useState<Tab>('rutinas');
  const [filtro, setFiltro] = useState<'todas'|'gratis'|'pro'>('todas');
  const [rutinas, setRutinas] = useState<Rutina[]>(() => {
    const s = localStorage.getItem('forza_rutinas');
    return s? JSON.parse(s) : DEFAULT_RUTINAS;
  });
  const [esPro, setEsPro] = useState(() => localStorage.getItem('forza_esPro')==='true');
  const [precio, setPrecio] = useState(() => localStorage.getItem('forza_precio') || '15000');
  const [wsp, setWsp] = useState(() => localStorage.getItem('forza_wsp') || '5491123201025');
  const [mpLink, setMpLink] = useState(() => localStorage.getItem('forza_mp') || '');
  const [progreso, setProgreso] = useState<ProgresoFoto[]>(() => {
    const s = localStorage.getItem('forza_progreso');
    return s? JSON.parse(s) : [];
  });
  const [tiempoHoy, setTiempoHoy] = useState(0);
  const [online, setOnline] = useState(true);
  const startTime = useRef(Date.now());
  useEffect(() => {
    const i = setInterval(() => { setTiempoHoy(Math.floor((Date.now() - startTime.current)/1000)); setOnline(navigator.onLine); }, 1000);
    return () => clearInterval(i);
  }, []);
  useEffect(() => { localStorage.setItem('forza_rutinas', JSON.stringify(rutinas)); }, [rutinas]);
  useEffect(() => { localStorage.setItem('forza_esPro', String(esPro)); }, [esPro]);

  const handleImageUpload = (index: number, e: any) => {
    const file = e.target.files[0]; if(!file) return;
    const reader = new FileReader();
    reader.onload = () => { const copy = [...rutinas]; copy[index].imagen = reader.result as string; setRutinas(copy); };
    reader.readAsDataURL(file);
  };
  const handleProgresoUpload = (e: any) => {
    const file = e.target.files[0]; if(!file) return;
    const reader = new FileReader();
    reader.onload = () => { setProgreso([{ id: Date.now(), fecha: new Date().toLocaleDateString(), foto: reader.result as string },...progreso]); };
    reader.readAsDataURL(file);
  };

  const rutinasFiltradas = rutinas.filter(r => filtro==='todas'? true : filtro==='gratis'?!r.pro : r.pro);

  return (
    <div style={{minHeight:'100vh',background:'#0a0a0a',color:'#fff',fontFamily:'system-ui',paddingBottom:90}}>
      <div style={{padding:14,background:'#000',borderBottom:'1px solid #222',display:'flex',justifyContent:'space-between',alignItems:'center',position:'sticky',top:0,zIndex:10}}>
        <div style={{fontWeight:900}}>FORZA <span style={{color:'#dc2626'}}>GYM PRO</span></div>
        <div style={{display:'flex',alignItems:'center',gap:6,fontSize:12}}><div style={{width:10,height:10,borderRadius:50,background:online?'#22c55e':'#ef4444'}}></div>{Math.floor(tiempoHoy/60)}m</div>
      </div>
      <div style={{padding:16}}>
        {tab==='rutinas' && <>
          <div style={{display:'flex',gap:6,marginTop:10}}>{(['todas','gratis','pro'] as const).map(f=><button key={f} onClick={()=>setFiltro(f)} style={{padding:'8px 12px',borderRadius:20,border:'1px solid #333',background:filtro===f?'#dc2626':'#000',color:'#fff',fontSize:12,fontWeight:900}}>{f.toUpperCase()}</button>)}</div>
          {rutinasFiltradas.map((r,i)=><div key={i} style={{background:'#161616',borderRadius:14,marginTop:12,overflow:'hidden',border:'1px solid #222'}}>{r.imagen && <img src={r.imagen} style={{width:'100%',height:140,objectFit:'cover'}}/><div style={{padding:12}}><div style={{fontSize:11,color:'#666'}}>{r.dia} {r.pro?'• PRO':'• GRATIS'}</div><div style={{fontWeight:900}}>{r.nombre}</div>{r.ej.map((e,j)=><div key={j} style={{color:'#aaa',fontSize:13,marginTop:4}}>• {e}</div>)}</div></div>)}
        </>}
        {tab==='admin' && <div>
          <h2 style={{color:'#dc2626',fontWeight:900}}>ADMIN</h2>
          <div style={{background:'#161616',padding:14,borderRadius:12,marginTop:10}}>
            <input placeholder="Precio" value={precio} onChange={e=>setPrecio(e.target.value)} style={{width:'100%',background:'#000',border:'1px solid #333',color:'#fff',padding:10,borderRadius:8}}/>
            <input placeholder="Link MercadoPago" value={mpLink} onChange={e=>setMpLink(e.target.value)} style={{width:'100%',marginTop:8,background:'#000',border:'1px solid #333',color:'#fff',padding:10,borderRadius:8}}/>
            <input placeholder="WhatsApp" value={wsp} onChange={e=>setWsp(e.target.value)} style={{width:'100%',marginTop:8,background:'#000',border:'1px solid #333',color:'#fff',padding:10,borderRadius:8}}/>
          </div>
          <button onClick={()=>{ setRutinas(prev=>[...prev, { dia: 'Lun', nombre: 'NUEVA RUTINA', ej: ['Ejercicio 1'], pro: false }]); setTimeout(()=>window.scrollTo(0,document.body.scrollHeight),200); }} style={{width:'100%',marginTop:12,background:'#fff',color:'#000',fontWeight:900,padding:14,borderRadius:10,border:'none'}}> + AGREGAR RUTINA NUEVA </button>
          {rutinas.map((r,i)=><div key={i} style={{background:'#111',padding:12,borderRadius:12,marginTop:10,border:'1px solid #222'}}>
            <div style={{display:'flex',gap:6}}><select value={r.dia} onChange={e=>{const c=[...rutinas]; c[i].dia=e.target.value as Dia; setRutinas(c);}} style={{background:'#000',color:'#fff',border:'1px solid #333',padding:6,borderRadius:6}}>{['Lun','Mar','Mie','Jue','Vie','Sab','Dom'].map(d=><option key={d}>{d}</option>)}</select>
            <label style={{display:'flex',alignItems:'center',gap:4,background:r.pro?'#dc2626':'#222',padding:'0 10px',borderRadius:6,fontSize:12}}><input type="checkbox" checked={!!r.pro} onChange={e=>{const c=[...rutinas]; c[i].pro=e.target.checked; setRutinas(c);}}/> PRO</label></div>
            <input value={r.nombre} onChange={e=>{const c=[...rutinas]; c[i].nombre=e.target.value; setRutinas(c);}} style={{width:'100%',marginTop:8,background:'#000',border:'1px solid #333',color:'#fff',padding:8,borderRadius:8}}/>
            <textarea value={r.ej.join('\n')} onChange={e=>{const c=[...rutinas]; c[i].ej=e.target.value.split('\n'); setRutinas(c);}} rows={2} style={{width:'100%',marginTop:8,background:'#000',border:'1px solid #333',color:'#fff',padding:8,borderRadius:8}}/>
            <label style={{display:'block',marginTop:8,background:'#222',padding:8,borderRadius:8,textAlign:'center',fontSize:12}}>📸 Foto <input type="file" accept="image/*" onChange={e=>handleImageUpload(i,e)} style={{display:'none'}}/></label>
            <button onClick={()=>setRutinas(rutinas.filter((_,idx)=>idx!==i))} style={{width:'100%',marginTop:8,background:'#300',border:'none',color:'#f66',padding:8,borderRadius:8}}>Eliminar</button>
          </div>)}
        </div>}
        {tab==='progreso' && <><h2 style={{fontWeight:900}}>PROGRESO</h2><label style={{display:'block',marginTop:12,background:'#dc2626',textAlign:'center',padding:14,borderRadius:12,fontWeight:900}}> + SUBIR FOTO <input type="file" accept="image/*" onChange={handleProgresoUpload} style={{display:'none'}}/></label><div style={{marginTop:16,display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>{progreso.map(p=><div key={p.id} style={{background:'#161616',borderRadius:12,overflow:'hidden'}}><img src={p.foto} style={{width:'100%',height:150,objectFit:'cover'}}/></div>)}</div></>}
        {tab==='planes' && <><h2>PLANES</h2><div style={{background:'#dc2626',borderRadius:16,padding:20,marginTop:12}}><div style={{fontWeight:900}}>PRO - ${precio}</div>{mpLink && <a href={mpLink} target="_blank" style={{display:'block',marginTop:10,background:'#fff',color:'#000',textAlign:'center',padding:14,borderRadius:12,fontWeight:900,textDecoration:'none'}}>💳 MERCADO PAGO</a>}<a href={`https://wa.me/${wsp}`} target="_blank" style={{display:'block',marginTop:10,background:'#000',color:'#fff',textAlign:'center',padding:14,borderRadius:12,textDecoration:'none'}}>WHATSAPP</a></div></>}
        {tab==='entrenar' && <div>ENTRENAR</div>}
      </div>
      <div style={{position:'fixed',bottom:0,left:0,right:0,background:'#000',borderTop:'1px solid #222',display:'flex',justifyContent:'space-around',padding:'8px 0'}}>{[{id:'rutinas',l:'RUTINAS',i:'💪'},{id:'entrenar',l:'ENTRENAR',i:'▶️'},{id:'progreso',l:'PROGRESO',i:'📸'},{id:'planes',l:'PLANES',i:'👑'},{id:'admin',l:'ADMIN',i:'⚙️'}].map(t=><button key={t.id} onClick={()=>setTab(t.id as Tab)} style={{background:tab===t.id?'#dc26261a':'transparent',border:'none',color:tab===t.id?'#dc2626':'#666',display:'flex',flexDirection:'column',alignItems:'center',padding:'6px 10px',borderRadius:10}}><span>{t.i}</span><span style={{fontSize:9}}>{t.l}</span></button>)}</div>
    </div>
  )
}
