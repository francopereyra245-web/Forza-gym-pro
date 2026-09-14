import { useState } from "react";
export default function App(){
const [tab,setTab]=useState("CATEGORIAS");
return(
<div style={{background:"#0F0F0F",minHeight:"100vh",color:"#fff",paddingBottom:80}}>
<div style={{background:"#0A0A0A",padding:12,display:"flex",alignItems:"center",gap:12}}>
<img src="/logo.jpg" style={{width:56,height:56,borderRadius:28,border:"2px solid #FF0000",objectFit:"cover"}}/>
<div style={{fontWeight:900,fontSize:22}}>FOR<span style={{color:"#FF0000"}}>ZA</span><div style={{fontSize:10,opacity:.6,letterSpacing:3}}>gym pro</div></div>
</div>
<div style={{padding:12}}><div style={{background:"#1E1E1E",border:"2px solid #FF0000",borderRadius:30,padding:12,display:"flex",gap:8}}>🔍<input placeholder="Buscar productos..." style={{background:"transparent",border:"none",color:"#fff",width:"100%",outline:"none"}}/></div></div>
<div style={{display:"flex",gap:8,padding:"0 12px 12px",overflowX:"auto"}}>{["TODO","DIETA","SUPLEMENTOS","ROPA","EQUIPOS"].map(c=><div key={c} style={{padding:"10px 16px",borderRadius:20,background:c==="TODO"?"#FF0000":"#2A2A2A",fontSize:12,fontWeight:900}}>{c}</div>)}</div>
<div style={{margin:"0 12px",background:"#FF0000",borderRadius:16,padding:16,fontWeight:900}}>🔔 ALARMA HOY TE TOCA</div>
<div style={{position:"fixed",bottom:0,left:0,right:0,background:"#0A0A0A",borderTop:"1px solid #222",display:"flex",padding:"8px 0"}}>
{["TIENDA","CATEGORIAS","FAVORITOS","PEDIDOS","MI TIENDA"].map(t=><div key={t} onClick={()=>setTab(t)} style={{flex:1,textAlign:"center",color:tab===t?"#FF0000":"#888"}}><div>{t==="TIENDA"?"🏠":t==="CATEGORIAS"?"⊞":t==="FAVORITOS"?"★":t==="PEDIDOS"?"📦":"👤"}</div><div style={{fontSize:9}}>{t}</div></div>)}
</div>
</div>
);
}
