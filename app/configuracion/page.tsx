'use client';

import { useEffect, useState } from 'react';
import {
  entrevistadoresBase,
  competenciasBase,
  Competencia,
} from '../configuracion';

export default function ConfiguracionPage() {
  // Entrevistadores
  const [entrevistadores, setEntrevistadores] = useState<string[]>([]);
  const [nuevo, setNuevo] = useState('');
  const entrevistadoresKey = 'config-entrevistadores';

  // Competencias
  const [competencias, setCompetencias] = useState<Competencia[]>([]);
  const [nuevaComp, setNuevaComp] = useState('');
  const [nuevoPeso, setNuevoPeso] = useState(1);
  const competenciasKey = 'config-competencias';

  // Cargar entrevistadores
  useEffect(() => {
    const saved = localStorage.getItem(entrevistadoresKey);
    if (saved) {
      setEntrevistadores(JSON.parse(saved));
    } else {
      setEntrevistadores(entrevistadoresBase);
    }
  }, []);

  // Guardar entrevistadores
  useEffect(() => {
    localStorage.setItem(entrevistadoresKey, JSON.stringify(entrevistadores));
  }, [entrevistadores]);

  const agregar = () => {
    if (nuevo.trim() && !entrevistadores.includes(nuevo)) {
      setEntrevistadores((prev) => [...prev, nuevo.trim()]);
      setNuevo('');
    }
  };

  const eliminar = (nombre: string) => {
    setEntrevistadores((prev) => prev.filter((e) => e !== nombre));
  };

  // Cargar competencias
  useEffect(() => {
    const saved = localStorage.getItem(competenciasKey);
    if (saved) {
      setCompetencias(JSON.parse(saved));
    } else {
      setCompetencias(competenciasBase);
    }
  }, []);

  // Guardar competencias
  useEffect(() => {
    localStorage.setItem(competenciasKey, JSON.stringify(competencias));
  }, [competencias]);

  const agregarCompetencia = () => {
    if (nuevaComp.trim()) {
      const nueva: Competencia = {
        id: `com${Date.now()}`,
        nombre: nuevaComp.trim(),
        peso: nuevoPeso,
      };
      setCompetencias((prev) => [...prev, nueva]);
      setNuevaComp('');
      setNuevoPeso(1);
    }
  };

  const eliminarCompetencia = (id: string) => {
    setCompetencias((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Configuración: Entrevistadores</h1>

      <div className="flex mb-4">
        <input
          type="text"
          value={nuevo}
          onChange={(e) => setNuevo(e.target.value)}
          placeholder="Nuevo entrevistador"
          className="border p-2 flex-grow rounded mr-2"
        />
        <button
          onClick={agregar}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Agregar
        </button>
      </div>

      <ul className="space-y-2 mb-10">
        {entrevistadores.map((nombre) => (
          <li
            key={nombre}
            className="flex justify-between items-center border p-2 rounded"
          >
            <span>{nombre}</span>
            <button
              onClick={() => eliminar(nombre)}
              className="text-red-600 hover:underline"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      <hr className="my-8" />

      <h2 className="text-xl font-semibold mb-4">Competencias</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={nuevaComp}
          onChange={(e) => setNuevaComp(e.target.value)}
          placeholder="Nombre de la competencia"
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          value={nuevoPeso}
          onChange={(e) => setNuevoPeso(Number(e.target.value))}
          min={0.1}
          step={0.1}
          className="border p-2 rounded w-24"
        />
        <button
          onClick={agregarCompetencia}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Agregar
        </button>
      </div>

      <ul className="space-y-2">
        {competencias.map((comp) => (
          <li
            key={comp.id}
            className="flex justify-between items-center border p-2 rounded"
          >
            <span>
              {comp.nombre} (peso: {comp.peso})
            </span>
            <button
              onClick={() => eliminarCompetencia(comp.id)}
              className="text-red-600 hover:underline"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}

