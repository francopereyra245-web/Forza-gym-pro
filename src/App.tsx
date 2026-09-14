import { useState, useEffect } from 'react'

const ROJO = '#E10600'
const NEGRO = '#0A0A0A'

const getM = (n: string) => {
  const x = n.toLowerCase()
  if (x.includes('pecho') || x.includes('press') || x.includes('banca')) return 'PECHO'
  if (x.includes('espalda') || x.includes('remo') || x.includes('dorsal')) return 'ESPALDA'
  if (x.includes('hombro') || x.includes('militar') || x.includes('lateral')) return 'HOMBROS'
  if (x.includes('bicep')) return 'BICEPS'
  if (x.includes('tricep')) return 'TRICEPS'
  if (x.includes('pierna') || x.includes('sentadilla') || x.includes('cuad')) return 'PIERNAS'
  if (x.includes('femoral') || x.includes('muerto')) return 'FEMORAL'
  if (x.includes('abdomen') || x.includes('abdo')) return 'ABDOMEN'
  return 'FORZA'
}

type Eje = { nombre: string; peso?: string; reps?: string }
type Rut = { id: number; nombre: string; dia: string; ejercicios: Eje[] }
type Prod = { id: number; nombre: string; tipo: string; precio: string; alias: string; activo: boolean; stock: boolean }
type Cli = { id: number; nombre: string; peso: string; talla: string; activo: boolean; ingreso: string; tAct: string; tInac: string; pro: boolean; hasta: string; debito: boolean }

export default function App() {
  const [tab, setTab] = useState('rutinas')
  const [rutinas, setRutinas] = useState<Rut[]>(() => {
    try { const s = localStorage.getItem('fz_r'); return s? JSON.parse(s) : [{ id: 1, nombre: 'LUNES PECHO', dia: 'Lun', ejercicios: [{ nombre: 'Press Banca', peso: '80', reps: '12' }] }] } catch { return [] }
  })
  const [tienda, setTienda] = useState<Prod[]>(() => {
    try { const s = localStorage.getItem('fz_t'); return s? JSON.parse(s) : [
      { id: 1, nombre: 'Dieta Volumen 3000kcal', tipo: 'dieta', precio: '5000', alias: 'forza.mp', activo: true, stock: true },
      { id: 2, nombre: 'Whey Protein Socio', tipo: 'suplemento', precio: '25000', alias: 'socio.suplementos.mp', activo: true, stock: false },
      { id: 3, nombre: 'Remera FORZA', tipo: 'indumentaria', precio: '12000', alias: 'forza.mp', activo: true, stock: true },
    ] } catch { return [] }
  })
  const [clientes, setClientes] = useState<Cli[]>(() => {
    try { const s = localStorage.getItem('fz_c'); return s? JSON.parse(s) : [{ id: 1, nombre: 'Juan Perez', peso: '80kg', talla: 'M', activo: true, ingreso: '14/09/2026', tAct: '4 dias', tInac: '0 dias', pro: true, hasta: '30/09/2026', debito: true }] } catch { return [] }
  })
  const [precioPro, setPrecioPro] = useState(() => localStorage.getItem('fz_pp') || '4990')
  const [aliasMP, setAliasMP] = useState(() => localStorage.getItem('fz_alias') || 'forza.mp')
  const [showTyC, setShowTyC] = useState(false)

  const [nR, setNR] = useState(''); const [nE, setNE] = useState(''); const [nD, setND] = useState('Lun')
  const [nProd, setNProd] = useState(''); const [nTipo, setNTipo] = useState('suplemento')

  useEffect(() => { localStorage.setItem('fz_r', JSON.stringify(rutinas)) }, [rutinas])
  useEffect(() => { localStorage.setItem('fz_t', JSON.stringify(tienda)) }, [tienda])
  useEffect(() => { localStorage.setItem('fz_c', JSON.stringify(clientes)) }, [clientes])
  useEffect(() => { localStorage.setItem('fz_pp', precioPro); localStorage.setItem('fz_alias', aliasMP) }, [precioPro, aliasMP])

  const addRutina = () => {
    if (!nR ||!nE) return
    setRutinas([...rutinas, { id: Date.now(), nombre: nR.toUpperCase(), dia: nD, ejercicios: [{ nombre: nE, peso: '80', reps: '12' }] }])
    setNR(''); setNE('')
  }

  return (
    <div style={{ background: NEGRO, minHeight: '100vh', color: 'white', maxWidth: 440, margin: '0 auto', paddingBottom: 90, fontFamily: 'system-ui, sans-serif' }}>
      {/* HEADER */}
      <div style={{ padding: 12, background: '#000', borderBottom: `2px solid ${ROJO}`, display: 'flex', alignItems: 'center', gap: 10, position: 'sticky', top: 0, zIndex: 20 }}>
        <div style={{ width: 36, height: 36, background: ROJO, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 18 }}>⚡</div>
        <div><div style={{ fontWeight: 900, letterSpacing: 0.5 }}>FORZA <span style={{ color: ROJO }}>GYM PRO</span></div><div style={{ fontSize: 8, opacity: 0.5 }}>WILDE • ADMIN</div></div>
        <div style={{ marginLeft: 'auto', fontSize: 8, background: ROJO, padding: '6px 10px', borderRadius: 20, fontWeight: 900 }}>MP {aliasMP}</div>
      </div>

      {tab === 'rutinas' && (
        <div style={{ padding: 12 }}>
          <div style={{ background: `linear-gradient(90deg, ${ROJO}, #600)`, padding: 14, borderRadius: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div><div style={{ fontSize: 9, opacity: 0.9 }}>🔔 HOY TE TOCA</div><div style={{ fontWeight: 900, fontSize: 18 }}>{rutinas[0]?.nombre || 'LUNES PECHO'} • {rutinas[0]?.dia}</div><div style={{ fontSize: 9, opacity: 0.7, marginTop: 4 }}>Alarma activa + 60s descanso</div></div>
            <button onClick={() => { if (Notification.permission!== 'granted') Notification.requestPermission(); else new Notification(`FORZA: Hoy toca ${rutinas[0]?.nombre}`) }} style={{ background: 'white', color: 'black', border: 'none', padding: '10px 16px', borderRadius: 20, fontWeight: 900, fontSize: 11 }}>ALARMA</button>
          </div>

          <div style={{ marginTop: 12, background: '#111', padding: 12, borderRadius: 14, border: '1px solid #222' }}>
            <div style={{ fontSize: 11, fontWeight: 900 }}>NUEVA RUTINA • MANUAL + IMAGEN PRO AUTO</div>
            <input value={nR} onChange={e => setNR(e.target.value)} placeholder="Nombre: LUNES PECHO" style={{ width: '100%', marginTop: 8, background: '#000', border: '1px solid #333', color: 'white', padding: 11, borderRadius: 10, fontSize: 12 }} />
            <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
              <input value={nE} onChange={e => setNE(e.target.value)} placeholder="Ejercicio: Press Banca" style={{ flex: 1, background: '#000', border: '1px solid #333', color: 'white', padding: 11, borderRadius: 10, fontSize: 12 }} />
              <select value={nD} onChange={e => setND(e.target.value)} style={{ background: '#000', border: '1px solid #333', color: 'white', borderRadius: 10, fontSize: 11, padding: '0 8px' }}><option>Lun</option><option>Mar</option><option>Mie</option><option>Jue</option><option>Vie</option><option>Sab</option><option>Dom</option></select>
              <button onClick={addRutina} style={{ background: ROJO, border: 'none', color: 'white', padding: '0 18px', borderRadius: 10, fontWeight: 900, fontSize: 18 }}>+</button>
            </div>
          </div>

          {rutinas.map(r => (
            <div key={r.id} style={{ marginTop: 12, background: '#0f0f0f', borderRadius: 18, border: '1px solid #1e1e1e', overflow: 'hidden' }}>
              <div style={{ padding: 12, display: 'flex', justifyContent: 'space-between' }}><b style={{ fontSize: 12 }}>{r.nombre} • {r.dia}</b><button onClick={() => setRutinas(rutinas.filter(x => x.id!== r.id))} style={{ background: 'none', border: 'none', color: '#666', fontSize: 10 }}>Borrar / Editar</button></div>
              {r.ejercicios.map((ej, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, padding: 12, borderTop: '1px solid #151515', background: '#0a0a0a', alignItems: 'center' }}>
                  <div style={{ width: 96, height: 96, background: `linear-gradient(135deg, ${ROJO}, #300)`, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 11, textAlign: 'center' }}>{getM(ej.nombre)}</div>
                  <div style={{ flex: 1 }}><div style={{ fontWeight: 900, fontSize: 13 }}>{ej.nombre.toUpperCase()}</div><div style={{ fontSize: 10, color: ROJO, fontWeight: 900, marginTop: 4 }}>● {getM(ej.nombre)} • MUSCULO COMPROMETIDO</div><div style={{ display: 'flex', gap: 6, marginTop: 8 }}><input defaultValue={ej.peso} placeholder="80kg" style={{ width: 54, background: '#000', border: '1px solid #222', color: 'white', padding: 6, borderRadius: 8, fontSize: 11 }} /><input defaultValue={ej.reps} placeholder="12 reps" style={{ width: 54, background: '#000', border: '1px solid #222', color: 'white', padding: 6, borderRadius: 8, fontSize: 11 }} /><div style={{ background: '#1a1a1a', padding: '6px 10px', borderRadius: 8, fontSize: 10 }}>⏱ 60s</div></div></div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {tab === 'tienda' && (
        <div style={{ padding: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><b style={{ fontSize: 12 }}>TIENDA • GRATIS Y PRO LA VEN</b></div>
          <div style={{ marginTop: 10, background: '#111', padding: 10, borderRadius: 12, border: '1px solid #222', display: 'flex', gap: 6 }}>
            <input value={nProd} onChange={e => setNProd(e.target.value)} placeholder="Nombre producto" style={{ flex: 1, background: '#000', border: '1px solid #333', color: 'white', padding: 8, borderRadius: 8, fontSize: 11 }} />
            <select value={nTipo} onChange={e => setNTipo(e.target.value)} style={{ background: '#000', border: '1px solid #333', color: 'white', borderRadius: 8, fontSize: 10 }}><option value="dieta">dieta</option><option value="suplemento">suplemento</option><option value="indumentaria">indumentaria</option><option value="elemento">elemento</option></select>
            <button onClick={() => { if (!nProd) return; const alias = prompt('Alias MP (forza.mp o socio)', aliasMP) || aliasMP; const precio = prompt('Precio', '5000') || '5000'; setTienda([...tienda, { id: Date.now(), nombre: nProd, tipo: nTipo, precio, alias, activo: true, stock: true }]); setNProd('') }} style={{ background: ROJO, border: 'none', color: 'white', padding: '0 12px', borderRadius: 8, fontWeight: 900, fontSize: 16 }}>+</button>
          </div>
          {tienda.map(p => (
            <div key={p.id} style={{ marginTop: 10, background: '#121212', padding: 12, borderRadius: 14, border: '1px solid #222', opacity: p.activo? 1 : 0.4 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}><div style={{ width: 42, height: 42, background: '#000', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>📦</div><div style={{ flex: 1 }}><div style={{ fontWeight: 800, fontSize: 12 }}>{p.nombre} <span style={{ fontSize: 8, background: '#222', padding: '2px 6px', borderRadius: 10 }}>{p.tipo}</span></div><div style={{ fontSize: 10, color: ROJO }}>${p.precio} • MP: {p.alias} • {p.stock? 'CON STOCK' : 'SIN STOCK'}</div></div><button onClick={() => setTienda(tienda.map(x => x.id === p.id? {...x, activo:!x.activo, stock:!x.stock } : x))} style={{ background: p.activo? ROJO : '#333', border: 'none', color: 'white', padding: '6px 12px', borderRadius: 20, fontSize: 10, fontWeight: 900 }}>{p.activo? 'ACTIVO' : 'OFF'}</button></div>
              <div style={{ display: 'flex', gap: 8, marginTop: 6 }}><button onClick={() => setTienda(tienda.filter(x => x.id!== p.id))} style={{ fontSize: 9, background: 'none', border: 'none', color: '#555' }}>Eliminar</button><span style={{ fontSize: 9, opacity: 0.3 }}>Editable • Foto/Video opcional</span></div>
            </div>
          ))}
        </div>
      )}

      {tab === 'admin' && (
        <div style={{ padding: 12 }}>
          <b>ADMIN FORZA</b>
          <div style={{ marginTop: 10, background: '#121212', padding: 12, borderRadius: 12, border: '1px solid #222' }}>
            <div style={{ fontSize: 10 }}>ALIAS MERCADO PAGO</div><input value={aliasMP} onChange={e => setAliasMP(e.target.value)} style={{ width: '100%', marginTop: 4, background: '#000', border: '1px solid #333', color: 'white', padding: 8, borderRadius: 8 }} />
            <div style={{ fontSize: 10, marginTop: 8 }}>PRECIO PRO</div><input value={precioPro} onChange={e => setPrecioPro(e.target.value)} style={{ width: '100%', marginTop: 4, background: '#000', border: '1px solid #333', color: 'white', padding: 8, borderRadius: 8 }} />
            <div style={{ fontSize: 9, opacity: 0.5, marginTop: 6 }}>Pagos directos a tu alias • Débito auto ON • Das/sacas PRO manual</div>
          </div>
          {clientes.map(c => (
            <div key={c.id} style={{ marginTop: 10, background: '#101010', padding: 12, borderRadius: 12, borderLeft: `4px solid ${c.activo? ROJO : '#333'}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><b style={{ fontSize: 12 }}>{c.nombre} {c.pro? '👑 PRO' : ''} <span style={{ fontSize: 8, background: c.activo? ROJO : '#333', padding: '2px 6px', borderRadius: 10 }}>{c.activo? '● ACTIVO' : '○ INACTIVO'}</span></b><button onClick={() => setClientes(clientes.map(x => x.id === c.id? {...x, activo:!x.activo } : x))} style={{ fontSize: 9, background: '#000', border: '1px solid #333', color: 'white', padding: '4px 8px', borderRadius: 8 }}>Cambiar luz</button></div>
              <div style={{ fontSize: 10, opacity: 0.6, marginTop: 4 }}>Ingreso: {c.ingreso} • Activo: {c.tAct} • Inactivo: {c.tInac} • {c.peso} • Talla {c.talla} • PRO hasta {c.hasta}</div>
              <div style={{ display: 'flex', gap: 6, marginTop: 6 }}><button style={{ fontSize: 9, background: ROJO, border: 'none', color: 'white', padding: '5px 10px', borderRadius: 8 }}>Ver fotos/videos progreso</button><button onClick={() => setClientes(clientes.map(x => x.id === c.id? {...x, pro:!x.pro } : x))} style={{ fontSize: 9, background: '#1a1a1a', border: '1px solid #333', color: 'white', padding: '5px 10px', borderRadius: 8 }}>{c.pro? 'Quitar PRO' : 'Dar PRO'}</button></div>
              <div style={{ fontSize: 8, color: '#f5c518', marginTop: 6 }}>⚠️ Te faltan 3 días para renovar • Aviso automático • Débito {c.debito? 'ACTIVO' : 'OFF'}</div>
            </div>
          ))}
          <button onClick={() => setShowTyC(true)} style={{ width: '100%', marginTop: 12, background: '#1a1a1a', border: '1px solid #333', color: 'white', padding: 10, borderRadius: 10, fontSize: 10 }}>Ver Términos y Condiciones</button>
        </div>
      )}

      {tab === 'planes' && (
        <div style={{ padding: 12 }}>
          <div style={{ background: '#121212', border: '1px solid #333', borderRadius: 16, padding: 14 }}><b>GRATIS $0</b><div style={{ fontSize: 11, opacity: 0.6, marginTop: 4 }}>Ve tienda, rutinas básicas, sin alarmas</div></div>
          <div style={{ marginTop: 10, background: '#1a0505', border: `2px solid ${ROJO}`, borderRadius: 16, padding: 14 }}><div style={{ background: ROJO, display: 'inline-block', fontSize: 9, padding: '3px 8px', borderRadius: 20, fontWeight: 900 }}>RECOMENDADO</div><div style={{ fontWeight: 900, marginTop: 6 }}>PRO ${precioPro} ARS / mes</div><div style={{ fontSize: 11, marginTop: 4 }}>• Todo desbloqueado • MP directo a {aliasMP} • Débito automático • Aviso "faltan X días" • Vos das/sacás PRO manual</div><button onClick={() => setShowTyC(true)} style={{ width: '100%', marginTop: 10, background: ROJO, border: 'none', color: 'white', padding: 12, borderRadius: 10, fontWeight: 900 }}>ACTIVAR PRO - PAGAR A {aliasMP}</button></div>
        </div>
      )}

      {showTyC && <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', zIndex: 50, padding: 20, overflowY: 'auto' }}><div style={{ background: '#121212', padding: 16, borderRadius: 16, border: `1px solid ${ROJO}` }}><b>TyC FORZA GYM PRO</b><div style={{ fontSize: 11, opacity: 0.7, marginTop: 10, lineHeight: 1.5 }}>1. Usuario declara nombre, apellido, peso, talla. 2. Pago PRO a {aliasMP} via MP. 3. Admin ve progreso, luces activo/inactivo, tiempos, da/quita PRO. 4. Tienda: activar/desactivar y stock por producto, alias socio, visible gratis y pro. 5. Reviews con aprobación.</div><button onClick={() => setShowTyC(false)} style={{ width: '100%', marginTop: 12, background: ROJO, border: 'none', color: 'white', padding: 12, borderRadius: 10, fontWeight: 900 }}>Acepto</button></div></div>}

      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, maxWidth: 440, margin: '0 auto', background: '#000', borderTop: '1px solid #1a1a1a', display: 'flex', justifyContent: 'space-around', padding: '10px 0' }}>
        {[{ id: 'rutinas', l: 'RUTINAS' }, { id: 'tienda', l: 'TIENDA' }, { id: 'admin', l: 'ADMIN' }, { id: 'planes', l: 'PLANES' }].map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ background: 'none', border: 'none', color: tab === t.id? ROJO : '#555', fontSize: 10, fontWeight: 900 }}>{t.l}</button>)}
      </div>
    </div>
  )
}
