"use client";
import React from "react";
import AdjuntarCV from "@/components/AdjuntarCV";
import VerCVLink from "@/components/VerCVLink";
import { useUser } from "@/app/context/UserContext";
import { busquedasBase } from "@/data/busquedas";
import EvaluarCandidato from "@/components/EvaluarCandidato";
// ...el resto del archivo igual...


export default function Page({ params }) {
  // ⬇️ Cambiá esta línea:
  // const { busquedaId, candidatoId } = params;
  // ⬇️ Por esta:
  const { busquedaId, candidatoId } = React.use(params);

  const { user } = useUser();

  const busqueda = busquedasBase.find(b => b.id === busquedaId);
  const candidato = busqueda?.candidatos.find(c => c.id === candidatoId);

  if (!candidato) {
    return <div>No se encontró el candidato</div>;
  }

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-3">Candidato: {candidato.nombre}</h1>
      <p className="mb-4">Email: {candidato.email}</p>

      <h2 className="font-semibold mb-2">CV del candidato:</h2>
      {user?.rol === "admin" ? (
        <AdjuntarCV candidatoId={candidatoId} />
      ) : (
        <VerCVLink candidatoId={candidatoId} />
      )}

      <div className="my-8 border-t pt-8">
        <EvaluarCandidato candidatoId={candidatoId} />
      </div>
    </main>
  );
}
