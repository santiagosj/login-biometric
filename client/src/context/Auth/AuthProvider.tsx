import React, { useState } from 'react';
import AuthContext from './AuthContext';

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuth, setIsAuth] = useState<boolean>(false);

    const login = () => setIsAuth(true);
    const logout = () => setIsAuth(false);

    return (
        <AuthContext.Provider value={{ login, logout, isAuth }}>
            {children}
        </AuthContext.Provider>
    )
}
