'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { busquedasBase } from '@/data/busquedas';

export default function EditarEntrevistadoresPage() {
  const { id } = useParams() as { id: string };
  const [entrevistadores, setEntrevistadores] = useState<string[]>([]);

  useEffect(() => {
    const busqueda = busquedasBase.find((b) => b.id === id);
    setEntrevistadores(busqueda?.entrevistadores || []);
  }, [id]);

  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Editar entrevistadores - Búsqueda: {id}</h1>
      <ul>
        {entrevistadores.map((e) => (
          <li key={e}>{e}</li>
        ))}
      </ul>
    </main>
  );
}

