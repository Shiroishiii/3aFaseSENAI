import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext()

// eslint-disable-next-line no-unused-vars
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    // se já tiver email no localStorage, mantém login

    useEffect(() => {
        const savedEmail = localStorage.getItem('email')

        if (savedEmail) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setUser({ email: savedEmail })
        }
    }, [])

    const login = (email) => {
        localStorage.setItem('email', email)
        setUser({ email })
    }

    const logout = () => {
        localStorage.removeItem('email')
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )

}

//hook customizado para consumir o contexto

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext)