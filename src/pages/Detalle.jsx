import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { useToken } from '../context/SessionContext'



const Detalle = () => {
  const [medicamento, setMedicamento] = useState(null)
  const params = useParams()
  const token = useToken()
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:3333/api/medicamentos/" + params.id,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        }
      }
    )
      .then((res) => res.json())
      .then(data => setMedicamento(data))
      .catch(err => console.log(err.message))

  }, [])

  if (medicamento == null) {
    return <div>Cargando...</div>
  }
  const handleDelete = async () => {
    if (!confirm("¿Seguro que querés eliminar este medicamento?")) return;

    try {
      const res = await fetch("http://localhost:3333/api/medicamentos/" + params.id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        }
      });

      const body = await res.text();
      console.log("Status:", res.status, "Body:", body);

      if (!res.ok) throw new Error("Error al eliminar el medicamento");

      alert("Medicamento eliminado correctamente");
      navigate("/medicamentos");
    } catch (err) {
      console.error(err);
      alert("No tenés permitido eliminar el medicamento");
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">

        <img src={`http://localhost:3333${medicamento.imagen}`} alt="{medicamento.nombre}" className="w-1/2 mx-auto rounded-md mb-4" />

        <h1 className="text-2xl font-bold text-center">
          {medicamento.nombre}
        </h1>

        <div className="mt-4 mb-4 space-y-2 text-gray-700">
          <p><strong>Categoría:</strong> {medicamento.categoria}</p>
          <p><strong>Dosis:</strong> {medicamento.dosis}</p>
          <p><strong>Frecuencia:</strong> {medicamento.frecuencia}</p>
          <p>
            <strong>Nota:</strong> {medicamento.nota || "No hay información"}
          </p>
        </div>

        <Link
          to={`/medicamentos/editar/${medicamento._id}`}
          className="m-1 px-3 py-1 border border-yellow-600 text-yellow-600 rounded text-sm hover:bg-blue-50 transition"
        >
          Editar
        </Link>
        <button
          type='button'
          onClick={handleDelete}
          className="m-1 px-3 py-1 border border-red-600 text-red-600 rounded text-sm hover:bg-blue-50 transition"
        >
          Eliminar
        </button>
        <a
          href={medicamento.link}
          target="_blank"
          className="mt-5 block text-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Más información
        </a>

        <Link
          to="/medicamentos"
          className="mt-4 block text-center bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
        >
          ← Volver
        </Link>

      </div>


    </>
  )
}

export default Detalle
