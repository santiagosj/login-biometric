import { createContext } from 'react';
interface AuthContextProps {
    login: () => void;
    logout: () => void;
    isAuth: boolean
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export default AuthContext;