import video from './forza.mp4'

export default function App(){
  return(
    <div className="min-h-screen bg-black text-white">
      <div className="p-4 flex items-center gap-2">
        <p className="font-black text-xs tracking-widest">FORZA GYM PRO</p>
      </div>

      <div className="mx-3 rounded-[2rem] overflow-hidden bg-zinc-900">
        <video
          src={video}
          autoPlay
          loop
          muted
          playsInline
          className="w-full aspect-[4/3] object-cover"
        />
        <div className="p-4 bg-black">
          <h1 className="font-black text-lg leading-none">PRESS INCLINADO CON BARRA</h1>
          <p className="text-xs mt-2 opacity-70">Barra al pecho, técnica correcta</p>
          <span className="bg-red-600 px-3 py-1 rounded-full text-xs font-black mt-3 inline-block">PECHO 🔴</span>
        </div>
      </div>
    </div>
  )
}
