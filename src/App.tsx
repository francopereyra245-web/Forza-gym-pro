// @ts-nocheck
import { useState, useEffect } from "react";

export default function App(){
  const [tab,setTab]=useState("CUENTA");
  const [prods,setProds]=useState([]);
  const [ejs,setEjs]=useState([]);
  const [nombre,setNombre]=useState(""); const [cat,setCat]=useState("SUPPLEMENTS");
  const [precio,setPrecio]=useState(""); const [precioPro,setPrecioPro]=useState("");
  const [alias,setAlias]=useState(""); const [tel,setTel]=useState("");
  const [foto,setFoto]=useState(""); const [tipo,setTipo]=useState("img");
  const [mpLink,setMpLink]=useState("");
  const [nomEj,setNomEj]=useState(""); const [tiempo,setTiempo]=useState("60");
  const [nivel,setNivel]=useState("PRINCIPIANTE"); const [busqueda,setBusqueda]=useState("");
  const [filtro,setFiltro]=useState("ALL");

  useEffect(()=>{ try{ const p=localStorage.getItem("fp"); if(p) setProds(JSON.parse(p)); const e=localStorage.getItem("fe"); if(e) setEjs(JSON.parse(e)); }catch{} },[]);
  useEffect(()=>{ localStorage.setItem("fp",JSON.stringify(prods)); },[prods]);
  useEffect(()=>{ localStorage.setItem("fe",JSON.stringify(ejs)); },[ejs]);

  const onFile=(e)=>{ const f=e.target.files[0]; if(!f) return; const r=new FileReader(); r.onload=()=>{ setFoto(r.result); setTipo(f.type.includes("video")?"vid":"img"); }; r.readAsDataURL(f); };

  const guardar=()=>{
    if(!nombre ||!foto){ alert("Falta nombre o foto"); return; }
    setProds([{id:Date.now(),nombre,cat,precio,precioPro,alias,tel,foto,tipo,mpLink,activo:false},...prods]);
    setNombre(""); setFoto(""); setPrecio(""); setPrecioPro(""); setAlias(""); setTel(""); setMpLink("");
  };

  const addEj=()=>{ if(!nomEj) return; setEjs([{id:Date.now(),nombre:nomEj,tiempo,nivel},...ejs]); setNomEj(""); };

  return(
    <div style={{background:"#0B0B0B",color:"#fff",minHeight:"100vh",paddingBottom:75}}>
      <div style={{display:"flex",justifyContent:"space-between",padding:14,background:"#000",borderBottom:"1px solid #222"}}>
        <div style={{display:"flex",gap:10,alignItems:"center"}}><div style={{width:36,height:36,background:"red",borderRadius:18,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900}}>F</div><b>FOR<span style={{color:"red"}}>ZA</span> GYM PRO</b></div>
        <div>🔍 🛒 👤</div>
      </div>

      <div style={{padding:12}}><div style={{background:"#1A1A1A",border:"1px solid red",borderRadius:30,padding:"10px 14px",display:"flex",gap:8}}>🔍<input value={busqueda} onChange={e=>setBusqueda(e.target.value)} placeholder="Buscar..." style={{background:"transparent",border:"none",color:"#fff",width:"100%",outline:"none"}}/></div></div>

      <div style={{display:"flex",gap:8,padding:"0 12px 12px",overflowX:"auto"}}>{["ALL","DIET","SUPPLEMENTS","APPAREL"].map(c=><div key={c} onClick={()=>setFiltro(c)} style={{padding:"8px 14px",borderRadius:20,fontSize:11,fontWeight:900,background:filtro===c?"red":"#222"}}>{c}</div>)}</div>

      {tab==="TIENDA" && <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,padding:12}}>{prods.filter(p=>p.activo).filter(p=>p.nombre.toLowerCase().includes(busqueda.toLowerCase())).filter(p=>filtro==="ALL"||p.cat===filtro).map(p=><div key={p.id} style={{background:"#1A1A1A",borderRadius:12,overflow:"hidden"}}>{p.tipo==="vid"?<video src={p.foto} style={{width:"100%",height:120,objectFit:"cover"}}/>:<img src={p.foto} style={{width:"100%",height:120,objectFit:"cover"}}/>}<div style={{padding:8,fontSize:12}}>{p.nombre}<br/>${p.precio}</div></div>)}</div>}

      {tab==="CATEGORIAS" && <div style={{padding:12}}>
        <div style={{background:"red",borderRadius:14,padding:14,marginBottom:12}}><div style={{fontSize:12}}>🔔 HOY TE TOCA</div><div style={{fontWeight:900,fontSize:18}}>{nivel} - {ejs.filter(x=>x.nivel===nivel).length} ejercicios</div></div>
        <div style={{display:"flex",gap:8,marginBottom:12}}>{["PRINCIPIANTE","MEDIO","AVANZADO"].map(n=><div key={n} onClick={()=>setNivel(n)} style={{flex:1,background:nivel===n?"red":"#222",borderRadius:12,padding:10,textAlign:"center",fontSize:11,fontWeight:900,border:nivel===n?"2px solid #fff":"none"}}>{n}</div>)}</div>
        <div style={{display:"flex",gap:8}}><input value={nomEj} onChange={e=>setNomEj(e.target.value)} placeholder="Ej: Press Banca" style={{flex:1,padding:12,borderRadius:10,background:"#222",border:"none",color:"#fff"}}/><input value={tiempo} onChange={e=>setTiempo(e.target.value)} style={{width:60,padding:12,borderRadius:10,background:"#222",border:"none",color:"#fff",textAlign:"center"}}/><button onClick={addEj} style={{width:50,background:"red",border:"none",borderRadius:10,color:"#fff",fontWeight:900}}>+</button></div>
        {ejs.filter(x=>x.nivel===nivel).map(x=><div key={x.id} style={{background:"#1A1A1A",padding:12,borderRadius:10,marginTop:8,display:"flex",justifyContent:"space-between"}}><span>{x.nombre}</span><span onClick={()=>setEjs(ejs.filter(y=>y.id!==x.id))} style={{color:"red"}}>X</span></div>)}
      </div>}

      {tab==="CUENTA" && <div style={{padding:12}}>
        <div style={{background:"#1A1A1A",borderRadius:14,padding:14,border:"1px solid #222"}}>
          <div style={{fontWeight:900,fontSize:12,marginBottom:12}}>TIENDA - SUBIR FOTO / VIDEO POR PRODUCTO + SOCIO + TEL COMERCIAL</div>
          <input value={nombre} onChange={e=>setNombre(e.target.value)} placeholder="Nombre producto" style={{width:"100%",padding:12,borderRadius:10,background:"#262626",border:"none",color:"#fff",marginBottom:8}}/>
          <div style={{display:"flex",gap:8,marginBottom:8}}><select value={cat} onChange={e=>setCat(e.target.value)} style={{flex:2,padding:12,borderRadius:10,background:"#262626",color:"#fff",border:"none"}}><option>SUPPLEMENTS</option><option>DIET</option><option>APPAREL</option><option>EQUIPMENT</option></select><input value={precio} onChange={e=>setPrecio(e.target.value)} placeholder="$" style={{flex:1,padding:12,borderRadius:10,background:"#262626",border:"none",color:"#fff"}}/></div>
          <input value={alias} onChange={e=>setAlias(e.target.value)} placeholder="Alias socio vendedor" style={{width:"100%",padding:12,borderRadius:10,background:"#262626",border:"none",color:"#fff",marginBottom:8}}/>
          <input value={tel} onChange={e=>setTel(e.target.value)} placeholder="Tel comercial tienda" style={{width:"100%",padding:12,borderRadius:10,background:"#262626",border:"none",color:"#fff",marginBottom:8}}/>
          <div style={{display:"flex",gap:8,marginBottom:8}}><input value={precioPro} onChange={e=>setPrecioPro(e.target.value)} placeholder="Precio PRO" style={{flex:1,padding:12,borderRadius:10,background:"#262626",border:"none",color:"#fff"}}/><input value={mpLink} onChange={e=>setMpLink(e.target.value)} placeholder="Link MP" style={{flex:1,padding:12,borderRadius:10,background:"#262626",border:"none",color:"#fff"}}/></div>
          <div style={{background:"#262626",borderRadius:10,padding:10,display:"flex",gap:10,marginBottom:10}}><label style={{background:"#fff",color:"#000",padding:"6px 12px",borderRadius:6,fontSize:12,fontWeight:700}}>Seleccionar archivo<input type="file" accept="image/*,video/*" onChange={onFile} style={{display:"none"}}/></label><span style={{fontSize:12,opacity:0.6}}>{foto?"Cargado ✅":"Sin archivo"}</span></div>
          {foto && (tipo==="vid"?<video src={foto} controls style={{width:"100%",borderRadius:10,marginBottom:10}}/>:<img src={foto} style={{width:"100%",height:160,objectFit:"cover",borderRadius:10,marginBottom:10}}/>)}
          <button onClick={guardar} style={{width:"100%",padding:14,background:"red",border:"none",borderRadius:10,color:"#fff",fontWeight:900}}>GUARDAR - QUEDA DESACTIVADO</button>
        </div>
        <div style={{marginTop:14,fontWeight:900,fontSize:11}}>MIS PRODUCTOS ({prods.length})</div>
        {prods.map(p=><div key={p.id} style={{background:"#1A1A1A",borderRadius:10,padding:10,marginTop:8,display:"flex",gap:10}}><img src={p.foto} style={{width:50,height:50,borderRadius:8,objectFit:"cover"}}/><div style={{flex:1,fontSize:11}}>{p.nombre}<br/><span style={{opacity:0.5}}>{p.cat}</span></div><button onClick={()=>setProds(prods.map(x=>x.id===p.id?{...x,activo:!x.activo}:x))} style={{background:p.activo?"#333":"#00c950",color:"#fff",border:"none",borderRadius:6,padding:"0 10px",fontSize:10}}>{p.activo?"OFF":"ON"}</button><button onClick={()=>setProds(prods.filter(x=>x.id!==p.id))} style={{background:"#222",color:"#fff",border:"none",borderRadius:6,padding:"0 8px"}}>X</button></div>)}
      </div>}

      <div style={{position:"fixed",bottom:0,left:0,right:0,display:"flex",background:"#0E0E0E",borderTop:"1px solid #222"}}>{["TIENDA","CATEGORIAS","CUENTA"].map(k=><div key={k} onClick={()=>setTab(k)} style={{flex:1,textAlign:"center",padding:"10px 0",background:tab===k?"red":"transparent",fontSize:11,fontWeight:900}}>{k}</div>)}</div>
    </div>
  );
}
