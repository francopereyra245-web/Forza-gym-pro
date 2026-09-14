import { useState, useEffect } from 'react'

export default function App(){
  const [tab,setTab]=useState('Categorías')
  const [cat,setCat]=useState('TODO')
  const [nivel,setNivel]=useState('prin')
  const [esPro,setEsPro]=useState(true)
  const [ejercicios,setEjercicios]=useState<any[]>(()=>JSON.parse(localStorage.getItem('fg-ex')||'[]'))
  const [productos,setProductos]=useState<any[]>(()=>JSON.parse(localStorage.getItem('fg-prod')||'[]'))
  const [nEj,setNEj]=useState('')
  const [q,setQ]=useState('')
  const [chatOpen,setChatOpen]=useState(false)
  const [chatMsg,setChatMsg]=useState('')
  const [chatHist,setChatHist]=useState<string[]>(['Hola, soy FORZA IA. Preguntame: rutina pecho, espalda, dieta, descanso.'])

  useEffect(()=>localStorage.setItem('fg-ex',JSON.stringify(ejercicios)),[ejercicios])
  useEffect(()=>localStorage.setItem('fg-prod',JSON.stringify(productos)),[productos])

  const filtros = ["TODO","DIETA","SUPLEMENTOS","INDUMENTARIA","EQUIPAMIENTO"]
  const NIVELES = [
    {id:'prin', nombre:'PRINCIPIANTE', sub:'Blanco - colores app', tipo:'GRATIS', color:'#ff1a1a'},
    {id:'medio', nombre:'MEDIO', sub:'Gris - color fuerte
