import EvaluarCandidato from "@/components/EvaluarCandidato";

const candidatos = [
  { id: "1", nombre: "Juan Pérez", email: "juan@email.com" },
  { id: "2", nombre: "Ana Gómez", email: "ana@email.com" }
];

export default function Page({ params }) {
  const { candidatoId } = params;
  const candidato = candidatos.find(c => c.id === candidatoId);

  if (!candidato) {
    return <div>No se encontró el candidato</div>;
  }

  return (
    <main>
      <h1>Candidato: {candidato.nombre}</h1>
      <p>Email: {candidato.email}</p>
      <EvaluarCandidato candidatoId={candidatoId} />
    </main>
  );
}
