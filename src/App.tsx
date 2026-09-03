import { useState } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import RutinasTab from './screens/RutinasTab';
import EntrenarTab from './screens/EntrenarTab';
import ProgresoTab from './screens/ProgresoTab';
import PlanesTab from './screens/PlanesTab';
import { useAppData } from './hooks/useAppData';
import type { TabActiva, DiaSemana, Rutina } from './types';

function getRutinaHoy(rutinas: Rutina[]): Rutina | null {
  const hoy = new Date().getDay();
  const diaMap: Record<number, DiaSemana> = {
    0: 'Dom', 1: 'Lun', 2: 'Mar', 3: 'Mie', 4: 'Jue', 5: 'Vie', 6: 'Sab',
  };
  const hoyLabel = diaMap[hoy];
  return rutinas.find((r) => r.dias.includes(hoyLabel))?? rutinas[0]?? null;
}

function App() {
  const [tabActiva, setTabActiva] = useState<TabActiva>('rutinas');
  const [loggedOut, setLoggedOut] = useState(false);
  const {
    data, addRutina, deleteRutina, addSesion, addRegistroPeso, addFotoProgreso, deleteFotoProgreso, setEsPro,
  } = useAppData();

  if (loggedOut) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center px-6 text-center">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center mb-4">
          <span className="text-3xl font-black text-black">F</span>
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight">FORZA</h1>
        <p className="text-sm font-bold text-yellow-400 uppercase tracking-[0.25em] mt-0.5">Gym Pro</p>
        <p className="text-sm text-gray-500 mt-6 max-w-xs">Cerraste sesión. Volvé cuando estés listo para entrenar.</p>
        <button
          onClick={() => setLoggedOut(false)}
          className="mt-6 px-8 py-3.5 rounded-2xl bg-yellow-400 text-black font-bold text-sm hover:bg-yellow-300 active:scale-95 transition"
        >
          Volver a entrar
        </button>
      </div>
    );
  }

  const rutinaHoy = getRutinaHoy(data.rutinas);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Header esPro={data.esPro} onLogout={() => setLoggedOut(true)} onProClick={() => setTabActiva('planes')} />
      <main className="max-w-md mx-auto pb-20 min-h-screen">
        {tabActiva === 'rutinas' && (
          <RutinasTab
            rutinas={data.rutinas}
            onAddRutina={addRutina}
            onDeleteRutina={deleteRutina}
            esPro={data.esPro}
          />
        )}
        {tabActiva === 'entrenar' && (
          <EntrenarTab
            rutinaHoy={rutinaHoy}
            onAddSesion={addSesion}
          />
        )}
        {tabActiva === 'progreso' && (
          <ProgresoTab
            registrosPeso={data.registrosPeso}
            fotosProgreso={data.fotosProgreso}
            onAddPeso={addRegistroPeso}
            onAddFoto={addFotoProgreso}
            onDeleteFoto={deleteFotoProgreso}
          />
        )}
        {tabActiva === 'planes' && (
          <PlanesTab esPro={data.esPro} setEsPro={setEsPro} />
        )}
      </main>
      <BottomNav tabActiva={tabActiva} setTabActiva={setTabActiva} />
    </div>
  );
}

export default App;
