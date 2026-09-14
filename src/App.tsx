import { useState, useEffect } from 'react';

type Product = {
  id:number; nombre:string; categoria:string; precio:number; precioPro:number;
  alias:string; tel:string; media:string; mediaType:string;
  mpLink:string; debitoAuto:boolean; activo:boolean;
}

const CATS = ['ALL','DIET','SUPPLEMENTS','APPAREL','EQUIPMENT'];

export default function App(){
  const [tab,setTab]=useState('Account');
  const [q,setQ]=useState('');
  const [catFilter,setCatFilter]=useState('ALL');
  const [products,setProducts]=useState<Product[]>(()=>JSON.parse(localStorage.getItem('forza_products')||'[]'));

  // form
  const [nombre,setNombre]=useState('');
  const [cat,setCat]=useState('SUPPLEMENTS');
  const [precio,setPrecio]=useState('');
  const [precioPro,setPrecioPro]=useState('');
  const [alias,setAlias]=useState('');
  const [tel,setTel]=useState('');
  const [mpLink,setMpLink]=useState('');
  const [debitoAuto,setDebitoAuto]=useState(false);
  const [media,setMedia]=useState(''); const [mediaType,setMediaType]=useState('');

  useEffect(()=>localStorage.setItem('forza_products',JSON.stringify(products)),[products]);

  const onFile = (e:any) => {
    const file = e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setMedia(reader.result as string);
      setMediaType(file.type.startsWith('video')?'video':'image');
    };
    reader.readAsDataURL(file);
  };

  const guardar = () => {
    if(!nombre.trim()) return alert('Poné nombre del producto');
    if(!media) return alert('Seleccioná foto/video');
    if(!alias.trim()) return alert('Poné alias socio');
    if(!tel.trim()) return alert('Poné tel comercial');
    const p:Product = {
      id:Date.now(), nombre, categoria:cat, precio:Number(precio)||0, precioPro:Number(precioPro)||0,
      alias, tel, media, mediaType, mpLink, debitoAuto, activo:false
    };
    setProducts([p,...products]);
    setNombre(''); setPrecio(''); setPrecioPro(''); setAlias(''); setTel(''); setMedia(''); setMpLink('');
    alert('GUARDADO - Quedó DESACTIVADO. Actívalo abajo para que aparezca en TIENDA.');
  };

  const toggleActivo = (id:number) => setProducts(products.map(p=>p.id===id?{...p,activo:!p.activo}:p));
  const borrar = (id:number) => { if(confirm('Borrar?')) setProducts(products.filter(p=>p.id!==id)) };
  const updatePro = (id:number, val:string) => setProducts(products.map(p=>p.id===id?{...p,precioPro:Number(val)}:p));

  const visibles = products.filter(p=> (catFilter==='ALL'||p.categoria===catFilter) && p.nombre.toLowerCase().includes(q.toLowerCase()));

  return (
    <div style={{background:'#0E0E0E',color:'white',minHeight:'100vh',paddingBottom:80,fontFamily:'system-ui'}}>
      {/* HEADER */}
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'12px 16px',borderBottom:'1px solid #222'}}>
        <div style={{display:'flex',alignItems:'center',gap:8}}><div style={{width:36,height:36,background:'red',borderRadius:50,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900}}>F</div><div><div style={{fontWeight:900,lineHeight:1}}>FOR<span style={{color:'red'}}>ZA</span></div><div style={{fontSize:10,letterSpacing:2,opacity:0.6}}>gym pro</div></div></div>
        <div style={{display:'flex',gap:16,opacity:0.7}}>🔍 🛒 👤</div>
      </div>

      {/* BUSCADOR + FILTROS (solo en Shop) */}
      {tab==='Shop' && <>
        <div style={{padding:12}}><div style={{background:'#1A1A1A',border:'1px solid red',borderRadius:30,padding:'10px 14px',display:'flex',gap:8}}><span>🔍</span><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search products..." style={{background:'transparent',border:'none',color:'white',width:'100%',outline:'none'}}/></div></div>
        <div style={{display:'flex',gap:8,overflowX:'auto',padding:'0 12px 8px'}}>{CATS.map(c=><div key={c} onClick={()=>setCatFilter(c)} style={{padding:'8px 14px',borderRadius:20,whiteSpace:'nowrap',fontSize:12,fontWeight:900,background:catFilter===c?'#FF0000':'#2A2A2A',cursor:'pointer'}}>{c}</div>)}</div>
      </>}

      <div style={{padding:12}}>
        {tab==='Shop' && (
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
            {visibles.filter(p=>p.activo).map(p=>(
              <div key={p.id} style={{background:'#1A1A1A',borderRadius:14,overflow:'hidden',border:'1px solid #222'}}>
                {p.mediaType==='video'?<video src={p.media} style={{width:'100%',height:120,objectFit:'cover'}}/>:<img src={p.media} style={{width:'100%',height:120,objectFit:'cover'}}/>}
                <div style={{padding:10}}><div style={{fontSize:12,fontWeight:700}}>{p.nombre}</div><div style={{fontSize:10,opacity:0.5}}>{p.alias} - {p.categoria}</div><div style={{marginTop:4,fontWeight:900}}>${p.precio} {p.precioPro>0&&<span style={{color:'red',fontSize:11}}>PRO ${p.precioPro}</span>}</div></div>
              </div>
            ))}
            {visibles.filter(p=>p.activo).length===0 && <div style={{gridColumn:'1/3',opacity:0.5,padding:20,textAlign:'center'}}>No hay productos activos. Actívalos en Account.</div>}
          </div>
        )}

        {tab==='Account' && (
          <>
            {/* FORM SUBIR */}
            <div style={{background:'#1A1A1A',borderRadius:16,padding:14,border:'1px solid #222',marginBottom:16}}>
              <div style={{fontWeight:900,fontSize:13,marginBottom:12}}>TIENDA - SUBIR FOTO/VIDEO POR PRODUCTO + SOCIO + TEL COMERCIAL</div>

              <input value={nombre} onChange={e=>setNombre(e.target.value)} placeholder="Nombre producto" style={{width:'100%',padding:12,borderRadius:10,border:'none',background:'#262626',color:'white',marginBottom:10}}/>

              <div style={{display:'flex',gap:8,marginBottom:10}}>
                <select value={cat} onChange={e=>setCat(e.target.value)} style={{flex:2,padding:12,borderRadius:10,border:'none',background:'#262626',color:'white'}}>
                  {CATS.filter(c=>c!=='ALL').map(c=><option key={c}>{c}</option>)}
                </select>
                <input value={precio} onChange={e=>setPrecio(e.target.value)} type="number" placeholder="€" style={{flex:1,padding:12,borderRadius:10,border:'none',background:'#262626',color:'white'}}/>
              </div>

              <input value={alias} onChange={e=>setAlias(e.target.value)} placeholder="Alias socio vendedor (FORZA o Tienda)" style={{width:'100%',padding:12,borderRadius:10,border:'none',background:'#262626',color:'white',marginBottom:10}}/>
              <input value={tel} onChange={e=>setTel(e.target.value)} placeholder="Tel comercial tienda (no tu personal)" style={{width:'100%',padding:12,borderRadius:10,border:'none',background:'#262626',color:'white',marginBottom:10}}/>

              <div style={{background:'#262626',borderRadius:10,padding:10,marginBottom:10,display:'flex',alignItems:'center',gap:10}}>
                <label style={{background:'white',color:'black',padding:'6px 10px',borderRadius:6,fontSize:12,fontWeight:700,cursor:'pointer'}}>
                  Seleccionar archivo
                  <input type="file" accept="image/*,video/*" onChange={onFile} style={{display:'none'}}/>
                </label>
                <span style={{fontSize:12,opacity:0.6}}>{media? `${mediaType} cargado ✅` : 'Sin archivo...leccionados'}</span>
              </div>
              {media && (mediaType==='video'?<video src={media} style={{width:'100%',height:160,borderRadius:10,marginBottom:10}} controls/>:<img src={media} style={{width:'100%',height:160,objectFit:'cover',borderRadius:10,marginBottom:10}}/> )}

              <button onClick={guardar} style={{width:'100%',padding:14,background:'#FF0000',color:'white',fontWeight:900,border:'none',borderRadius:10}}>GUARDAR - QUEDA DESACTIVADO</button>
            </div>

            {/* PRECIO PRO + MP */}
            <div style={{background:'#1A1A1A',borderRadius:16,padding:14,border:'1px solid #222',marginBottom:16}}>
              <div style={{fontWeight:900,fontSize:13,marginBottom:12}}>PRECIO PRO EDITABLE + MP + DÉBITO AUTOMÁTICO</div>
              <div style={{display:'flex',gap:8,marginBottom:10}}>
                <input value={precioPro} onChange={e=>setPrecioPro(e.target.value)} type="number" placeholder="Precio PRO" style={{flex:1,padding:12,borderRadius:10,border:'none',background:'#262626',color:'white'}}/>
                <input value={mpLink} onChange={e=>setMpLink(e.target.value)} placeholder="Link MP" style={{flex:2,padding:12,borderRadius:10,border:'none',background:'#262626',color:'white'}}/>
              </div>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',background:'#262626',borderRadius:10,padding:10,marginBottom:10}}>
                <span style={{fontSize:12}}>Débito automático</span>
                <div onClick={()=>setDebitoAuto(!debitoAuto)} style={{width:44,height:24,borderRadius:20,background:debitoAuto?'red':'#444',position:'relative',cursor:'pointer'}}>
                  <div style={{width:20,height:20,background:'white',borderRadius:50,position:'absolute',top:2,left:debitoAuto?22:2,transition:'0.2s'}}/>
                </div>
              </div>
              <div style={{display:'flex',gap:8}}>
                <input placeholder="Ej: https://mpago.la/..." value={mpLink} onChange={e=>setMpLink(e.target.value)} style={{flex:1,padding:12,borderRadius:10,border:'none',background:'#262626',color:'white'}}/>
                <button onClick={()=>{ if(!mpLink) return alert('Pegá link MP'); alert('Link MP guardado: '+mpLink)}} style={{padding:'0 16px',background:'#009EE3',color:'white',fontWeight:900,border:'none',borderRadius:10}}>LINK</button>
              </div>
            </div>

            {/* LISTA PRODUCTOS */}
            <div style={{fontWeight:900,fontSize:13,marginBottom:8}}>MIS PRODUCTOS ({products.length})</div>
            {products.map(p=>(
              <div key={p.id} style={{background:'#1A1A1A',borderRadius:12,padding:10,marginBottom:8,display:'flex',gap:10,borderLeft:p.activo?'4px solid #00FF00':'4px solid #555'}}>
                {p.mediaType==='video'?<video src={p.media} style={{width:50,height:50,borderRadius:8,objectFit:'cover'}}/>:<img src={p.media} style={{width:50,height:50,borderRadius:8,objectFit:'cover'}}/>}
                <div style={{flex:1}}>
                  <div style={{fontSize:12,fontWeight:700}}>{p.nombre} - ${p.precio}</div>
                  <div style={{fontSize:10,opacity:0.6}}>{p.categoria} | {p.alias} | {p.tel}</div>
                  <div style={{display:'flex',gap:6,marginTop:6}}>
                    <input value={p.precioPro} onChange={e=>updatePro(p.id,e.target.value)} placeholder="PRO" style={{width:60,padding:4,borderRadius:6,border:'none',background:'#222',color:'white',fontSize:11}}/>
                    <span style={{fontSize:10,opacity:0.6}}>{p.debitoAuto?'Débito ON':'Débito OFF'}</span>
                  </div>
                </div>
                <div style={{display:'flex',flexDirection:'column',gap:6}}>
                  <button onClick={()=>toggleActivo(p.id)} style={{padding:'6px 10px',borderRadius:6,border:'none',background:p.activo?'#222':'#00c950',color:'white',fontSize:10,fontWeight:900}}>{p.activo?'DESACTIVAR':'ACTIVAR'}</button>
                  <button onClick={()=>borrar(p.id)} style={{padding:'6px 10px',borderRadius:6,border:'none',background:'#333',color:'white',fontSize:10}}>Borrar</button>
                </div>
              </div>
            ))}
          </>
        )}

        {(tab==='Categories'||tab==='Favorites'||tab==='Orders') && <div style={{opacity:0.5,padding:40,textAlign:'center'}}>{tab} - En construcción. Todo el manejo está en Account y Shop.</div>}
      </div>

      {/* NAV */}
      <div style={{position:'fixed',bottom:0,left:0,right:0,display:'flex',background:'#0E0E0E',borderTop:'1px solid #222',padding:'6px 0'}}>
        {[{k:'Shop',l:'Shop',i:'🏠'},{k:'Categories',l:'Categories',i:'▦'},{k:'Favorites',l:'Favorites',i:'★'},{k:'Orders',l:'Orders',i:'📦'},{k:'Account',l:'Account',i:'👤'}].map(t=>(
          <div key={t.k} onClick={()=>setTab(t.k)} style={{flex:1,textAlign:'center',color:tab===t.k?'#FF0000':'#666',fontSize:10,fontWeight:900}}><div style={{fontSize:16}}>{t.i}</div>{t.l}</div>
        ))}
      </div>
    </div>
  )
}
