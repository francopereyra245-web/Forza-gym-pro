// @ts-nocheck
import { useState, useEffect } from "react";

export default function App(){
  const [tab,setTab]=useState("TIENDA");
  const [prods,setProds]=useState([]);
  const [ejs,setEjs]=useState([]);
  const [nombre,setNombre]=useState("");
  const [cat,setCat]=useState("SUPPLEMENTS");
  const [precio,setPrecio]=useState("");
  const [precioPro,setPrecioPro]=useState("");
  const [alias,setAlias]=useState("");
  const [tel,setTel]=useState("");
  const [foto,setFoto]=useState("");
  const [tipo,setTipo]=useState("img");
  const [mp,setMp]=useState("");
  const [nomEj,setNomEj]=useState("");
  const [tiempo,setTiempo]=useState("60");
  const [nivel,setNivel]=useState("PRINCIPIANTE");
  const [busq,setBusq]=useState("");
  const [filtro,setFiltro]=useState("ALL");

  useEffect(()=>{
    try{
      const p=localStorage.getItem("forza-prods");
      if(p) setProds(JSON.parse(p));
      const e=localStorage.getItem("forza-ejs");
      if(e) setEjs(JSON.parse(e));
    }catch{}
  },[]);
  useEffect(()=>{localStorage.setItem("forza-prods",JSON.stringify(prods))},[prods]);
  useEffect(()=>{localStorage.setItem("forza-ejs",JSON.stringify(ejs))},[ejs]);

  const onFile=(e)=>{
    const f=e.target.files[0];
    if(!f) return;
    const r=new FileReader();
    r.onload=()=>{ setFoto(r.result); setTipo(f.type.includes("video")?"vid":"img"); };
    r.readAsDataURL(f);
  };

  const guardar=()=>{
    if(!nombre ||!foto){ alert("Falta nombre o foto/video"); return; }
    const nuevo={id:Date.now(),nombre,cat,precio,precioPro,alias,tel,foto,tipo,mp,activo:false};
    setProds([nuevo,...prods]);
    setNombre(""); setPrecio(""); setPrecioPro(""); setAlias(""); setTel(""); setFoto(""); setMp("");
  };

  const addEj=()=>{
    if(!nomEj) return;
    setEjs([{id:Date.now(),nombre:nomEj,tiempo,nivel},...ejs]);
    setNomEj("");
  };

  const listaTienda = prods.filter(p=>p.activo).filter(p=>p.nombre.toLowerCase().includes(busq.toLowerCase())).filter(p=>filtro==="ALL"||p.cat===filtro);

  return(
    <div style={{background:"#0B0B0B",color:"#fff",minHeight:"100vh",paddingBottom:75}}>
      <div style={{background:"#000",padding:12,display:"flex",gap:10,borderBottom:"2px solid red"}}>
        <div style={{width:36,height:36,background:"red",borderRadius:18,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900}}>F</div>
        <b>FORZA GYM PRO</b>
      </div>

      <div style={{padding:12}}>
        <div style={{background:"#1A1A1A",border:"1px solid red",borderRadius:30,padding:"10px 14px",display:"flex",gap:8}}>
          <span>🔍</span>
          <input value={busq} onChange={e=>setBusq(e.target.value)} placeholder="Buscar..." style={{background:"transparent",border:"none",color:"#fff",width:"100%",outline:"none"}}/>
        </div>
      </div>

      <div style={{display:"flex",gap:8,padding:"0 12px 12px",overflowX:"auto"}}>
        {["ALL","DIET","SUPPLEMENTS","APPAREL","EQUIPMENT"].map(c=>(
          <div key={c} onClick={()=>setFiltro(c)} style={{padding:"8px 14px",borderRadius:20,fontSize:11,fontWeight:900,background:filtro===c?"red":"#222"}}>{c}</div>
        ))}
      </div>

      {tab==="TIENDA" && <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,padding:12}}>
        {listaTienda.map(p=>(
          <div key={p.id} style={{background:"#1A1A1A",borderRadius:12,overflow:"hidden"}}>
            {p.tipo==="vid"?<video src={p.foto} style={{width:"100%",height:130,objectFit:"cover"}}/>:<img src={p.foto} style={{width:"100%",height:130,objectFit:"cover"}}/>}
            <div style={{padding:8,fontSize:12}}>{p.nombre} - ${p.precio}<br/><span style={{opacity:0.5}}>{p.alias}</span></div>
          </div>
        ))}
      </div>}

      {tab==="CAT" && <div style={{padding:12}}>
        <div style={{background:"red",borderRadius:14,padding:14,marginBottom:12}}>
          <div style={{fontSize:11}}>HOY TE TOCA</div>
          <div style={{fontWeight:900}}>{nivel} - {ejs.filter(x=>x.nivel===nivel).length} ejercicios</div>
        </div>
        <div style={{display:"flex",gap:8,marginBottom:12}}>
          {["PRINCIPIANTE","MEDIO","AVANZADO"].map(n=>(
            <div key={n} onClick={()=>setNivel(n)} style={{flex:1,background:nivel===n?"red":"#222",borderRadius:12,padding:10,textAlign:"center",fontSize:10,fontWeight:900}}>{n}</div>
          ))}
        </div>
        <div style={{display:"flex",gap:8}}>
          <input value={nomEj} onChange={e=>setNomEj(e.target.value)} placeholder="Ej: Press Banca" style={{flex:1,padding:12,borderRadius:10,background:"#222",border:"none",color:"#fff"}}/>
          <button onClick={addEj} style={{width:50,background:"red",border:"none",borderRadius:10,color:"#fff"}}>+</button>
        </div>
        {ejs.filter(x=>x.nivel===nivel).map(x=>(
          <div key={x.id} style={{background:"#1A1A1A",padding:12,borderRadius:10,marginTop:8,display:"flex",justifyContent:"space-between"}}>
            <span>{x.nombre}</span><span onClick={()=>setEjs(ejs.filter(y=>y.id!==x.id))} style={{color:"red"}}>X</span>
          </div>
        ))}
      </div>}

      {tab==="CUENTA" && <div style={{padding:12}}>
        <div style={{background:"#1A1A1A",borderRadius:14,padding:14,border:"1px solid #222"}}>
          <b style={{fontSize:12}}>SUBIR PRODUCTO + ALIAS + TEL</b>
          <input value={nombre} onChange={e=>setNombre(e.target.value)} placeholder="Nombre" style={{width:"100%",padding:12,marginTop:10,borderRadius:8,background:"#262626",border:"none",color:"#fff",marginBottom:8}}/>
          <input value={precio} onChange={e=>setPrecio(e.target.value)} placeholder="Precio $" style={{width:"100%",padding:12,borderRadius:8,background:"#262626",border:"none",color:"#fff",marginBottom:8}}/>
          <input value={alias} onChange={e=>setAlias(e.target.value)} placeholder="Alias socio" style={{width:"100%",padding:12,borderRadius:8,background:"#262626",border:"none",color:"#fff",marginBottom:8}}/>
          <input value={tel} onChange={e=>setTel(e.target.value)} placeholder="Tel comercial" style={{width:"100%",padding:12,borderRadius:8,background:"#262626",border:"none",color:"#fff",marginBottom:8}}/>
          <label style={{background:"#fff",color:"#000",padding:"8px 12px",borderRadius:6,fontWeight:700}}>Elegir foto/video<input type="file" accept="image/*,video/*" onChange={onFile} style={{display:"none"}}/></label>
          <div style={{marginTop:10}}>{foto && (tipo==="vid"?<video src={foto} controls style={{width:"100%",borderRadius:10}}/>:<img src={foto} style={{width:"100%",height:160,objectFit:"cover",borderRadius:10}}/>)}</div>
          <button onClick={guardar} style={{width:"100%",padding:14,marginTop:10,background:"red",border:"none",borderRadius:10,color:"#fff",fontWeight:900}}>GUARDAR DESACTIVADO</button>
        </div>
        {prods.map(p=>(
          <div key={p.id} style={{background:"#1A1A1A",padding:10,borderRadius:10,marginTop:8,display:"flex",gap:10,alignItems:"center"}}>
            <img src={p.foto} style={{width:50,height:50,borderRadius:8,objectFit:"cover"}}/>
            <div style={{flex:1,fontSize:11}}>{p.nombre}</div>
            <button onClick={()=>setProds(prods.map(x=>x.id===p.id?{...x,activo:!x.activo}:x))} style={{background:p.activo?"#333":"#00c950",color:"#fff",border:"none",borderRadius:6,padding:"6px 10px"}}>{p.activo?"OFF":"ON"}</button>
            <button onClick={()=>setProds(prods.filter(x=>x.id!==p.id))} style={{background:"#222",color:"#fff",border:"none",borderRadius:6,padding:"6px 8px"}}>X</button>
          </div>
        ))}
      </div>}

      <div style={{position:"fixed",bottom:0,left:0,right:0,display:"flex",background:"#0E0E0E",borderTop:"1px solid #222"}}>
        {["TIENDA","CAT","FAV","PED","CUENTA"].map(k=>(
          <div key={k} onClick={()=>setTab(k)} style={{flex:1,textAlign:"center",padding:12,background:tab===k?"red":"transparent",fontSize:11,fontWeight:900}}>{k}</div>
        ))}
      </div>
    </div>
  );
}
