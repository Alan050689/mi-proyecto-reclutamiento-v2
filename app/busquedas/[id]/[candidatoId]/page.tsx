'use client';

import { useParams, useRouter } from 'next/navigation';
import { busquedasBase } from '@/data/busquedas';
import { useState, useEffect } from 'react';

export default function EvaluarCandidatoPorBusqueda() {
  const { id, candidatoId } = useParams() as { id: string; candidatoId: string };
  const router = useRouter();

  const busqueda = busquedasBase.find((b) => b.id === id);
  const candidato = busqueda?.candidatos?.find((c) => c.id === candidatoId) ?? null;

  const [entrevistador, setEntrevistador] = useState('Alan');
  const [puntajes, setPuntajes] = useState<{ [key: string]: number }>({});

  const storageKey = `evaluacion-${id}-${candidatoId}-${entrevistador}`;

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    setPuntajes(saved ? JSON.parse(saved) : {});
  }, [storageKey]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(puntajes));
  }, [puntajes, storageKey]);

  if (!busqueda || !candidato) {
    return (
      <main className="p-8 max-w-xl mx-auto">
        <span style={{ color: 'red' }}>Candidato no encontrado</span>
        <button
          onClick={() => router.back()}
          className="ml-4 underline text-blue-600"
        >
          Volver
        </button>
      </main>
    );
  }

  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Evaluación - {candidato.nombre}</h1>
      {/* Acá tu lógica de evaluación */}
    </main>
  );
}
