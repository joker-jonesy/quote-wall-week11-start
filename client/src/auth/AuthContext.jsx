import {createContext, useCallback, useContext, useEffect, useState} from "react";
import {apiFetch, deleteToken, saveToken, getToken, setUnAuthorizedHandler} from "../api.js";

const AuthContext = createContext(null);

export function AuthProvider({children}) {
    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(() => Boolean(getToken()));

    const logout = useCallback(() => {
        deleteToken();
        setUser(null);
    }, []);

    async function authenticate(path, email, password) {
        const data = await apiFetch(path, {
            method: "POST",
            body: {email, password},
            auth: false
        });
        saveToken(data.token);
        setUser(data.user);
    }

    const value = {
        logout,
        user,
        loading,
        login: (email, password) => authenticate("/auth/login", email, password),
        signup: (email, password) => authenticate("/auth/signup", email, password),
    }


    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
    return useContext(AuthContext);
}