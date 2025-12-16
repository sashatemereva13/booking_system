import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({children}) {
    const [token, setToken] = useState(localStorage.getItem("token"));

    function login(token) {
        localStorage.setItem("token", token);
        setToken(token);
    }

    function logout() {
        localStorage.removeItem("token");
        setToken(null);
    }

    return (
        <AuthContext.Provider value={{
            isLogged: !!token,
            token, login, logout}}>
                {children}
                </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);