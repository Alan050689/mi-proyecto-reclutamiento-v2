"use client";
import { useState } from "react";
import { usuarios } from "../../data/usuarios";
import { useUser } from "../context/UserContext";
import { useRouter } from "next/navigation";

// La función para generar la contraseña fácil, según lo charlado:
function generarPassword(nombre: string) {
  if (!nombre) return "";
  const [nombrePers, ...apellidos] = nombre
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .split(" ");
  return nombrePers[0] + apellidos.join("");
}

export default function LoginPage() {
  const { setUser } = useUser();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validación de email corporativo
    const emailValido =
      email.trim().toLowerCase().endsWith("@infocorpgroup.com") ||
      email.trim().toLowerCase().endsWith("@infocorpgroup.com.ar");
    if (!emailValido) {
      setError("Solo se permiten emails @infocorpgroup.com o @infocorpgroup.com.ar");
      return;
    }

    // ⬇️ LEER USUARIOS FIJOS Y LOS DE CONFIGURACIÓN
    const usuariosCreados =
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("config-usuarios") || "[]")
        : [];
    const allUsers = [...usuarios, ...usuariosCreados];

    // Buscar usuario en la lista completa
    const user = allUsers.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      setError("Usuario no encontrado");
      return;
    }

    // Contraseña generada (primera letra nombre + apellido, todo minúsculas)
    const expectedPass = generarPassword(user.nombre);

    if (password !== expectedPass) {
      setError("Contraseña incorrecta");
      return;
    }

    // Login exitoso
    setUser(user);
    setSuccess("Acceso exitoso. Redirigiendo...");
    setTimeout(() => {
      router.push("/");
    }, 800); // Espera un poco para UX
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <form
        onSubmit={handleLogin}
        className="bg-white rounded-xl shadow p-8 flex flex-col gap-4 w-full max-w-xs"
      >
        <h1 className="text-2xl mb-2 font-bold text-blue-900">Ingresar</h1>
        <input
          type="email"
          required
          className="border p-2 rounded"
          placeholder="email corporativo"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          required
          className="border p-2 rounded"
          placeholder="contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {error && <span className="text-red-600 text-sm">{error}</span>}
        {success && <span className="text-green-600 text-sm">{success}</span>}
        <button
          type="submit"
          className="bg-blue-700 text-white py-2 rounded font-bold hover:bg-blue-900 transition"
        >
          Entrar
        </button>
        <span className="text-xs text-gray-400 text-center">
          La contraseña es la primera letra de tu nombre y tu apellido, todo junto y en minúsculas.<br />
          Ejemplo: <span className="font-mono">ejemplo.apellido@infocorpgroup.com / dcopette</span>
        </span>
      </form>
    </main>
  );
}

