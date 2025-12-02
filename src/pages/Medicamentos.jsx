import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { SessionContext, useToken } from '../context/SessionContext.jsx';

const FiltrarCategorias = ({ onFiltrar }) => {
  const token = useToken();
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    async function cargarCategorias() {
      try {
        const res = await fetch("http://localhost:3333/api/categorias", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
          }
        });
        if (!res.ok) throw new Error("No se pudieron cargar las categorías");
        const data = await res.json();
        setCategorias(data);
      } catch (err) {
        console.error(err);
      }
    }

    cargarCategorias();
  }, [token]);

  return (
    <div className="flex gap-2 flex-wrap mb-4">
      <button
        className="px-3 py-1 border border-gray-400 rounded text-sm hover:bg-gray-100 transition"
        onClick={() => onFiltrar("")} // Mostrar todos
      >
        Todas
      </button>
      {categorias.map(cat => (
        <button
          key={cat._id}
          className="px-3 py-1 border border-blue-600 text-blue-600 rounded text-sm hover:bg-blue-50 transition"
          onClick={() => onFiltrar(cat.nombre)}
        >
          {cat.nombre}
        </button>
      ))}
    </div>
  );
};

const Medicamentos = () => {
  const [medicamentos, setMedicamentos] = useState([]);
  const [medicamentosFiltrados, setMedicamentosFiltrados] = useState([]);
  const token = useToken();
  const { usuario } = useContext(SessionContext);

  const cargarMedicamentos = async () => {
    try {
      const res = await fetch("http://localhost:3333/api/medicamentos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        }
      });
      if (!res.ok) throw new Error("fetch error");
      const data = await res.json();
      setMedicamentos(data);
      setMedicamentosFiltrados(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    cargarMedicamentos();
  }, [token]);

  const filtrarPorCategoria = (categoria) => {
    if (!categoria) {
      setMedicamentosFiltrados(medicamentos);
    } else {
      setMedicamentosFiltrados(medicamentos.filter(m => m.categoria === categoria));
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-8 px-4">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-semibold">Medicamentos</h1>
        <Link
          to={"/medicamentos/agregar"}
          className="px-3 py-1 border bg-blue-600 text-amber-50 rounded text-sm hover:bg-blue-50 hover:text-blue-600 transition"
        >
          Nuevo medicamento
        </Link>
      </div>


      <FiltrarCategorias onFiltrar={filtrarPorCategoria} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {medicamentosFiltrados.length > 0 ? (
          medicamentosFiltrados.map(medicamento => (
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
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 mt-4">
            No hay medicamentos para esta categoría.
          </p>
        )}
      </div>

    </div>
  );
};

export default Medicamentos;
