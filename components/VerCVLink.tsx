"use client";
import React from "react";

export default function VerCVLink({ candidatoId }: { candidatoId: string }) {
  const [cv, setCV] = React.useState<string | null>(null);

  React.useEffect(() => {
    setCV(localStorage.getItem(`cv-${candidatoId}`));
  }, [candidatoId]);

  if (!cv) return null;

  // Si la URL es directa, el atributo 'download' forzará la descarga
  return (
    <a
      href={cv}
      target="_blank"
      rel="noopener noreferrer"
      className="ml-2 text-green-700 underline text-xs"
      title="Descargar CV"
      download // <-- importante
    >
      📥 Descargar CV
    </a>
  );
}


