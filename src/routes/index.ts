import { FastifyInstance } from 'fastify';

export async function indexRoutes(server: FastifyInstance) {
    server.get('/', async (request, reply) => {
        reply.send({
            message: "Welcome to the Subscription API!",
            author: "Ebrahim Khalil",
            repository: "https://github.com/ekamid/subscription-api",
            routes: [
                { method: 'GET', path: '/api/v1/subscriptions', description: 'Subscribe to the mailing list' },
                { method: 'POST', path: '/api/v1/subscribe', description: 'Subscribe to the mailing list' },
                { method: 'GET', path: '/api/v1/count', description: 'Get the count of active subscribers' },
                { method: 'POST', path: '/api/v1/unsubscribe', description: 'Unsubscribe from the mailing list' },
                { method: 'GET', path: '/api/v1/unsubscribe-reasons', description: 'Get the list of unsubscribe reasons' },
            ]
        });
    });

}
