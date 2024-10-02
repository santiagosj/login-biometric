import React from 'react';
import UserForm from '../../componentes/Molecules/UserForm/UserForm';
import { httpRequestFactory } from '../../service/httpRequestFactory';
import './Login.scss';

const Login: React.FC = () => {

    const fields = [
        { name: 'username', label: 'Username', type: 'text', placeholder: 'Enter your username', required: true },
        { name: 'password', label: 'Password', type: 'password', placeholder: '********', required: true },
    ];

    const handleLogin = (data: { [key: string]: string }) => {
        console.log('Login data:', data);
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