import { useState, useEffect } from "react";

export default function App(){
  const [tab,setTab]=useState("CUENTA");
  const [productos,setProductos]=useState<any[]>(()=>{
    try{ return JSON.parse(localStorage.getItem("forza_final")||"[]") }catch{ return [] }
  });
  const [nombre,setNombre]=useState("");
  const [cat,setCat]=useState("SUPPLEMENTS");
  const [precio,setPrecio]=useState("");
  const [alias,setAlias]=useState("");
  const [tel,setTel]=useState("");
  const [foto,setFoto]=useState("");
  const [tipo,setTipo]=useState("img");
  const [busqueda,setBusqueda]=useState("");
  const [filtro,setFiltro]=useState("ALL");

  useEffect(()=>{ localStorage.setItem("forza_final",JSON.stringify(productos)) },[productos]);

  const onFile=(e:any)=>{
    const f=e.target.files[0]; if(!f) return;
    const r=new FileReader();
    r.onload=()=>{ setFoto(r.result as string); setTipo(f.type.includes("video")?"vid":"img"); };
    r.readAsDataURL(f);
  };

  const guardar=()=>{
    if(!nombre ||!foto){ alert("Falta nombre o foto"); return; }
    setProductos([{id:Date.now(),nombre,cat,precio,alias,tel,foto,tipo,activo:false},...productos]);
    setNombre(""); setPrecio(""); setAlias(""); setTel(""); setFoto("");
    alert("Guardado DESACTIVADO");
  };

  return(
    <div style={{background:"#0E0E0E",color:"white",minHeight:"100vh",paddingBottom:70,fontFamily:"system-ui"}}>
      <div style={{background:"black",padding:"14px 16px",textAlign:"center",borderBottom:"2px solid red",fontWeight:900}}>ESTAS EN: {tab}</div>

      {tab==="TIENDA" && <>
        <div style={{padding:12}}>
          <div style={{background:"#1A1A1A",border:"1px solid red",borderRadius:30,padding:"10px 14px",display:"flex",gap:8}}>
            🔍 <input value={busqueda} onChange={e=>setBusqueda(e.target.value)} placeholder="Search products..." style={{background:"transparent",border:"none",color:"white",width:"100%",outline:"none"}}/>
          </div>
        </div>
        <div style={{display:"flex",gap:8,padding:"0 12px",overflowX:"auto"}}>
          {["ALL","DIET","SUPPLEMENTS","APPAREL","EQUIPMENT"].map(c=><div key={c} onClick={()=>setFiltro(c)} style={{padding:"8px 14px",borderRadius:20,fontSize:12,fontWeight:900,background:filtro===c?"red":"#2A2A2A"}}>{c}</div>)}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,padding:12}}>
          {productos.filter(p=>p.activo && p.nombre.toLowerCase().includes(busqueda.toLowerCase()) && (filtro==="ALL"||p.cat===filtro)).map(p=><div key={p.id} style={{background:"#1A1A1A",borderRadius:12,overflow:"hidden"}}>{p.tipo==="vid"?<video src={p.foto} style={{width:"100%",height:120,objectFit:"cover"}}/>:<img src={p.foto} style={{width:"100%",height:120,objectFit:"cover"}}/>}<div style={{padding:8,fontSize:12}}>{p.nombre}<br/>${p.precio}</div></div>)}
        </div>
      </>}

      {tab==="CUENTA" && <div style={{padding:12}}>
        <div style={{background:"#1A1A1A",borderRadius:14,padding:14,border:"1px solid #222"}}>
          <div style={{fontWeight:900,fontSize:13,marginBottom:12}}>TIENDA - SUBIR FOTO/VIDEO POR PRODUCTO + SOCIO + TEL COMERCIAL</div>
          <input value={nombre} onChange={e=>setNombre(e.target.value)} placeholder="Nombre producto" style={{width:"100%",padding:12,borderRadius:10,background:"#262626",border:"none",color:"white",marginBottom:10}}/>
          <div style={{display:"flex",gap:8,marginBottom:10}}>
            <select value={cat} onChange={e=>setCat(e.target.value)} style={{flex:2,padding:12,borderRadius:10,background:"#262626",color:"white",border:"none"}}><option>SUPPLEMENTS</option><option>DIET</option><option>APPAREL</option><option>EQUIPMENT</option></select>
            <input value={precio} onChange={e=>setPrecio(e.target.value)} placeholder="€" style={{flex:1,padding:12,borderRadius:10,background:"#262626",border:"none",color:"white"}}/>
          </div>
          <input value={alias} onChange={e=>setAlias(e.target.value)} placeholder="Alias socio vendedor" style={{width:"100%",padding:12,borderRadius:10,background:"#262626",border:"none",color:"white",marginBottom:10}}/>
          <input value={tel} onChange={e=>setTel(e.target.value)} placeholder="Tel comercial tienda" style={{width:"100%",padding:12,borderRadius:10,background:"#262626",border:"none",color:"white",marginBottom:10}}/>
          <div style={{background:"#262626",borderRadius:10,padding:10,display:"flex",gap:10,marginBottom:10}}><label style={{background:"white",color:"black",padding:"6px 10px",borderRadius:6,fontSize:12,fontWeight:700}}>Seleccionar archivo<input type="file" accept="image/*,video/*" onChange={onFile} style={{display:"none"}}/></label><span style={{fontSize:12,opacity:0.6}}>{foto?"Cargado ✅":"Sin archivo..."}</span></div>
          {foto && (tipo==="vid"?<video src={foto} controls style={{width:"100%",borderRadius:10,marginBottom:10}}/>:<img src={foto} style={{width:"100%",height:160,objectFit:"cover",borderRadius:10,marginBottom:10}}/>)}
          <button onClick={guardar} style={{width:"100%",padding:14,background:"red",color:"white",fontWeight:900,border:"none",borderRadius:10}}>GUARDAR - QUEDA DESACTIVADO</button>
        </div>
        <div style={{background:"#1A1A1A",borderRadius:14,padding:14,marginTop:12,border:"1px solid #222"}}>
          <div style={{fontWeight:900,fontSize:13,marginBottom:10}}>PRECIO PRO EDITABLE + MP + DÉBITO AUTOMÁTICO</div>
          <div style={{display:"flex",gap:8}}><div style={{flex:1,height:40,background:"#262626",borderRadius:10}}></div><div style={{width:70,background:"#009EE3",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900}}>LINK</div></div>
        </div>
        {productos.map(p=><div key={p.id} style={{background:"#1A1A1A",borderRadius:10,padding:10,marginTop:8,display:"flex",gap:10}}><img src={p.foto} style={{width:50,height:50,borderRadius:8,objectFit:"cover"}}/><div style={{flex:1,fontSize:11}}>{p.nombre}<br/><span style={{opacity:0.5}}>{p.cat}</span></div><button onClick={()=>setProductos(productos.map(x=>x.id===p.id?{...x,activo:!x.activo}:x))} style={{background:p.activo?"#333":"#00c950",color:"white",border:"none",borderRadius:6,padding:"0 10px",fontSize:10}}>{p.activo?"OFF":"ON"}</button><button onClick={()=>setProductos(productos.filter(x=>x.id!==p.id))} style={{background:"#222",color:"white",border:"none",borderRadius:6,padding:"0 10px"}}>X</button></div>)}
      </div>}

      <div style={{position:"fixed",bottom:0,left:0,right:0,display:"flex",background:"#0E0E0E",borderTop:"1px solid #222"}}>
        {["TIENDA","CAT","FAV","PED","CUENTA"].map(t=><div key={t} onClick={()=>setTab(t)} style={{flex:1,textAlign:"center",padding:"10px 0",background:tab===t?"red":"transparent",fontSize:12,fontWeight:900}}>{t}</div>)}
      </div>
    </div>
  );
}
