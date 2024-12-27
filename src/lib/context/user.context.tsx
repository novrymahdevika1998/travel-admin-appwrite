import { useContext, useState, createContext, useEffect, useMemo } from "react";
import { account } from "../appwrite";
import { ID, Models } from "appwrite";
import { useNavigate } from "react-router-dom";

interface IUserAuthContext {
    current: Models.User<Models.Preferences> | null;
    login: (args: { email: string; password: string }) => Promise<void>;
    logout: () => Promise<void>;
    register: (args: { email: string; password: string }) => Promise<void>;
    isLoading: boolean;
}

export const UserAuthContext = createContext<IUserAuthContext>({
    current: null,
    login: async () => {},
    logout: async () => {},
    register: async () => {},
    isLoading: true
});

export const useAuth = () => useContext(UserAuthContext);

export function UserProvider(props: Readonly<{
    children: React.ReactNode
}>) {
    const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
    const [isLoading, setIsLoading] = useState(true);


    async function login({ email, password }: {
        email: string;
        password: string;
    }) {
        await account.createEmailPasswordSession(email, password)

        const loggedIn = await account.get();

        setUser(loggedIn);

        window.location.replace('/admin/upload')
    }

    async function logout() {
        await account.deleteSession('current');
        setUser(null);
        window.location.replace('/login')
    }

    async function register({ email, password }: {
        email: string;
        password: string
    }) {
        await account.create(ID.unique(), email, password)
        await login({email, password})
    }

    async function init() {
        try {
            const loggedIn = await account.get();
            setUser(loggedIn);
        } catch (error) {
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        init();
    }, [])

    const value = useMemo(() => ({ 
        current: user, 
        login,
        logout,
        register,
        isLoading 
    }), [user, isLoading]);

    return (
        <UserAuthContext.Provider value={value}>
            {props.children}
        </UserAuthContext.Provider>
    )
}
