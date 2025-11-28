import React from "react";
import { useNavigate } from "react-router";
import { useToken } from "../context/SessionContext";

export default function Home() {
    const navigate = useNavigate();
    const token = useToken(); // null si no hay sesión

    const irMedicamentos = () => {
        if (!token) {
            navigate("/login");
        } else {
            navigate("/medicamentos");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
            <div className="max-w-xl bg-white shadow-xl rounded-2xl p-10 text-center">

                <h1 className="text-3xl font-bold mb-4">
                    ¡Bienvenido a Mis medicamentos!
                </h1>

                <p className="text-gray-700 leading-relaxed mb-6">
                    Tu espacio personal para organizar tus medicamentos de forma simple y segura.
                    <br /><br />
                    En la sección <strong>Medicamentos</strong> vas a poder ver un listado completo,
                    agregar los que uses y editar cada uno según tus necesidades.
                </p>

                <button
                    onClick={irMedicamentos}
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
                >
                    {token ? "Ver mis medicamentos" : "Iniciar sesión para continuar"}
                </button>
            </div>
        </div>
    );
}
