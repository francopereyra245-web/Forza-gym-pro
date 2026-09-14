// @ts-nocheck
import { useState, useEffect } from "react";

export default function App(){
  const [tab,setTab]=useState("CATEGORIES");
  const [nivel,setNivel]=useState("PRINCIPIANTE");
  const [ejs,setEjs]=useState([] as any[]);
  const [prods,setProds]=useState([] as any[]);
  const [nomEj,setNomEj]=useState("");
  const [tiempo,setTiempo]=useState("60");
  const [busq,setBusq]=useState("");
  const [filtro,setFiltro]=useState("ALL");
  const [nombre,setNombre]=useState("");
  const [precio,setPrecio]=useState("");
  const [foto,setFoto]=useState("");

  useEffect(()=>{ try{ const e=localStorage.getItem("forza-ejs-v2"); if(e) setEjs(JSON.parse(e)); const p=localStorage.getItem("forza-prods-v2"); if(p) setProds(JSON.parse(p)); }catch{} },[]);
  useEffect(()=>{ localStorage.setItem("forza-ejs-v2", JSON.stringify(ejs)) },[ejs]);
  useEffect(()=>{ localStorage.setItem("forza-prods-v2", JSON.stringify(prods)) },[prods]);

  const onFile=(e:any)=>{ const f=e.target.files[0]; if(!f) return; const r=new FileReader(); r.onload=()=>setFoto(r.result as string); r.readAsDataURL(f); };
  const addEj=()=>{ if(!nomEj) return; setEjs([{id:Date.now(),nombre:nomEj,tiempo, nivel, musculo:"PECHO"},...ejs]); setNomEj(""); };
  const addProd=()=>{ if(!nombre||!foto) return alert("Falta nombre y foto"); setProds([{id:Date.now(),nombre,precio,foto,cat:filtro,activo:true},...prods]); setNombre(""); setPrecio(""); setFoto(""); };
  const countNivel = (n:string)=> ejs.filter((x:any)=>x.nivel===n).length;

  return(
    <div style={{background:"#0F0F0F",color:"#fff",minHeight:"100vh",paddingBottom:90}}>
      <div style={{background:"#0A0A0A",padding:"12px 14px",display:"flex",alignItems:"center",gap:10,borderBottom:"1px solid #1A1A1A"}}>
        <div style={{width:52,height:52,borderRadius:26,border:"2px solid #FF0000",overflow:"hidden",background:"#000"}}>
          <img src="/logo.jpg" alt="logo" style={{width:"100%",height:"100%",objectFit:"cover"}} onError={(e:any)=>{e.target.src="https://via.placeholder.com/100/FF0000/FFF?text=F"}}/>
        </div>
        <div style={{lineHeight:1}}>
          <div style={{fontWeight:900,fontSize:28}}>FOR<span style={{color:"#FF0000"}}>ZA</span></div>
          <div style={{fontSize:14,letterSpacing:4,opacity:0.7,marginTop:-6}}>gym pro</div>
        </div>
        <div style={{marginLeft:"auto",display:"flex",gap:14,fontSize:22}}><span>🔍</span><span>🛒</span><span>👤</span></div>
      </div>

      <div style={{padding:"12px 14px"}}>
        <div style={{background:"#1E1E1E",border:"2px solid #FF0000",borderRadius:30,padding:"12px 16px",display:"flex",gap:10}}>
          <span>🔍</span>
          <input value={busq} onChange={e=>setBusq(e.target.value)} placeholder="Search products..." style={{background:"transparent",border:"none",color:"#fff",width:"100%",outline:"none"}}/>
        </div>
      </div>

      <div style={{display:"flex",gap:10,padding:"0 14px 12px",overflowX:"auto"}}>
        {["ALL","DIET","SUPPLEMENTS","APPAREL","EQUIP"].map(c=>(
          <div key={c} onClick={()=>setFiltro(c)} style={{padding:"10px 18px",borderRadius:24,fontSize:13,fontWeight:900,whiteSpace:"nowrap",background:filtro===c?"#FF0000":"#2A2A2A",border:"1px solid #333"}}>{c}</div>
        ))}
      </div>

      {tab==="CATEGORIES" && <>
          <div style={{margin:"0 14px",background:"#FF0000",borderRadius:18,padding:"16px 18px"}}>
            <div style={{fontSize:13}}>🔔 ALARMA HOY TE TOCA</div>
            <div style={{fontWeight:900,fontSize:19,marginTop:6}}>PRINCIPIANTE - {countNivel("PRINCIPIANTE")} ejercicios</div>
            <div style={{fontSize:13,marginTop:6,opacity:0.9}}>Principiante Blanco | Medio Gris | Avanzado Azul | Extremo Dorado</div>
          </div>

          <div style={{display:"flex",gap:12,padding:"14px",overflowX:"auto"}}>
            {[
              {id:"PRINCIPIANTE",sub:"Blanco - colores app",bg:"#FF0000"},
              {id:"MEDIO",sub:"Gris - color fuerte",bg:"#7A0000"},
              {id:"AVANZADO",sub:"Azul - gris+azul metalizado",bg:"#3A4A6A"},
            ].map(n=>(
              <div key={n.id} onClick={()=>setNivel(n.id)} style={{minWidth:148,background:n.bg,borderRadius:14,padding:"14px 12px",textAlign:"center",border:nivel===n.id?"2px solid #fff":"1px solid #333"}}>
                <div style={{fontWeight:900,fontSize:13}}>{n.id}</div>
                <div style={{marginTop:6,background:"#fff",color:"#000",borderRadius:8,padding:"4px 6px",fontSize:10,fontWeight:700,display:"inline-block"}}>{n.sub}</div>
              </div>
            ))}
          </div>

          <div style={{margin:"0 14px",background:"#1E1E1E",borderRadius:16,padding:14,border:"1px solid #2A2A2A"}}>
            <div style={{fontWeight:900,fontSize:13,marginBottom:12}}>AGREGAR EJERCICIO MANUAL - STICK FIGURE + MÚSCULOS ROJO FORZA</div>
            <div style={{display:"flex",gap:10}}>
              <input value={nomEj} onChange={e=>setNomEj(e.target.value)} placeholder="Ej: Press Banca" style={{flex:1,padding:"14px 12px",borderRadius:12,background:"#0F0F0F",border:"1px solid #333",color:"#fff"}}/>
              <input value={tiempo} onChange={e=>setTiempo(e.target.value)} style={{width:70,padding:"14px 0",borderRadius:12,background:"#0F0F0F",border:"1px solid #333",color:"#fff",textAlign:"center"}}/>
              <button onClick={addEj} style={{width:54,background:"#FF0000",border:"none",borderRadius:12,color:"#fff",fontSize:22,fontWeight:900}}>+</button>
            </div>
            <div style={{fontSize:12,opacity:0.5,marginTop:10}}>Al agregar, aparece automáticamente imagen en movimiento + músculos marcados en rojo. Opción subir video propio / Instagram</div>
            <div style={{marginTop:12,display:"grid",gap:10}}>
              {ejs.filter((x:any)=>x.nivel===nivel).map((x:any)=>(
                <div key={x.id} style={{background:"#0F0F0F",borderRadius:12,padding:10,display:"flex",gap:12,alignItems:"center",border:"1px solid #2A2A2A"}}>
                  <div style={{width:54,height:54,background:"#fff",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center"}}>🏋️</div>
                  <div style={{flex:1}}><div style={{fontWeight:800,fontSize:13}}>{x.nombre}</div><div style={{fontSize:11,opacity:0.6}}>{x.tiempo}s • {x.nivel}</div></div>
                  <div onClick={()=>setEjs(ejs.filter((y:any)=>y.id!==x.id))} style={{color:"#FF0000",fontWeight:900,padding:8}}>X</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{margin:"14px",background:"#0F0F0F",border:"2px solid #FF0000",borderRadius:16,padding:14}}>
            <div style={{fontWeight:900}}>💬 AUTOAYUDA FORZA GYM PRO (no WhatsApp personal)</div>
            <div style={{marginTop:10,background:"#1E1E1E",borderRadius:10,padding:10,fontSize:12,opacity:0.7}}>Bot de respuestas: rutinas, suplementos, pagos, envíos.</div>
          </div>
        </>}

      {tab==="SHOP" && <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,padding:14}}>{prods.map((p:any)=><div key={p.id} style={{background:"#1E1E1E",borderRadius:12,overflow:"hidden"}}><img src={p.foto} style={{width:"100%",height:130,objectFit:"cover"}}/><div style={{padding:8}}>{p.nombre} - ${p.precio}</div></div>)}</div>}
      {tab==="ACCOUNT" && <div style={{padding:14}}><div style={{background:"#1E1E1E",borderRadius:14,padding:14}}><b>SUBIR PRODUCTO</b><input value={nombre} onChange={e=>setNombre(e.target.value)} placeholder="Nombre" style={{width:"100%",padding:12,marginTop:10,borderRadius:10,background:"#0F0F0F",border:"1px solid #333",color:"#fff",marginBottom:8}}/><input value={precio} onChange={e=>setPrecio(e.target.value)} placeholder="Precio" style={{width:"100%",padding:12,borderRadius:10,background:"#0F0F0F",border:"1px solid #333",color:"#fff",marginBottom:8}}/><label style={{background:"#fff",color:"#000",padding:"8px 12px",borderRadius:8,fontWeight:800}}>📷 Foto<input type="file" accept="image/*" onChange={onFile} style={{display:"none"}}/></label>{foto && <img src={foto} style={{width:"100%",height:150,objectFit:"cover",borderRadius:10,marginTop:10}}/>}<button onClick={addProd} style={{width:"100%",padding:14,marginTop:10,background:"#FF0000",border:"none",borderRadius:12,color:"#fff",fontWeight:900}}>GUARDAR</button></div></div>}

      <div style={{position:"fixed",bottom:0,left:0,right:0,background:"#0A0A0A",borderTop:"1px solid #222",display:"flex",padding:"6px 0 10px"}}>
        {[{id:"SHOP",label:"Shop",icon:"🏠"},{id:"CATEGORIES",label:"Categories",icon:"⊞"},{id:"FAVORITES",label:"Favorites",icon:"★"},{id:"ORDERS",label:"Orders",icon:"📦"},{id:"ACCOUNT",label:"Account",icon:"👤"}].map(t=>(
          <div key={t.id} onClick={()=>setTab(t.id)} style={{flex:1,textAlign:"center",color:tab===t.id?"#FF0000":"#888"}}><div style={{fontSize:20}}>{t.icon}</div><div style={{fontSize:10,fontWeight:tab===t.id?900:400}}>{t.label}</div></div>
        ))}
      </div>
    </div>
  );
}
