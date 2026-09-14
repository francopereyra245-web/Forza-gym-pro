// @ts-nocheck
import { useState, useEffect } from "react";

export default function App() {
  const [tab, setTab] = useState("CUENTA");
  const [prods, setProds] = useState<any[]>([]);
  const [nombre, setNombre] = useState("");
  const [cat, setCat] = useState("SUPPLEMENTS");
  const [precio, setPrecio] = useState("");
  const [alias, setAlias] = useState("");
  const [tel, setTel] = useState("");
  const [foto, setFoto] = useState("");
  const [tipo, setTipo] = useState("img");

  useEffect(() => {
    const p = localStorage.getItem("fp");
    if (p) setProds(JSON.parse(p));
  }, []);
  useEffect(() => {
    localStorage.setItem("fp", JSON.stringify(prods));
  }, [prods]);

  const onFile = (e: any) => {
    const f = e.target.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      setFoto(r.result as string);
      setTipo(f.type.includes("video")? "vid" : "img");
    };
    r.readAsDataURL(f);
  };

  const guardar = () => {
    if (!nombre ||!foto) {
      alert("Falta nombre o foto");
      return;
    }
    const nuevo = {
      id: Date.now(),
      nombre,
      cat,
      precio,
      alias,
      tel,
      foto,
      tipo,
      activo: false,
    };
    setProds([nuevo,...prods]);
    setNombre("");
    setPrecio("");
    setAlias("");
    setTel("");
    setFoto("");
  };

  return (
    <div style={{ background: "#0B0B0B", color: "#fff", minHeight: "100vh", paddingBottom: 70 }}>
      <div style={{ padding: 14, background: "#000", display: "flex", gap: 10, alignItems: "center" }}>
        <div style={{ width: 36, height: 36, background: "red", borderRadius: 18, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900 }}>F</div>
        <b>FORZA GYM PRO</b>
      </div>

      {tab === "TIENDA" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, padding: 12 }}>
          {prods.filter(p => p.activo).map(p => (
            <div key={p.id} style={{ background: "#1A1A1A", borderRadius: 12, overflow: "hidden" }}>
              {p.tipo === "vid"? <video src={p.foto} style={{ width: "100%", height: 120, objectFit: "cover" }} /> : <img src={p.foto} style={{ width: "100%", height: 120, objectFit: "cover" }} />}
              <div style={{ padding: 8 }}>{p.nombre} - ${p.precio}</div>
            </div>
          ))}
        </div>
      )}

      {tab === "CUENTA" && (
        <div style={{ padding: 12 }}>
          <div style={{ background: "#1A1A1A", borderRadius: 14, padding: 14 }}>
            <b style={{ fontSize: 12 }}>SUBIR PRODUCTO - FOTO / VIDEO + SOCIO + TEL</b>
            <input value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre" style={{ width: "100%", padding: 12, marginTop: 10, borderRadius: 8, background: "#262626", border: "none", color: "#fff" }} />
            <select value={cat} onChange={e => setCat(e.target.value)} style={{ width: "100%", padding: 12, marginTop: 8, borderRadius: 8, background: "#262626", color: "#fff", border: "none" }}>
              <option>SUPPLEMENTS</option><option>DIET</option><option>APPAREL</option><option>EQUIPMENT</option>
            </select>
            <input value={precio} onChange={e => setPrecio(e.target.value)} placeholder="Precio" style={{ width: "100%", padding: 12, marginTop: 8, borderRadius: 8,
