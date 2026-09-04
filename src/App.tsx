import { useState, useEffect } from 'react';

type Dia = 'Dom' | 'Lun' | 'Mar' | 'Mie' | 'Jue' | 'Vie' | 'Sab';
type Tab = 'rutinas' | 'entrenar' | 'progreso' | 'planes' | 'admin';

const DEFAULT_RUTINAS = [
  { dia: 'Lun' as Dia, nombre: 'PECHO + TRICEPS', ej: ['Press banca 4x10', 'Aperturas 3x12', 'Fondos 3x15'] },
  { dia: 'Mar' as Dia, nombre: 'ESPALDA + BICEPS', ej: ['Dominadas 4x8', 'Remo 4x10', 'Curl 3x12'] },
  { dia: 'Mie' as Dia, nombre: 'PIERNAS', ej: ['Sentadilla 4x10', 'Prensa 4x12', 'Gemelos 4x20'] },
  { dia: 'Jue' as Dia, nombre: 'HOMBROS + ABS', ej: ['Militar 4x10', 'Laterales 3x15', 'Plancha 3x60s'] },
  { dia: 'Vie' as Dia, nombre: 'FULL BODY', ej: ['Peso muerto 4x8', 'Burpees 3x15', 'Banca 3x10'] },
  { dia: 'Sab' as Dia, nombre: 'CARDIO + ABS', ej: ['Cinta 20min', 'Abs 4x25'] },
];

export default function App(){
  const [tab, setTab] = useState<Tab>('rutinas');
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstall, setShowInstall] = useState(false);

  const [rutinas, setRutinas] = useState(() => {
    const saved = localStorage.getItem('forza_rutinas');
    return saved? JSON.parse(saved) : DEFAULT_RUTINAS;
  });
  const [precio, setPrecio] = useState(() => localStorage.getItem('forza_precio') || '15000');
  const [wsp, setWsp] = useState(() => localStorage.getItem('forza_wsp') || '5491123201025');
  const [socials, setSocials] = useState(() => {
    const s = localStorage.getItem('forza_socials');
    return s? JSON.parse(s) : { instagram: 'https://www.instagram.com/forzagympro', facebook: '', tiktok: '', youtube: '' };
  });

  const diaHoy = (['Dom','Lun','Mar','Mie','Jue','Vie','Sab'] as Dia[])[new Date().getDay()];
  const hoy = rutinas.find((r:any) => r.dia === diaHoy) || null;

  useEffect(() => {
    const handler = (e: any) => { e.preventDefault(); setDeferredPrompt(e); setShowInstall(true); };
    window.addEventListener('beforeinstallprompt', handler);
    const timer = setTimeout(() => setShowInstall(true), 2000);
    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => { localStorage.setItem('forza_rutinas', JSON.stringify(rutinas)); }, [rutinas]);
  useEffect(() => { localStorage.setItem('forza_precio', precio); }, [precio]);
  useEffect(() => { localStorage.setItem('forza_wsp', wsp); }, [wsp]);
  useEffect(() => { localStorage.setItem('forza_socials', JSON.stringify(socials)); }, [socials]);

  const instalarApp = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') setShowInstall(false);
      setDeferredPrompt(null);
    } else {
      alert('Android: Menú ⋮ > Instalar app\nIphone: Compartir > Agregar a inicio');
    }
  };

  const updateRutina = (index: number, field: string, value: string) => {
    const copy = [...rutinas];
    if (field === 'nombre') copy[index].nombre = value;
    if (field === 'ej') copy[index].ej = value.split('\n').filter((x:string) => x.trim()!== '');
    setRutinas(copy);
  };

  return (
    <div style={{minHeight:'100vh',background:'#0a0a0a',color:'#fff',fontFamily:'system-ui',paddingBottom:80}}>
      <div style={{padding:14,background:'#000',borderBottom:'1px solid #222',display:'flex',alignItems:'center',gap:10,position:'sticky',top:0,zIndex:10}}>
        <img src="/logo.png" style={{width:36,height:36,objectFit:'contain'}} alt="logo"/>
        <div style={{fontWeight:900}}>FORZA <span style={{color:'#dc2626'}}>GYM PRO</span></div>
      </div>

      <div style={{padding:16}}>
        {tab==='rutinas' && <>
          <h2 style={{fontWeight:900}}>HOY: <span style={{color:'#dc2626'}}>{hoy?hoy.nombre:'DESCANSO'}</span></h2>
          {hoy?hoy.ej.map((e:string,i:number)=><div key={i} style={{background:'#161616',borderLeft:'3px solid #dc2626',padding:14,borderRadius:12,marginTop:10}}>{e}</div>):<div style={{background:'#161616',padding:14,borderRadius:12,marginTop:10,color:'#777'}}>Domingo libre</div>}
        </>}

        {tab==='entrenar' && <>
          <h2 style={{fontWeight:900}}>ENTRENAR</h2>
          {hoy?.ej.map((e:string,i:number)=><div key={i} style={{background:'#161616',padding:14,borderRadius:12,marginTop:10,display:'flex',gap:10}}><div style={{width:32,height:32,background:'#dc2626',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900}}>{i+1}</div>{e}</div>)}
          <button style={{width:'100%',marginTop:20,background:'#dc2626',border:'none',color:'#fff',fontWeight:900,padding:16,borderRadius:14}}>FINALIZAR ENTRENO</button>
        </>}

        {tab==='progreso' && <>
          <h2 style={{fontWeight:900}}>PROGRESO</h2>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginTop:12}}>
            <div style={{background:'#161616',padding:16,borderRadius:14}}><div style={{color:'#666',fontSize:12}}>ENTRENOS</div><div style={{fontWeight:900,fontSize:22}}>24</div></div>
            <div style={{background:'#161616',padding:16,borderRadius:14}}><div style={{color:'#666',fontSize:12}}>RACHA</div><div style={{fontWeight:900,fontSize:22,color:'#dc2626'}}>5 días</div></div>
          </div>
        </>}

        {tab==='planes' && <>
          <h2 style={{fontWeight:900}}>PLANES</h2>
          <div style={{marginTop:12,background:'#dc2626',borderRadius:16,padding:20}}>
            <div style={{fontWeight:900,fontSize:18}}>FORZA PRO</div>
            <div style={{marginTop:6}}>${precio} / mes - Acceso total</div>
            <a href={`https://wa.me/${wsp}?text=Hola%20FORZA%20quiero%20activar%20el%20plan%20PRO`} target="_blank" style={{display:'block',textAlign:'center',marginTop:14,background:'#000',color:'#fff',fontWeight:900,padding:14,borderRadius:12,textDecoration:'none'}}>ACTIVAR POR WHATSAPP</a>
          </div>
          <div style={{marginTop:24,background:'#161616',border:'1px solid #262626',borderRadius:16,padding:16}}>
            <div style={{fontWeight:900,fontSize:12,color:'#888',letterSpacing:1}}>SEGUINOS EN REDES</div>
            <div style={{display:'flex',gap:10,marginTop:12,flexWrap:'wrap'}}>
              {socials.instagram && <a href={socials.instagram} target="_blank" style={{background:'#000',border:'1px solid #333',padding:'12px 18px',borderRadius:12,color:'#fff',textDecoration:'none',fontWeight:700}}>📸 Instagram</a>}
              {socials.tiktok && <a href={socials.tiktok} target="_blank" style={{background:'#000',border:'1px solid #333',padding:'12px 18px',borderRadius:12,color:'#fff',textDecoration:'none',fontWeight:700}}>🎵 TikTok</a>}
              {socials.facebook && <a href={socials.facebook} target="_blank" style={{background:'#000',border:'1px solid #333',padding:'12px 18px',borderRadius:12,color:'#fff',textDecoration:'none',fontWeight:700}}>👍 Facebook</a>}
              {socials.youtube && <a href={socials.youtube} target="_blank" style={{background:'#000',border:'1px solid #333',padding:'12px 18px',borderRadius:12,color:'#fff',textDecoration:'none',fontWeight:700}}>▶️ YouTube</a>}
            </div>
          </div>
        </>}

        {tab==='admin' && <div>
          <h2 style={{fontWeight:900,color:'#dc2626'}}>PANEL ADMIN</h2>
          <p style={{color:'#666',fontSize:12}}>Todo editable como Base44. Se guarda solo.</p>
          <div style={{background:'#161616',padding:16,borderRadius:12,marginTop:12}}>
            <label style={{fontSize:11,color:'#666'}}>PRECIO PLAN</label>
            <input value={precio} onChange={e=>setPrecio(e.target.value)} style={{width:'100%',background:'#000',border:'1px solid #333',color:'#fff',padding:10,borderRadius:8,marginTop:4}}/>
            <label style={{fontSize:11,color:'#666',display:'block',marginTop:10}}>WHATSAPP</label>
            <input value={wsp} onChange={e=>setWsp(e.target.value)} style={{width:'100%',background:'#000',border:'1px solid #333',color:'#fff',padding:10,borderRadius:8,marginTop:4}}/>
          </div>
          <div style={{background:'#161616',padding:16,borderRadius:12,marginTop:12,border:'1px solid #dc2626'}}>
            <div style={{fontWeight:900,fontSize:13}}>📱 REDES SOCIALES</div>
            <small style={{color:'#555'}}>Dejá vacío si no tenés. Cuando lo agregues aparece solo.</small>
            <input placeholder="Instagram" value={socials.instagram} onChange={e=>setSocials({...socials,instagram:e.target.value})} style={{width:'100%',marginTop:8,background:'#000',border:'1px solid #333',color:'#fff',padding:10,borderRadius:8}}/>
            <input placeholder="TikTok" value={socials.tiktok} onChange={e=>setSocials({...socials,tiktok:e.target.value})} style={{width:'100%',marginTop:8,background:'#000',border:'1px solid #333',color:'#fff',padding:10,borderRadius:8}}/>
            <input placeholder="Facebook" value={socials.facebook} onChange={e=>setSocials({...socials,facebook:e.target.value})} style={{width:'100%',marginTop:8,background:'#000',border:'1px solid #333',color:'#fff',padding:10,borderRadius:8}}/>
            <input placeholder="YouTube" value={socials.youtube} onChange={e=>setSocials({...socials,youtube:e.target.value})} style={{width:'100%',marginTop:8,background:'#000',border:'1px solid #333',color:'#fff',padding:10,borderRadius:8}}/>
          </div>
          {rutinas.map((r:any,i:number)=><div key={i} style={{background:'#161616',padding:12,borderRadius:12,marginTop:10}}>
            <div style={{fontWeight:900,fontSize:12}}>{r.dia}</div>
            <input value={r.nombre} onChange={e=>updateRutina(i,'nombre',e.target.value)} style={{width:'100%',marginTop:6,background:'#000',border:'1px solid #333',color:'#fff',padding:8,borderRadius:8}}/>
            <textarea value={r.ej.join('\n')} onChange={e=>updateRutina(i,'ej',e.target.value)} rows={3} style={{width:'100%',marginTop:6,background:'#000',border:'1px solid #333',color:'#fff',padding:8,borderRadius:8}}/>
          </div>)}
        </div>}
      </div>

      {showInstall && <div style={{position:'fixed',bottom:80,left:16,right:16,background:'#111',border:'1px solid #dc2626',padding:16,borderRadius:16,zIndex:9999}}>
        <button onClick={instalarApp} style={{width:'100%',background:'#dc2626',border:'none',color:'#fff',fontWeight:900,padding:12,borderRadius:10}}>📲 INSTALAR FORZA GYM</button>
        <button onClick={()=>setShowInstall(false)} style={{width:'100%',marginTop:8,background:'transparent',border:'none',color:'#666'}}>Cerrar</button>
      </div>}

      <div style={{position:'fixed',bottom:0,left:0,right:0,background:'#000',borderTop:'1px solid #222',display:'flex',justifyContent:'space-around',padding:'8px 0'}}>
        {[{id:'rutinas',l:'RUTINAS',i:'💪'},{id:'entrenar',l:'ENTRENAR',i:'▶️'},{id:'progreso',l:'PROGRESO',i:'📊'},{id:'planes',l:'PLANES',i:'👑'},{id:'admin',l:'ADMIN',i:'⚙️'}].map(t=><button key={t.id} onClick={()=>setTab(t.id as Tab)} style={{background:tab===t.id?'#dc26261a':'transparent',border:'none',color:tab===t.id?'#dc2626':'#666',display:'flex',flexDirection:'column',alignItems:'center',padding:'6px 10px',borderRadius:10}}><span>{t.i}</span><span style={{fontSize:9,fontWeight:800}}>{t.l}</span></button>)}
      </div>
    </div>
  )
}
