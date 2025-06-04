interface Props {
  params: { busquedaId: string; candidatoId: string }
}

export default function CandidatoPage({ params }: Props) {
  const { busquedaId, candidatoId } = params;
  return (
    <div>
      <h2>Búsqueda: {busquedaId}</h2>
      <h3>Candidato: {candidatoId}</h3>
      {/* Tu lógica real */}
    </div>
  );
}

