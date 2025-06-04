'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { busquedasBase } from '@/data/busquedas';

export default function EditarEntrevistadoresPage() {
  const { busquedaId } = useParams() as { busquedaId: string };
  const [entrevistadores, setEntrevistadores] = useState<string[]>([]);

  useEffect(() => {
    const busqueda = busquedasBase.find((b) => b.id === busquedaId);
    setEntrevistadores(busqueda?.entrevistadores || []);
  }, [busquedaId]);

  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Editar entrevistadores - Búsqueda: {busquedaId}</h1>
      <ul>
        {entrevistadores.map((e) => (
          <li key={e}>{e}</li>
        ))}
      </ul>
    </main>
  );
}
