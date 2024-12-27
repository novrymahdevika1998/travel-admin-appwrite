import { useContext, createContext, useEffect, useMemo, useReducer } from "react";
import { account } from "../appwrite";
import { ID } from "appwrite";
import { isValidToken, setSession } from "@/utils/jwt";
import { ActionMap, AuthState, AuthUser, JWTContextType } from "@/@types/auth";

export const UserAuthContext = createContext<JWTContextType | null>(null);

enum Types {
    Initial = 'INITIALIZE',
    Login = 'LOGIN',
    Logout = 'LOGOUT',
    Register = 'REGISTER',
}

type JWTAuthPayload = {
    [Types.Initial]: {
        isAuthenticated: boolean;
        user: AuthUser;
    };
    [Types.Login]: {
        user: AuthUser;
    };
    [Types.Logout]: undefined;
    [Types.Register]: {
        user: AuthUser;
    };
};

export type JWTActions = ActionMap<JWTAuthPayload>[keyof ActionMap<JWTAuthPayload>];

const initialState: AuthState = {
    isAuthenticated: false,
    isInitialized: false,
    user: null,
};

const JWTReducer = (state: AuthState, action: JWTActions) => {
    switch (action.type) {
        case 'INITIALIZE':
            return {
                isAuthenticated: action.payload.isAuthenticated,
                isInitialized: true,
                user: action.payload.user,
            };
        case 'LOGIN':
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
            };
        case 'LOGOUT':
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            };

        case 'REGISTER':
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
            };

        default:
            return state;
    }
};

export const useAuth = () => {
    const context = useContext(UserAuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an UserProvider');
    }

    return context;
}

export function UserProvider(props: Readonly<{
    children: React.ReactNode
}>) {
    const [state, dispatch] = useReducer(JWTReducer, initialState);

    async function login({ email, password }: {
        email: string;
        password: string;
    }) {
        await account.createEmailPasswordSession(email, password)

        const result = await account.createJWT();

        setSession(result.jwt);

        const user = await account.get();

        dispatch({
            type: Types.Login,
            payload: {
                user
            }
        })
    }

    async function logout() {
        await account.deleteSession('current');
        setSession(null);
        dispatch({
            type: Types.Logout
        })
    }

    async function register({ email, password }: {
        email: string;
        password: string
    }) {
        await account.create(ID.unique(), email, password)
        await login({ email, password })
    }

    useEffect(() => {
        const init = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                const user = await account.get();

                if (accessToken && isValidToken(accessToken)) {
                    setSession(accessToken);


                    user && dispatch({
                        type: Types.Initial,
                        payload: {
                            isAuthenticated: true,
                            user
                        }
                    })
                } else {
                    dispatch({
                        type: Types.Initial,
                        payload: {
                            isAuthenticated: false,
                            user: null
                        }
                    })
                }
            } catch (error) {
                dispatch({
                    type: Types.Initial,
                    payload: {
                        isAuthenticated: false,
                        user: null
                    }
                })
            }
        }
        init()
    }, [])

    const value = useMemo(() => ({
        ...state,
        method: "jwt" as const,
        login,
        logout,
        register,
    }), [state]);

    return (
        <UserAuthContext.Provider value={value}>
            {props.children}
        </UserAuthContext.Provider>
    )
}
