export default function App(){
  return (
    <div style={{background:'black', minHeight:'100vh', color:'white', fontFamily:'sans-serif'}}>
      <div style={{padding:'16px', fontWeight:900, fontSize:'12px'}}>FORZA GYM PRO</div>
      
      <div style={{margin:'0 12px', borderRadius:'24px', overflow:'hidden', background:'#18181b'}}>
        {/* VIDEO - probamos los dos nombres posibles */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          style={{width:'100%', aspectRatio:'4/3', objectFit:'cover', display:'block'}}
          poster="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800"
        >
          <source src="./forza.mp4" type="video/mp4" />
          <source src="./VID 20250614-WA5735.mp4" type="video/mp4" />
          <source src="/forza.mp4" type="video/mp4" />
          <source src="../forza.mp4" type="video/mp4" />
        </video>

        <div style={{padding:'16px', background:'black'}}>
          <h1 style={{fontWeight:900, margin:0}}>PRESS INCLINADO CON BARRA</h1>
          <p style={{fontSize:'12px', opacity:0.7, margin:'8px 0'}}>Si ves esto, ya no está en gris</p>
          <span style={{background:'#dc2626', padding:'6px 12px', borderRadius:'999px', fontSize:'12px', fontWeight:900}}>PECHO 🔴</span>
        </div>
      </div>
    </div>
  )
}
