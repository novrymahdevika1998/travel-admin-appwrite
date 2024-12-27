export type ActionMap<M extends { [index: string]: any }> = {
    [Key in keyof M]: M[Key] extends undefined ? {
        type: Key;
    } : {
        type: Key;
        payload: M[Key];
    };
}

export type AuthUser = Record<string, any> | null;

export type AuthState = {
    isAuthenticated: boolean;
    isInitialized: boolean;
    user: AuthUser;
};

export type JWTContextType = {
    isAuthenticated: boolean;
    isInitialized: boolean;
    user: AuthUser;
    method: 'jwt';
    login: ({ email, password }: { email: string, password: string }) => Promise<void>;
    logout: () => Promise<void>;
    register: ({ email, password }: { email: string, password: string }) => Promise<void>;
}