import { useAuth } from "@/lib/context/JWTContext";
import { ReactNode, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

type AuthGuardProps = {
    children: ReactNode;
  };
export default function AuthGuard({ children } : Readonly<AuthGuardProps>) {
    const { isAuthenticated, isInitialized } = useAuth();

    const { pathname } = useLocation();

    const [requestedLocation, setRequestedLocation] = useState<string | null>(null)

    if (!isInitialized) {
        return <div>Loading...</div>;
    }
    
    if (!isAuthenticated) {
        if (pathname !== requestedLocation) {
            setRequestedLocation(pathname)
        }
        return <Navigate to='/login' />;
    }


    if (requestedLocation && pathname !== requestedLocation) {
        setRequestedLocation(null)
        return <Navigate to={requestedLocation} />
    }

    return <>{children}</>;
}