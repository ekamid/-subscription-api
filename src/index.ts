import Fastify from 'fastify';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { initDB } from './config/db';
import { initRedis } from './config/redis';

// Import subscription routes
import { subscriptionRoutes } from './routes/subscription';
import { indexRoutes } from './routes';

const server = Fastify({
    logger: true
}).withTypeProvider<TypeBoxTypeProvider>();

const start = async () => {
    try {
        // await initDB();
        // await initRedis();

        // Register subscription routes

        await indexRoutes(server);
        await subscriptionRoutes(server);

        await server.listen({ port: 3000 });
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};

start();
