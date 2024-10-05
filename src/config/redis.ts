import { createClient } from 'redis';
import dotenv from 'dotenv';
import { unsubscribeReasons } from '../data';

dotenv.config();

const client = createClient({
    url: process.env.REDIS_URL
});

client.on('error', (err) => console.log('Redis Client Error', err));

export const initRedis = async () => {
    await client.connect();
    await client.set('unsubscribe_reasons', JSON.stringify(unsubscribeReasons));
};

export const redis = client;