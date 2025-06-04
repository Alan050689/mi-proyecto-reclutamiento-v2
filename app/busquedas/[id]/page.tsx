import { busquedasBase } from '../../../data/busquedas';
import { usuarios } from '../../../data/usuarios';
import Link from 'next/link';

const getNombresEntrevistadores = (ids: string[]) =>
  ids.map(id => usuarios.find(u => u.id === id)?.nombre).filter(Boolean).join(', ');

interface Props {
  params: { id: string }
}

export default function DetalleBusquedaPage({ params }: Props) {
  const busqueda = busquedasBase.find(b => b.id === params.id);

  if (!busqueda) {
    return <main className="p-8 text-red-600">Búsqueda no encontrada</main>;
  }

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{busqueda.nombre}</h1>
      <div className="mb-4">
        <span className="font-semibold">Entrevistadores: </span>
        {getNombresEntrevistadores(busqueda.entrevistadores)}
      </div>
      <div className="mb-4">
        <span className="font-semibold">Candidatos: </span>
        {busqueda.candidatos.map(c => c.nombre).join(', ')}
      </div>
      <div className="mb-8">
        <span className="font-semibold">Competencias:</span>
        <ul className="list-disc ml-6">
          {busqueda.competencias.map(c => (
            <li key={c.id}>{c.nombre} (peso: {c.peso})</li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href={`/busquedas/${busqueda.id}/editar-candidatos`}
          className="bg-[#0033A0] text-white px-5 py-2 rounded shadow hover:bg-[#002080] text-center"
        >
          Editar candidatos
        </Link>
        <Link
          href={`/busquedas/${busqueda.id}/editar-competencias`}
          className="bg-[#0033A0] text-white px-5 py-2 rounded shadow hover:bg-[#002080] text-center"
        >
          Editar competencias
        </Link>
        <Link
          href={`/busquedas/${busqueda.id}/editar-entrevistadores`}
          className="bg-[#0033A0] text-white px-5 py-2 rounded shadow hover:bg-[#002080] text-center"
        >
          Editar entrevistadores
        </Link>
      </div>
    </main>
  );
}

