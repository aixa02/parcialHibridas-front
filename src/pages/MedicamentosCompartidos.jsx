import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router";
import { SessionContext, useToken } from "../context/SessionContext.jsx";

const FiltrarCategorias = ({ onFiltrar, categorias }) => {
    return (
        <div className="flex gap-2 flex-wrap mb-4">
            <button
                className="px-3 py-1 border border-gray-400 rounded text-sm hover:bg-gray-100 transition"
                onClick={() => onFiltrar("")}
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

export default function MedicamentosCompartidos() {
    const token = useToken();
    const { usuario } = useContext(SessionContext);

    const [medicamentos, setMedicamentos] = useState([]);
    const [medicamentosFiltrados, setMedicamentosFiltrados] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
    const [textoBusqueda, setTextoBusqueda] = useState("");

    useEffect(() => {
        const cargarCategorias = async () => {
            try {
                const res = await fetch("http://localhost:3333/api/categorias", {
                    headers: { "Authorization": "Bearer " + token }
                });
                const data = await res.json();
                setCategorias(data);
            } catch (err) {
                console.error(err);
            }
        };

        const cargarMedicamentosCompartidos = async () => {
            try {
                const res = await fetch("http://localhost:3333/api/medicamentos/medicamentos_compartidos", {
                    headers: { "Authorization": "Bearer " + token }
                });
                const data = await res.json();
                setMedicamentos(data);
                setMedicamentosFiltrados(data);
            } catch (err) {
                console.error(err);
            }
        };

        cargarCategorias();
        cargarMedicamentosCompartidos();
    }, [token]);

    useEffect(() => {
        let filtrados = medicamentos;
        if (categoriaSeleccionada) {
            filtrados = filtrados.filter(m => m.categoria === categoriaSeleccionada);
        }
        if (textoBusqueda.trim() !== "") {
            filtrados = filtrados.filter(m =>
                m.nombre.toLowerCase().includes(textoBusqueda.toLowerCase())
            );
        }
        setMedicamentosFiltrados(filtrados);
    }, [categoriaSeleccionada, textoBusqueda, medicamentos]);

    return (
        <div className="max-w-7xl mx-auto mt-8 px-4">
            <h1 className="text-2xl font-semibold mb-4">Medicamentos Compartidos</h1>

            <input
                type="text"
                placeholder="Buscar por nombre..."
                className="w-full border px-3 py-2 rounded mb-4"
                value={textoBusqueda}
                onChange={e => setTextoBusqueda(e.target.value)}
            />

            <FiltrarCategorias onFiltrar={setCategoriaSeleccionada} categorias={categorias} />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {medicamentosFiltrados.length > 0 ? (
                    medicamentosFiltrados.map(m => (
                        <div key={m._id} className="bg-white shadow rounded-lg overflow-hidden flex flex-col h-full p-4">
                            <img src={`http://localhost:3333${m.imagen}`} alt={m.nombre} className="rounded-md" />
                            <div className="flex flex-col flex-1 mt-4">
                                <h2 className="text-xl font-bold">{m.nombre}</h2>
                                <p className="mt-2"><strong>Categoría:</strong> {m.categoria}</p>
                                <p className="italic mt-1">{m.nota}</p>
                                <div className="mt-auto flex gap-2 pt-4">
                                    <Link to={`/medicamentos/${m._id}`} className="px-3 py-1 border border-blue-600 text-blue-600 rounded text-sm hover:bg-blue-50 transition">
                                        Ver detalle
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500 mt-4">
                        No hay medicamentos compartidos.
                    </p>
                )}
            </div>
        </div>
    );
}
