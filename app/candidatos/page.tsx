"use client";
import Link from 'next/link';
import { busquedasBase } from "../../data/busquedas";
import { useUser } from "../context/UserContext";
import VerCVLink from "../../components/VerCVLink"; // Importante

// Tipos
type Candidato = {
  id: string;
  nombre: string;
  email?: string;
};
type Busqueda = {
  id: string;
  nombre: string;
  entrevistadores: string[];
  candidatos: Candidato[];
};

export default function ListaCandidatos() {
  const { user } = useUser();

  if (!user) {
    return (
      <main className="p-8">
        <Link href="/login" className="text-blue-700 hover:underline text-sm">
          Iniciar sesión
        </Link>
      </main>
    );
  }

  // Filtra las búsquedas que el usuario puede ver
  const busquedasVisibles: Busqueda[] = user.rol === "admin"
    ? busquedasBase as Busqueda[]
    : (busquedasBase as Busqueda[]).filter(b => b.entrevistadores.includes(user.id));

  // Solo las búsquedas con candidatos
  const candidatosPorBusqueda = busquedasVisibles
    .map(b => ({
      busquedaId: b.id,
      busquedaNombre: b.nombre,
      candidatos: b.candidatos
    }))
    .filter(b => b.candidatos.length > 0);

  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        {user.rol === "admin" ? "Todos los candidatos" : "Mis candidatos"}
      </h1>
      {candidatosPorBusqueda.length === 0 && (
        <div className="text-gray-500 mb-8">
          No hay candidatos cargados en tus búsquedas.
        </div>
      )}
      {candidatosPorBusqueda.map(({ busquedaId, busquedaNombre, candidatos }) => (
        <section key={busquedaId} className="mb-8">
          <h2 className="text-xl font-semibold text-blue-800 mb-2">{busquedaNombre}</h2>
          <ul className="space-y-2 ml-4">
            {candidatos.map(c => (
              <li key={c.id} className="flex items-center gap-2">
                <Link
                  href={`/busquedas/${busquedaId}/${c.id}`}
                  className="text-blue-900 hover:underline font-medium"
                >
                  {c.nombre}
                </Link>
                {c.email && (
                  <span className="text-gray-500 text-sm">({c.email})</span>
                )}
                <VerCVLink candidatoId={c.id} />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}

