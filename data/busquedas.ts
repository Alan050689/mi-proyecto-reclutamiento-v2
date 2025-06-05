// data/busquedas.ts

// Definición de tipos locales
export type Competencia = {
  id: string;
  nombre: string;
  peso: number;
};

export type Candidato = {
  id: string;
  nombre: string;
  email?: string;
  telefono?: string;
};

export type Busqueda = {
  id: string;
  nombre: string;
  competencias: Competencia[];
  entrevistadores: string[]; // IDs de usuario
  candidatos: Candidato[];
};

// Datos de ejemplo (mock)
export const busquedasBase: Busqueda[] = [
  {
    id: 'mkt-sr',
    nombre: 'Senior Marketing Specialist',
    entrevistadores: ['u1', 'u2'], // Alan (u1) y Sofía (u2)
    competencias: [
      { id: 'com1', nombre: 'Pensamiento estratégico', peso: 1.2 },
      { id: 'com2', nombre: 'Comunicación', peso: 1 },
      { id: 'com4', nombre: 'Representación de marca', peso: 1.5 },
      { id: 'com5', nombre: 'Curiosidad por la innovación', peso: 1 },
    ],
    candidatos: [
      { id: '1', nombre: 'Juan Pérez', email: 'juan@email.com', telefono: '555-1234' },
      { id: '2', nombre: 'Ana Torres', email: 'ana@email.com', telefono: '555-5678' },
    ],
  },
  {
    id: 'tl-tech',
    nombre: 'Technical Lead',
    entrevistadores: ['u1', 'u5'], // Alan (u1) y Darío Copette (u5)
    competencias: [
      { id: 'com1', nombre: 'Pensamiento estratégico', peso: 1.2 },
      { id: 'com3', nombre: 'Autonomía', peso: 1 },
      { id: 'com6', nombre: 'Conocimientos técnicos', peso: 1.7 },
      { id: 'com7', nombre: 'Liderazgo', peso: 1.3 },
    ],
    candidatos: [
      { id: '3', nombre: 'Pedro Romero', email: 'pedro@email.com', telefono: '555-9876' },
      { id: '4', nombre: 'Marina Torres', email: 'marina@email.com', telefono: '555-1111' },
    ],
  },
  // Agregá más búsquedas si necesitás...
];
