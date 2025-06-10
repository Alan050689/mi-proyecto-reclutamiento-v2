"use client";
import React, { useRef, useState } from "react";

export default function AdjuntarCV({ candidatoId }) {
  const [cv, setCV] = useState(null);
  const inputFile = useRef();

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        localStorage.setItem(`cv-${candidatoId}`, reader.result);
        setCV(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Cargar CV si existe
  React.useEffect(() => {
    const saved = localStorage.getItem(`cv-${candidatoId}`);
    if (saved) setCV(saved);
  }, [candidatoId]);

  return (
    <div className="mb-6">
      <label className="font-semibold">CV del candidato:</label>
      <input
        type="file"
        accept=".pdf"
        className="block mt-2"
        ref={inputFile}
        onChange={handleUpload}
      />
      {cv && (
        <div className="mt-3">
          <a
            href={cv}
            download={`CV-candidato-${candidatoId}.pdf`}
            className="text-blue-600 underline mr-4"
          >
            Descargar CV
          </a>
          <a
            href={cv}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 underline"
          >
            Previsualizar CV
          </a>
        </div>
      )}
    </div>
  );
}

