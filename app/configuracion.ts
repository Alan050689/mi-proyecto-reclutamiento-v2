export type Competencia = {
  id: string;
  nombre: string;
  peso: number;
};

export const entrevistadoresBase = ['Alan', 'Sofía', 'Martín', 'Lucía'];

export const competenciasBase: Competencia[] = [
  { id: 'com1', nombre: 'Pensamiento estratégico', peso: 1 },
  { id: 'com2', nombre: 'Comunicación', peso: 1 },
  { id: 'com3', nombre: 'Autonomía', peso: 1 },
  { id: 'com4', nombre: 'Representación de marca', peso: 1 },
  { id: 'com5', nombre: 'Curiosidad por la innovación', peso: 1 },
];
