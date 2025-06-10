export type Usuario = {
  id: string;
  nombre: string;
  email: string;
  rol: 'admin' | 'entrevistador';
};

export const usuarios: Usuario[] = [
  { id: 'u1', nombre: 'Alan Rosenfeld', email: 'alan.rosenfeld@infocorpgroup.com', rol: 'admin' },
  { id: 'u2', nombre: 'Elena Rubin', email: 'elena.rubin@infocorpgroup.com', rol: 'admin' }, // reemplazá [Apellido] por el real
  { id: 'u3', nombre: 'Darío Copette', email: 'dario.copette@infocorpgroup.com', rol: 'entrevistador' },
  { id: 'u4', nombre: 'Pablo Itman', email: 'pablo.itman@infocorpgroup.com', rol: 'entrevistador' },
  // Agregá más entrevistadores acá si querés
];
