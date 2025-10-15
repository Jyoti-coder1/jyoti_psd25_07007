const { createClient } = require('redis');
require('dotenv').config();

const url = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
const redisClient = createClient({ url });

redisClient.on('error', (err) => console.error('Redis error', err));

async function connectRedis() {
    if (!redisClient.isOpen) await redisClient.connect();
}

module.exports = { redisClient, connectRedis };