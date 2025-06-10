"use client";
import React from "react";
import Link from "next/link";
import { busquedasBase } from "../../data/busquedas";
import { usuarios } from "../../data/usuarios";
import { useUser } from "../context/UserContext";

export default function Page() {
  const { user } = useUser();

  if (!user) {
    return (
      <main className="p-8 flex flex-col items-center justify-center min-h-[40vh]">
        <span className="mb-4 text-gray-500">Cargando usuario...</span>
        <Link href="/login" className="text-blue-700 hover:underline text-sm">
          Iniciar sesión
        </Link>
      </main>
    );
  }

  const busquedasFiltradas = user.rol === "admin"
    ? busquedasBase
    : busquedasBase.filter(b => b.entrevistadores.includes(user.id));

  return (
    <main className="bg-gray-50 min-h-screen py-12 px-4 font-satoshi">
      <div className="max-w-2xl mx-auto">
        <div className="mb-4 text-gray-700 text-right">Hola, {user.nombre}</div>
        <h1 className="text-2xl font-bold text-blue-900 mb-8">
          {user.rol === "admin" ? "Todas las búsquedas" : "Mis búsquedas asignadas"}
        </h1>
        {busquedasFiltradas.length === 0 && (
          <div className="text-gray-500 mb-8">
            {user.rol === "admin"
              ? "No hay búsquedas cargadas."
              : "No tenés búsquedas asignadas."}
          </div>
        )}
        <ul className="space-y-6">
          {busquedasFiltradas.map((busqueda) => (
            <li key={busqueda.id} className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-semibold text-blue-900 mb-2">
                {busqueda.nombre}
              </h2>
              <div className="mb-2 text-blue-700">Competencias:</div>
              <ul className="mb-2 ml-4 list-disc text-blue-900">
                {busqueda.competencias.map((com) => (
                  <li key={com.id}>{com.nombre}</li>
                ))}
              </ul>
              <div className="bg-gray-50 p-4 rounded-xl mt-4">
                <strong>Candidatos:</strong>
                {busqueda.candidatos.length > 0 ? (
                  <ul className="ml-4 mt-2 space-y-2">
                    {busqueda.candidatos.map((c) => (
                      <li key={c.id}>
                        <Link
                          href={`/busquedas/${busqueda.id}/${c.id}`}
                          className="text-blue-900 hover:underline font-medium"
                        >
                          {c.nombre}
                        </Link>
                        {/* Si querés mostrar email: <span className="text-xs text-gray-500 ml-2">{c.email}</span> */}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-gray-400 ml-2">Sin candidatos</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}




