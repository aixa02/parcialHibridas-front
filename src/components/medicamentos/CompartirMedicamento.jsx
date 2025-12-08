import { useState, useEffect } from "react";

export default function CompartirMedicamento({
    medicamentoId,
    token,
    compartidoCon,
    onRefresh
}) {

    const [email, setEmail] = useState("");
    const [resultados, setResultados] = useState([]);
    const [timeoutId, setTimeoutId] = useState(null);

    const buscarUsuarios = async (texto) => {
        if (!texto.trim()) {
            setResultados([]);
            return;
        }

        try {
            const res = await fetch(`http://localhost:3333/api/usuarios/buscar?email=${texto}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            });

            if (!res.ok) throw new Error("Error al buscar usuarios");
            console.log("Buscando:", texto);

            const data = await res.json();
            setResultados(data);

        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (value) => {
        setEmail(value);

        if (timeoutId) clearTimeout(timeoutId);

        const newTimeout = setTimeout(() => {
            buscarUsuarios(value);
        }, 300);

        setTimeoutId(newTimeout);
    };


    const handleSelectUser = (mail) => {
        setEmail(mail);
        setResultados([]);
    };


    const invite = async () => {
        try {
            const res = await fetch(`http://localhost:3333/api/medicamentos/${medicamentoId}/compartir`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify({ email })
            });

            if (!res.ok) throw new Error("Error al agregar colaborador");

            setEmail("");
            setResultados([]);
            onRefresh();
            alert("Colaborador agregado!");

        } catch (err) {
            console.error(err);
            alert("No se pudo agregar colaborador");
        }
    };


    const removeColaborador = async (userId) => {
        if (!confirm("¿Quitar acceso?")) return;

        try {
            const res = await fetch(`http://localhost:3333/api/medicamentos/${medicamentoId}/compartir/${userId}`, {
                method: "DELETE",
                headers: { "Authorization": "Bearer " + token }
            });

            if (!res.ok) throw new Error("Error al quitar acceso");

            onRefresh();
            alert("Acceso eliminado");

        } catch (err) {
            console.error(err);
            alert("No se pudo eliminar acceso");
        }
    };


    return (
        <div className="mt-8 p-4 rounded-lg bg-gray-50">
            <h2 className="text-xl font-bold mb-4">Compartir medicamento</h2>

            <div className="relative">
                <input
                    type="text"
                    value={email}
                    onChange={e => handleChange(e.target.value)}
                    placeholder="Buscar usuario por email..."
                    className="w-full border border-gray-300 px-3 py-2 rounded"
                />

                {resultados.length > 0 && (
                    <div className="absolute z-10 bg-white border w-full shadow rounded mt-1 max-h-40 overflow-y-auto">
                        {resultados.map(u => (
                            <div
                                key={u._id}
                                onClick={() => handleSelectUser(u.email)}
                                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                            >
                                {u.email}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <button
                onClick={invite}
                className="mt-3 bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-700"
            >
                Compartir
            </button>

            <h3 className="mt-6 font-semibold">Usuarios con acceso:</h3>

            {compartidoCon?.length ? (
                <ul className="mt-2 space-y-2">
                    {compartidoCon.map(col => (
                        <li key={col._id} className="flex justify-between bg-white p-2 shadow rounded">
                            <span>{col.email}</span>

                            <button
                                onClick={() => removeColaborador(col._id)}
                                className="bg-red-600 text-white px-3 py-1 rounded"
                            >
                                Eliminar
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500 mt-2">No se compartió este medicamento.</p>
            )}
        </div>
    );
}
