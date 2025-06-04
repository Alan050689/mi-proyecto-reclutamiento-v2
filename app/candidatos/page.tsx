import Link from 'next/link';

const candidatos = [
  { id: '1', nombre: 'Lucía Pérez' },
  { id: '2', nombre: 'Martín Gómez' },
  { id: '3', nombre: 'Sofía Ramírez' }
];

export default function ListaCandidatos() {
  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Lista de Candidatos</h1>
      <ul className="space-y-4">
        {candidatos.map((candidato) => (
          <li key={candidato.id}>
            <Link
              href={`/candidatos/${candidato.id}`}
              className="text-blue-600 hover:underline"
            >
              Evaluar a {candidato.nombre}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
