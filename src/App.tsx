import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)

// CONFIGURABLE POR VOS
const MI_MERCADOPAGO_ALIAS = "forza.gym.pro.mp" // CAMBIALO POR TU ALIAS REAL

type Producto = { id:number, cat:'dietas'|'suplementos'|'indumentaria', nombre:string, precio:number, stock:boolean, partnerAlias:string, img:string, video:string }
type Ejercicio = { id:number, nombre:string, musculo:string, imgMov:string, musculoImg:string }

export default function App() {
  const [vista, setVista] = useState<'home'|'rutina'|'progreso'|'tienda'|'perfil'|'admin'>('home')
  const [esPro, setEsPro] = useState(false)
  const [showTerminos, setShowTerminos] = useState(true)
  const [ejercicios, setEjercicios] = useState<Ejercicio[]>([
    { id:1, nombre:'Press de banca plano', musculo:'Pecho', imgMov:'https://media.giphy.com/media/3o7TKSjRrfIPje4awo/giphy.gif', musculoImg:'pecho' },
    { id:2, nombre:'Sentadilla libre', musculo:'Piernas', imgMov:'https://media.giphy.com/media/l1J9u3TZfpfeDLkdy/giphy.gif', musculoImg:'piernas' },
  ])
  const [nuevoEj, setNuevoEj] = useState({nombre:'', musculo:'Pecho'})
  const [ejActual, setEjActual] = useState(0)
  const [segundos, setSegundos] = useState(90)
  const [productos, setProductos] = useState<Producto[]>([
    { id:1, cat:'suplementos', nombre:'WHEY 2KG', precio:28500, stock:true, partnerAlias:MI_MERCADOPAGO_ALIAS, img:'', video:'' },
    { id:2, cat:'dietas', nombre:'Dieta Volumen 4 semanas', precio:15000, stock:true, partnerAlias:MI_MERCADOPAGO_ALIAS, img:'', video:'' },
    { id:3, cat:'indumentaria', nombre:'Remera FORZA', precio:18900, stock:false, partnerAlias:MI_MERCADOPAGO_ALIAS, img:'', video:'' },
  ])
  const [usuarios] = useState([{nombre:'Juan Perez', activo:true, dias:22, peso:80, talla:'M', foto:'', ingreso:'13:31 hoy'}])

  useEffect(()=>{
    if(vista!=='rutina') return
    if(segundos===0){ if('vibrate' in navigator) navigator.vibrate([200,100,200]); if(Notification.permission==='granted') new Notification('FORZA GYM PRO: ¡Descanso terminado!'); return }
    const id=setInterval(()=>setSegundos(s=>s-1),1000)
    return ()=>clearInterval(id)
  },[vista, segundos])

  const formatTime=(t:number)=>`${String(Math.floor(t/60)).padStart(2,'0')}:${String(t%60).padStart(2,'0')}`

  // STICK FIGURE - musculos marcados
  const MusculoMap = ({musculo}:{musculo:string}) => (
    <div className="bg-black border border-zinc-800 rounded-2xl p-3 flex gap-3 items-center">
      <div className="w-16 h-24 bg-zinc-900 rounded-xl relative overflow-hidden flex items-center justify-center">
        <div className={`w-8 h-8 rounded-full ${musculo==='Pecho'?'bg-red-600 animate-pulse':'bg-zinc-700'}`} />{/* Simula musculo pecho iluminado */}
        <span className="absolute bottom-1 text-[8px]">STICK</span>
      </div>
      <div><p className="text-[10px] text-zinc-500 font-bold">MÚSCULO OBJETIVO</p><p className="font-black text-red-500">{musculo.toUpperCase()}</p><p className="text-[10px] text-zinc-400 mt-1">Comprometido favorablemente</p></div>
    </div>
  )

  if(showTerminos){
    return (
      <div className="min-h-screen bg-black text-white p-6 flex items-center">
        <div className="bg-zinc-900 border border-zinc-800 rounded-[24px] p-6 w-full max-w-md mx-auto">
          <img src="/logo.png" className="w-20 h-20 mx-auto bg-white rounded-2xl p-2" />
          <h1 className="font-black text-center mt-4 tracking-widest">FORZA GYM PRO</h1>
          <h2 className="text-xs text-zinc-400 text-center mt-2 font-bold">TÉRMINOS Y CONDICIONES</h2>
          <div className="bg-black rounded-xl p-3 mt-4 text-[11px] text-zinc-400 h-48 overflow-y-auto">
            1. Al suscribirte aceptás entrenamiento bajo tu responsabilidad. FORZA no se hace cargo de lesiones por mala ejecución.<br/><br/>
            2. Debés cargar peso, talla, edad real. Fotos de progreso son privadas y solo las ve el admin.<br/><br/>
            3. Plan PRO: pago mensual a {MI_MERCADOPAGO_ALIAS}. Aviso 3 días antes de vencer. Débito automático opcional.<br/>
            4. Tienda: productos de terceros. FORZA gestiona pagos a alias del socio vendedor.<br/>
            5. Críticas con 5 estrellas requieren aprobación del admin antes de publicarse.<br/>
            6. Datos de ingreso con nombre y apellido quedan registrados.
          </div>
          <div className="mt-4 space-y-2">
            <input placeholder="Nombre y Apellido" className="w-full bg-black border border-zinc-800 rounded-xl p-3 text-sm" />
            <div className="grid grid-cols-2 gap-2"><input placeholder="Peso kg" className="bg-black border border-zinc-800 rounded-xl p-3 text-sm" /><input placeholder="Talla" className="bg-black border border-zinc-800 rounded-xl p-3 text-sm" /></div>
          </div>
          <button onClick={()=>{ setShowTerminos(false); if('Notification' in window) Notification.requestPermission() }} className="w-full bg-red-600 mt-5 py-3 rounded-xl font-black">ACEPTO Y ENTRAR</button>
        </div>
      </div>
    )
  }

  if(vista==='admin'){
    return (
      <div className="min-h-screen bg-black text-white p-4 pb-28">
        <h1 className="font-black">PANEL ADMIN FORZA GYM PRO</h1>
        <div className="mt-4 bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
          <p className="font-bold text-sm">USUARIOS ACTIVOS (luz verde)</p>
          {usuarios.map(u=>(
            <div key={u.nombre} className="flex justify-between items-center mt-3 bg-black p-3 rounded-xl border border-zinc-800">
              <div><p className="text-sm font-bold">{u.nombre} {u.activo?'🟢':'🔴'}</p><p className="text-[10px] text-zinc-500">{u.ingreso} • {u.dias} días activo • {u.peso}kg</p></div>
              <button onClick={()=>setEsPro(!esPro)} className={`px-3 py-1 rounded-full text-[10px] font-black ${esPro?'bg-red-600':'bg-zinc-700'}`}>{esPro?'QUITAR PRO':'DAR PRO'}</button>
            </div>
          ))}
        </div>
        <div className="mt-4 bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
          <p className="font-bold text-sm">EDITAR PRECIO PRO</p>
          <input defaultValue="8900" className="w-full bg-black border border-zinc-800 rounded-xl p-3 mt-2 text-sm" placeholder="Precio PRO $"/>
          <p className="text-[10px] text-zinc-500 mt-2">Aviso: "Te faltan X días para renovar" se activa automático a los 27 días.</p>
        </div>
        <div className="mt-4 bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
          <p className="font-bold text-sm">CRÍTICAS 5 ESTRELLAS - POR APROBAR</p>
          <div className="bg-black p-3 rounded-xl mt-2 border border-zinc-800"><p className="text-xs">"Excelente app, bajé 5kg" - ★★★★★</p><div className="flex gap-2 mt-2"><button className="bg-green-600 px-3 py-1 rounded text-xs font-bold">APROBAR</button><button className="bg-zinc-700 px-3 py-1 rounded text-xs">RECHAZAR</button></div>
        </div>
        <button onClick={()=>setVista('home')} className="w-full bg-white text-black mt-6 py-3 rounded-xl font-black">VOLVER</button>
      </div>
    )
  }

  if(vista==='tienda'){
    return (
      <div className="min-h-screen bg-black text-white pb-28 p-4">
        <div className="flex justify-between items-center"><h1 className="font-black">TIENDA FORZA GYM PRO</h1><button onClick={()=>setVista('home')} className="bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-full text-xs">Volver</button></div>
        <div className="flex gap-2 mt-4"><span className="text-[10px] bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full">DIETAS</span><span className="text-[10px] bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full">SUPLEMENTOS</span><span className="text-[10px] bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full">INDUMENTARIA</span></div>
        {productos.map(p=>(
          <div key={p.id} className={`mt-3 bg-zinc-900 border ${p.stock?'border-zinc-800':'border-red-900 opacity-60'} rounded-2xl p-4`}>
            <div className="flex justify-between"><p className="font-black text-sm">{p.nombre} - ${p.precio}</p><button onClick={()=>setProductos(productos.map(x=>x.id===p.id?{...x, stock:!x.stock}:x))} className={`px-3 py-1 rounded-full text-[10px] font-black ${p.stock?'bg-green-600':'bg-red-600'}`}>{p.stock?'ACTIVADO':'DESACTIVADO SIN STOCK'}</button></div>
            <p className="text-[10px] text-zinc-500 mt-1">Cat: {p.cat} • Alias socio: {p.partnerAlias}</p>
            <div className="mt-3 grid grid-cols-2 gap-2"><input placeholder="Link foto producto" className="bg-black border border-zinc-800 rounded-lg p-2 text-[10px]" /><input placeholder="Link video producto" className="bg-black border border-zinc-800 rounded-lg p-2 text-[10px]" /></div>
            <div className="flex gap-2 mt-3"><input placeholder="Alias MP socio vendedor" value={p.partnerAlias} onChange={e=>setProductos(productos.map(x=>x.id===p.id?{...x, partnerAlias:e.target.value}:x))} className="flex-1 bg-black border border-zinc-800 rounded-lg p-2 text-xs" /><a href={`https://mpago.la/${p.partnerAlias}`} target="_blank" className="bg-white text-black px-4 py-2 rounded-lg text-xs font-black">PAGAR DIRECTO MP</a></div>
          </div>
        ))}
        <button onClick={()=>{ const nombre=prompt('Nombre producto'); if(nombre) setProductos([...productos,{id:Date.now(),cat:'suplementos',nombre,precio:1000,stock:true,partnerAlias:MI_MERCADOPAGO_ALIAS,img:'',video:''}]) }} className="w-full bg-red-600 mt-4 py-3 rounded-xl font-black text-sm">+ AGREGAR PRODUCTO (DIETA / SUPLE / ROPA)</button>
        <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 flex justify-around py-3 text-[10px]"><button onClick={()=>setVista('home')} className="text-zinc-500">Inicio</button><button onClick={()=>setVista('rutina')} className="text-zinc-500">Rutinas</button><button onClick={()=>setVista('tienda')} className="text-red-500 font-bold">Tienda</button><button onClick={()=>setVista('perfil')} className="text-zinc-500">Perfil</button><button onClick={()=>setVista('admin')} className="text-zinc-500">Admin</button></div>
      </div>
    )
  }

  if(vista==='rutina'){
    const ej=ejercicios[ejActual]
    return (
      <div className="min-h-screen bg-black text-white pb-28">
        <div className="relative h-[38vh] bg-zinc-900"><img src={ej.imgMov} className="w-full h-full object-contain" /><div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" /><button onClick={()=>setVista('home')} className="absolute top-4 left-4 bg-black/70 px-4 py-2 rounded-full text-xs">← Volver</button><div className="absolute bottom-3 left-4"><p className="text-red-500 font-black text-xs">{ejActual+1}/{ejercicios.length}</p><p className="font-black text-xl">{ej.nombre}</p></div></div>
        <div className="p-4 space-y-4">
          <MusculoMap musculo={ej.musculo} />
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 text-center"><p className="text-[10px] text-zinc-500 font-bold">TIEMPO EJERCICIO / DESCANSO</p><p className="text-5xl font-black mt-1">{formatTime(segundos)}</p><div className="flex gap-2 mt-4 justify-center"><button onClick={()=>setSegundos(60)} className="bg-black border border-zinc-800 px-4 py-2 rounded-xl text-xs font-bold">60s</button><button onClick={()=>setSegundos(90)} className="bg-red-600 px-4 py-2 rounded-xl text-xs font-bold">90s</button><button onClick={()=>setSegundos(120)} className="bg-black border border-zinc-800 px-4 py-2 rounded-xl text-xs font-bold">120s</button></div></div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4"><p className="text-[10px] font-bold">CONTROL DE PESO Y REPS</p><div className="grid grid-cols-2 gap-3 mt-3"><input placeholder="Peso kg" className="bg-black border border-zinc-800 rounded-xl p-3 text-center font-black" /><input placeholder="Reps" className="bg-black border border-zinc-800 rounded-xl p-3 text-center font-black" /></div></div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4"><p className="text-xs font-bold">AGREGAR EJERCICIO MANUAL + STICK FIGURE</p><div className="flex gap-2 mt-3"><input value={nuevoEj.nombre} onChange={e=>setNuevoEj({...nuevoEj,nombre:e.target.value})} placeholder="Nombre ejercicio" className="flex-1 bg-black border border-zinc-800 rounded-xl p-3 text-xs" /><select value={nuevoEj.musculo} onChange={e=>setNuevoEj({...nuevoEj,musculo:e.target.value})} className="bg-black border border-zinc-800 rounded-xl p-3 text-xs"><option>Pecho</option><option>Espalda</option><option>Piernas</option><option>Brazos</option><option>Hombros</option></select></div><button onClick={()=>{ if(nuevoEj.nombre) setEjercicios([...ejercicios,{id:Date.now(),nombre:nuevoEj.nombre,musculo:nuevoEj.musculo,imgMov:'https://media.giphy.com/media/3o7TKSjRrfIPje4awo/giphy.gif',musculoImg:nuevoEj.musculo}]) }} className="w-full bg-white text-black mt-3 py-2 rounded-xl font-black text-xs">+ GUARDAR EJERCICIO (imagen en movimiento automática)</button></div>
          <button onClick={()=>{ if(ejActual<ejercicios.length-1) setEjActual(ejActual+1); else setVista('home') }} className="w-full bg-red-600 py-4 rounded-xl font-black">{ejActual<ejercicios.length-1?'SIGUIENTE EJERCICIO →':'FINALIZAR'}</button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white pb-28">
      <div className="flex justify-between items-center px-4 pt-5"><img src="/logo.png" className="w-16 h-16 object-contain bg-white rounded-xl p-1" /><div className="text-right"><p className="font-black tracking-widest text-sm">FORZA GYM PRO</p><p className="text-[10px] text-red-500 font-bold">{esPro?'PRO ACTIVO 🟢':'GRATIS'}</p></div></div>

      {!esPro && (
        <div className="mx-4 mt-4 bg-gradient-to-r from-zinc-900 to-zinc-800 border border-zinc-700 rounded-2xl p-4 flex justify-between items-center">
          <div><p className="font-black text-sm">PASATE A PRO</p><p className="text-[11px] text-zinc-400">Rutinas ilimitadas + tienda + seguimiento</p></div>
          <button onClick={()=>setEsPro(true)} className="bg-red-600 px-5 py-2 rounded-xl font-black text-xs">PRO $8900/mes</button>
        </div>
      )}

      <div className="mx-4 mt-4 bg-red-600 rounded-2xl p-4 flex gap-3 items-center animate-pulse">
        <span className="text-xl">🔔</span>
        <div><p className="font-black text-sm">¡HOY TE TOCA ENTRENAR!</p><p className="font-black text-sm">PECHO + TRÍCEPS ⚡</p><p className="text-[10px] opacity-80">Alarma: 18:00 hs - No faltes</p></div>
      </div>

      <div className="mx-4 mt-6">
        <h2 className="font-black text-xs tracking-widest">\ TU RUTINA DE HOY /</h2>
        <div className="mt-3 bg-zinc-900 border border-red-600/40 rounded-2xl p-4 flex justify-between items-center">
          <div><p className="font-bold text-sm">{ejercicios[0].nombre}</p><p className="text-xs text-zinc-400">{ejercicios.length} ejercicios • Stick figure + músculo marcado</p></div>
          <button onClick={()=>setVista('rutina')} className="bg-red-600 px-5 py-2 rounded-xl font-black text-xs">INICIAR</button>
        </div>
      </div>

      <div className="mx-4 mt-6">
        <div className="flex justify-between"><h2 className="font-black text-xs">TIENDA (GRATIS Y PRO LA VEN)</h2><button onClick={()=>setVista('tienda')} className="text-red-500 text-[11px]">Ver todo {'>'}</button></div>
        <p className="text-[10px] text-zinc-500 mt-1">Dietas • Suplementos • Indumentaria - Botón activar/desactivar por stock + alias socio</p>
      </div>

      <div className="mx-4 mt-6 bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
        <p className="font-bold text-xs">SUBIR FOTO / VIDEO PROGRESO (insta)</p>
        <div className="flex gap-2 mt-3"><input placeholder="Link Instagram / video" className="flex-1 bg-black border border-zinc-800 rounded-xl p-3 text-xs" /><button className="bg-white text-black px-4 py-2 rounded-xl font-black text-xs">SUBIR</button></div>
        <p className="text-[10px] text-zinc-500 mt-2">Las fotos que suben los usuarios las ves vos en ADMIN para ver cambios físicos.</p>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 flex justify-around py-3 text-[10px]">
        <button onClick={()=>setVista('home')} className="text-red-500 font-bold text-center">🏠<br/>Inicio</button>
        <button onClick={()=>setVista('rutina')} className="text-zinc-500 text-center">🏋️<br/>Rutinas</button>
        <button onClick={()=>setVista('tienda')} className="text-zinc-500 text-center">🛍️<br/>Tienda</button>
        <button onClick={()=>setVista('perfil')} className="text-zinc-500 text-center">👤<br/>Perfil</button>
        <button onClick={()=>setVista('admin')} className="text-zinc-500 text-center">⚙️<br/>Admin</button>
      </div>
    </div>
  )
}
