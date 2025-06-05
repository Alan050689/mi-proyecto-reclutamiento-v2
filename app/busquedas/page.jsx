'use client';
import { useState, useEffect } from "react";
import Link from "next/link";
import { busquedasBase } from "../../data/busquedas";
import { usuarios } from "../../data/usuarios"; // ajustá el path si lo tenés diferente

// Helper para mostrar nombres de entrevistadores
function getNombres(ids) {
  return ids
    .map(id => usuarios.find(u => u.id === id)?.nombre)
    .filter(Boolean)
    .join(', ');
}

export default function BusquedasPage() {
  const [usuarioId, setUsuarioId] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("usuarioId") || usuarios[0].id;
    setUsuarioId(stored);
  }, []);

  if (!mounted || !usuarioId) return null;

  const usuarioActual = usuarios.find(u => u.id === usuarioId);
  const busquedasVisibles = usuarioActual?.rol === "admin"
    ? busquedasBase
    : busquedasBase.filter(b => b.entrevistadores.includes(usuarioId));

  return (
    <main className="bg-gray-50 min-h-screen py-12 px-4 font-satoshi">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 flex items-center gap-4">
          <label className="font-medium text-blue-900">Usuario actual:</label>
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
        <h1 className="text-3xl font-black text-blue-800 mb-8 tracking-tight">Búsquedas activas</h1>
        <div className="space-y-6">
          {busquedasVisibles.map(b => (
            <Link href={`/busquedas/${b.id}`} key={b.id} className="block">
              <div className="bg-white rounded-xl shadow-md hover:shadow-lg border border-blue-100 p-6 cursor-pointer transition">
                <div className="text-xl font-bold text-blue-900">{b.nombre}</div>
                <div className="text-blue-700 mt-1">Competencias: {b.competencias.map(c => c.nombre).join(', ')}</div>
                <div className="text-xs text-gray-500 mt-2">Entrevistadores: {getNombres(b.entrevistadores)}</div>
                <div className="text-xs text-gray-600">
                  Candidatos: {b.candidatos.map(c => c.nombre).join(', ')}
                </div>
              </div>
            </Link>
          ))}
          {busquedasVisibles.length === 0 && (
            <div className="text-gray-400 mt-12">No hay búsquedas asignadas para este usuario.</div>
          )}
        </div>
      </div>
    </main>
  );
}
