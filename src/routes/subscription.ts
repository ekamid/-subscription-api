import { FastifyInstance } from 'fastify';
import { Type } from '@sinclair/typebox';
import { db } from '../config/db';
import { sendMail } from '../config/mailer';
import { redis } from '../config/redis';

export async function subscriptionRoutes(server: FastifyInstance) {
    // Subscribe Route
    server.post('/subscribe', {
        schema: {
            body: Type.Object({
                email: Type.String({ format: 'email' }),
                name: Type.String()
            })
        }
    }, async (request, reply) => {
        const { email, name } = request.body;
        try {
            await db.query('INSERT INTO subscriptions (email, name) VALUES ($1, $2)', [email, name]);
            await sendMail(email, 'Subscription Confirmed', `Hello ${name}, thank you for subscribing!`);
            reply.code(201).send({ message: 'Subscribed successfully' });
        } catch (error: any) {
            if (error.code === '23505') { // Unique violation
                reply.code(400).send({ message: 'Email already subscribed' });
            } else {
                reply.code(500).send({ message: 'Internal server error' });
            }
        }
    });

    // Count Route
    server.get('/count', async (request, reply) => {
        const result = await db.query('SELECT COUNT(*) FROM subscriptions WHERE is_unsubscribed = FALSE');
        reply.send({ count: parseInt(result.rows[0].count) });
    });

    // Unsubscribe Route
    server.post('/unsubscribe', {
        schema: {
            body: Type.Object({
                email: Type.String({ format: 'email' }),
                reason: Type.Optional(Type.String())
            })
        }
    }, async (request, reply) => {
        const { email, reason } = request.body;
        await db.query('UPDATE subscriptions SET is_unsubscribed = TRUE, unsubscribed_reason = $2 WHERE email = $1', [email, reason || null]);
        reply.send({ message: 'Unsubscribed successfully' });
    });

    // Unsubscribe Reasons Route
    server.get('/unsubscribe-reasons', async (request, reply) => {
        const reasons = await redis.get('unsubscribe_reasons');
        reply.send(JSON.parse(reasons || '[]'));
    });
}
