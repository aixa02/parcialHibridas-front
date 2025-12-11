import React, { useState, useEffect } from "react";
import { useToken } from "../context/SessionContext";
import { useNavigate } from "react-router";

const EditarPerfil = () => {
    const token = useToken();
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [foto, setFoto] = useState(null);
    const [preview, setPreview] = useState(null);
    const navigate = useNavigate();

    // Carga los datos actuales del perfil
    useEffect(() => {
        fetch("http://localhost:3333/api/usuarios/perfil", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        })
            .then(res => res.json())
            .then(data => {
                setNombre(data.nombre || "");
                setDescripcion(data.descripcion || "");
                if (data.foto) setPreview(`http://localhost:3333${data.foto}`);
            })
            .catch(err => console.log(err));
    }, [token]);

    // Preview de la imagen seleccionada
    const handleFotoChange = (e) => {
        const file = e.target.files[0];
        setFoto(file);
        if (file) setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("descripcion", descripcion);
        if (foto) formData.append("foto", foto);

        try {
            const res = await fetch("http://localhost:3333/api/usuarios/perfil", {
                method: "PUT",
                headers: {
                    "Authorization": "Bearer " + token
                },
                body: formData
            });

            if (!res.ok) throw new Error("Error al actualizar perfil");

            alert("Perfil actualizado correctamente!");
            navigate("/perfil");

        } catch (err) {
            console.error(err);
            alert("No se pudo actualizar el perfil");
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Editar Perfil</h1>

            <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
                <div className="space-y-2">
                    <label className="block mb-1 font-semibold">Foto de perfil</label>

                    {preview && (
                        <img src={preview} alt="Preview" className="w-24 h-24 rounded-full object-cover border mb-2" />
                    )}
                    <label
                        htmlFor="foto"
                        className="cursor-pointer px-4 py-2 bg-gray-100 border rounded hover:bg-gray-200 inline-block"
                    >Seleccionar archivo</label>
                    <input
                        id="foto" type="file" accept="image/*" onChange={handleFotoChange} name="foto" className="hidden"
                    />
                </div>


                <div>
                    <label className="block mb-1 font-semibold">Nombre</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-semibold">Descripción</label>
                    <textarea
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                        rows="4"
                    />
                </div>

                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Guardar cambios
                </button>
            </form>
        </div>
    );
};

export default EditarPerfil;
