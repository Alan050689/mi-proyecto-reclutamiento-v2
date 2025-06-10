"use client";

import { useEffect, useState } from "react";

// ==== TIPOS ====
type Entrevistador = { nombre: string; email: string };
type Usuario = { id: string; nombre: string; email: string; rol: "admin" | "entrevistador" };
type Candidato = { id: string; nombre: string; email?: string }; // para ejemplo de cerrar búsqueda
type Busqueda = {
  id: string;
  nombre: string;
  entrevistadores: string[];
  estado: "activa" | "pausada" | "cerrada";
  contratado?: string; // email del candidato
  candidatos?: Candidato[]; // opcional para ejemplo
};
type Competencia = {
  id: string;
  nombre: string;
  peso: number;
  busquedas: string[];
};

// ==== CLAVES LOCALSTORAGE ====
const entrevistadoresKey = "config-entrevistadores";
const usuariosKey = "config-usuarios";
const busquedasKey = "config-busquedas";
const competenciasKey = "config-competencias";

// (Ejemplo simulado: candidatos de cada búsqueda, deberías traerlos según tu lógica real)
const candidatosEjemplo = [
  { id: "1", nombre: "Juan Pérez", email: "juan@email.com" },
  { id: "2", nombre: "Ana Gómez", email: "ana@email.com" }
];

export default function ConfiguracionPage() {
  // --- ENTREVISTADORES ---
  const [entrevistadores, setEntrevistadores] = useState<Entrevistador[]>([]);
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevoEmail, setNuevoEmail] = useState("");
  const [editUserIdx, setEditUserIdx] = useState<number | null>(null);
  const [editUserNombre, setEditUserNombre] = useState("");
  const [editUserEmail, setEditUserEmail] = useState("");
  const [error, setError] = useState("");

  // --- USUARIOS (LOGIN) ---
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  // --- BÚSQUEDAS ---
  const [busquedas, setBusquedas] = useState<Busqueda[]>([]);
  const [nuevaBusqueda, setNuevaBusqueda] = useState("");
  const [asignados, setAsignados] = useState<string[]>([]);
  const [editBusquedaIdx, setEditBusquedaIdx] = useState<number | null>(null);
  const [editBusquedaNombre, setEditBusquedaNombre] = useState("");
  const [editAsignados, setEditAsignados] = useState<string[]>([]);
  // gestión cerrar búsqueda
  const [cerrarIdx, setCerrarIdx] = useState<string | null>(null);
  const [candidatoContratado, setCandidatoContratado] = useState<string>("");

  // --- COMPETENCIAS ---
  const [competencias, setCompetencias] = useState<Competencia[]>([]);
  const [nuevaComp, setNuevaComp] = useState("");
  const [nuevoPeso, setNuevoPeso] = useState(1);
  const [nuevaCompBusquedas, setNuevaCompBusquedas] = useState<string[]>([]);
  const [editCompIdx, setEditCompIdx] = useState<number | null>(null);
  const [editCompNombre, setEditCompNombre] = useState("");
  const [editCompPeso, setEditCompPeso] = useState(1);
  const [editCompBusquedas, setEditCompBusquedas] = useState<string[]>([]);

  // ==== LOAD ====
  useEffect(() => {
    const saved = localStorage.getItem(entrevistadoresKey);
    setEntrevistadores(saved ? JSON.parse(saved) : [
      { nombre: "Darío Copette", email: "dario.copette@infocorpgroup.com" },
      { nombre: "Pablo Itman", email: "pablo.itman@infocorpgroup.com" },
      { nombre: "Nicolás Bril", email: "nicolas.bril@infocorpgroup.com" },
    ]);
    const savedUsers = localStorage.getItem(usuariosKey);
    if (savedUsers) setUsuarios(JSON.parse(savedUsers));
    const savedBusq = localStorage.getItem(busquedasKey);
    setBusquedas(savedBusq ? JSON.parse(savedBusq) : []);
    const savedComp = localStorage.getItem(competenciasKey);
    setCompetencias(savedComp ? JSON.parse(savedComp) : [
      { id: "com1", nombre: "Pensamiento estratégico", peso: 30, busquedas: [] },
      { id: "com2", nombre: "Comunicación", peso: 20, busquedas: [] },
      { id: "com3", nombre: "Autonomía", peso: 15, busquedas: [] },
      { id: "com4", nombre: "Representación de marca", peso: 25, busquedas: [] },
      { id: "com5", nombre: "Curiosidad por la innovación", peso: 10, busquedas: [] },
    ]);
  }, []);
  useEffect(() => { localStorage.setItem(entrevistadoresKey, JSON.stringify(entrevistadores)); }, [entrevistadores]);
  useEffect(() => { localStorage.setItem("config-usuarios", JSON.stringify(usuarios)); }, [usuarios]);
  useEffect(() => { localStorage.setItem(busquedasKey, JSON.stringify(busquedas)); }, [busquedas]);
  useEffect(() => { localStorage.setItem(competenciasKey, JSON.stringify(competencias)); }, [competencias]);

  // ==== CRUD Usuarios ====
  const agregar = () => {
    setError("");
    const emailValido = nuevoEmail.trim().toLowerCase().endsWith("@infocorpgroup.com");
    if (!nuevoNombre.trim() || !nuevoEmail.trim()) {
      setError("Completá ambos campos."); return;
    }
    if (!emailValido) {
      setError("El email debe ser @infocorpgroup.com"); return;
    }
    if (entrevistadores.some(e => e.email.toLowerCase() === nuevoEmail.toLowerCase())) {
      setError("Ya existe un entrevistador con ese email."); return;
    }
    setEntrevistadores(prev => [...prev, { nombre: nuevoNombre.trim(), email: nuevoEmail.trim().toLowerCase() }]);
    setUsuarios(prev => [...prev, { id: "u" + Date.now(), nombre: nuevoNombre.trim(), email: nuevoEmail.trim().toLowerCase(), rol: "entrevistador" }]);
    setNuevoNombre(""); setNuevoEmail("");
  };

  // Editar usuario
  const startEditUser = (idx: number) => {
    setEditUserIdx(idx);
    setEditUserNombre(entrevistadores[idx].nombre);
    setEditUserEmail(entrevistadores[idx].email);
  };
  const saveEditUser = () => {
    if (!editUserNombre.trim() || !editUserEmail.trim() || !editUserEmail.endsWith("@infocorpgroup.com")) return;
    if (entrevistadores.some((e, i) => i !== editUserIdx && e.email.toLowerCase() === editUserEmail.toLowerCase())) {
      setError("Ya existe un entrevistador con ese email."); return;
    }
    setEntrevistadores(prev => prev.map((e, i) => i === editUserIdx! ? { nombre: editUserNombre.trim(), email: editUserEmail.trim().toLowerCase() } : e));
    setUsuarios(prev => prev.map((u, i) => u.email === entrevistadores[editUserIdx!].email ? { ...u, nombre: editUserNombre.trim(), email: editUserEmail.trim().toLowerCase() } : u));
    setEditUserIdx(null); setEditUserNombre(""); setEditUserEmail(""); setError("");
  };
  const eliminar = (email: string) => {
    setEntrevistadores(prev => prev.filter(e => e.email !== email));
    setUsuarios(prev => prev.filter(u => u.email !== email));
  };

  // ==== CRUD Búsquedas ====
  const agregarBusqueda = () => {
    if (nuevaBusqueda.trim()) {
      setBusquedas(prev => [...prev, { id: "busq" + Date.now(), nombre: nuevaBusqueda.trim(), entrevistadores: asignados, estado: "activa", candidatos: candidatosEjemplo }]);
      setNuevaBusqueda(""); setAsignados([]);
    }
  };
  const startEditBusqueda = (idx: number) => {
    setEditBusquedaIdx(idx);
    setEditBusquedaNombre(busquedas[idx].nombre);
    setEditAsignados(busquedas[idx].entrevistadores);
  };
  const saveEditBusqueda = () => {
    setBusquedas(prev =>
      prev.map((b, i) => i === editBusquedaIdx! ? { ...b, nombre: editBusquedaNombre.trim(), entrevistadores: editAsignados } : b)
    );
    setEditBusquedaIdx(null); setEditBusquedaNombre(""); setEditAsignados([]);
  };
  const eliminarBusqueda = (id: string) => {
    setBusquedas(prev => prev.filter(b => b.id !== id));
  };
  const pausarBusqueda = (id: string) => { setBusquedas(prev => prev.map(b => b.id === id ? { ...b, estado: "pausada" } : b)); };
  const activarBusqueda = (id: string) => { setBusquedas(prev => prev.map(b => b.id === id ? { ...b, estado: "activa" } : b)); };
  // Cerrar: pide selección de candidato
  const startCerrarBusqueda = (id: string) => { setCerrarIdx(id); setCandidatoContratado(""); };
  const confirmarCerrarBusqueda = () => {
    if (!cerrarIdx) return;
    setBusquedas(prev =>
      prev.map(b => b.id === cerrarIdx ? { ...b, estado: "cerrada", contratado: candidatoContratado } : b)
    );
    setCerrarIdx(null); setCandidatoContratado("");
  };

  // ==== CRUD Competencias ====
  const agregarCompetencia = () => {
    if (nuevaComp.trim()) {
      setCompetencias((prev) => [...prev, { id: `com${Date.now()}`, nombre: nuevaComp.trim(), peso: nuevoPeso, busquedas: nuevaCompBusquedas }]);
      setNuevaComp(""); setNuevoPeso(1); setNuevaCompBusquedas([]);
    }
  };
  const startEditComp = (idx: number) => {
    setEditCompIdx(idx); setEditCompNombre(competencias[idx].nombre); setEditCompPeso(competencias[idx].peso); setEditCompBusquedas(competencias[idx].busquedas);
  };
  const saveEditComp = () => {
    setCompetencias(prev =>
      prev.map((c, i) => i === editCompIdx! ? { ...c, nombre: editCompNombre.trim(), peso: editCompPeso, busquedas: editCompBusquedas } : c)
    );
    setEditCompIdx(null); setEditCompNombre(""); setEditCompPeso(1); setEditCompBusquedas([]);
  };
  const eliminarCompetencia = (id: string) => {
    setCompetencias((prev) => prev.filter((c) => c.id !== id));
  };

  // --- ESTADOS ---
  const busquedasActivas = busquedas.filter(b => b.estado === "activa");
  const busquedasPausadas = busquedas.filter(b => b.estado === "pausada");
  const busquedasCerradas = busquedas.filter(b => b.estado === "cerrada");

  // ==== UI ====
  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Configuración</h1>
      {/* Alta y edición de entrevistadores */}
      <h2 className="text-xl font-semibold mb-4">Entrevistadores</h2>
      <div className="flex mb-4 gap-2">
        <input type="text" value={nuevoNombre} onChange={e => setNuevoNombre(e.target.value)} placeholder="Nombre del entrevistador" className="border p-2 flex-grow rounded" />
        <input type="email" value={nuevoEmail} onChange={e => setNuevoEmail(e.target.value)} placeholder="Email (debe ser @infocorpgroup.com)" className="border p-2 flex-grow rounded" />
        <button onClick={agregar} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Agregar</button>
      </div>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <ul className="space-y-2 mb-10">
        {entrevistadores.map((e, i) =>
          editUserIdx === i ? (
            <li key={e.email} className="border p-2 rounded flex flex-col gap-2">
              <div className="flex gap-2">
                <input type="text" value={editUserNombre} onChange={ev => setEditUserNombre(ev.target.value)} className="border p-1 rounded flex-1" />
                <input type="email" value={editUserEmail} onChange={ev => setEditUserEmail(ev.target.value)} className="border p-1 rounded flex-1" />
                <button onClick={saveEditUser} className="bg-green-600 text-white px-2 rounded">Guardar</button>
                <button onClick={() => setEditUserIdx(null)} className="text-gray-600 underline">Cancelar</button>
              </div>
            </li>
          ) : (
            <li key={e.email} className="flex justify-between items-center border p-2 rounded">
              <span>{e.nombre} <span className="text-gray-500 text-xs">({e.email})</span></span>
              <div className="flex gap-2">
                <button onClick={() => startEditUser(i)} className="text-blue-600 hover:underline text-xs">Editar</button>
                <button onClick={() => eliminar(e.email)} className="text-red-600 hover:underline text-xs">Eliminar</button>
              </div>
            </li>
          )
        )}
      </ul>
      <hr className="my-8" />

      {/* Alta, edición y gestión de búsquedas */}
      <h2 className="text-xl font-semibold mb-4">Búsquedas</h2>
      <div className="mb-4 flex gap-2">
        <input type="text" placeholder="Nombre de la búsqueda" value={nuevaBusqueda} onChange={e => setNuevaBusqueda(e.target.value)} className="border p-2 rounded flex-1" />
        <button onClick={agregarBusqueda} className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800">Crear búsqueda</button>
      </div>
      <div className="mb-6">
        <span className="font-medium">Asignar entrevistadores:</span>
        <div className="flex flex-wrap gap-4 mt-2">
          {entrevistadores.map(e => (
            <label key={e.email} className="flex items-center gap-1">
              <input type="checkbox" checked={asignados.includes(e.email)} onChange={ev => {
                if (ev.target.checked) setAsignados(prev => [...prev, e.email]);
                else setAsignados(prev => prev.filter(id => id !== e.email));
              }} />
              {e.nombre} <span className="text-xs text-gray-500">({e.email})</span>
            </label>
          ))}
        </div>
      </div>
      {/* ACTIVAS */}
      <h3 className="font-semibold mb-1 mt-8">Búsquedas activas</h3>
      <ul className="space-y-2 mb-6">
        {busquedasActivas.map((b, i) =>
          editBusquedaIdx === i ? (
            <li key={b.id} className="border p-2 rounded flex flex-col gap-2">
              <div className="flex gap-2">
                <input type="text" value={editBusquedaNombre} onChange={ev => setEditBusquedaNombre(ev.target.value)} className="border p-1 rounded flex-1" />
                <button onClick={saveEditBusqueda} className="bg-green-600 text-white px-2 rounded">Guardar</button>
                <button onClick={() => setEditBusquedaIdx(null)} className="text-gray-600 underline">Cancelar</button>
                <button onClick={() => eliminarBusqueda(b.id)} className="text-red-600 underline">Eliminar</button>
              </div>
              <div className="mt-2">
                <span className="font-medium text-xs">Asignar entrevistadores:</span>
                <div className="flex flex-wrap gap-4 mt-2">
                  {entrevistadores.map(e => (
                    <label key={e.email} className="flex items-center gap-1">
                      <input type="checkbox" checked={editAsignados.includes(e.email)} onChange={ev => {
                        if (ev.target.checked) setEditAsignados(prev => [...prev, e.email]);
                        else setEditAsignados(prev => prev.filter(id => id !== e.email));
                      }} />
                      {e.nombre} <span className="text-xs text-gray-500">({e.email})</span>
                    </label>
                  ))}
                </div>
              </div>
            </li>
          ) : (
            <li key={b.id} className="border rounded p-2 flex flex-col">
              <div className="flex justify-between items-center">
                <span className="font-bold">{b.nombre}</span>
                <span className="ml-2 text-xs text-green-600">[ACTIVA]</span>
                <div className="flex gap-2">
                  <button onClick={() => pausarBusqueda(b.id)} className="text-yellow-700 hover:underline text-xs">Pausar</button>
                  <button onClick={() => startEditBusqueda(i)} className="text-blue-600 hover:underline text-xs">Editar</button>
                  <button onClick={() => eliminarBusqueda(b.id)} className="text-red-600 hover:underline text-xs">Eliminar</button>
                  <button onClick={() => startCerrarBusqueda(b.id)} className="text-gray-700 underline text-xs">Cerrar</button>
                </div>
              </div>
              <ul className="ml-4">
                {b.entrevistadores.map(email => {
                  const entre = entrevistadores.find(e => e.email === email);
                  return (
                    <li key={email} className="text-sm">
                      {entre ? entre.nombre : email}
                    </li>
                  );
                })}
              </ul>
            </li>
          )
        )}
      </ul>
      {/* PAUSADAS */}
      <h3 className="font-semibold mb-1">Búsquedas pausadas</h3>
      <ul className="space-y-2 mb-6">
        {busquedasPausadas.map(b => (
          <li key={b.id} className="border rounded p-2 flex flex-col opacity-60">
            <div className="flex justify-between items-center">
              <span className="font-bold">{b.nombre}</span>
              <span className="ml-2 text-xs text-yellow-600">[PAUSADA]</span>
              <div className="flex gap-2">
                <button onClick={() => activarBusqueda(b.id)} className="text-green-600 hover:underline text-xs">Reanudar</button>
                <button onClick={() => eliminarBusqueda(b.id)} className="text-red-600 hover:underline text-xs">Eliminar</button>
                <button onClick={() => startCerrarBusqueda(b.id)} className="text-gray-700 underline text-xs">Cerrar</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {/* HISTORIAL (CERRADAS) */}
      <h3 className="font-semibold mb-1">Historial de búsquedas cerradas</h3>
      <ul className="space-y-2 mb-10">
        {busquedasCerradas.map(b => (
          <li key={b.id} className="border rounded p-2 flex flex-col bg-gray-100">
            <div className="flex justify-between items-center">
              <span>
                <span className="font-bold">{b.nombre}</span>
                <span className="ml-2 text-xs text-gray-600">[CERRADA]</span>
              </span>
              {b.contratado && <span className="text-xs text-blue-800 ml-3">Contratado: {b.contratado}</span>}
            </div>
          </li>
        ))}
      </ul>
      {/* MODAL: Seleccionar contratado al cerrar */}
      {cerrarIdx && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow max-w-sm w-full flex flex-col gap-4">
            <h2 className="text-lg font-bold">Seleccionar candidato contratado</h2>
            <select
              className="border p-2 rounded"
              value={candidatoContratado}
              onChange={e => setCandidatoContratado(e.target.value)}
            >
              <option value="">Seleccioná candidato</option>
              {(busquedas.find(b => b.id === cerrarIdx)?.candidatos || candidatosEjemplo).map(c => (
                <option key={c.id} value={c.email}>{c.nombre} ({c.email})</option>
              ))}
            </select>
            <div className="flex gap-2 mt-4">
              <button
                className="bg-green-600 text-white px-4 py-2 rounded"
                disabled={!candidatoContratado}
                onClick={confirmarCerrarBusqueda}
              >Confirmar cierre</button>
              <button className="bg-gray-400 text-white px-4 py-2 rounded" onClick={() => setCerrarIdx(null)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      <hr className="my-8" />

      {/* Alta y edición de competencias */}
      <h2 className="text-xl font-semibold mb-4">Competencias</h2>
      {/* Nueva competencia */}
      <div className="flex gap-2 mb-4">
        <input type="text" value={nuevaComp} onChange={e => setNuevaComp(e.target.value)} placeholder="Nombre de la competencia" className="border p-2 rounded w-full" />
        <input type="number" value={nuevoPeso} onChange={e => setNuevoPeso(Number(e.target.value))} min={0.1} step={0.1} className="border p-2 rounded w-24" />
        <button onClick={agregarCompetencia} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Agregar</button>
      </div>
      <div className="mb-6">
        <span className="font-medium">Asignar a búsquedas:</span>
        <div className="flex flex-wrap gap-4 mt-2">
          {busquedas.map(b => (
            <label key={b.id} className="flex items-center gap-1">
              <input type="checkbox" checked={nuevaCompBusquedas.includes(b.id)} onChange={ev => {
                if (ev.target.checked) setNuevaCompBusquedas(prev => [...prev, b.id]);
                else setNuevaCompBusquedas(prev => prev.filter(id => id !== b.id));
              }} />
              {b.nombre}
            </label>
          ))}
        </div>
      </div>
      {/* Lista y edición de competencias */}
      <ul className="space-y-2">
        {competencias.map((comp, i) =>
          editCompIdx === i ? (
            <li key={comp.id} className="border p-2 rounded flex flex-col gap-2">
              <div className="flex gap-2">
                <input type="text" value={editCompNombre} onChange={ev => setEditCompNombre(ev.target.value)} className="border p-1 rounded flex-1" />
                <input type="number" value={editCompPeso} onChange={ev => setEditCompPeso(Number(ev.target.value))} min={0.1} step={0.1} className="border p-1 rounded w-20" />
                <button onClick={saveEditComp} className="bg-green-600 text-white px-2 rounded">Guardar</button>
                <button onClick={() => setEditCompIdx(null)} className="text-gray-600 underline">Cancelar</button>
                <button onClick={() => eliminarCompetencia(comp.id)} className="text-red-600 underline">Eliminar</button>
              </div>
              <div>
                <span className="font-medium text-xs">Asignar a búsquedas:</span>
                <div className="flex flex-wrap gap-4 mt-2">
                  {busquedas.map(b => (
                    <label key={b.id} className="flex items-center gap-1">
                      <input type="checkbox" checked={editCompBusquedas.includes(b.id)} onChange={ev => {
                        if (ev.target.checked) setEditCompBusquedas(prev => [...prev, b.id]);
                        else setEditCompBusquedas(prev => prev.filter(id => id !== b.id));
                      }} />
                      {b.nombre}
                    </label>
                  ))}
                </div>
              </div>
            </li>
          ) : (
            <li key={comp.id} className="flex justify-between items-center border p-2 rounded">
              <span>
                {comp.nombre} (peso: {comp.peso})<br />
                <span className="text-xs text-gray-600">
                  Búsquedas: {comp.busquedas.map(id => busquedas.find(b => b.id === id)?.nombre || id).join(", ") || "Sin asignar"}
                </span>
              </span>
              <div className="flex gap-2">
                <button onClick={() => startEditComp(i)} className="text-blue-600 hover:underline text-xs">Editar</button>
                <button onClick={() => eliminarCompetencia(comp.id)} className="text-red-600 hover:underline text-xs">Eliminar</button>
              </div>
            </li>
          )
        )}
      </ul>
    </main>
  );
}
