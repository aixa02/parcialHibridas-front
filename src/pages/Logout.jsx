import { useEffect } from "react"
import { Navigate } from "react-router"
import { useLogOut } from "../context/SessionContext"


const Logout = () => {
    const logout = useLogOut()
    useEffect(() => {
        logout()
    }, [])
    return <Navigate to="/login" />
}
export default Logout