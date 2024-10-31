import bcrypt from 'bcrypt';
//import { users } from '../models/userModel';
import { generateJWT } from '../utils/jwtHelper';
import { randomBytes } from 'crypto';
import client from '../config/redis';

export const authService = {
    async registerUser(email: string, username?: string, password?: string) {
        try {
            const existingUser = await client.get(`user:${email}`)
            if (existingUser) {
                throw new Error('Email already exists');
            }
            // hash del password
            const passwordHash = password ? await bcrypt.hash(password, 10) : undefined;
            const userId = randomBytes(16).toString('hex');

            const userData = {
                email,
                username: username || '',
                passwordHash: passwordHash || '',
                createdAt: new Date().toISOString(),
                publicKey: '',
                credentialId: ''
            };

            await client.hset(`user:${userId}`, userData);
            await client.set(`user:${email}`, userId);

            return { status: 200, message: "User Created", user: { email, username, userId } }
        } catch (err) {
            const error = err as Error;
            console.log(err)
            return { status: 500, message: `${error.message} Error al crear el usuario` }
        }
    },

    async completeRegistration(email: string, credentialId: string, publicKey: string,) {
        try {
            const user = await client.get(`user:${email}`);
            if (!user) {
                return { status: 400, message: 'User not found' };
            }

            await client.hset(`user:${user}`, { credentialId, publicKey });

            return { status: 200, message: "Registration Complete" }

        } catch (err) {
            return { status: 500, message: "Error completing the registration" }
        }
    },

    async loginUser(email: string, password: string) {
        try {
            const user = await client.get(`user:${email}`);
            if (!user) {
                return { status: 404, message: 'User not found' };
            }

            const userData = await client.hgetall(`user:${user}`);

            // Verificar contraseña
            const passwordMatch = await bcrypt.compare(password, userData.passwordHash);
            if (!passwordMatch) {
                return { status: 401, message: 'Invalid password' };
            }

            // Permitir el login aún si no tiene los datos biométricos registrados
            if (!userData.publicKey || !userData.credentialId) {
                return { status: 200, message: 'Login successful, biometric data not registered yet', user: { email, username: userData.username } };
            }

            // Si tiene datos biométricos, continuar con el flujo normal de login
            const options = {
                challenge: randomBytes(32).toString('base64'),
                allowCredentials: [{ id: userData.credentialId, type: 'public-key' }]
            };
            return { status: 200, options };

        } catch (err) {
            return { status: 500, message: "Error during login" };
        }
    },
    async completeLogin(email: string, credentialId: string) {
        try {
            const user = await client.get(`user:${email}`)

            if (!user) {
                return { status: 404, message: 'User not found' };
            }

            const userData = await client.hgetall(`user:${user}`)

            if (userData?.credentialId !== credentialId) {
                return { status: 400, message: 'Credential ID does not match' };
            }

            const token = generateJWT({ id: user, email: userData.email });
            return { status: 200, message: "Login successfull", token }

        } catch (err) {
            return { status: 500, message: "Error completing login" }
        }
    },
}