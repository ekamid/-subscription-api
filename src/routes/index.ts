import { FastifyInstance } from 'fastify';

export async function indexRoutes(server: FastifyInstance) {
    server.get('/', async (request, reply) => {
        reply.send({
            message: "Welcome to the Subscription API!",
            author: "Ebrahim Khalil",
            repository: "https://github.com/ekamid/subscription-api",
            routes: [
                { method: 'POST', path: '/subscribe', description: 'Subscribe to the mailing list' },
                { method: 'GET', path: '/count', description: 'Get the count of active subscribers' },
                { method: 'POST', path: '/unsubscribe', description: 'Unsubscribe from the mailing list' },
                { method: 'GET', path: '/unsubscribe-reasons', description: 'Get the list of unsubscribe reasons' },
            ]
        });
    });

}
