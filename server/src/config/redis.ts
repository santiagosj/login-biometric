import Redis from 'ioredis';

const redis = new Redis({
    host: process.env.REDIS_URL || 'localhost',  // La URL del servicio Redis será 'redis'
    port: 6379,  // Puerto por defecto de Redis
    password: process.env.REDIS_PASSWORD || '',  // Contraseña desde .env
});

redis.on('error', (err) => {
    console.error('Error connecting to Redis:', err);
});

redis.on('connect', () => {
    console.log('Connected to Redis');
});

export default redis;
