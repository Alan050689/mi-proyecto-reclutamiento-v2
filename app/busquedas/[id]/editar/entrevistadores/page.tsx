'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { busquedasBase } from '@/data/busquedas';

export default function EditarEntrevistadoresPage() {
  const { id } = useParams();
  const busquedaId = id as string;

  const [busqueda, setBusqueda] = useState(() =>
    busquedasBase.find((b) => b.id === busquedaId)
  );

  const [entrevistadores, setEntrevistadores] = useState<string[]>(busqueda?.entrevistadores || []);
  const [nuevo, setNuevo] = useState('');

  const storageKey = `busqueda-${busquedaId}-entrevistadores`;

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setEntrevistadores(JSON.parse(saved));
    }
  }, [storageKey]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(entrevistadores));
  }, [entrevistadores, storageKey]);

  const agregar = () => {
    if (nuevo.trim() && !entrevistadores.includes(nuevo.trim())) {
      setEntrevistadores((prev) => [...prev, nuevo.trim()]);
      setNuevo('');
    }
  };

  const eliminar = (nombre: string) => {
    setEntrevistadores((prev) => prev.filter((e) => e !== nombre));
  };

  if (!busqueda) {
    return <main className="p-8 text-red-600">Búsqueda no encontrada</main>;
  }

  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Editar entrevistadores - {busqueda.nombre}
      </h1>

      <div className="mb-6">
        <input
          type="text"
          value={nuevo}
          onChange={(e) => setNuevo(e.target.value)}
          placeholder="Nuevo entrevistador"
          className="border p-2 rounded w-full mb-2"
        />
        <button
          onClick={agregar}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Agregar entrevistador
        </button>
      </div>

      <ul className="space-y-3">
        {entrevistadores.map((e) => (
          <li key={e} className="flex justify-between items-center border p-2 rounded">
            <span>{e}</span>
            <button
              onClick={() => eliminar(e)}
              className="text-red-600 hover:underline"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}

