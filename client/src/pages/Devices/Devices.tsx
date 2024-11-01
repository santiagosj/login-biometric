import React from 'react';
import * as webauthn from '@github/webauthn-json';
import { httpRequestFactory } from '../../service/httpRequestFactory';
import UserForm from '../../componentes/Molecules/UserForm/UserForm';

type ResidentKeyRequirement = "required" | "preferred" | "discouraged";
type AttestationConveyancePreference = "none" | "indirect" | "direct" | "enterprise";

interface ServerResponse {
    status: number;
    message: string;
    options?: RegisterDeviceOptions;
}

interface RegisterDeviceOptions {
    publicKey: {
        challenge: string;
        rp: {
            name: string;
        };
        user: {
            id: string;
            name: string;
            displayName: string;
        };
        pubKeyCredParams: Array<{ type: "public-key"; alg: number }>;
        authenticatorSelection: {
            residentKey: ResidentKeyRequirement;
        };
        timeout: number;
        attestation: AttestationConveyancePreference | undefined;
    };
}

const Devices: React.FC = () => {
    const registerDeviceRequest = httpRequestFactory('POST', 'http://localhost:3001/register/complete');

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

            const registerDeviceResponse = await registerDeviceRequest(data) as ServerResponse;
            const options = registerDeviceResponse?.options as RegisterDeviceOptions;
            console.log('Options received from server:', options);

            // Usar las opciones de registro con webauthn
            const credential = await webauthn.create(options);

            console.log('Device registered:', credential);
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
