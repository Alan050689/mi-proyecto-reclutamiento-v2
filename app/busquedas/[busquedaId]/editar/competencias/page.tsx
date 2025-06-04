'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { busquedasBase } from '@/data/busquedas';

type Competencia = {
  id: string;
  nombre: string;
  peso: number;
};

export default function EditarCompetenciasPage() {
  const { busquedaId } = useParams() as { busquedaId: string };
  const [competencias, setCompetencias] = useState<Competencia[]>([]);
  const [nombre, setNombre] = useState('');
  const [peso, setPeso] = useState(1);

  useEffect(() => {
    const busqueda = busquedasBase.find((b) => b.id === busquedaId);
    if (busqueda) {
      setCompetencias(busqueda.competencias);
    }
  }, [busquedaId]);

  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Editar competencias - Búsqueda: {busquedaId}</h1>
      <ul>
        {competencias.map((c) => (
          <li key={c.id}>{c.nombre} (Peso: {c.peso})</li>
        ))}
      </ul>
    </main>
  );
}
