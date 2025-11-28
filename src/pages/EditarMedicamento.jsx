import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { useToken } from "../context/SessionContext.jsx";

export default function EditMedicamento() {
    const { id } = useParams();
    const token = useToken();
    const navigate = useNavigate();
    const [medicamento, setMedicamento] = useState(null);
    const [loading, setLoading] = useState(true);

    const [nombre, setNombre] = useState("");
    const [categoria, setCategoria] = useState("");
    const [dosis, setDosis] = useState("");
    const [frecuencia, setFrecuencia] = useState("");
    const [nota, setNota] = useState("");
    const [link, setLink] = useState("");
    const [imagen, setImagen] = useState("");

    useEffect(() => {
        const fetchMedicamento = async () => {
            try {
                const res = await fetch(`http://localhost:3333/api/medicamentos/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token,
                    },
                });

                if (!res.ok) throw new Error("Error al cargar el medicamento");

                const data = await res.json();

                setMedicamento(data);
                setNombre(data.nombre);
                setCategoria(data.categoria);
                setDosis(data.dosis);
                setFrecuencia(data.frecuencia);
                setNota(data.nota);
                setLink(data.link);
                setImagen(data.imagen);

                setLoading(false);

            } catch (err) {
                console.error(err);
                alert("No se pudo cargar el medicamento");
            }
        };

        fetchMedicamento();
    }, [id, token]);

    if (loading) return <p className="text-center mt-10">Cargando...</p>;
    const handleSubmit = async () => {

        const updatedMedicamento = {
            nombre: nombre || medicamento.nombre,
            categoria: categoria || medicamento.categoria,
            dosis: dosis || medicamento.dosis,
            frecuencia: frecuencia || medicamento.frecuencia,
            nota: nota || medicamento.nota,
            link: link || medicamento.link,
            imagen: imagen || medicamento.imagen

        };
        console.log("Datos que envío al backend:", updatedMedicamento)
        try {
            const res = await fetch(`http://localhost:3333/api/medicamentos/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify(updatedMedicamento),
            });
            const text = await res.text();  
            //console.log("Status:", res.status, "Body:", text);
            if (!res.ok) throw new Error("Error al actualizar el medicamento");
            alert("Medicamento actualizado!");
            navigate(`/medicamentos/${id}`);
        } catch (err) {
            console.error(err);
            alert("No se pudo actualizar el medicamento");
        }
    };




    return (
        <>
            <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
                <img
                    src={`http://localhost:3333${imagen}`}
                    alt={nombre}
                    className="w-1/2 mx-auto rounded-md mb-4"
                />

                <h1 className="text-2xl font-bold text-center mb-4">Editar Medicamento</h1>

                <div className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Nombre</label>
                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Categoría</label>
                        <input
                            type="text"
                            value={categoria}
                            onChange={(e) => setCategoria(e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Dosis</label>
                        <input
                            type="text"
                            value={dosis}
                            onChange={(e) => setDosis(e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Frecuencia</label>
                        <input
                            type="text"
                            value={frecuencia}
                            onChange={(e) => setFrecuencia(e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Nota</label>
                        <textarea
                            value={nota}
                            onChange={(e) => setNota(e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Link</label>
                        <input
                            type="text"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>


                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition mt-4"
                    >
                        Guardar cambios
                    </button>

                    <Link
                        to={`/medicamentos/${id}`}
                        className="block text-center bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition mt-2"
                    >
                        ← Volver
                    </Link>
                </div>
            </div>

        </>);
}
