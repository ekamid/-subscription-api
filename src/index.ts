import Fastify from 'fastify';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { initDB } from './config/db';
import { initRedis } from './config/redis';
import dotenv from 'dotenv';

// Import subscription routes
import { subscriptionRoutes } from './routes/subscription';
import { indexRoutes } from './routes';

dotenv.config();

const server = Fastify({
    logger: false
}).withTypeProvider<TypeBoxTypeProvider>();

const start = async () => {
    try {
        await initDB();
        await initRedis();

        // Register subscription routes
        await indexRoutes(server);
        server.register(subscriptionRoutes, { prefix: '/api/v1' });
        // await subscriptionRoutes(server);

        const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8084;
        await server.listen({ port: PORT });

    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};

start();
