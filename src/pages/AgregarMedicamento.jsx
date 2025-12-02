import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useToken } from "../context/SessionContext.jsx";

export default function AgregarMedicamento() {

    const navigate = useNavigate();
    const token = useToken();

    const [nombre, setNombre] = useState("");
    const [categoria, setCategoria] = useState("");
    const [dosis, setDosis] = useState("");
    const [frecuencia, setFrecuencia] = useState("");
    const [nota, setNota] = useState("");
    const [link, setLink] = useState("");

    // Nuevo: estado para guardar las categorías cargadas desde la API
    const [categorias, setCategorias] = useState([]);

    // Nuevo: carga de categorías al montar el componente
    useEffect(() => {
        async function cargarCategorias() {
            try {
                const res = await fetch("http://localhost:3333/api/categorias", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token
                    },
                });

                if (!res.ok) throw new Error("Error al obtener categorías");

                const data = await res.json();
                setCategorias(data);
            } catch (err) {
                console.error(err);
                alert("No se pudieron cargar las categorías");
            }
        }

        cargarCategorias();
    }, [token]);

    // Submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        const nuevoMedicamento = {
            nombre,
            categoria,
            dosis,
            frecuencia,
            nota,
            link
        };

        try {
            const res = await fetch("http://localhost:3333/api/medicamentos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify(nuevoMedicamento)
            });

            const text = await res.text();
            console.log("Status:", res.status, "Body:", text);

            if (!res.ok) throw new Error("Error al guardar el medicamento");

            alert("Medicamento agregado correctamente");
            navigate("/medicamentos");

        } catch (err) {
            console.error(err);
            alert("No se pudo guardar el medicamento");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-4 text-center">Agregar Medicamento</h1>

            <form onSubmit={handleSubmit} className="space-y-4">

                <input
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />

                {/* Nuevo: select dinámico */}
                <select
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    value={categoria}
                    onChange={e => setCategoria(e.target.value)}
                >
                    <option value="">Selecciona una categoría</option>

                    {categorias.map(cat => (
                        <option key={cat._id} value={cat.nombre}>
                            {cat.nombre}
                        </option>
                    ))}
                </select>

                <input
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    placeholder="Dosis"
                    value={dosis}
                    onChange={e => setDosis(e.target.value)}
                />

                <input
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    placeholder="Frecuencia"
                    value={frecuencia}
                    onChange={e => setFrecuencia(e.target.value)}
                />

                <textarea
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    placeholder="Nota"
                    value={nota}
                    onChange={e => setNota(e.target.value)}
                />

                <input
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    placeholder="Link (opcional)"
                    value={link}
                    onChange={e => setLink(e.target.value)}
                />

                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full">
                    Guardar
                </button>
            </form>
        </div>
    );
}
