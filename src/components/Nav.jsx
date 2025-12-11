import React from 'react'
import { Link } from 'react-router'
import { useState } from "react";
import { useUsuario } from '../context/SessionContext';

const Nav = () => {
    const [open, setOpen] = useState(false);
    const usuario = useUsuario()
    return (
        <>
            <header>
                <nav className="w-full bg-white border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex items-center justify-between h-16">

                            {/* Botón menú (izquierda) */}
                            <button
                                onClick={() => setOpen(!open)}
                                className="md:hidden p-2 rounded hover:bg-gray-100"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    fill="none" viewBox="0 0 24 24"
                                    strokeWidth="1.5" stroke="currentColor"
                                    className="w-6 h-6">
                                    <path strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3.75 5.75h16.5m-16.5 6.5h16.5m-16.5 6.5h16.5" />
                                </svg>
                            </button>

                            {/* Links centrados (desktop) */}
                            <div className="hidden md:flex space-x-8 mx-auto text-lg font-medium">
                                <Link to="/" className="hover:text-blue-600">Inicio</Link>

                                {usuario?.email && <Link to="/medicamentos" className="hover:text-blue-600">Medicamentos</Link>}
                                {usuario?.email && <Link to="/medicamentos_compartidos" className="hover:text-blue-600">Medicamentos compartidos</Link>}
                                {usuario?.email && <Link to="/perfil" className="hover:text-blue-600">Perfil</Link>}

                                {!usuario?.email && <Link to="/login" className="hover:text-blue-600">Iniciar Sesión</Link>}
                                {usuario?.email && <Link to="/logout" className="hover:text-blue-600">Cerrar Sesión</Link>}

                            </div>

                            <div className="w-6 md:hidden"></div>

                        </div>

                        {/* Menú móvil */}
                        {open && (
                            <div className="md:hidden flex flex-col gap-4 py-4 text-center text-lg font-medium">
                                <Link to="/" className="hover:text-blue-600">Inicio</Link>
                                {usuario?.email && <Link to="/medicamentos" className="hover:text-blue-600">Medicamentos</Link>}
                                {usuario?.email && <Link to="/medicamentos_compartidos" className="hover:text-blue-600">Medicamentos compartidos</Link>}
                                {usuario?.email && <Link to="/perfil" className="hover:text-blue-600">Perfil</Link>}

                                {!usuario?.email && <Link to="/login" className="hover:text-blue-600">Iniciar Sesión</Link>}
                                {usuario?.email && <Link to="/logout" className="hover:text-blue-600">Cerrar Sesión</Link>}

                            </div>
                        )}
                    </div>
                </nav>
            </header>

        </>
    )
}

export default Nav
