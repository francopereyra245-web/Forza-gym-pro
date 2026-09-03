export type DiaSemana = 'Lun' | 'Mar' | 'Mie' | 'Jue' | 'Vie' | 'Sab' | 'Dom';

export type NivelAcceso = 'Gratis' | 'Pro';

export type NivelDificultad = 'Principiante' | 'Intermedio' | 'Avanzado';

export type GrupoMuscular =
  | 'Pecho'
  | 'Espalda'
  | 'Piernas'
  | 'Hombros'
  | 'Brazos'
  | 'Core'
  | 'Full Body';

export interface Ejercicio {
  id: string;
  nombre: string;
  grupoMuscular: GrupoMuscular;
  imagen: string;
  series: number;
  reps: string;
}

export interface SerieCompletada {
  peso: string;
  reps: string;
}

export interface Rutina {
  id: string;
  nombre: string;
  nivelAcceso: NivelAcceso;
  nivelDificultad: NivelDificultad;
  dias: DiaSemana[];
  ejercicios: Ejercicio[];
  creadaEn: string;
}

export interface SesionEntrenamiento {
  id: string;
  rutinaId: string;
  rutinaNombre: string;
  fecha: string;
  seriesTotales: number;
  ejerciciosCompletados: number;
}

export interface RegistroPeso {
  id: string;
  fecha: string;
  peso: number;
}

export interface FotoProgreso {
  id: string;
  tipo: 'antes' | 'despues';
  fecha: string;
  imagen: string;
}

export type TabActiva = 'rutinas' | 'entrenar' | 'progreso' | 'planes';

export interface AppData {
  rutinas: Rutina[];
  sesiones: SesionEntrenamiento[];
  registrosPeso: RegistroPeso[];
  fotosProgreso: FotoProgreso[];
  esPro: boolean;
  ultimoEntreno: string | null;
}
