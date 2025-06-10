"use client"; 
import Link from 'next/link';
import Image from 'next/image';
import { useUser } from "../app/context/UserContext";
import { useRouter } from "next/navigation"; // <-- importá esto

export default function HeaderInfocorp() {
  const { user, setUser } = useUser();
  const router = useRouter(); // <-- inicializá el router

  if (!user) return null; // o un loading spinner

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3">
        <Image
          src="/logo-infocorp.png"
          alt="Infocorp Logo"
          width={140}
          height={40}
        />
      </div>
      <nav className="flex gap-6 text-sm font-medium text-grayText items-center">
        <Link href="/" className="hover:text-primary transition-colors">🏠 Home</Link>
        <Link href="/busquedas" className="hover:text-primary transition-colors">
          {user.rol === "admin" ? "Búsquedas" : "Mis búsquedas"}
        </Link>
        {user.rol === "admin" && (
          <>
            <Link href="/candidatos" className="hover:text-primary transition-colors">
              Candidatos
            </Link>
            <Link href="/configuracion" className="hover:text-primary transition-colors">
              Configuración
            </Link>
          </>
        )}
        <span className="ml-4 text-gray-600">
          {user.nombre} ({user.rol})
        </span>
        {/* Botón para "cerrar sesión" */}
        <button
          className="ml-2 text-xs text-red-500 hover:underline"
          onClick={() => {
            setUser(null);
            router.push("/login");
          }}
        >
          Cerrar sesión
        </button>
      </nav>
    </header>
  );
}



