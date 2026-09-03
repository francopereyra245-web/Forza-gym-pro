import { useState, useEffect, useCallback } from 'react';
import type {
  AppData,
  Rutina,
  SesionEntrenamiento,
  RegistroPeso,
  FotoProgreso,
} from '../types';
import { RUTINAS_PREDETERMINADAS } from '../constants';

const STORAGE_KEY = 'forza-gym-pro-data';

const defaultData: AppData = {
  rutinas: RUTINAS_PREDETERMINADAS,
  sesiones: [],
  registrosPeso: [],
  fotosProgreso: [],
  esPro: false,
  ultimoEntreno: null,
};

function loadData(): AppData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultData;
    const parsed = JSON.parse(raw) as AppData;
    return {
      ...defaultData,
      ...parsed,
      rutinas: parsed.rutinas?.length ? parsed.rutinas : defaultData.rutinas,
    };
  } catch {
    return defaultData;
  }
}

export function useAppData() {
  const [data, setData] = useState<AppData>(loadData);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const addRutina = useCallback((rutina: Rutina) => {
    setData((d) => ({ ...d, rutinas: [...d.rutinas, rutina] }));
  }, []);

  const deleteRutina = useCallback((id: string) => {
    setData((d) => ({ ...d, rutinas: d.rutinas.filter((r) => r.id !== id) }));
  }, []);

  const addSesion = useCallback((sesion: SesionEntrenamiento) => {
    setData((d) => ({
      ...d,
      sesiones: [...d.sesiones, sesion],
      ultimoEntreno: sesion.fecha,
    }));
  }, []);

  const addRegistroPeso = useCallback((registro: RegistroPeso) => {
    setData((d) => ({ ...d, registrosPeso: [...d.registrosPeso, registro] }));
  }, []);

  const addFotoProgreso = useCallback((foto: FotoProgreso) => {
    setData((d) => ({ ...d, fotosProgreso: [...d.fotosProgreso, foto] }));
  }, []);

  const deleteFotoProgreso = useCallback((id: string) => {
    setData((d) => ({ ...d, fotosProgreso: d.fotosProgreso.filter((f) => f.id !== id) }));
  }, []);

  const setEsPro = useCallback((esPro: boolean) => {
    setData((d) => ({ ...d, esPro }));
  }, []);

  return {
    data,
    addRutina,
    deleteRutina,
    addSesion,
    addRegistroPeso,
    addFotoProgreso,
    deleteFotoProgreso,
    setEsPro,
  };
}
