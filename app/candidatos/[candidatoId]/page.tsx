interface Props {
  params: { candidatoId: string }
}

export default function CandidatoPage({ params }: Props) {
  const { candidatoId } = params;

  // Acá va tu lógica real. Ejemplo mínimo:
  return (
    <div>
      <h1>Candidato: {candidatoId}</h1>
      {/* Tu lógica/render real */}
    </div>
  );
}
