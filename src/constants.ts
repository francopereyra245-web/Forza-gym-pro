import type { Ejercicio, GrupoMuscular, Rutina } from './types';

export const DIAS_SEMANA: { key: string; label: string }[] = [
  { key: 'Lun', label: 'Lun' },
  { key: 'Mar', label: 'Mar' },
  { key: 'Mie', label: 'Mie' },
  { key: 'Jue', label: 'Jue' },
  { key: 'Vie', label: 'Vie' },
  { key: 'Sab', label: 'Sab' },
  { key: 'Dom', label: 'Dom' },
];

export const NIVELES_DIFICULTAD = ['Principiante', 'Intermedio', 'Avanzado'] as const;

export const GRUPOS_MUSCULARES: GrupoMuscular[] = [
  'Pecho',
  'Espalda',
  'Piernas',
  'Hombros',
  'Brazos',
  'Core',
  'Full Body',
];

export const EJERCICIOS_PREDETERMINADOS: Ejercicio[] = [
  {
    id: 'ex-1',
    nombre: 'Sentadilla con barra',
    grupoMuscular: 'Piernas',
    imagen: 'https://images.pexels.com/photos/1552249/pexels-photo-1552249.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    series: 4,
    reps: '8-10',
  },
  {
    id: 'ex-2',
    nombre: 'Press de banca',
    grupoMuscular: 'Pecho',
    imagen: 'https://images.pexels.com/photos/4720794/pexels-photo-4720794.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    series: 4,
    reps: '8-12',
  },
  {
    id: 'ex-3',
    nombre: 'Curl de bíceps con mancuerna',
    grupoMuscular: 'Brazos',
    imagen: 'https://images.pexels.com/photos/5327483/pexels-photo-5327483.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    series: 3,
    reps: '10-15',
  },
  {
    id: 'ex-4',
    nombre: 'Peso muerto',
    grupoMuscular: 'Espalda',
    imagen: 'https://images.pexels.com/photos/4720790/pexels-photo-4720790.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    series: 4,
    reps: '6-8',
  },
  {
    id: 'ex-5',
    nombre: 'Flexiones (planchas)',
    grupoMuscular: 'Core',
    imagen: 'https://images.pexels.com/photos/176782/pexels-photo-176782.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    series: 3,
    reps: '12-20',
  },
  {
    id: 'ex-6',
    nombre: 'Press de hombros con mancuerna',
    grupoMuscular: 'Hombros',
    imagen: 'https://images.pexels.com/photos/5327466/pexels-photo-5327466.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    series: 3,
    reps: '10-12',
  },
];

export const RUTINAS_PREDETERMINADAS: Rutina[] = [
  {
    id: 'rutina-1',
    nombre: 'Full Body',
    nivelAcceso: 'Gratis',
    nivelDificultad: 'Intermedio',
    dias: ['Lun', 'Mie', 'Vie'],
    ejercicios: EJERCICIOS_PREDETERMINADOS.slice(0, 6),
    creadaEn: '2026-09-01T10:00:00.000Z',
  },
  {
    id: 'rutina-2',
    nombre: 'Pecho y Brazos',
    nivelAcceso: 'Pro',
    nivelDificultad: 'Avanzado',
    dias: ['Mar', 'Jue'],
    ejercicios: [EJERCICIOS_PREDETERMINADOS[1], EJERCICIOS_PREDETERMINADOS[2], EJERCICIOS_PREDETERMINADOS[5]],
    creadaEn: '2026-09-01T10:00:00.000Z',
  },
  {
    id: 'rutina-3',
    nombre: 'Piernas Express',
    nivelAcceso: 'Gratis',
    nivelDificultad: 'Principiante',
    dias: ['Sab'],
    ejercicios: [EJERCICIOS_PREDETERMINADOS[0], EJERCICIOS_PREDETERMINADOS[3]],
    creadaEn: '2026-09-01T10:00:00.000Z',
  },
];

export const MESES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

export const DIAS_SEMANA_FULL = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];
