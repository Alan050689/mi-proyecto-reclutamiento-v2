export default function Page({ params }) {
  const { busquedaId, candidatoId } = params;
  return (
    <div>
      <h1>Búsqueda: {busquedaId}</h1>
      <h2>Candidato: {candidatoId}</h2>
    </div>
  );
}
