'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function HeaderInfocorp() {
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
      <nav className="flex gap-6 text-sm font-medium text-grayText">
        <Link href="/busquedas" className="hover:text-primary transition-colors">
          Búsquedas
        </Link>
        <Link href="/candidatos" className="hover:text-primary transition-colors">
          Candidatos
        </Link>
        <Link href="/configuracion" className="hover:text-primary transition-colors">
          Configuración
        </Link>
      </nav>
    </header>
  );
}
