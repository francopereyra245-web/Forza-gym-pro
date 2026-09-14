export default function App(){
  return (
    <div style={{background:'black', minHeight:'100vh', color:'white', fontFamily:'sans-serif'}}>
      <div style={{padding:'16px', fontWeight:900, fontSize:'12px', letterSpacing:'1px'}}>
        FORZA GYM PRO
      </div>
      
      <div style={{margin:'0 12px', borderRadius:'24px', overflow:'hidden', background:'#18181b', border:'1px solid #27272a'}}>
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          poster="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800"
          style={{width:'100%', aspectRatio:'4/3', objectFit:'cover', display:'block', background:'black'}}
        >
          <source src="/forza.mp4" type="video/mp4" />
        </video>

        <div style={{padding:'16px', background:'black'}}>
          <h1 style={{fontWeight:900, margin:0, fontSize:'16px'}}>PRESS INCLINADO CON BARRA</h1>
          <p style={{fontSize:'12px', opacity:0.6, margin:'6px 0 12px 0'}}>Video en loop • Pecho</p>
          <span style={{background:'#dc2626', padding:'6px 14px', borderRadius:'999px', fontSize:'12px', fontWeight:900, display:'inline-block'}}>
            PECHO 🔴
          </span>
        </div>
      </div>
    </div>
  )
}
