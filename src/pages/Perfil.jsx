import React, { useContext, useEffect, useState } from "react";
import { useToken } from "../context/SessionContext";

const Perfil = () => {
  const token = useToken();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3333/api/usuarios/perfil", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      }
    })
      .then(res => {
        if (!res.ok) throw new Error("Fetch error");
        return res.json();
      })
      .then(data => {
        //console.log("DATA PERFIL:", data);
        setUsuario(data);
      })
      .catch(err => console.log(err));
  }, [token]);

  if (!usuario) return <p>Cargando...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Perfil</h1>

      <div className="flex justify-end mb-4">
        <a
          href="/perfil/editar"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Editar Perfil
        </a>
      </div>

      <div className="p-4 border rounded space-y-3">

        {usuario.foto ? (
          <img
            src={`http://localhost:3333${usuario.foto}`}
            alt="Avatar"
            className="w-24 h-24 rounded-full object-cover"
          />
        ) : (
          <p><strong>Foto:</strong> No hay información cargada</p>
        )}

        <p><strong>Email:</strong> {usuario.email}</p>

        <p>
          <strong>Nombre:</strong> {usuario.nombre ? usuario.nombre : "No hay información cargada"}
        </p>

        <p>
          <strong>Descripción:</strong> {usuario.descripcion ? usuario.descripcion : "No hay información cargada"}
        </p>
      </div>
    </div>
  );
};

export default Perfil;
