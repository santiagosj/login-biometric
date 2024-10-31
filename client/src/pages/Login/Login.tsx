import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserForm from '../../componentes/Molecules/UserForm/UserForm';
import { httpRequestFactory } from '../../service/httpRequestFactory';
import { useAuth } from '../../hooks/useAuth';
import './Login.scss';

interface LoginResponse {
    status: number,
    message: string,
    user: {
        email: string,
        username: string
    }
}

const Login: React.FC = () => {

    const loginUser = httpRequestFactory('POST', 'http://localhost:3001/login');
    const navigate = useNavigate();
    const fields = [
        { name: 'email', label: 'Email', type: 'text', placeholder: 'Enter your email', required: true },
        { name: 'password', label: 'Password', type: 'password', placeholder: '********', required: true },
    ];
    const { login } = useAuth();

    const handleLogin = async (data: { [key: string]: string }) => {
        try {
            const responseLogin: unknown = await loginUser(data);
            const { status, user } = responseLogin as LoginResponse; // asercion de tipo
            if (status === 200) {
                login();
                navigate('/user-info');
                console.log(user);
            } else {
                alert('Error al iniciar sesión');
            }

            console.log(responseLogin);

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <UserForm
            fields={fields}
            submitLabel='Login'
            handleSubmit={handleLogin}
        />
    )
}

export default Login;