import { useState, useEffect } from "react";

type Producto = {
  id: number; nombre: string; categoria: string; precio: string; precioPro: string;
  alias: string; tel: string; foto: string; tipo: string; mpLink: string; debito: boolean; activo: boolean;
};
type Ejercicio = { id: number; nombre: string; tiempo: string; nivel: string; };

export default function App() {
  const [tab, setTab] = useState("CATEGORIAS");

  const [productos, setProductos] = useState<Producto[]>(() => {
    try { return JSON.parse(localStorage.getItem("forza_productos_final") || "[]"); } catch { return []; }
  });
  const [ejercicios, setEjercicios] = useState<Ejercicio[]>(() => {
    try { return JSON.parse(localStorage.getItem("forza_ejercicios_final") || "[]"); } catch { return []; }
  });

  const [nombre, setNombre] = useState(""); const [categoria, setCategoria] = useState("SUPPLEMENTS");
  const [precio, setPrecio] = useState(""); const [precioPro, setPrecioPro] = useState("");
  const [alias, setAlias] = useState(""); const [tel, setTel] = useState("");
  const [foto, setFoto] = useState(""); const [tipo, setTipo] = useState("img");
  const [mpLink, setMpLink] = useState(""); const [debito, setDebito] = useState(false);

  const [nomEj, setNomEj] = useState(""); const [tiempo, setTiempo] = useState("60");
  const [nivel, setNivel] = useState("PRINCIPIANTE"); const [busqueda, setBusqueda] = useState("");
  const [filtro, setFiltro] = useState("ALL");

  useEffect(() => localStorage.setItem("forza_productos_final", JSON.stringify(productos)), [productos]);
  useEffect(() => localStorage.setItem("forza_ejercicios_final", JSON.stringify(ejercicios)), [ejercicios]);

  const onFile = (e: any) => {
    const f = e.target.files[0]; if (!f) return;
    const r = new FileReader();
    r.onload = () => { setFoto(r.result as string); setTipo(f.type.includes("video")? "video" : "img"); };
    r.readAsDataURL(f);
  };

  const guardarProducto = () => {
