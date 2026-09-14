// @ts-nocheck
import { useState, useEffect } from "react";
const LOGO = "data:image/webp;base64,[EL LOGO ESTÁ EN EL ARCHIVO QUE TE GENERÉ]";

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

  useEffect(()=>{ try{ const e=localStorage.getItem("forza-ejs-final"); if(e) setEjs(JSON.parse(e)); const p=localStorage.getItem("forza-prods-final"); if(p) setProds(JSON.parse(p)); }catch{} },[]);
  useEffect(()=>{ localStorage.setItem("forza-ejs-final", JSON.stringify(ejs)) },[ejs]);
  useEffect(()=>{ localStorage.setItem("forza-prods-final", JSON.stringify(prods)) },[prods]);

  const onFile=(e:any)=>{ const f=e.target.files[0]; if(!f) return; const r=new FileReader(); r.onload=()=>setFoto(r.result as string); r.readAsDataURL(f); };
  const addEj=()=>{ if(!nomEj) return; setEjs([{id:Date.now(),nombre:nomEj,tiempo,nivel},...ejs]); setNomEj(""); };
  const addProd=()=>{ if(!nombre||!foto) return alert("Falta nombre y foto"); setProds([{id:Date.now(),nombre,precio,foto,cat:filtro,activo:true},...prods]); setNombre(""); setPrecio(""); setFoto(""); };
  const countNivel=(n:string)=>ejs.filter((x:any)=>x.nivel===n).length;

  return(
    <div style={{background:"#0F0F0F",color:"#fff",minHeight:"100vh",paddingBottom:90}}>
      {/* HEADER CON TU LOGO REAL CENTRADO - 52px circulo rojo */}
      <div style={{background:"#0A0A0A",padding:"12px 14px",display:"flex",alignItems:"center",gap:10,borderBottom:"1px solid #1A1A1A"}}>
        <div style={{width:52,height:52,borderRadius:26,border:"2px solid #FF0000",overflow:"hidden",background:"#000"}}>
          <img src={LOGO} alt="logo" style={{width:"100%",height:"100%",objectFit:"contain"}}/>
        </div>
        <div><div style={{fontWeight:900,fontSize:28}}>FOR<span style={{color:"#FF0000"}}>ZA</span></div><div style={{fontSize:14,letterSpacing:4,opacity:0.7,marginTop:-6}}>gym pro</div></div>
        <div style={{marginLeft:"auto",display:"flex",gap:14,fontSize:22}}><span>🔍</span><span>🛒</span><span>👤</span></div>
      </div>

      <div style={{padding:"12px 14px"}}>
        <div style={{background:"#1E1E1E",border:"2px solid #FF0000",borderRadius:30,padding:"12px 16px",display:"flex",gap:10}}>
          <span>🔍</span><input value={busq} onChange={e=>setBusq(e.target.value)} placeholder="Search products..." style={{background:"transparent",border:"none",color:"#fff",width:"100%",outline:"none"}}/>
        </div>
      </div>

      <div style={{display:"flex",gap:10,padding:"0 14px 12px",overflowX:"auto"}}>
        {["ALL","DIET","SUPPLEMENTS","APPAREL","EQUIP"].map(c=>(
          <div key={c} onClick={()=>setFiltro(c)} style={{padding:"10px 18px",borderRadius:24,fontSize:13,fontWeight:900,background:filtro===c?"#FF0000":"#2A2A2A"}}>{c}</div>
        ))}
      </div>

      {tab==="CATEGORIES" && <>
          <div style={{margin:"0 14px",background:"#FF0000",borderRadius:18,padding:"16px 18px"}}>
            <div style={{fontSize:13}}>🔔 ALARMA HOY TE TOCA</div>
            <div style={{fontWeight:900,fontSize:19,marginTop:6}}>PRINCIPIANTE - {countNivel("PRINCIPIANTE")} ejercicios</div>
            <div style={{fontSize:13,marginTop:6}}>Principiante Blanco | Medio Gris | Avanzado Azul | Extremo Dorado</div>
          </div>
          <div style={{display:"flex",gap:12,padding:"14px",overflowX:"auto"}}>
            {[{id:"PRINCIPIANTE",sub:"Blanco - colores app",bg:"#FF0000"},{id:"MEDIO",sub:"Gris - color fuerte",bg:"#7A0000"},{id:"AVANZADO",sub:"Azul - gris+azul metalizado",bg:"#3A4A6A"}].map(n=>(
              <div key={n.id} onClick={()=>setNivel(n.id)} style={{minWidth:148,background:n.bg,borderRadius:14,padding:"14px 12px",textAlign:"center",border:nivel===n.id?"2px solid #fff":"1px solid #333"}}>
                <div style={{fontWeight:900,fontSize:13}}>{n.id}</div>
                <div style={{marginTop:6,background:"#fff",color:"#000",borderRadius:8,padding:"4px 6px",fontSize:10,fontWeight:700,display:"inline-block"}}>{n.sub}</div>
              </div>
            ))}
          </div>
          <div style={{margin:"0 14px",background:"#1E1E1E",borderRadius:16,padding:14}}>
            <div style={{fontWeight:900,fontSize:13,marginBottom:12}}>AGREGAR EJERCICIO MANUAL</div>
            <div style={{display:"flex",gap:10}}>
              <input value={nomEj} onChange={e=>setNomEj(e.target.value)} placeholder="Ej: Press Banca" style={{flex:1,padding:"14px 12px",borderRadius:12,background:"#0F0F0F",border:"1px solid #333",color:"#fff"}}/>
              <input value={tiempo} onChange={e=>setTiempo(e.target.value)} style={{width:70,padding:"14px 0",borderRadius:12,background:"#0F0F0F",border:"1px solid #333",color:"#fff",textAlign:"center"}}/>
              <button onClick={addEj} style={{width:54,background:"#FF0000",border:"none",borderRadius:12,color:"#fff",fontSize:22,fontWeight:900}}>+</button>
            </div>
            <div style={{marginTop:12,display:"grid",gap:10}}>
              {ejs.filter((x:any)=>x.nivel===nivel).map((x:any)=>(
                <div key={x.id} style={{background:"#0F0F0F",borderRadius:12,padding:10,display:"flex",gap:12,alignItems:"center"}}>
                  <div style={{width:54,height:54,background:"#fff",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center"}}>🏋️</div>
                  <div style={{flex:1}}><div style={{fontWeight:800}}>{x.nombre}</div><div style={{fontSize:11,opacity:0.6}}>{x.tiempo}s • {x.nivel}</div></div>
                  <div onClick={()=>setEjs(ejs.filter((y:any)=>y.id!==x.id))} style={{color:"#FF0000",fontWeight:900}}>X</div>
                </div>
              ))}
            </div>
          </div>
        </>}
      <div style={{position:"fixed",bottom:0,left:0,right:0,background:"#0A0A0A",borderTop:"1px solid #222",display:"flex",padding:"6px 0 10px"}}>
        {[{id:"SHOP",label:"Shop"},{id:"CATEGORIES",label:"Categories"},{id:"FAVORITES",label:"Favorites"},{id:"ORDERS",label:"Orders"},{id:"ACCOUNT",label:"Account"}].map(t=>(
          <div key={t.id} onClick={()=>setTab(t.id)} style={{flex:1,textAlign:"center",color:tab===t.id?"#FF0000":"#888"}}><div style={{fontSize:20}}>{t.id==="CATEGORIES"?"⊞":t.id==="SHOP"?"🏠":t.id==="FAVORITES"?"★":t.id==="ORDERS"?"📦":"👤"}</div><div style={{fontSize:10}}>{t.label}</div></div>
        ))}
      </div>
    </div>
  );
}
