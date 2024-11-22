import React from 'react';
import * as webauthn from '@github/webauthn-json';
import { httpRequestFactory } from '../../service/httpRequestFactory';
import UserForm from '../../componentes/Molecules/UserForm/UserForm';
import { ServerResponse, RegisterDeviceOptions } from './DevicesInterfaces';

const Devices: React.FC = () => {
    const registerDeviceRequest = httpRequestFactory('POST', 'http://localhost:3001/register/complete');
    const saveCredentialRequest = httpRequestFactory('POST', 'http://localhost:3001/register/save-credentials');

    const fields = [
        {
            name: 'email',
            label: 'Email',
            type: 'email',
            placeholder: 'example@youremail.com',
            required: true
        },
    ];

    const handleDeviceRegister = async (data: { [key: string]: string }) => {
        try {

            if (!window.PublicKeyCredential) {
                alert("Tu dispositivo no soporta WebAuthn. Intenta con otro navegador o dispositivo.");
                return;
            }

            const registerDeviceResponse = await registerDeviceRequest(data) as ServerResponse;
            const options = registerDeviceResponse?.options as RegisterDeviceOptions;

            if (!options) {
                console.error('No options received from server');
                return;
            }

            // Usar las opciones de registro con webauthn
            const credential = await webauthn.create(options);

            const saveCredentialResponse = await saveCredentialRequest({
                userId: options.publicKey.user.id,
                credentialId: credential.id,
                publicKey: JSON.stringify(credential.response),
            });

            console.log('Credential saved on server:', saveCredentialResponse);
        } catch (error) {
            console.error('Error in device registration:', error);
        }
    };

    return (
        <>
            <h1>Devices</h1>
            <UserForm
                fields={fields}
                submitLabel='Register Device'
                handleSubmit={handleDeviceRegister}
            />
        </>
    );
};

export default Devices;
