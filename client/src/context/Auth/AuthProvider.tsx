import React, { useState, useEffect } from 'react';
import AuthContext from './AuthContext';
import { User } from '../../models/interfaces/User';

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    // agregar hook useLoading aca

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        //setLoading(false)
    }, [])

    const login = async (username: string, password: string) => {
        const fakeUser: User = { id: '1', username: 'JohnDoe' };
        setUser(fakeUser);
        localStorage.setItem('user', JSON.stringify(fakeUser));
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    }

    const isAuth = !!user;

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuth }}>
            {children}
        </AuthContext.Provider>
    )
}