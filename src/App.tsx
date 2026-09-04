import { useState, useEffect, useRef } from 'react';

type Dia = 'Dom' | 'Lun' | 'Mar' | 'Mie' | 'Jue' | 'Vie' | 'Sab';
type Tab = 'rutinas' | 'entrenar' | 'progreso' | 'planes' | 'admin';

type Rutina = {
  dia: Dia;
  nombre: string;
  ej: string[];
  imagen?: string;
  video?: string;
};

const DEFAULT_RUTINAS: Rutina[] = [
  { dia: 'Lun', nombre: 'PECHO + TRICEPS', ej: ['Press banca 4x10', 'Aperturas 3x12'], imagen: '' },
  { dia: 'Mar', nombre: 'ESPALDA + BICEPS', ej: ['Dominadas 4x8', 'Remo 4x10'], imagen: '' },
  { dia: 'Mie', nombre: 'PIERNAS', ej: ['Sentadilla 4x10', 'Prensa 4x12'], imagen: '' },
];

type ProgresoFoto = { id: number, fecha: string, foto: string };

export default function App(){
  const [tab, setTab] = useState<Tab>('rutinas');
  const [rutinas, setRutinas] = useState<Rutina[]>(() => {
    const s = localStorage.getItem('forza_rutinas_v2');
    return s? JSON.parse(s) : DEFAULT_RUTINAS;
  });
  const [precio, setPrecio] = useState(() => localStorage.getItem('forza_precio') || '15000');
  const [wsp, setWsp] = useState(() => localStorage.getItem('forza_wsp') || '5491123201025');
  const [mpLink, setMpLink] = useState(() => localStorage.getItem('forza_mp') || '');
  const [socials, setSocials] = useState(() => {
    const s = localStorage.getItem('forza_socials');
    return s? JSON.parse(s) : { instagram: 'https://www.instagram.com/forzagympro', facebook: '', tiktok: '', youtube: '' };
  });
  const [progreso, setProgreso] = useState<ProgresoFoto[]>(() => {
    const s = localStorage.getItem('forza_progreso');
    return s? JSON.parse(s) : [];
  });
  const [tiempoHoy, setTiempoHoy] = useState(0);
  const [online, setOnline] = useState(true);
  const startTime = useRef(Date.now());

  // Tiempo dentro de la app
  useEffect(() => {
    const i = setInterval(() => {
      setTiempoHoy(Math.floor((Date.now() - startTime.current)/1000));
      setOnline(navigator.onLine);
    }, 1000);
    return () => clearInterval(i);
  }, []);

  useEffect(() => { localStorage.setItem('forza_rutinas_v2', JSON.stringify(rutinas)); }, [rutinas]);
  useEffect(() => { localStorage.setItem('forza_precio', precio); }, [precio]);
  useEffect(() => { localStorage.setItem('forza_wsp', wsp); }, [wsp]);
  useEffect(() => { localStorage.setItem('forza_mp', mpLink); }, [mpLink]);
  useEffect(() => { localStorage.setItem('forza_socials', JSON.stringify(socials)); }, [socials]);
  useEffect(() => { localStorage.setItem('forza_progreso', JSON.stringify(progreso)); }, [progreso]);

  const diaHoy = (['Dom','Lun','Mar','Mie','Jue','Vie','Sab'] as Dia[])[new Date().getDay()];
  const hoy = rutinas.find(r => r.dia === diaHoy) || null;

  const addRutina = () => {
    setRutinas([...rutinas, { dia: 'Lun', nombre: 'NUEVA RUTINA', ej: ['Ejercicio 1'], imagen: '', video: '' }]);
  };

  const handleImageUpload = (index: number, e: any) => {
    const file = e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const copy = [...rutinas];
      copy[index].imagen = reader.result as string;
      setRutinas(copy);
    };
    reader.readAsDataURL(file);
  };

  const handleProgresoUpload = (e: any) => {
    const file = e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setProgreso([{ id: Date.now(), fecha: new Date().toLocaleDateString(), foto: reader.result as string },...progreso]);
    };
    reader.readAsDataURL(file);
  };

  const compartirProgreso = async (foto: string) => {
    if(navigator.share){
      try {
        await navigator.share({ title: 'Mi progreso FORZA GYM', text: `Mirá mi avance en @forzagympro 💪 ${socials.instagram}`, url: socials.instagram });
      } catch {}
    } else {
      window.open(socials.instagram, '_blank');
    }
  };

  return (
    <div style={{minHeight:'100vh',background:'#0a0a0a',color:'#fff',fontFamily:'system-ui',paddingBottom:90}}>
      <div style={{padding:14,background:'#000',borderBottom:'1px solid #222',display:'flex',justifyContent:'space-between',alignItems:'center',position:'sticky',top:0,zIndex:10}}>
        <div style={{display:'flex',alignItems:'center',gap:10}}><img src="/logo.png" style={{width:36,height:36}}/><div style={{fontWeight:900}}>FORZA <span style={{color:'#dc2626'}}>GYM PRO</span></div></div>
        <div style={{display:'flex',alignItems:'center',gap:6,fontSize:12}}><div style={{width:10,height:10,borderRadius:50,background:online?'#22c55e':'#ef4444',boxShadow:online?'0 0 8px #22c55e':''}}></div>{online?'ONLINE':'OFFLINE'} {Math.floor(tiempoHoy/60)}m</div>
      </div>

      <div style={{padding:16}}>
        {tab==='rutinas' && <>
          <h2 style={{fontWeight:900}}>RUTINAS <span style={{color:'#dc2626'}}>con foto/video</span></h2>
          {rutinas.map((r,i)=><div key={i} style={{background:'#161616',borderRadius:14,marginTop:12,overflow:'hidden',border:r.dia===diaHoy?'1px solid #dc2626':'1px solid #222'}}>
            {r.imagen && <img src={r.imagen} style={{width:'100%',height:140,objectFit:'cover'}}/>}
            {r.video && <video src={r.video} controls style={{width:'100%',height:140}}/>}
            <div style={{padding:12}}><div style={{fontSize:11,color:r.dia===diaHoy?'#dc2626':'#666'}}>{r.dia} {r.dia===diaHoy&&'• HOY'}</div><div style={{fontWeight:900}}>{r.nombre}</div>{r.ej.map((e,j)=><div key={j} style={{color:'#aaa',fontSize:13,marginTop:4}}>• {e}</div>)}</div>
          </div>)}
        </>}

        {tab==='progreso' && <>
          <h2 style={{fontWeight:900}}>MI PROGRESO 📸</h2>
          <label style={{display:'block',marginTop:12,background:'#dc2626',textAlign:'center',padding:14,borderRadius:12,fontWeight:900}}> + SUBIR FOTO PROGRESO <input type="file" accept="image/*" onChange={handleProgresoUpload} style={{display:'none'}}/></label>
          <div style={{marginTop:16,display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
            {progreso.map(p=><div key={p.id} style={{background:'#161616',borderRadius:12,overflow:'hidden'}}><img src={p.foto} style={{width:'100%',height:150,objectFit:'cover'}}/><div style={{padding:8}}><div style={{fontSize:10,color:'#666'}}>{p.fecha}</div><button onClick={()=>compartirProgreso(p.foto)} style={{width:'100%',marginTop:6,background:'#000',border:'1px solid #333',color:'#fff',padding:6,borderRadius:8,fontSize:11}}>Compartir en {socials.instagram? '@forzagympro': 'Redes'}</button></div></div>)}
          </div>
          {progreso.length===0 && <div style={{color:'#555',textAlign:'center',marginTop:20}}>Todavía no subiste fotos. Subí la primera para ver tu evolución.</div>}
        </>}

        {tab==='planes' && <>
          <h2 style={{fontWeight:900}}>PLANES</h2>
          <div style={{background:'#dc2626',borderRadius:16,padding:20,marginTop:12}}><div style={{fontWeight:900,fontSize:20}}>FORZA PRO - ${precio}</div><div style={{marginTop:10,display:'flex',flexDirection:'column',gap:8}}>
            {mpLink && <a href={mpLink} target="_blank" style={{background:'#fff',color:'#000',textAlign:'center',padding:14,borderRadius:12,fontWeight:900,textDecoration:'none'}}>💳 PAGAR CON MERCADO PAGO</a>}
            <a href={`https://wa.me/${wsp}?text=Quiero%20FORZA%20PRO`} target="_blank" style={{background:'#000',color:'#fff',textAlign:'center',padding:14,borderRadius:12,fontWeight:900,textDecoration:'none'}}>💬 WHATSAPP</a>
          </div></div>
          <div style={{marginTop:20,background:'#161616',padding:16,borderRadius:16}}><div style={{fontSize:11,color:'#666'}}>SEGUINOS</div><div style={{display:'flex',gap:8,marginTop:10,flexWrap:'wrap'}}>{socials.instagram&&<a href={socials.instagram} target="_blank" style={{background:'#000',border:'1px solid #333',padding:10,borderRadius:10,color:'#fff',textDecoration:'none'}}>📸 Instagram</a>}</div></div>
        </>}

        {tab==='admin' && <div>
          <h2 style={{color:'#dc2626',fontWeight:900}}>ADMIN v2</h2>
          <div style={{background:'#161616',padding:14,borderRadius:12,marginTop:10}}>
            <input placeholder="Precio" value={precio} onChange={e=>setPrecio(e.target.value)} style={{width:'100%',background:'#000',border:'1px solid #333',color:'#fff',padding:10,borderRadius:8}}/>
            <input placeholder="Link MercadoPago (https://mpago.la/...)" value={mpLink} onChange={e=>setMpLink(e.target.value)} style={{width:'100%',marginTop:8,background:'#000',border:'1px solid #333',color:'#fff',padding:10,borderRadius:8}}/>
            <input placeholder="WhatsApp" value={wsp} onChange={e=>setWsp(e.target.value)} style={{width:'100%',marginTop:8,background:'#000',border:'1px solid #333',color:'#fff',padding:10,borderRadius:8}}/>
            <input placeholder="Instagram" value={socials.instagram} onChange={e=>setSocials({...socials,instagram:e.target.value})} style={{width:'100%',marginTop:8,background:'#000',border:'1px solid #333',color:'#fff',padding:10,borderRadius:8}}/>
          </div>
          <button onClick={addRutina} style={{width:'100%',marginTop:12,background:'#fff',color:'#000',fontWeight:900,padding:12,borderRadius:10,border:'none'}}>+ AGREGAR RUTINA NUEVA</button>
          {rutinas.map((r,i)=><div key={i} style={{background:'#111',padding:12,borderRadius:12,marginTop:10,border:'1px solid #222'}}>
            <select value={r.dia} onChange={e=>{const c=[...rutinas]; c[i].dia=e.target.value as Dia; setRutinas(c);}} style={{background:'#000',color:'#fff',border:'1px solid #333',padding:6,borderRadius:6}}>{['Lun','Mar','Mie','Jue','Vie','Sab','Dom'].map(d=><option key={d}>{d}</option>)}</select>
            <input value={r.nombre} onChange={e=>{const c=[...rutinas]; c[i].nombre=e.target.value; setRutinas(c);}} style={{width:'100%',marginTop:8,background:'#000',border:'1px solid #333',color:'#fff',padding:8,borderRadius:8}}/>
            <textarea value={r.ej.join('\n')} onChange={e=>{const c=[...rutinas]; c[i].ej=e.target.value.split('\n'); setRutinas(c);}} rows={3} style={{width:'100%',marginTop:8,background:'#000',border:'1px solid #333',color:'#fff',padding:8,borderRadius:8}}/>
            <label style={{display:'block',marginTop:8,background:'#222',padding:8,borderRadius:8,textAlign:'center',fontSize:12}}>📸 Subir foto/video <input type="file" accept="image/*,video/*" onChange={e=>handleImageUpload(i,e)} style={{display:'none'}}/></label>
            <button onClick={()=>setRutinas(rutinas.filter((_,idx)=>idx!==i))} style={{width:'100%',marginTop:8,background:'#300',border:'none',color:'#f66',padding:8,borderRadius:8}}>Eliminar rutina</button>
          </div>)}
          <div style={{marginTop:20,padding:12,background:'#000',borderRadius:10,fontSize:11,color:'#666'}}>Para almacenamiento ilimitado de fotos/videos y ver luz verde/roja de TODOS tus clientes, el próximo paso es conectar Supabase (gratis). Cuando quieras lo hacemos.</div>
        </div>}

        {tab==='entrenar' && <div><h2 style={{fontWeight:900}}>ENTRENAR HOY</h2>{hoy?.ej.map((e,i)=><div key={i} style={{background:'#161616',padding:14,borderRadius:12,marginTop:10}}>{e}</div>)}<button style={{width:'100%',marginTop:20,background:'#22c55e',border:'none',padding:16,borderRadius:14,fontWeight:900}}>✅ TERMINAR ({Math.floor(tiempoHoy/60)} min)</button></div>}
      </div>

      <div style={{position:'fixed',bottom:0,left:0,right:0,background:'#000',borderTop:'1px solid #222',display:'flex',justifyContent:'space-around',padding:'8px 0'}}>
        {[{id:'rutinas',l:'RUTINAS',i:'💪'},{id:'entrenar',l:'ENTRENAR',i:'▶️'},{id:'progreso',l:'PROGRESO',i:'📸'},{id:'planes',l:'PLANES',i:'👑'},{id:'admin',l:'ADMIN',i:'⚙️'}].map(t=><button key={t.id} onClick={()=>setTab(t.id as Tab)} style={{background:tab===t.id?'#dc26261a':'transparent',border:'none',color:tab===t.id?'#dc2626':'#666',display:'flex',flexDirection:'column',alignItems:'center',padding:'6px 10px',borderRadius:10}}><span>{t.i}</span><span style={{fontSize:9,fontWeight:800}}>{t.l}</span></button>)}
      </div>
    </div>
  )
}
