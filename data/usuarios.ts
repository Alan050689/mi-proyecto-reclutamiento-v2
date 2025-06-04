// data/usuarios.ts

export type Usuario = {
  id: string;
  nombre: string;
  rol: 'admin' | 'entrevistador';
};

export const usuarios: Usuario[] = [
  { id: 'u1', nombre: 'Alan', rol: 'admin' },
  { id: 'u2', nombre: 'Sofía', rol: 'entrevistador' },
  { id: 'u3', nombre: 'Martín', rol: 'entrevistador' },
  { id: 'u4', nombre: 'Lucía', rol: 'entrevistador' },
  { id: 'u5', nombre: 'Darío Copette', rol: 'entrevistador' },
];
