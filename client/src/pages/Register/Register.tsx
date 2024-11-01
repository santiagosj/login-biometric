import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserForm from '../../componentes/Molecules/UserForm/UserForm';
import './Register.scss';
import { httpRequestFactory } from '../../service/httpRequestFactory';

const Register: React.FC = () => {
    const navigate = useNavigate();
    const registerUser = httpRequestFactory('POST', 'http://localhost:3001/register');

    const fields = [
        { name: 'username', label: 'Username', type: 'text', placeholder: 'Enter your username', required: true },
        { name: 'email', label: 'Email', type: 'email', placeholder: 'example@youremail.com', required: true },
        { name: 'password', label: 'Password', type: 'password', placeholder: '********', required: true },
    ];

    const handleRegister = async (data: { [key: string]: string }) => {
        try {
            const register = await registerUser(data) as Response
            if (register.status === 200) {
                navigate('/login');
            }
        } catch (error) {
            alert('Error registering user');
            console.error('Error registering user:', error);
        }
    };

    return (
        <UserForm
            fields={fields}
            submitLabel='Register'
            handleSubmit={handleRegister}
        />
    )
}

export default Register;