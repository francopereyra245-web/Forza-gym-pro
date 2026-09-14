// @ts-nocheck
import { useState, useEffect } from "react";

export default function App() {
  const [tab, setTab] = useState("CATEGORIAS");
  const [productos, setProductos] = useState([]);
  const [ejercicios, setEjercicios] = useState([]);
  const [nombre, setNombre] = useState(""); const [categoria, setCategoria] = useState("SUPPLEMENTS");
  const [precio, setPrecio] = useState(""); const [precioPro, setPrecioPro] = useState("");
  const [alias, setAlias] = useState(""); const [tel, setTel] = useState("");
  const [foto, setFoto] = useState(""); const [tipo, setTipo] = useState("img");
  const [mpLink, setMpLink] = useState(""); const [debito, setDebito] = useState(false);
  const [nomEj, setNomEj] = useState(""); const [tiempo, setTiempo] = useState("60");
  const [nivel, setNivel] = useState("PRINCIPIANTE"); const [busqueda, setBusqueda] = useState("");
  const [filtro, setFiltro] = useState("ALL");

  useEffect(() => { try { const p = localStorage.getItem("forza_p_final"); if(p) setProductos(JSON.parse(p)); const e = localStorage.getItem("forza_e_final"); if(e) setEjercicios(JSON.parse(e)); } catch {} }, []);
  useEffect(() => { localStorage.setItem("forza_p_final", JSON.stringify(productos)); }, [productos]);
  useEffect(() => { localStorage.setItem("forza_e_final", JSON.stringify(ejercicios)); }, [ejercicios]);

  const onFile = (e) => {
    const f = e.target.files[0]; if(!f) return;
    const r = new FileReader();
    r.onload = () => { setFoto(r.result); setTipo(f.type.includes("video")? "video" : "img"); };
    r.readAsDataURL(f);
  };

  const guardarProducto = () => {
    if(!nombre.trim()){ alert("Falta nombre"); return; }
    if(!foto){ alert("Falta foto/video"); return; }
    setProductos([{ id: Date.now(), nombre, categoria, precio, precioPro, alias, tel, foto, tipo, mpLink, debito, activo: false },...productos]);
    setNombre(""); setPrecio(""); setPrecioPro(""); setAlias(""); setTel(""); setFoto(""); setMpLink("");
  };

  const agregarEjercicio = () => {
    if(!nomEj.trim()) return;
    setEjercicios([{ id: Date.now(), nombre: nomEj, tiempo, nivel },...ejercicios]);
    setNomEj("");
  };

  return (
    <div style={{ background: "#0B0B0B", color: "white", minHeight: "100vh", paddingBottom: 80 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", background: "#000", borderBottom: "1px solid #222" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 38, height: 38, background: "red", borderRadius: 19, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900 }}>F</div>
          <div><div style={{ fontWeight: 900, fontSize: 18 }}>FOR<span style={{ color: "red" }}>ZA</span></div><div style={{ fontSize: 10, opacity: 0.6, letterSpacing: "3px" }}>GYM PRO</div></div>
        </div>
        <div>🔍 🛒 👤</div>
      </div>

      <div style={{ padding: 12 }}>
        <div style={{ background: "#1A1A1A", border: "1px solid red", borderRadius: 30, padding: "12px 16px", display: "flex", gap: 10 }}>
          🔍 <input value={busqueda} onChange={e => setBusqueda(e.target.value)} placeholder="Buscar productos..." style={{ background: "transparent", border: "none", color: "white", width: "100%", outline: "none" }} />
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, padding: "0 12px 14px", overflowX: "auto" }}>
        {["ALL", "DIET", "SUPPLEMENTS", "APPAREL", "EQUIPMENT"].map(c => (
          <div key={c} onClick={() => setFiltro(c)} style={{ padding: "9px 16px", borderRadius: 20, fontSize: 11, fontWeight: 900, background: filtro === c? "red" : "#222", whiteSpace: "nowrap" }}>{c}</div>
        ))}
      </div>

      {tab === "TIENDA" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, padding: 12 }}>
          {productos.filter(p => p.activo && (filtro==="ALL" || p.categoria===filtro) && p.nombre.toLowerCase().includes(busqueda.toLowerCase())).map(p => (
            <div key={p.id} style={{ background: "#1A1A1A", borderRadius: 16, overflow: "hidden", border: "1px solid #222" }}>
              {p.tipo==="video"? <video src={p.foto} style={{ width: "100%", height: 140, objectFit: "cover" }} /> : <img src={p.foto} style={{ width: "100%", height: 140, objectFit: "cover" }} />}
              <div style={{ padding: 10 }}><div style={{ fontSize: 13, fontWeight: 700 }}>{p.nombre}</div><div style={{ fontSize: 10, opacity: 0.5 }}>{p.categoria} • {p.alias}</div><div style={{ marginTop: 6, fontWeight: 900 }}>${p.precio}</div></div>
            </div>
          ))}
        </div>
      )}

      {tab === "CATEGORIAS" && (
        <div style={{ padding: 12 }}>
          <div style={{ background: "#FF1A1A", borderRadius: 16, padding: 16, marginBottom: 14 }}>
            <div style={{ fontSize: 12 }}>🔔 ALARMA HOY TE TOCA</div>
            <div style={{ fontWeight: 900, fontSize: 20, marginTop: 4 }}>{nivel} - {ejercicios.filter(e => e.nivel===nivel).length} ejercicios</div>
          </div>
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            {["PRINCIPIANTE","MEDIO","AVANZADO"].map(n => (
              <div key={n} onClick={() => setNivel(n)} style={{ flex: 1, background: nivel===n? "red" : "#222", border: nivel===n? "2px solid white" : "none", borderRadius: 14, padding: 12, textAlign: "center" }}>
                <div style={{ fontWeight: 900, fontSize: 11 }}>{n}</div>
              </div>
            ))}
          </div>
          <div style={{ fontWeight: 900, fontSize: 12, marginBottom: 10 }}>AGREGAR EJERCICIO MANUAL</div>
          <div style={{ display: "flex", gap: 8 }}>
            <input value={nomEj} onChange={e => setNomEj(e.target.value)} placeholder="Ej: Press Banca" style={{ flex: 1, padding: 14, borderRadius: 12, background: "#1E1E1E", border: "none", color: "white" }} />
            <input value={tiempo} onChange={e => setTiempo(e.target.value)} style={{ width: 70, padding: 14, borderRadius: 12, background: "#1E1E1E", border: "none", color: "white", textAlign: "center" }} />
            <button onClick={agregarEjercicio} style={{ width: 56, background: "red", border: "none", borderRadius: 12, color: "white", fontSize: 22, fontWeight: 900 }}>+</button>
          </div>
          {ejercicios.filter(e => e.nivel===nivel).map(e => (
            <div key={e.id} style={{ background: "#1A1A1A", padding: 14, borderRadius: 12, marginTop: 8, display: "flex", justifyContent: "space-between" }}>
              <span>{e.nombre}</span><span onClick={() => setEjercicios(ejercicios.filter(x => x.id!==e.id))} style={{ color: "red" }}>✕</span>
            </div>
          ))}
        </div>
      )}

      {tab === "CUENTA" && (
        <div style={{ padding: 12 }}>
          <div style={{ background: "#1A1A1A", borderRadius: 16, padding: 16, border: "1px solid #222" }}>
            <div style={{ fontWeight: 900, fontSize: 13, marginBottom: 14 }}>TIENDA - SUBIR FOTO / VIDEO POR PRODUCTO + SOCIO + TEL COMERCIAL</div>
            <input value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre del producto" style={{ width: "100%", padding: 14, borderRadius: 12, background: "#242424", border: "none", color: "white", marginBottom: 10 }} />
            <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
              <select value={categoria} onChange={e => setCategoria(e.target.value)} style={{ flex: 2, padding: 14, borderRadius: 12, background: "#242424", color: "white", border: "none" }}><option>SUPPLEMENTS</option><option>DIET</option><option>APPAREL</option><option>EQUIPMENT</option></select>
              <input value={precio} onChange={e => setPrecio(e.target.value)} placeholder="Precio $" style={{ flex: 1, padding: 14, borderRadius: 12, background: "#242424", border: "none", color: "white" }} />
            </div>
            <input value={alias} onChange={e => setAlias(e.target.value)} placeholder="Alias socio vendedor" style={{ width: "100%", padding: 14, borderRadius: 12, background: "#242424", border: "none", color: "white", marginBottom: 10 }} />
            <input value={tel} onChange={e => setTel(e.target.value)} placeholder="Tel comercial tienda" style={{ width: "100%", padding: 14, borderRadius: 12, background: "#242424", border: "none", color: "white", marginBottom: 10 }} />
            <div style={{ background: "#242424", borderRadius: 12, padding: 12, display: "flex", gap: 12, marginBottom: 12 }}>
              <label style={{ background: "white", color: "black", padding: "8px 14px", borderRadius: 8, fontSize: 12, fontWeight: 800 }}>Seleccionar archivo<input type="file" accept="image/*,video/*" onChange={onFile} style={{ display: "none" }} /></label>
              <span style={{ fontSize: 12, opacity: 0.6 }}>{foto? "Cargado ✅" : "Sin archivo"}</span>
            </div>
            {foto && (tipo==="video"? <video src={foto} controls style={{ width: "100%", borderRadius: 12, marginBottom: 12 }} /> : <img src={foto} style={{ width: "100%", height: 180, objectFit: "cover", borderRadius: 12, marginBottom: 12 }} />)}
            <button onClick={guardarProducto} style={{ width: "100%", padding: 16, background: "red", color: "white", fontWeight: 900, border: "none", borderRadius: 12 }}>GUARDAR - QUEDA DESACTIVADO</button>
          </div>
          <div style={{ background: "#1A1A1A", borderRadius: 16, padding: 16, marginTop: 12, border: "1px solid #222" }}>
            <div style={{ fontWeight: 900, fontSize: 13, marginBottom: 12 }}>PRECIO PRO EDITABLE + MP + DÉBITO AUTOMÁTICO</div>
            <div style={{ display: "flex", gap: 8 }}>
              <input value={precioPro} onChange={e => setPrecioPro(e.target.value)} placeholder="Precio PRO" style={{ flex: 1, padding: 14, borderRadius: 12, background: "#242424", border: "none", color: "white" }} />
              <input value={mpLink} onChange={e => setMpLink(e.target.value)} placeholder="Link MP" style={{ flex: 1, padding: 14, borderRadius: 12, background: "#242424", border: "none", color: "white" }} />
            </div>
          </div>
          <div style={{ marginTop: 16, fontWeight: 900, fontSize: 12 }}>MIS PRODUCTOS ({productos.length})</div>
          {productos.map(p => (
            <div key={p.id} style={{ background: "#1A1A1A", borderRadius: 12, padding: 12, marginTop: 8, display: "flex", gap: 12 }}>
              <img src={p.foto} style={{ width: 56, height: 56, borderRadius: 10, objectFit: "cover" }} />
              <div style={{ flex: 1, fontSize: 12 }}>{p.nombre}<br/><span style={{ opacity: 0.5 }}>{p.categoria}</span></div>
              <button onClick={() => setProductos(productos.map(x => x.id===p.id? {...x, activo:!x.activo} : x))} style={{ background: p.activo? "#333" : "#00C950", color: "white", border: "none", borderRadius: 8, padding: "0 12px", fontSize: 10 }}>{p.activo? "OFF" : "ON"}</button>
              <button onClick={() => setProductos(productos.filter(x => x.id!==p.id))} style={{ background: "#222", color: "white", border: "none", borderRadius: 8, padding: "0 10px" }}>X</button>
            </div>
          ))}
        </div>
      )}

      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, display: "flex", background: "#0E0E0E", borderTop: "1px solid #222" }}>
        {[
          { k: "TIENDA", l: "Tienda" },
          { k: "CATEGORIAS", l: "Rutinas" },
          { k: "FAVORITOS", l: "Favoritos" },
          { k: "PEDIDOS", l: "Pedidos" },
          { k: "CUENTA", l: "Cuenta" },
        ].map(t => (
          <div key={t.k} onClick={() => setTab(t.k)} style={{ flex: 1, textAlign: "center", padding: "10px 0", background: tab===t.k? "red" : "transparent", fontSize: 10, fontWeight: 900 }}>{t.l}</div>
        ))}
      </div>
    </div>
  );
}
