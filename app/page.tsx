import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#F5F8FA]">
      <img src="/logo-infocorp.png" alt="Infocorp Logo" className="mb-8 w-52" />
      <h1 className="text-4xl font-bold mb-4 text-[#0033A0] text-center">Bienvenido al Sistema de Evaluaciones Infocorp</h1>
      <p className="text-lg mb-8 text-gray-600 text-center max-w-xl">
        Gestioná búsquedas, competencias y evaluaciones de candidatos de forma eficiente y visual.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/busquedas"
          className="bg-[#0033A0] text-white px-8 py-3 rounded shadow hover:bg-[#002080] text-lg text-center"
        >
          Ir a Búsquedas
        </Link>
        <Link
          href="/candidatos"
          className="bg-white border border-[#0033A0] text-[#0033A0] px-8 py-3 rounded shadow hover:bg-blue-50 text-lg text-center"
        >
          Ver Candidatos
        </Link>
        <Link
          href="/configuracion"
          className="bg-white border border-gray-300 text-gray-700 px-8 py-3 rounded shadow hover:bg-gray-100 text-lg text-center"
        >
          Configuración
        </Link>
      </div>
    </main>
  );
}
