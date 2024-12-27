import { useAuth } from "@/lib/context/JWTContext"
import { Navigate } from "react-router-dom";

export default function GuestGuard(props : Readonly<{
    children: React.ReactNode
}>) {
    const { isAuthenticated, isInitialized } = useAuth();

    if (isAuthenticated) {
        return <Navigate to="/admin/jamaah" />
    }

    if (!isInitialized) {
        return <div>Loading...</div>
    }

    return <>{props.children}</>
}