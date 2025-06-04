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
  const { id } = useParams();
  const [competencias, setCompetencias] = useState<Competencia[]>([]);
  const [nombre, setNombre] = useState('');
  const [peso, setPeso] = useState(1);

  useEffect(() => {
    const busqueda = busquedasBase.find((b) => b.id === id);
    if (busqueda) {
      setCompetencias(busqueda.competencias);
    }
  }, [id]);

  const agregar = () => {
    const limpio = nombre.trim();
    if (limpio && !competencias.some((c) => c.nombre === limpio)) {
      const nueva: Competencia = {
        id: `com${Date.now()}`,
        nombre: limpio,
        peso: peso || 1,
      };
      setCompetencias((prev) => [...prev, nueva]);
      setNombre('');
      setPeso(1);
    }
  };

  const eliminar = (id: string) => {
    setCompetencias((prev) => prev.filter((c) => c.id !== id));
  };

  const cambiarPeso = (id: string, nuevoPeso: number) => {
    setCompetencias((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, peso: nuevoPeso } : c
      )
    );
  };

  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Editar competencias - Búsqueda: {id}</h1>

      <div className="flex items-end mb-4 space-x-2">
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre competencia"
          className="border p-2 rounded flex-grow"
        />
        <input
          type="number"
          value={peso}
          onChange={(e) => setPeso(Number(e.target.value))}
          placeholder="Peso"
          className="border p-2 rounded w-24"
        />
        <button
          onClick={agregar}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Agregar
        </button>
      </div>

      <ul className="space-y-4">
        {competencias.map((c) => (
          <li key={c.id} className="flex items-center justify-between border p-2 rounded">
            <span className="flex-grow">{c.nombre}</span>
            <input
              type="number"
              value={c.peso}
              onChange={(e) => cambiarPeso(c.id, Number(e.target.value))}
              className="border p-1 w-20 mx-2"
            />
            <button
              onClick={() => eliminar(c.id)}
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

