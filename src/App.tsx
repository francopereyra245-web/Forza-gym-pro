import { useState, useEffect } from "react";

type Prod = {
  id: number;
  nombre: string;
  cat: string;
  precio: string;
  alias: string;
  tel: string;
  img: string;
  tipo: string;
  activo: boolean;
};

export default function App() {
  const [tab, setTab] = useState("Account");
  const [prods, setProds] = useState<Prod[]>(() => {
    try { return JSON.parse(localStorage.getItem("forza_p") || "[]"); } catch { return []; }
  });

  const [nombre, setNombre] = useState("");
  const [cat, setCat] = useState("SUPPLEMENTS");
  const [precio, setPrecio] = useState("");
  const [alias, setAlias] = useState("");
  const [tel, setTel] = useState("");
  const [img, setImg] = useState("");
  const [tipo, setTipo] = useState("image");
  const [q, setQ] = useState("");
  const [filtro, setFiltro] = useState("ALL");

  useEffect(() => {
    localStorage.setItem("forza_p", JSON.stringify(prods));
  }, [prods]);

  function fileChange(e: any) {
    const f = e.target.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      setImg(r.result as string);
      setTipo(f.type.includes("video")? "video" : "image");
    };
    r.readAsDataURL(f);
  }

  function guardar() {
    if (!nombre) { alert("Poné nombre"); return; }
    if (!img) { alert("Elegí archivo"); return; }
    const nuevo: Prod = {
      id: Date.now(),
      nombre, cat, precio, alias, tel, img, tipo, activo: false
    };
    setProds([nuevo,...prods]);
    setNombre(""); setPrecio(""); setAlias(""); setTel(""); setImg("");
    alert("GUARDADO - Queda DESACTIVADO");
  }

  const cats = ["ALL", "DIET", "SUPPLEMENTS", "APPAREL", "EQUIPMENT"];
  const lista = prods.filter(p => {
    const porCat = filtro === "ALL" || p.cat === filtro;
    const porQ = p.nombre.toLowerCase().includes(q.toLowerCase());
    return porCat && porQ;
  });

  return (
    <div style={{ background: "#0E0E0E", color: "white", minHeight: "100vh", paddingBottom: 80, fontFamily: "sans-serif" }}>

      <div style={{ display: "flex", justifyContent: "space-between", padding: 12, background: "black", borderBottom: "1px solid #222" }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center", fontWeight: 900 }}>
          <div style={{ background: "red", width: 32, height: 32, borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>F</div>
          FORZA<span style={{ color: "red" }}> gym pro</span>
        </div>
        <div>🔍 🛒 👤</div>
      </div>

      <div style={{ padding: 12 }}>
        <div style={{ background: "#
