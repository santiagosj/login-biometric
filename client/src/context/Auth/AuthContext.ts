import { createContext } from 'react';
import { User } from '../../models/interfaces/User';

interface AuthContextProps {
    user: User | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    isAuth: boolean
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export default AuthContext;