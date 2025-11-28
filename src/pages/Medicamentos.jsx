import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { SessionContext, useToken } from '../context/SessionContext.jsx';

const Medicamentos = () => {
  const [medicamentos, setMedicamentos] = useState([]);
  const token = useToken();
  const { usuario } = useContext(SessionContext); // contiene _id, nombre, email


  useEffect(() => {
    fetch("http://localhost:3333/api/medicamentos", {
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
      .then(data => setMedicamentos(data))
      .catch(err => console.log(err.message));
  }, [token]);



  const agregarMedicamento = async (medicamentoId) => {
    if (!usuario || !usuario.cliente_id) {
      alert("Debés iniciar sesión para agregar medicamentos.");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:3333/api/clientes/${usuario.cliente_id}/medicamentos`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
          },
          body: JSON.stringify({ medicamentoId })
        }
      );

      if (!res.ok) throw new Error("No se pudo agregar el medicamento");

      const data = await res.json();
      console.log("Agregado con éxito:", data);
      alert("Medicamento agregado correctamente.");
    } catch (error) {
      console.log("Error:", error.message);
      alert("Error al agregar el medicamento.");
    }
  };


  return (
    <>
      <div className="max-w-7xl mx-auto mt-8 px-4">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Medicamentos</h1>
          <Link
            to={"/medicamentos/agregar"}
            className="px-3 py-1 border border-blue-600 text-blue-600 rounded text-sm hover:bg-blue-50 transition"
          >
            Nuevo medicamento
          </Link>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

          {medicamentos.map(medicamento => (
            <div
              key={medicamento._id}
              className="bg-white shadow rounded-lg overflow-hidden flex flex-col h-full p-4"
            >

              <img
                src={`http://localhost:3333${medicamento.imagen}`}
                alt={medicamento.nombre}
                className="rounded-md"
              />


              <div className="flex flex-col flex-1 mt-4">
                <h2 className="text-xl font-bold">{medicamento.nombre}</h2>

                <p className="mt-2">
                  <strong>Categoría:</strong> {medicamento.categoria}
                </p>

                <p className="italic mt-1">{medicamento.nota}</p>


                <div className="mt-auto flex gap-2 pt-4">

                  <Link
                    to={`/medicamentos/${medicamento._id}`}
                    className="px-3 py-1 border border-blue-600 text-blue-600 rounded text-sm hover:bg-blue-50 transition"
                  >
                    Ver detalle
                  </Link>

                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </>
  );
};

export default Medicamentos;
