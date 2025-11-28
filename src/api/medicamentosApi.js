// src/api/medicamentosApi.js

const API_URL = "http://localhost:3333/api/medicamentos";

// ✔ Traer todos los medicamentos (requiere token)
export async function getMedicamentos(token) {
    const response = await fetch(API_URL, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error("Error al obtener medicamentos");
    }

    return response.json();
}

// ✔ Traer medicamento por ID
export async function getMedicamentoById(id, token) {
    const response = await fetch(`${API_URL}/${id}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error("Error al obtener medicamento");
    }

    return response.json();
}

// ✔ Crear nuevo medicamento
export async function createMedicamento(data, token) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error("Error al crear medicamento");
    }

    return response.json();
}

// ✔ Editar medicamento
export async function updateMedicamento(id, data, token) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error("Error al editar medicamento");
    }

    return response.json();
}

// ✔ Eliminar medicamento
export async function deleteMedicamento(id, token) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error("Error al eliminar medicamento");
    }

    return response.json();
}
