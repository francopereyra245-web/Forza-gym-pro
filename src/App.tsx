import videoPress from './forza.mp4'

export default function App(){
  return (
    <div style={{background:'black', minHeight:'100vh', color:'white', fontFamily:'sans-serif'}}>
      <div style={{padding:'16px', fontWeight:900, fontSize:'12px'}}>FORZA GYM PRO</div>
      
      <div style={{margin:'0 12px', borderRadius:'24px', overflow:'hidden', background:'#18181b'}}>
        <video 
          src={videoPress}
          autoPlay 
          loop 
          muted 
          playsInline
          style={{width:'100%', aspectRatio:'4/3', objectFit:'cover', display:'block'}}
        />

        <div style={{padding:'16px', background:'black'}}>
          <h1 style={{fontWeight:900, margin:0}}>PRESS INCLINADO CON BARRA</h1>
          <p style={{fontSize:'12px', opacity:0.7, margin:'8px 0'}}>Tu video ya está en movimiento</p>
          <span style={{background:'#dc2626', padding:'6px 12px', borderRadius:'999px', fontSize:'12px', fontWeight:900}}>PECHO 🔴</span>
        </div>
      </div>
    </div>
  )
}
