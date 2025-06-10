"use client";

import { useEffect, useState } from 'react';
import TablaEvaluacion from "@/components/TablaEvaluacion";
import toast from "react-hot-toast";
import { useUser } from "@/app/context/UserContext";

const entrevistadores = ['Alan', 'Sofía', 'Martín', 'Lucía'];

type Props = {
  candidatoId: string;
};

export default function EvaluarCandidato({ candidatoId }: Props) {
  const { user } = useUser();
  // Si no hay usuario, no mostramos nada
  if (!user) return null;

  // El entrevistador es el usuario logueado
  const entrevistador = user.nombre;

  const [puntajes, setPuntajes] = useState<{ [key: string]: number }>({});
  const [competencias, setCompetencias] = useState([
    { id: 'com1', nombre: 'Pensamiento estratégico', peso: 30 },
    { id: 'com2', nombre: 'Comunicación', peso: 20 },
    { id: 'com3', nombre: 'Autonomía', peso: 15 },
    { id: 'com4', nombre: 'Representación de marca', peso: 25 },
    { id: 'com5', nombre: 'Curiosidad por la innovación', peso: 10 },
  ]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const storageKey = `evaluacion-${candidatoId}-${entrevistador}`;

  useEffect(() => {
    if (mounted) {
      const saved = localStorage.getItem(storageKey);
      setPuntajes(saved ? JSON.parse(saved) : {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey, mounted]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(storageKey, JSON.stringify(puntajes));
    }
  }, [puntajes, storageKey, mounted]);

  const handleChange = (id: string, valor: number) => {
    setPuntajes((prev) => ({ ...prev, [id]: valor }));
  };

  const handlePesoChange = (id: string, valor: number) => {
    setCompetencias((prev) =>
      prev.map((comp) => (comp.id === id ? { ...comp, peso: valor } : comp))
    );
  };

  const calcularPromedioPonderado = (puntajes: { [key: string]: number }) => {
    const totalPeso = competencias.reduce((acc, c) => acc + (c.peso || 1), 0);
    const total = competencias.reduce((acc, c) => {
      const valor = puntajes[c.id];
      return acc + (valor !== undefined ? valor * (c.peso || 1) : 0);
    }, 0);
    return totalPeso > 0 ? (total / totalPeso).toFixed(2) : '—';
  };

  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        Evaluación - Candidato ID: {candidatoId}
      </h1>

      {/* Muestra fijo el entrevistador */}
      <div className="mb-6">
        <label className="font-medium mr-2">Entrevistador:</label>
        <span className="p-2 bg-gray-100 rounded">{entrevistador}</span>
      </div>

      <form className="space-y-6">
        {competencias.map((comp) => (
          <div key={comp.id} className="flex flex-col">
            <label className="font-medium mb-1">{comp.nombre}</label>
            <input
              type="number"
              min={1}
              max={4}
              value={puntajes[comp.id] || ''}
              onChange={(e) => {
                const valor = parseInt(e.target.value);
                if (!isNaN(valor) && valor >= 1 && valor <= 4) {
                  handleChange(comp.id, valor);
                }
              }}
              className="border p-2 rounded w-24 mb-1"
              placeholder="1-4"
            />
            {entrevistador === 'Alan' ? (
              <input
                type="number"
                min={0}
                max={100}
                value={comp.peso}
                onChange={(e) => handlePesoChange(comp.id, parseInt(e.target.value))}
                className="border p-2 rounded w-32"
                placeholder="Ponderación"
              />
            ) : (
              <span className="text-sm text-gray-500">Ponderación: {comp.peso}</span>
            )}
          </div>
        ))}
      </form>

      <button
        type="button"
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
        onClick={() => {
          toast.success("¡Evaluación guardada!");
        }}
      >
        Guardar evaluación
      </button>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-4 text-primary">Resumen de evaluación</h2>
        <TablaEvaluacion competencias={competencias} puntajes={puntajes} />
      </section>

      {mounted && (
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Comparativa entre entrevistadores</h2>
          <table className="table-auto border-collapse w-full text-sm">
            <thead>
              <tr>
                <th className="border px-4 py-2 text-left">Competencia</th>
                {entrevistadores.map((nombre) => (
                  <th key={nombre} className="border px-4 py-2 text-center">{nombre}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {competencias.map((comp) => (
                <tr key={comp.id}>
                  <td className="border px-4 py-2">{comp.nombre}</td>
                  {entrevistadores.map((nombre) => {
                    let valor = '—';
                    if (mounted) {
                      const key = `evaluacion-${candidatoId}-${nombre}`;
                      const savedData = localStorage.getItem(key);
                      const puntajesGuardados = savedData ? JSON.parse(savedData) : {};
                      valor = nombre === entrevistador
                        ? puntajes[comp.id]
                        : puntajesGuardados[comp.id];
                    }
                    return (
                      <td key={nombre} className="border px-4 py-2 text-center">
                        {valor !== undefined ? valor : '—'}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="font-semibold bg-gray-100">
                <td className="border px-4 py-2">Promedio ponderado</td>
                {entrevistadores.map((nombre) => {
                  let promedio = '—';
                  if (mounted) {
                    const key = `evaluacion-${candidatoId}-${nombre}`;
                    const saved =
                      nombre === entrevistador
                        ? puntajes
                        : JSON.parse(localStorage.getItem(key) || '{}');
                    promedio = calcularPromedioPonderado(saved);
                  }
                  return (
                    <td key={nombre} className="border px-4 py-2 text-center">
                      {promedio}
                    </td>
                  );
                })}
              </tr>
              <tr className="font-semibold bg-gray-200">
                <td className="border px-4 py-2">Valor total</td>
                {entrevistadores.map((nombre) => {
                  let totalValor = 0;
                  if (mounted) {
                    const key = `evaluacion-${candidatoId}-${nombre}`;
                    const saved =
                      nombre === entrevistador
                        ? puntajes
                        : JSON.parse(localStorage.getItem(key) || '{}');
                    totalValor = competencias.reduce((acc, comp) => {
                      const v = saved[comp.id] || 0;
                      return acc + v * comp.peso;
                    }, 0);
                  }
                  return (
                    <td key={nombre} className="border px-4 py-2 text-center">
                      {totalValor ? totalValor.toFixed(1) : '—'}
                    </td>
                  );
                })}
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </main>
  );
}
