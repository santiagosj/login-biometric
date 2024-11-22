import { FastifyReply, FastifyRequest } from "fastify";
import { authService } from "../services/authService";

export const authController = {
    async register(request: FastifyRequest, reply: FastifyReply) {
        const { email, username, password } = request.body as { email: string, username: string, password: string }

        try {
            const result = await authService.registerUser(email, username, password);
            if (result.status && result.status !== 200) {
                reply.code(result.status).send({ message: result.message });
            } else {
                reply.code(200).send(result);
            }
        } catch (error) {
            const errorType = error as Error
            reply.code(500).send({ message: errorType.message });
        }
    },
    async completeRegistration(request: FastifyRequest, reply: FastifyReply) {
        const { email, credentialId, publicKey } = request.body as { email: string, credentialId: string, publicKey: string };
        try {
            const result = await authService.completeRegistration(email, credentialId, publicKey);
            if (result.status && result.status !== 200) {
                reply.code(result.status).send({ message: result.message });
            } else {
                reply.code(200).send(result);
            }
        } catch (error) {
            const errorType = error as Error;
            reply.code(500).send({ message: errorType.message });
        }
    },
    async saveCredentials(request: FastifyRequest, reply: FastifyReply) {
        const { userId, credentialId, publicKey } = request.body as { userId: string, credentialId: string, publicKey: string };
        try {
            const result = await authService.saveCredential(userId, credentialId, publicKey);
            if (result.status && result.status !== 200) {
                reply.code(result.status).send({ message: result.message });
            } else {
                reply.code(200).send(result);
            }
        } catch (error) {
            const errorType = error as Error;
            reply.code(500).send({ message: errorType.message });
        }
    },

    async login(request: FastifyRequest, reply: FastifyReply) {
        const { email, password } = request.body as { email: string; password: string };

        try {
            const result = await authService.loginUser(email, password);
            if (result.status && result.status !== 200) {
                reply.code(result.status).send({ message: result.message });
            } else {
                reply.code(200).send(result);
            }
        } catch (error) {
            const errorType = error as Error;
            reply.code(500).send({ message: errorType.message });
        }
    },
    async completeLogin(request: FastifyRequest, reply: FastifyReply) {
        const { email, credentialId } = request.body as { email: string, credentialId: string };
        try {
            const result = await authService.completeLogin(email, credentialId);
            if (result.status && result.status !== 200) {
                reply.code(result.status).send({ message: result.message });
            } else {
                reply.code(200).send(result);
            }
        } catch (error) {
            const errorType = error as Error
            reply.code(500).send({ message: errorType.message });
        }
    }
}