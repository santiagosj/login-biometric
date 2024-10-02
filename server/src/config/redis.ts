import Redis from 'ioredis';
import { buffer } from 'stream/consumers';

const redis = new Redis({
    host: process.env.REDIS_URL || 'redis-server',  // La URL del servicio Redis será 'redis'
    port: 6379,  // Puerto por defecto de Redis
    password: process.env.REDIS_PASSWORD || '',  // Contraseña desde .env
});

redis.on('connect', async () => {
    console.log('Connected to Redis');
    try {
        const password = process.env.REDIS_PASSWORD as string | Buffer
        await redis.auth(password);
        console.log('Authenticated with Redis');
    } catch (err) {
        console.error('Redis authentication failed:', err);
    }
});

redis.on('error', (err) => {
    console.error('Error connecting to Redis:', err);
});

export default redis;
