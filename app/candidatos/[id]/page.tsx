import EvaluarCandidato from './EvaluarCandidato';

export default function Page({ params }: { params: { id: string } }) {
  return <EvaluarCandidato candidatoId={params.id} />;
}
