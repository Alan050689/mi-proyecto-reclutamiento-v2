'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { busquedasBase } from '@/data/busquedas';
import { Candidato } from '@/data/candidatos';

export default function EditarCandidatosPage() {
  const { id } = useParams() as { id: string };
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);

  useEffect(() => {
    const busqueda = busquedasBase.find((b) => b.id === id);
    setCandidatos(busqueda?.candidatos || []);
  }, [id]);

  // Render básico para validar estructura
  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Editar candidatos - Búsqueda: {id}</h1>
      <ul>
        {candidatos.map((c) => (
          <li key={c.id}>{c.nombre}</li>
        ))}
      </ul>
    </main>
  );
}


