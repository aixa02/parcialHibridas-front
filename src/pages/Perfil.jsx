import React, { useContext, useEffect, useState } from "react";
import { SessionContext, useSession, useToken } from "../context/SessionContext";

const Perfil = () => {
  const { usuario } = useContext(SessionContext);
  const [cliente, setCliente] = useState(null);
  const token = useToken();
  const [medicamentosUser, setMedicamentosUser] = useState([]);


  useEffect(() => {
    if (usuario?.cliente_id) {
      fetch(`http://localhost:3333/api/clientes/${usuario.cliente_id}/medicamentos`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        }
      })
        .then(res => {
          if (!res.ok) throw new Error("fetch error");
          return res.json();

        })
        .then(data => setMedicamentosUser(data))
        .catch(err => console.log(err.message));
    }
  }, [usuario, token]);



  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Perfil de {usuario.email}</h1>

      {cliente ? (
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Cliente: {cliente.nombre}</h2>
          <p>ID: {cliente._id}</p>
        </div>
      ) : (
        <p>No hay cliente asociado.</p>
      )}

      <h2 className="text-xl font-semibold mb-2">Medicamentos</h2>
      {medicamentos.length === 0 ? (
        <p>No hay medicamentos agregados.</p>
      ) : (
        <ul className="space-y-3">
          {medicamentos.map(med => (
            <li key={med._id} className="flex justify-between items-center p-3 border rounded-lg">
              <div>
                <p className="font-medium">{med.nombre}</p>
                <p className="text-sm text-gray-600">{med.categoria}</p>
              </div>
              <div className="space-x-2">
                <button className="px-3 py-1 bg-yellow-400 rounded hover:bg-yellow-500">Editar</button>
                <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Perfil;
