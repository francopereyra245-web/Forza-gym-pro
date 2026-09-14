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
  const [rNombre,setRNombre]=useState(''); const [rDias,setRDias]=useState('Lunes'); const [rEjer,setRE
