'use client';
import Link from "next/link";
import { useParams } from "next/navigation";
import { busquedasBase } from "../../../data/busquedas";
import { usuarios } from "../../../data/usuarios"; // ajustá el path si es distinto

export default function Page() {
  const params = useParams();
  const busquedaId = params.busquedaId;

  const busqueda = busquedasBase.find(b => b.id === busquedaId);

  if (!busqueda) return (
    <main className="p-8">
      <div className="text-red-500">Búsqueda no encontrada.</div>
      <Link href="/busquedas" className="text-blue-700 hover:underline text-sm">&larr; Volver a búsquedas</Link>
    </main>
  );

  return (
    <main className="bg-gray-50 min-h-screen py-12 px-4 font-satoshi">
      <div className="max-w-2xl mx-auto">
        <Link href="/busquedas" className="text-blue-700 hover:underline text-sm mb-4 block">&larr; Volver a búsquedas</Link>
        <h1 className="text-2xl font-bold text-blue-900 mb-4">{busqueda.nombre}</h1>
        <div className="mb-4 text-blue-700">Competencias:</div>
        <ul className="mb-4 ml-4 list-disc text-blue-900">
          {busqueda.competencias.map(com => (
            <li key={com.id}>{com.nombre} <span className="text-xs text-gray-500">(Peso: {com.peso})</span></li>
          ))}
        </ul>
        <div className="mb-4">
          <strong>Entrevistadores:</strong> {
            busqueda.entrevistadores.map(id => usuarios.find(u => u.id === id)?.nombre).join(', ')
          }
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Candidatos</h2>
          <ul>
            {busqueda.candidatos.map(c => (
              <li key={c.id}>
                <Link href={`/busquedas/${busqueda.id}/${c.id}`} className="text-blue-900 hover:underline">{c.nombre}</Link>
              </li>
            ))}
            {busqueda.candidatos.length === 0 && (
              <li className="text-gray-400">Sin candidatos en esta búsqueda.</li>
            )}
          </ul>
        </div>
      </div>
    </main>
  );
}

