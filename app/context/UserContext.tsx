"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { usuarios, Usuario } from "../../data/usuarios";

type UserContextType = {
  user: Usuario | null;
  setUser: (u: Usuario | null) => void;
};

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(null);

  useEffect(() => {
    const storedId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;
    if (storedId) {
      const found = usuarios.find((u: Usuario) => u.id === storedId);
      if (found) setUser(found);
    }
  }, []);

  const handleSetUser = (u: Usuario | null) => {
    setUser(u);
    if (typeof window !== "undefined") {
      if (u) localStorage.setItem("userId", u.id);
      else localStorage.removeItem("userId");
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser: handleSetUser }}>
      {children}
    </UserContext.Provider>
  );
}
