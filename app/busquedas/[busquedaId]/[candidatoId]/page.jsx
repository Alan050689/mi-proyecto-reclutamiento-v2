export default function Page({ params }) {
  const { candidatoId } = params;
  return (
    <div>
      <h1>Candidato: {candidatoId}</h1>
    </div>
  );
}
