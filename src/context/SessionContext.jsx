import { createContext, useContext, useState } from "react";

const SessionContext = createContext();

export function useSession() { return useContext(SessionContext); }
export function useUsuario() { const { usuario } = useSession(); return usuario; }
export function useLogin() { const { onLogin } = useSession(); return onLogin; }
export function useToken() { const { token } = useSession(); return token; }
export function useLogOut() { const { onLogOut } = useSession(); return onLogOut; }

function SessionProvider({ children }) {
    const storedSession = localStorage.getItem("session");
    const storedToken = localStorage.getItem("token");

    const [usuario, setUsuario] = useState(
        storedSession ? JSON.parse(storedSession) : null
    );
    const [token, setToken] = useState(
        storedToken ? JSON.parse(storedToken) : ""
    );
    const [cliente, setCliente] = useState(
        storedSession ? JSON.parse(storedSession).cliente || null : null
    );

    const onLogin = (data) => {
        const usuarioCompleto = {
            _id: data.usuario._id,
            email: data.usuario.email,
            cliente: data.cliente,
            token: data.token
        };
        setUsuario(usuarioCompleto);
        setCliente(data.cliente || null);
        setToken(data.token);

        localStorage.setItem("session", JSON.stringify(usuarioCompleto));
        localStorage.setItem("token", JSON.stringify(data.token));
    }

    const onLogOut = () => {
        setUsuario(null);
        setCliente(null);
        setToken("");
        localStorage.clear();
    }

    return (
        <SessionContext.Provider value={{ usuario, cliente, onLogin, onLogOut, token }}>
            {children}
        </SessionContext.Provider>
    )
}

export { SessionContext, SessionProvider }
