import { useState, useEffect } from 'react';

type Product = { id:number; nombre:string; precio:number; categoria:string; img:string; }
type CartItem = Product & { qty:number }
type Rutina = { id:number; nombre:string; dias:string; ejercicios:string }

const PRODUCTS: Product[] = [
  { id:1, nombre:'Whey Protein 1kg', precio: 28500, categoria:'Proteinas', img:'💪' },
  { id:2, nombre:'Creatina Monohidrato 300g', precio: 22000, categoria:'Creatinas', img:'⚡' },
  { id:3, nombre:'Pre-Entreno Nuclear', precio: 18900, categoria:'Pre-Entreno', img:'🔥' },
  { id:4, nombre:'Shaker Forza 700ml', precio: 6500, categoria:'Accesorios', img:'🥤' },
  { id:5, nombre:'Guantes con Muñequera', precio: 12500, categoria:'Accesorios', img:'🧤' },
  { id:6, nombre:'BCAA 2:1:1', precio: 15500, categoria:'Aminoacidos', img:'🧬' },
];

export default function App(){
  const [tab,setTab]=useState('Tienda');
  const [q,setQ]=useState('');
  const [cat,setCat]=useState('Todos');
  const [cart,setCart]=useState<CartItem[]>(()=>JSON.parse(localStorage.getItem('forza_cart')||'[]'));
  const [favs,setFavs]=useState<number[]>(()=>JSON.parse(localStorage.getItem('forza_favs')||'[]'));
  const [pedidos,setPedidos]=useState<any[]>(()=>JSON.parse(localStorage.getItem('forza_pedidos')||'[]'));
  const [rutinas,setRutinas]=useState<Rutina[]>(()=>JSON.parse(localStorage.getItem('forza_rutinas')||'[]'));

  // form rutina
  const [rNombre,setRNombre]=useState(''); const [rDias,setRDias]=useState('Lunes'); const [rEjer,setREjer]=useState('');

  useEffect(()=>localStorage.setItem('forza_cart',JSON.stringify(cart)),[cart]);
  useEffect(()=>localStorage.setItem('forza_favs',JSON.stringify(favs)),[favs]);
  useEffect(()=>localStorage.setItem('forza_pedidos',JSON.stringify(pedidos)),[pedidos]);
  useEffect(()=>localStorage.setItem('forza_rutinas',JSON.stringify(rutinas)),[rutinas]);

  const filtered = PRODUCTS.filter(p =>
    (cat==='Todos' || p.categoria===cat) && p.nombre.toLowerCase().includes(q.toLowerCase())
  );
  const cats = ['Todos',...Array.from(new Set(PRODUCTS.map(p=>p.categoria)))];

  const addToCart = (p:Product) => {
    setCart(c=>{ const ex=c.find(i=>i.id===p.id); return ex? c.map(i=>i.id===p.id?{...i,qty:i.qty+1}:i) : [...c,{...p,qty:1}] });
  };
  const total = cart.reduce((s,i)=>s+i.precio*i.qty,0);

  const finalizarPedido = () => {
    if(cart.length===0) return;
    setPedidos([{id:Date.now(), items:cart, total, fecha:new Date().toLocaleString()},...pedidos]);
    setCart([]); setTab('Cuenta'); alert('Pedido creado!');
  };

  return (
    <div style={{background:'#0a0a0a',color:'white',minHeight:'100vh',fontFamily:'Inter,system-ui',paddingBottom:80}}>
      {/* HEADER */}
      <div style={{position:'sticky',top:0,zIndex:10,background:'#0a0a0a',padding:'14px 16px',borderBottom:'2px solid #ff0000',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <b style={{letterSpacing:1}}>FORZA <span style={{color:'#ff0000'}}>GYM PRO</span></b>
        <div style={{fontSize:12,background:'#1a1a1a',padding:'6px 10px',borderRadius:20}}>🛒 {cart.reduce((s,i)=>s+i.qty,0)} - ${total.toLocaleString()}</div>
      </div>

      <div style={{padding:16}}>
        {/* TIENDA */}
        {tab==='Tienda' && <>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Buscar proteína, creatina..." style={{width:'100%',padding:12,borderRadius:10,border:'none',background:'#1a1a1a',color:'white',marginBottom:12}}/>
          <div style={{display:'flex',gap:8,overflowX:'auto',paddingBottom:8}}>
            {cats.map(c=><div key={c} onClick={()=>setCat(c)} style={{padding:'6px 12px',borderRadius:20,background:cat===c?'#ff0000':'#1a1a1a',fontSize:12,fontWeight:700,whiteSpace:'nowrap',cursor:'pointer'}}>{c}</div>)}
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginTop:12}}>
            {filtered.map(p=>(
              <div key={p.id} style={{background:'#151515',borderRadius:14,padding:12,border:'1px solid #222'}}>
                <div style={{fontSize:32,textAlign:'center'}}>{p.img}</div>
                <div style={{fontSize:13,fontWeight:700,marginTop:6,height:32}}>{p.nombre}</div>
                <div style={{fontSize:11,opacity:0.6}}>{p.categoria}</div>
                <div style={{fontWeight:900,marginTop:6}}>${p.precio.toLocaleString()}</div>
                <div style={{display:'flex',gap:6,marginTop:8}}>
                  <button onClick={()=>setFavs(f=>f.includes(p.id)?f.filter(x=>x!==p.id):[...f,p.id])} style={{flex:1,padding:8,borderRadius:8,border:'none',background:'#222'}}>{favs.includes(p.id)?'❤️':'🤍'}</button>
                  <button onClick={()=>addToCart(p)} style={{flex:3,padding:8,borderRadius:8,border:'none',background:'#ff0000',color:'white',fontWeight:900}}>AGREGAR</button>
                </div>
              </div>
            ))}
          </div>
        </>}

        {tab==='Categorias' && <>
          <h3>CATEGORIAS</h3>
          {cats.filter(c=>c!=='Todos').map(c=>(
            <div key={c} onClick={()=>{setCat(c);setTab('Tienda')}} style={{background:'#151515',padding:16,borderRadius:12,marginBottom:10,display:'flex',justifyContent:'space-between',borderLeft:'4px solid red'}}>
              <b>{c}</b><span>→</span>
            </div>
          ))}
        </>}

        {tab==='Favoritos' && <>
          <h3>FAVORITOS ({favs.length})</h3>
          {PRODUCTS.filter(p=>favs.includes(p.id)).map(p=>(
            <div key={p.id} style={{background:'#151515',padding:12,borderRadius:12,marginBottom:10,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div><b>{p.nombre}</b><div style={{opacity:0.6,fontSize:12}}>${p.precio.toLocaleString()}</div></div>
              <button onClick={()=>addToCart(p)} style={{background:'red',border:'none',color:'white',padding:'8px 12px',borderRadius:8}}>Agregar</button>
            </div>
          ))}
          {favs.length===0 && <p style={{opacity:0.5}}>No tenes favoritos aún.</p>}
        </>}

        {tab==='Pedidos' && <>
          <h3>CARRITO</h3>
          {cart.map(i=>(
            <div key={i.id} style={{background:'#151515',padding:12,borderRadius:12,marginBottom:8,display:'flex',justifyContent:'space-between'}}>
              <div>{i.nombre} x{i.qty}</div><div>${(i.precio*i.qty).toLocaleString()}</div>
            </div>
          ))}
          {cart.length===0? <p style={{opacity:0.5}}>Carrito vacío. Agrega desde Tienda.</p> : <>
            <div style={{marginTop:12,fontWeight:900,fontSize:18}}>TOTAL: ${total.toLocaleString()}</div>
            <button onClick={finalizarPedido} style={{width:'100%',marginTop:12,padding:14,background:'#ff0000',color:'white',fontWeight:900,border:'none',borderRadius:12}}>FINALIZAR PEDIDO</button>
          </>}
          {pedidos.length>0 && <><h3 style={{marginTop:20}}>HISTORIAL</h3>{pedidos.map(p=><div key={p.id} style={{background:'#111',padding:10,borderRadius:10,marginBottom:6,fontSize:12}}>{p.fecha} - ${p.total.toLocaleString()} - {p.items.length} productos</div>)}</>}
        </>}

        {tab==='Cuenta' && <>
          <h3>MI CUENTA</h3>
          <div style={{background:'#151515',padding:14,borderRadius:12,marginBottom:16}}>
            <b>Franco Pereyra</b><div style={{fontSize:12,opacity:0.6}}>franco@forzagym.com</div>
          </div>

          <h4 style={{color:'#ff0000'}}>MIS RUTINAS ({rutinas.length})</h4>
          <div style={{background:'#111',padding:12,borderRadius:12,marginBottom:12}}>
            <input value={rNombre} onChange={e=>setRNombre(e.target.value)} placeholder="Nombre rutina" style={{width:'100%',padding:10,borderRadius:8,border:'none',background:'#1e1e1e',color:'white',marginBottom:8}}/>
            <select value={rDias} onChange={e=>setRDias(e.target.value)} style={{width:'100%',padding:10,borderRadius:8,border:'none',background:'#1e1e1e',color:'white',marginBottom:8}}>
              <option>Lunes</option><option>Martes</option><option>Miercoles</option><option>Jueves</option><option>Viernes</option><option>Sabado</option>
            </select>
            <textarea value={rEjer} onChange={e=>setREjer(e.target.value)} placeholder="Ejercicios..." style={{width:'100%',padding:10,borderRadius:8,border:'none',background:'#1e1e1e',color:'white',minHeight:80,marginBottom:8}}/>
            <button onClick={()=>{ if(!rNombre) return alert('Nombre?'); setRutinas([...rutinas,{id:Date.now(),nombre:rNombre,dias:rDias,ejercicios:rEjer}]); setRNombre(''); setREjer(''); }} style={{width:'100%',padding:10,background:'white',color:'black',fontWeight:900,border:'none',borderRadius:8}}>CREAR RUTINA</button>
          </div>
          {rutinas.map(r=>(
            <div key={r.id} style={{background:'#151515',padding:12,borderRadius:10,marginBottom:8,borderLeft:'4px solid red'}}>
              <b>{r.nombre}</b> <span style={{fontSize:11,opacity:0.6}}>{r.dias}</span>
              <div style={{fontSize:12,whiteSpace:'pre-wrap',marginTop:4}}>{r.ejercicios}</div>
              <button onClick={()=>setRutinas(rutinas.filter(x=>x.id!==r.id))} style={{marginTop:6,background:'#222',color:'white',border:'none',padding:'4px 8px',borderRadius:6,fontSize:11}}>Borrar</button>
            </div>
          ))}
        </>}
      </div>

      {/* NAV */}
      <div style={{position:'fixed',bottom:0,left:0,right:0,display:'flex',background:'black',borderTop:'1px solid #222'}}>
        {[
          {k:'Tienda',l:'TIENDA'},
          {k:'Categorias',l:'CAT'},
          {k:'Favoritos',l:'FAV'},
          {k:'Pedidos',l:'CARRITO'},
          {k:'Cuenta',l:'CUENTA'},
        ].map(t=>(
          <div key={t.k} onClick={()=>setTab(t.k)} style={{flex:1,textAlign:'center',padding:12,fontSize:10,fontWeight:900,background:tab===t.k?'#ff0000':'black',cursor:'pointer'}}>{t.l}</div>
        ))}
      </div>
    </div>
  )
}
