// BOTTOM NAV EN ESPAÑOL
{[
  {id:'Tienda',icon:'🏠',label:'Tienda'},
  {id:'Categorias',icon:'▦',label:'Categorías'},
  {id:'Favoritos',icon:'★',label:'Favoritos'},
  {id:'Pedidos',icon:'📦',label:'Pedidos'},
  {id:'Cuenta',icon:'👤',label:'Cuenta'},
].map(b=>(
  <button key={b.id} onClick={()=>setTab(b.id)} style={{background:'none',border:0,color:tab===b.id?'#ff1a1a':'#666',display:'flex',flexDirection:'column',alignItems:'center',fontSize:10,fontWeight:900}}>
    <span style={{fontSize:20}}>{b.icon}</span>{b.label}
  </button>
))}

// CHIPS EN ESPAÑOL
{['TODO','DIETA','SUPLEMENTOS','INDUMENTARIA','EQUIPAMIENTO'].map(c=><button key={c} onClick={()=>setCat(c)} style={{background:cat===c?'#ff1a1a':'#2a2a2a',border:0,color:'white',borderRadius:20,padding:'8px 16px',fontWeight:900,fontSize:12}}>{c}</button>)}

// BUSCADOR EN ESPAÑOL
<input placeholder="Buscar productos..." />

// BOTONES TIENDA EN ESPAÑOL
<div style={{background:p.activo?'#00c851':'#ff1a1a'}}>{p.activo?'ACTIVO':'DESACTIVADO'}</div>
