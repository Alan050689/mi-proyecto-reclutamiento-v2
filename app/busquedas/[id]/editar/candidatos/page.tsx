'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { busquedasBase } from '@/data/busquedas';
import { Candidato } from '@/data/candidatos';

export default function EditarCandidatosPage() {
  const { id } = useParams();
  const busquedaId = id as string;

  const [busqueda, setBusqueda] = useState(() =>
    busquedasBase.find((b) => b.id === busquedaId)
  );

  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const [nuevoNombre, setNuevoNombre] = useState('');

  const storageKey = `busqueda-${busquedaId}-candidatos`;

  // Cargar candidatos al cargar la búsqueda o si cambia
  useEffect(() => {
    if (busqueda) {
      setCandidatos(busqueda.candidatos || []);
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setCandidatos(JSON.parse(saved));
      }
    }
  }, [busqueda, storageKey]);

  // Sincronizar en localStorage ante cambios
  useEffect(() => {
    if (busqueda) {
      localStorage.setItem(storageKey, JSON.stringify(candidatos));
    }
  }, [candidatos, storageKey, busqueda]);

  const agregarCandidato = () => {
    if (!nuevoNombre.trim()) return;
    // Validar duplicados
    if (candidatos.some(c => c.nombre.toLowerCase() === nuevoNombre.trim().toLowerCase())) return;
    const nuevo: Candidato = {
      id: Date.now().toString(),
      nombre: nuevoNombre.trim(),
    };
    setCandidatos((prev) => [...prev, nuevo]);
    setNuevoNombre('');
  };

  const eliminarCandidato = (id: string) => {
    setCandidatos((prev) => prev.filter((c) => c.id !== id));
  };

  if (!busqueda) {
    return <main className="p-8 text-red-600">Búsqueda no encontrada</main>;
  }

  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Editar candidatos - {busqueda.nombre}</h1>

      <div className="mb-6">
        <input
          type="text"
          value={nuevoNombre}
          onChange={(e) => setNuevoNombre(e.target.value)}
          placeholder="Nombre del candidato"
          className="border p-2 rounded w-full mb-2"
        />
        <button
          onClick={agregarCandidato}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Agregar candidato
        </button>
      </div>

      <ul className="space-y-3">
        {candidatos.map((c) => (
          <li
            key={c.id}
            className="flex justify-between items-center border p-2 rounded"
          >
            <span>{c.nombre}</span>
            <button
              onClick={() => eliminarCandidato(c.id)}
              className="text-red-600 hover:underline"
            >
              Eliminar
            </button>
          </li>
        ))}
        {candidatos.length === 0 && (
          <li className="text-gray-400">No hay candidatos cargados.</li>
        )}
      </ul>
    </main>
  );
}

