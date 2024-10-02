import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import dotenv from 'dotenv';
import { authRoutes } from "./routes/authRouter";

dotenv.config({
    path: `${__dirname}/../../.env`
});

if (!process.env.JWT_SECRET) {
    throw new Error("Missing necessary environment variables!");
}

const app = fastify();
app.register(fastifyCors, {
    origin: (origin, cb) => {
        const allowedOrigins = [
            'http://localhost:5173',
        ];

        if (!origin || allowedOrigins.includes(origin)) {
            // Si origin es undefined (solicitud no desde navegador) o está en la lista permitida, permitir el acceso
            cb(null, true);
        } else {
            // Si no está en la lista permitida, lanzar error de CORS
            cb(new Error("Not allowed by CORS"), "");
        }
    }
});

// Registro de rutas
authRoutes(app);

app.get('/', async (request, response) => {
    return { message: 'Hola mundo' }
});

try {
    const port = process.env.PORT || 3001;
    app.listen({ port: Number(port), host: '0.0.0.0' });
} catch (err) {
    app.log.error(err);
    process.exit(1);
}
