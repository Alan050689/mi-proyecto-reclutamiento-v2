type Competencia = {
  id: string;
  nombre: string;
  peso: number;
};

type Props = {
  competencias: Competencia[];
  puntajes: { [key: string]: number };
};

export default function TablaEvaluacion({ competencias, puntajes }: Props) {
  return (
    <table className="table-auto border-collapse w-full text-sm mt-4">
      <thead>
        <tr className="bg-gray-100">
          <th className="border px-4 py-2">Competencia</th>
          <th className="border px-4 py-2">Puntaje</th>
          <th className="border px-4 py-2">%</th>
          <th className="border px-4 py-2">Ponderación</th>
          <th className="border px-4 py-2">Puntuación</th>
          <th className="border px-4 py-2">Valor</th>
          <th className="border px-4 py-2">Máx</th>
        </tr>
      </thead>
      <tbody>
        {competencias.map((c) => {
          const puntaje = puntajes[c.id] || 0;
          const porcentaje = (puntaje * 100) / 4;
          const puntuacion = (porcentaje * c.peso) / 100;
          const valor = puntaje * c.peso;
          const max = 4 * c.peso;

          return (
            <tr key={c.id}>
              <td className="border px-4 py-2">{c.nombre}</td>
              <td className="border px-4 py-2 text-center">{puntaje}</td>
              <td className="border px-4 py-2 text-center">{porcentaje.toFixed(0)}%</td>
              <td className="border px-4 py-2 text-center">{c.peso}</td>
              <td className="border px-4 py-2 text-center">{puntuacion.toFixed(1)}</td>
              <td className="border px-4 py-2 text-center">{valor.toFixed(1)}</td>
              <td className="border px-4 py-2 text-center">{max}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
