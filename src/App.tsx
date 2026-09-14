import {useState,useEffect} from "react";
export default function App(){
const [tab,setTab]=useState("CATEGORIAS");
const [nivel,setNivel]=useState("PRINCIPIANTE");
const [ejs,setEjs]=useState([] as any[]);
const [nom,setNom]=useState("");
const [ti,setTi]=useState("60");
useEffect(()=>{try{const e=localStorage.getItem("f");if(e)setEjs(JSON.parse(e))}catch{}},[]);
useEffect(()=>{localStorage.setItem("f",JSON.stringify(ejs))},[ejs]);
const add=()=>{if(!nom)return;setEjs([{id:Date.now(),nombre:nom,tiempo:ti,nivel},...ejs]);setNom("")};
const cnt=(n:string)=>ejs.filter((x:any)=>x.nivel===n).length;
return(
<div style={{background:"#0F0F0F",color:"#fff",minHeight:"100vh",paddingBottom:90}}>
<div style={{background:"#0A0A0A",padding:"10px 14px",display:"flex",alignItems:"center",gap:10}}>
<div style={{width:52,height:52,borderRadius:26,border:"2px solid #FF0000",overflow:"hidden",background:"#000"}}><img src="/logo.jpg" style={{width:"100%",height:"100%",objectFit:"cover"}} alt="logo"/></div>
<div style={{fontWeight:900,fontSize:22}}>FOR<span style={{color:"#FF0000"}}>ZA</span><div style={{fontSize:10,letterSpacing:3,opacity:.6}}>gym pro</div></div>
</div>
<div style={{padding:12}}><div style={{background:"#1E1E1E",border:"2px solid #FF0000",borderRadius:30,padding:"12px 16px",display:"flex",gap:10}}><span>🔍</span><input placeholder="Buscar productos..." style={{background:"transparent",border:"none",color:"#fff",width:"100%",outline:"none"}}/></div></div>
<div style={{display:"flex",gap:8,padding:"0 12px 12px",overflowX:"auto"}}>{["TODO","DIETA","SUPLEMENTOS","ROPA","EQUIPOS"].map(c=><div key={c} style={{padding:"10px 16px",borderRadius:20,fontSize:12,fontWeight:900,background:c==="TODO"?"#FF0000":"#2A2A2A"}}>{c}</div>)}</div>
<div style={{margin:"0 12px",background:"#FF0000",borderRadius:18,padding:16}}><div style={{fontSize:12}}>🔔 ALARMA HOY TE TOCA</div><div style={{fontWeight:900,fontSize:18,marginTop:6}}>PRINCIPIANTE - {cnt("PRINCIPIANTE")} ejercicios</div></div>
<div style={{display:"flex",gap:10,padding:12,overflowX:"auto"}}>{[{id:"PRINCIPIANTE",bg:"#FF0000"},{id:"MEDIO",bg:"#7A0000"},{id:"AVANZADO",bg:"#3A4A6A"}].map(n=><div key={n.id} onClick={()=>setNivel(n.id)} style={{minWidth:120,background:n.bg,borderRadius:14,padding:12,textAlign:"center",border:nivel===n.id?"2px solid #fff":"1px solid #333"}}><div style={{fontWeight:900,fontSize:12}}>{n.id}</div></div>)}</div>
<div style={{margin:"0 12px",background:"#1E1E1E",borderRadius:16,padding:12}}><div style={{fontWeight:900,fontSize:12,marginBottom:10}}>AGREGAR EJERCICIO MANUAL</div><div style={{display:"flex",gap:8}}><input value={nom} onChange={e=>setNom(e.target.value)} placeholder="Ej: Press Banca" style={{flex:1,padding:12,borderRadius:10,background:"#0F0F0F",border:"1px solid #333",color:"#fff"}}/><input value={ti} onChange={e=>setTi(e.target.value)} style={{width:60,padding:12,borderRadius:10,background:"#0F0F0F",border:"1px solid #333",color:"#fff",textAlign:"center"}}/><button onClick={add} style={{width:50,background:"#FF0000",border:"none",borderRadius:10,color:"#fff",fontSize:22}}>+</button></div>
<div style={{marginTop:10,display:"grid",gap:8}}>{ejs.filter((x:any)=>x.nivel===nivel).map((x:any)=><div key={x.id} style={{background:"#0F0F0F",borderRadius:10,padding:10,display:"flex",gap:10}}><div style={{flex:1}}>{x.nombre} - {x.tiempo}s</div><div onClick={()=>setEjs(ejs.filter((y:any)=>y.id!==x.id))} style={{color:"red"}}>X</div></div>)}</div></div>
<div style={{position:"fixed",bottom:0,left:0,right:0,background:"#0A0A0A",borderTop:"1px solid #222",display:"flex",padding:"8px 0 10px"}}>{[{id:"TIENDA",icon:"🏠"},{id:"CATEGORIAS",icon:"⊞"},{id:"FAVORITOS",icon:"★"},{id:"PEDIDOS",icon:"📦"},{id:"MI TIENDA",icon:"👤"}].map(t=><div key={t.id} onClick={()=>setTab(t.id)} style={{flex:1,textAlign:"center",color:tab===t.id?"#FF0000":"#888"}}><div style={{fontSize:20}}>{t.icon}</div><div style={{fontSize:9,fontWeight:tab===t.id?900:400}}>{t.id}</div></div>)}</div>
</div>
);
}
