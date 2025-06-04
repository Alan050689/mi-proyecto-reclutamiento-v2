'use client';

import { useParams, useRouter } from 'next/navigation';
import { busquedasBase } from '@/data/busquedas';
import { useState, useEffect } from 'react';

export default function EvaluarCandidatoPorBusqueda() {
  const { id, candidatoId } = useParams();
  const router = useRouter();

  const busqueda = busquedasBase.find((b) => b.id === id);

  // Buscar candidato en la búsqueda base
  let candidato = busqueda?.candidatos?.find((c) => c.id === candidatoId) ?? null;

  // Intentar también buscar en localStorage (por si hay cambios)
  useEffect(() => {
    if (!candidato && typeof window !== "undefined") {
      const guardados = JSON.parse(localStorage.getItem(`candidatos-${id}`) || '[]');
      const encontrado = guardados.find((c: any) => c.id === candidatoId);
      if (encontrado) {
        candidato = encontrado;
      }
    }
    // No se pone setState porque solo se usa para fallback visual
    // Si necesitás re-render, deberías manejar candidato en un useState y actualizar acá
  }, [id, candidatoId, candidato]);

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

  // Si no hay búsqueda o candidato, mostrar mensaje de error y botón de volver
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

  // ...seguí el render como antes (formularios, evaluación, etc.)
  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Evaluación - {candidato.nombre}</h1>
      {/* Acá tu lógica de evaluación */}
      {/* Por ejemplo: mostrar competencias, inputs, etc. */}
      {/* ... */}
    </main>
  );
}
