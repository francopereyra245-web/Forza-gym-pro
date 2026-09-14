import { useState, useEffect } from 'react'

type Ejercicio = { id: string; nombre: string; nivel: string }
type Socio = { id: string; nombre: string; esYo: boolean }

export default function App(){
  const [tab, setTab] = useState('Categorías')
  const [nivel, setNivel] = useState('prin')
  const [ejercicios, setEjercicios] = useState<Ejercicio[]>(()=>JSON.parse(localStorage.getItem('fg-ex')||'[]'))
  const [socios, setSocios] = useState<Socio[]>(()=>JSON.parse(localStorage.getItem('fg-socios')||'[{"id":"yo","nombre":"Yo (Dueño)","esYo":true}]'))
  const [nEj, setNEj] = useState('')
  const [nSocio, setNSocio] = useState('')
  const [chat, setChat] = useState(false)

  useEffect(()=>localStorage.setItem('fg-ex', JSON.stringify(ejercicios)),[ejercicios])
  useEffect(()=>localStorage.setItem('fg-socios', JSON.stringify(socios)),[socios])

  const niveles = [
    {id:'prin', nombre:'PRINCIPIANTE', detalle:'Blanco', badge:'GRATIS', color:'#ff3b30'},
    {id:'medio', nombre:'MEDIO', detalle:'Gris', badge:'PRO 🔒', color:'#8b0000'},
    {id:'avanz', nombre:'AVANZADO', detalle:'Azul',
