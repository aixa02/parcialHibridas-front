import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client' //crea la instancia de react
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import './index.css'
import App from './App.jsx'
import Home from './pages/Home.jsx';
import Detalle from './pages/Detalle.jsx';
import Layout from './components/Layout.jsx';
import Perfil from './pages/Perfil.jsx';
import Medicamentos from './pages/Medicamentos.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { SessionProvider } from './context/SessionContext.jsx';
import Logout from './pages/Logout.jsx';
import EditarMedicamento from './pages/EditarMedicamento.jsx';
import AgregarMedicamento from './pages/AgregarMedicamento.jsx';
import MedicamentosCompartidos from './pages/medicamentosCompartidos.jsx';
import EditarPerfil from './pages/EditarPerfil.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/medicamentos",
        element: <ProtectedRoute component={<Medicamentos />} />,
      },
      {
        path: "/medicamentos_compartidos",
        element: <ProtectedRoute component={<MedicamentosCompartidos />} />,
      },

      {
        path: "/medicamentos/:id",
        element: <ProtectedRoute component={<Detalle />} />,
      },
      {
        path: "/medicamentos/editar/:id",
        element: <ProtectedRoute component={<EditarMedicamento />} />,
      },
      {
        path: "/medicamentos/agregar",
        element: <ProtectedRoute component={<AgregarMedicamento />} />,
      },
      {
        path: "/perfil",
        element: <ProtectedRoute component={<Perfil />} />,
      },
      {
        path: "/perfil/editar",
        element: <ProtectedRoute component={<EditarPerfil />} />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/logout",
        element: <Logout />,
      },
    ]
  },

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SessionProvider >
      <RouterProvider router={router} />
    </SessionProvider >
  </StrictMode>,
)

