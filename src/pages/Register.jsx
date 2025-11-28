import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router';
const Register = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const handleSubmit = () => {

        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden")
            setSuccess("")
            return
        }

        fetch("http://localhost:3333/api/usuarios", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password, confirmPassword })
        })
            .then(res => {
                if (!res.ok) throw new Error("No se pudo crear el usuario")
                return res.json()
            })
            .then(() => {
                setError("")
                setTimeout(() => navigate("/"), 1200)
            })
            .catch(err => {
                setSuccess("")
                setError(err.message)
            })
    }

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">

                <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8">

                    <h2 className="text-2xl font-semibold text-center mb-6">
                        Crear cuenta
                    </h2>

                    <div className="space-y-5">

                        {error.length > 0 && <p className='text-red-700'>{error}</p>}
                        {success.length > 0 && <p className='text-green-700'>{success}</p>}

                        <div>
                            <label className="block text-sm font-medium mb-1">Email</label>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Ingresá tu email"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Contraseña</label>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Debe contener aunque sea un número y  una mayúscula"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Confirmar contraseña</label>
                            <input
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                type="password"
                                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Repetí la contraseña"
                            />
                        </div>

                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl transition">
                            Registrarme
                        </button>

                    </div>

                    <div className="my-6 text-center text-gray-500">o</div>

                    <Link to="/login"
                        className="block w-full py-2 rounded-xl text-center font-semibold border border-gray-300 text-gray-700 hover:bg-gray-100 transition">
                        Ya tengo una cuenta
                    </Link>


                </div>

            </div>
        </>
    )
}

export default Register
