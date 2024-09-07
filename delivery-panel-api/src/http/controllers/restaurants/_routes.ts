import { verifyJwt } from '@/http/middlewares/verify-jwt';
import { FastifyInstance } from 'fastify';
import { registerRestaurant } from './register';

export async function restaurantsRoutes(app: FastifyInstance) {
  /* must be authenticated */
  app.addHook('onRequest', verifyJwt);

    app.post('/restaurants', registerRestaurant);
}
