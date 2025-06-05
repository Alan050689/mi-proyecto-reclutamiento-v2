'use client';
import Link from "next/link";
import { busquedasBase } from "../../../../data/busquedas";

export default function Page({ params }) {
  const busqueda = busquedasBase.find(b => b.id === params.busquedaId);
  const candidato = busqueda?.candidatos.find(c => c.id === params.candidatoId);

  if (!busqueda || !candidato) return (
    <main className="p-8">
      <div className="text-red-500">Candidato no encontrado.</div>
      <Link href={`/busquedas/${params.busquedaId}`} className="text-blue-700 hover:underline text-sm">&larr; Volver a búsqueda</Link>
    </main>
  );

  return (
    <main className="bg-gray-50 min-h-screen py-12 px-4 font-satoshi">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-8">
        <Link href={`/busquedas/${params.busquedaId}`} className="text-blue-700 hover:underline text-sm mb-4 block">&larr; Volver a búsqueda</Link>
        <h1 className="text-2xl font-bold text-blue-900 mb-4">{candidato.nombre}</h1>
        {/* Más datos si hay */}
      </div>
    </main>
  );
}
