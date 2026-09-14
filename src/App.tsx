import { useState, useEffect } from 'react';

type Product = {
  id:number; nombre:string; categoria:string; precio:number; precioPro:number;
  alias:string; tel:string; media:string; mediaType:string;
  mpLink:string; debitoAuto:boolean; activo:boolean;
}

const CATS = ['ALL','DIET','SUPPLEMENTS','APPAREL','EQUIPMENT'];

export default function App(){
  const [tab,setTab]=useState('Account');
  const [q,setQ]=useState('');
  const [catFilter,setCatFilter]=useState('ALL');
  const [products,setProducts]=useState<Product[]>(()=>JSON.parse(localStorage.getItem('forza_products')||'[]'));

  const [nombre,setNombre]=useState('');
  const [cat,setCat]=useState('SUPPLEMENTS');
  const [precio,setPrecio]=useState('');
  const [precioPro,setPrecioPro]=useState('');
  const [alias,setAlias]=useState('');
  const [tel,setTel]=useState('');
  const [mpLink,setMpLink]=useState('');
  const [debitoAuto,setDebitoAuto]=useState(false);
  const [media,setMedia]=useState('');
  const [mediaType,setMediaType]=useState('');

  useEffect(()=>localStorage.setItem('forza_products',JSON.stringify(products)),[products]);

  const onFile = (e:any) => {
    const file = e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setMedia(reader.result as string);
      setMediaType(file.type.startsWith('video')?'video':'image');
    };
    reader.readAsDataURL(file);
  };

  const guardar = () => {
    if(!nombre.trim()) return alert('Nombre?');
    if(!media) return alert('Falta foto/video');
    if(!alias.trim()) return alert('Falta alias socio');
    if(!tel.trim()) return alert('Falta tel comercial');
    const p:Product = {
      id:Date.now(), nombre, categoria:cat, precio:Number(precio)||0, precioPro:Number(precioPro)||0,
      alias, tel, media, mediaType, mpLink, debitoAuto, activo:false
