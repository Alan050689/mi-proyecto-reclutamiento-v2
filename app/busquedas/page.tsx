'use client';

import { useState, useEffect } from 'react';
import { busquedasBase } from '../../data/busquedas';
import { usuarios } from '../../data/usuarios';
import Link from 'next/link';

// Función helper para traducir IDs a nombres
const getNombresEntrevistadores = (ids: string[]) =>
  ids
    .map(id => usuarios.find(u => u.id === id)?.nombre)
    .filter(Boolean)
    .join(', ');

export default function BusquedasPage() {
  const [usuarioId, setUsuarioId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Solo en el cliente:
    const stored = localStorage.getItem("usuarioId") || "u1";
    setUsuarioId(stored);
  }, []);

  // No renderices nada sensible a usuario hasta estar montado
  if (!mounted || !usuarioId) return null; // o un loader

  const usuarioActual = usuarios.find(u => u.id === usuarioId);

  // Filtro según rol
  const busquedasVisibles = usuarioActual?.rol === "admin"
    ? busquedasBase
    : busquedasBase.filter(b => b.entrevistadores.includes(usuarioId));

  return (
    <main className="p-8 max-w-xl mx-auto">
      <div className="mb-6 flex items-center gap-4">
        <label className="font-medium">Usuario actual:</label>
        <select
          value={usuarioId}
          onChange={e => {
            setUsuarioId(e.target.value);
            if (typeof window !== "undefined") {
              localStorage.setItem("usuarioId", e.target.value);
              window.location.reload();
            }
          }}
          className="border p-2 rounded"
        >
          {usuarios.map(u => (
            <option key={u.id} value={u.id}>{u.nombre} ({u.rol})</option>
          ))}
        </select>
      </div>
      <h1 className="text-2xl font-bold mb-6">Búsquedas visibles</h1>
      <ul className="space-y-4">
        {busquedasVisibles.map((busqueda) => (
          <li key={busqueda.id} className="bg-blue-100 p-4 rounded shadow">
            <Link href={`/busquedas/${busqueda.id}`} className="font-semibold text-lg hover:underline">
              {busqueda.nombre}
            </Link>
            <div className="text-sm text-gray-700 mt-2">
              Entrevistadores: {getNombresEntrevistadores(busqueda.entrevistadores)}
            </div>
            <div className="text-xs text-gray-500">
              Candidatos: {busqueda.candidatos.map(c => c.nombre).join(', ')}
            </div>
          </li>
        ))}
        {busquedasVisibles.length === 0 && (
          <li className="text-gray-400">No hay búsquedas asignadas para este usuario.</li>
        )}
      </ul>
    </main>
  );
}
