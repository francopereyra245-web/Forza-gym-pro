import { useState, useEffect } from "react";

export default function App(){
  const [tab,setTab]=useState("Categories");

  // PRODUCTOS TIENDA
  const [productos,setProductos]=useState<any[]>(()=>{try{return JSON.parse(localStorage.getItem("forza_final")||"[]")}catch{return[]}});
  const [nombre,setNombre]=useState(""); const [cat,setCat]=useState("SUPPLEMENTS"); const [precio,setPrecio]=useState("");
  const [alias,setAlias]=useState(""); const [tel,setTel]=useState(""); const [foto,setFoto]=useState(""); const [tipo,setTipo]=useState("img");

  // EJERCICIOS CATEGORIES
  const [ejercicios,setEjercicios]=useState<any[]>(()=>{try{return JSON.parse(localStorage.getItem("forza_ej")||"[]")}catch{return[]}});
  const [nomEj,setNomEj]=useState(""); const [tiempo,setTiempo]=useState("60"); const [nivel,setNivel]=useState("PRINCIPIANTE");

  const [busqueda,setBusqueda]=useState(""); const [filtro,setFiltro]=useState("ALL");

  useEffect(()=>localStorage.setItem("forza_final",JSON.stringify(productos)),[productos]);
  useEffect(()=>localStorage.setItem("forza_ej",JSON.stringify(ejercicios)),[ejercicios]);

  const onFile=(e:any)=>{ const f=e.target.files[0]; if(!f)return; const r=new FileReader(); r.onload=()=>{setFoto(r.result as string); setTipo(f.type.includes("video")?"vid":"img")}; r.readAsDataURL(f); };
  const guardarProd=()=>{ if(!nombre||!foto){alert("Falta nombre o foto");return;} setProductos([{id:Date.now(),nombre,cat,precio,alias,tel,foto,tipo,activo:false},...productos]); setNombre("");setFoto(""); alert("Guardado DESACTIVADO"); };

  const addEj=()=>{ if(!nomEj)return; setEjercicios([{id:Date.now(),nombre:nomEj,tiempo,nivel},...ejercicios]); setNomEj(""); };

  return(
    <div style={{background:"#0E0E0E",color:"white",minHeight:"100vh",paddingBottom:70,fontFamily:"system-ui"}}>
      {/* HEADER */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 14px",background:"black"}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:36,height:36,background:"red",borderRadius:20,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900}}>F</div><div><div style={{fontWeight:900}}>FOR<span style={{color:"red"}}>ZA</span></div><div style={{fontSize:10,opacity:0.6}}>gym pro</div></div></div>
        <div style={{display:"flex",gap:12,opacity:0.8}}>🔍 🛒 👤</div>
      </div>

      {/* BUSCADOR */}
      <div style={{padding:12}}>
        <div style={{background:"#1A1A1A",border:"1px solid red",borderRadius:30,padding:"10px 14px",display:"flex",gap:8}}>
          🔍 <input value={busqueda} onChange={e=>setBusqueda(e.target.value)} placeholder="Search products..." style={{background:"transparent",border:"none",color:"white",width:"100%",outline:"none"}}/>
        </div>
      </div>
      <div style={{display:"flex",gap:8,padding:"0 12px 12px",overflowX:"auto"}}>
        {["ALL","DIET","SUPPLEMENTS","APPAREL"].map(c=><div key={c} onClick={()=>setFiltro(c)} style={{padding:"8px 14px",borderRadius:20,fontSize:12,fontWeight:900,background:filtro===c?"red":"#2A2A2A",whiteSpace:"nowrap"}}>{c}</div>)}
      </div>

      {tab==="Shop" && <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,padding:12}}>
        {productos.filter(p=>p.activo && p.nombre.toLowerCase().includes(busqueda.toLowerCase())).map(p=><div key={p.id} style={{background:"#1A1A1A",borderRadius:12,overflow:"hidden"}}>{p.tipo==="vid"?<video src={p.foto} style={{width:"100%",height:120,objectFit:"cover"}}/>:<img src={p.foto} style={{width:"100%",height:120,objectFit:"cover"}}/>}<div style={{padding:8,fontSize:12}}>{p.nombre}<br/>${p.precio}</div></div>)}
        {productos.filter(p=>p.activo).length===0 && <div style={{gridColumn:"1/3",textAlign:"center",opacity:0.5,padding:30}}>No hay productos activos. Cargalos en Account.</div>}
      </div>}

      {tab==="Categories" && <div style={{padding:12}}>
        <div style={{background:"#FF2A2A",borderRadius:14,padding:14,marginBottom:12}}>
          <div style={{fontSize:12}}>🔔 ALARMA HOY TE TOCA</div>
          <div style={{fontWeight:900,fontSize:18}}>{nivel} - {ejercicios.filter(e=>e.nivel===nivel).length} ejercicios</div>
          <div style={{fontSize:12,opacity:0.9}}>Principiante Blanco | Medio Gris | Avanzado Azul | Extremo Dorado</div>
        </div>
        <div style={{display:"flex",gap:8,marginBottom:14}}>
          <div onClick={()=>setNivel("PRINCIPIANTE")} style={{flex:1,background:nivel==="PRINCIPIANTE"?"#FF2A2A":"#7A0000",border:"2px solid white",borderRadius:12,padding:10,textAlign:"center"}}><div style={{fontWeight:900,fontSize:11}}>PRINCIPIANTE</div><div style={{background:"white",color:"black",borderRadius:6,fontSize:10,marginTop:4,padding:2}}>Blanco - colores app</div></div>
          <div onClick={()=>setNivel("MEDIO")} style={{flex:1,background:nivel==="MEDIO"?"#FF2A2A":"#7A0000",borderRadius:12,padding:10,textAlign:"center"}}><div style={{fontWeight:900,fontSize:11}}>MEDIO</div><div style={{background:"white",color:"black",borderRadius:6,fontSize:10,marginTop:4,padding:2}}>Gris - color fuerte</div></div>
          <div onClick={()=>setNivel("AVANZADO")} style={{flex:1,background:"#2A3A5A",borderRadius:12,padding:10,textAlign:"center"}}><div style={{fontWeight:900,fontSize:11}}>AVANZADO</div><div style={{background:"#8AB4FF",color:"black",borderRadius:6,fontSize:10,marginTop:4,padding:2}}>Azul - gris+azul metalizado</div></div>
        </div>
        <div style={{fontWeight:900,fontSize:12,marginBottom:8}}>AGREGAR EJERCICIO MANUAL - STICK FIGURE + MÚSCULOS ROJO FORZA</div>
        <div style={{display:"flex",gap:8,marginBottom:8}}>
          <input value={nomEj} onChange={e=>setNomEj(e.target.value)} placeholder="Ej: Press Banca" style={{flex:3,padding:12,borderRadius:10,background:"#262626",border:"none",color:"white"}}/>
          <input value={tiempo} onChange={e=>setTiempo(e.target.value)} style={{width:60,padding:12,borderRadius:10,background:"#262626",border:"none",color:"white",textAlign:"center"}}/>
          <button onClick={addEj} style={{width:50,background:"red",border:"none",borderRadius:10,color:"white",fontSize:20,fontWeight:900}}>+</button>
        </div>
        <div style={{fontSize:11,opacity:0.5,marginBottom:16}}>Al agregar, aparece automáticamente imagen en movimiento + músculos marcados en rojo. Opción subir video propio / Instagram</div>
        {ejercicios.filter(e=>e.nivel===nivel).map(e=><div key={e.id} style={{background:"#1A1A1A",padding:10,borderRadius:10,marginBottom:6,display:"flex",justifyContent:"space-between"}}><span>{e.nombre}</span><span style={{opacity:0.6}}>{e.tiempo}s</span><span onClick={()=>setEjercicios(ejercicios.filter(x=>x.id!==e.id))} style={{color:"red"}}>X</span></div>)}
        <div style={{background:"#1A1A1A",borderRadius:12,padding:12,marginTop:16,border:"1px solid #333"}}>💬 AUTOAYUDA FORZA GYM PRO (no WhatsApp personal)</div>
      </div>}

      {tab==="Account" && <div style={{padding:12}}>
        <div style={{background:"#1A1A1A",borderRadius:14,padding:14,border:"1px solid #222"}}>
          <div style={{fontWeight:900,fontSize:13,marginBottom:12}}>TIENDA - SUBIR FOTO/VIDEO POR PRODUCTO + SOCIO + TEL COMERCIAL</div>
          <input value={nombre} onChange={e=>setNombre(e.target.value)} placeholder="Nombre producto" style={{width:"100%",padding:12,borderRadius:10,background:"#262626",border:"none",color:"white",marginBottom:10}}/>
          <div style={{display:"flex",gap:8,marginBottom:10}}><select value={cat} onChange={e=>setCat(e.target.value)} style={{flex:2,padding:12,borderRadius:10,background:"#262626",color:"white",border:"none"}}><option>SUPPLEMENTS</option><option>DIET</option><option>APPAREL</option></select><input value={precio} onChange={e=>setPrecio(e.target.value)} placeholder="€" style={{flex:1,padding:12,borderRadius:10,background:"#262626",border:"none",color:"white"}}/></div>
          <input value={alias} onChange={e=>setAlias(e.target.value)} placeholder="Alias socio vendedor" style={{width:"100%",padding:12,borderRadius:10,background:"#262626",border:"none",color:"white",marginBottom:10}}/>
          <input value={tel} onChange={e=>setTel(e.target.value)} placeholder="Tel comercial tienda" style={{width:"100%",padding:12,borderRadius:10,background:"#262626",border:"none",color:"white",marginBottom:10}}/>
          <div style={{background:"#262626",borderRadius:10,padding:10,display:"flex",gap:10,marginBottom:10}}><label style={{background:"white",color:"black",padding:"6px 10px",borderRadius:6,fontSize:12,fontWeight:700}}>Seleccionar archivo<input type="file" accept="image/*,video/*" onChange={onFile} style={{display:"none"}}/></label><span style={{fontSize:12,opacity:0.6}}>{foto?"Cargado ✅":"Sin archivo..."}</span></div>
          {foto && (tipo==="vid"?<video src={foto} controls style={{width:"100%",borderRadius:10,marginBottom:10}}/>:<img src={foto} style={{width:"100%",height:160,objectFit:"cover",borderRadius:10,marginBottom:10}}/>)}
          <button onClick={guardarProd} style={{width:"100%",padding:14,background:"red",color:"white",fontWeight:900,border:"none",borderRadius:10}}>GUARDAR - QUEDA DESACTIVADO</button>
        </div>
        <div style={{marginTop:12,fontWeight:900,fontSize:12}}>MIS PRODUCTOS ({productos.length})</div>
        {productos.map(p=><div key={p.id} style={{background:"#1A1A1A",borderRadius:10,padding:10,marginTop:8,display:"flex",gap:10,borderLeft:p.activo?"4px solid #0f0":"4px solid #555"}}><img src={p.foto} style={{width:50,height:50,borderRadius:8,objectFit:"cover"}}/><div style={{flex:1,fontSize:11}}>{p.nombre}<br/><span style={{opacity:0.5}}>{p.cat}</span></div><button onClick={()=>setProductos(productos.map(x=>x.id===p.id?{...x,activo:!x.activo}:x))} style={{background:p.activo?"#333":"#00c950",color:"white",border:"none",borderRadius:6,padding:"0 10px",fontSize:10,fontWeight:900}}>{p.activo?"OFF":"ON"}</button><button onClick={()=>setProductos(productos.filter(x=>x.id!==p.id))} style={{background:"#222",color:"white",border:"none",borderRadius:6,padding:"0 10px"}}>X</button></div>)}
      </div>}

      <div style={{position:"fixed",bottom:0,left:0,right:0,display:"flex",background:"#0E0E0E",borderTop:"1px solid #222"}}>
        {[{k:"Shop",l:"Shop",i:"🏠"},{k:"Categories",l:"Categories",i:"▦"},{k:"Favorites",l:"Favorites",i:"★"},{k:"Orders",l:"Orders",i:"📦"},{k:"Account",l:"Account",i:"👤"}].map(t=><div key={t.k} onClick={()=>setTab(t.k)} style={{flex:1,textAlign:"center",padding:"8px 0",color:tab===t.k?"red":"#666",fontSize:10,fontWeight:900}}><div style={{fontSize:18}}>{t.i}</div>{t.l}</div>)}
      </div>
    </div>
  );
}
