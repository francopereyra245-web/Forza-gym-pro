import { useState, useEffect } from "react";
export default function App(){
const [tab,setTab]=useState("CATEGORIAS");
const [nivel,setNivel]=useState("PRINCIPIANTE");
const [ejs,setEjs]=useState<any[]>([]);
const [nom,setNom]=useState("");
useEffect(()=>{try{const s=localStorage.getItem("forza");if(s)setEjs(JSON.parse(s))}catch{}},[]);
useEffect(()=>{localStorage.setItem("forza",JSON.stringify(ejs))},[ejs]);
return(
<div style={{background:"#0F0F0F",color:"#fff",minHeight:"100vh",paddingBottom:90}}>
<div style={{background:"#0A0A0A",padding:14,display:"flex",alignItems:"center",gap:12}}>
<img src="/logo.jpg" style={{width:56,height:56,borderRadius:28,border:"2px solid #FF0000",objectFit:"cover"}}/>
<div style={{fontWeight:900,fontSize:22}}>FOR<span style={{color:"#FF0000"}}>ZA</span><div style={{fontSize:10,opacity:.6,letterSpacing:3}}>GYM PRO</div></div>
</div>
<div style={{padding:12}}><div style={{background:"#1E1E1E",border:"2px solid #FF0000",borderRadius:30,padding:12,display:"flex",gap:8}}>🔍<input placeholder="Buscar productos..." style={{background:"transparent",border:"none",color:"#fff",width:"100%",outline:"none"}}/></div></div>
<div style={{display:"flex",gap:8,padding:"0 12px 12px",overflowX:"auto"}}>{["TODO","DIETA","SUPLEMENTOS","ROPA","EQUIPOS"].map(c=><div key={c} style={{padding:"10px 16px",borderRadius:20,fontSize:12,fontWeight:900,background:c==="TODO"?"#FF0000":"#2A2A2A"}}>{c}</div>)}</div>
<div style={{margin:"0 12px",background:"#FF0000",borderRadius:16,padding:16}}>🔔 ALARMA HOY TE TOCA - {nivel} - {ejs.filter((x:any)=>x.nivel===nivel).length} ej</div>
<div style={{display:"flex",gap:10,padding:12,overflowX:"auto"}}>{[{id:"PRINCIPIANTE",bg:"#FF0000"},{id:"MEDIO",bg:"#7A0000"},{id:"AVANZADO",bg:"#3A4A6A"}].map(n=><div key={n.id} onClick={()=>setNivel(n.id)} style={{minWidth:120,background:n.bg,borderRadius:14,padding:12,textAlign:"center",border:nivel===n.id?"2px solid #fff":"none"}}>{n.id}</div>)}</div>
<div style={{margin:"0 12px",background:"#1E1E1E",borderRadius:16,padding:12}}><div style={{display:"flex",gap:8}}><input value={nom} onChange={e=>setNom(e.target.value)} placeholder="Ej: Press Banca" style={{flex:1,padding:12,borderRadius:10,background:"#0F0F0F",border:"1px solid #333",color:"#fff"}}/><button onClick={()=>{if(!nom)return;setEjs([{id:Date.now(),nombre:nom,nivel},...ejs]);setNom("")}} style={{width:50,background:"#FF0000",border:"none",borderRadius:10,color:"#fff"}}>+</button></div></div>
<div style={{position:"fixed",bottom:0,left:0,right:0,background:"#0A0A0A",borderTop:"1px solid #222",display:"flex",padding:"8px 0"}}>{["TIENDA","CATEGORIAS","FAVORITOS","PEDIDOS","MI TIENDA"].map(t=><div key={t} onClick={()=>setTab(t)} style={{flex:1,textAlign:"center",color:tab===t?"#FF0000":"#888"}}><div style={{fontSize:9}}>{t}</div></div>)}</div>
</div>
);
}
