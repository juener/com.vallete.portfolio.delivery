import { FastifyInstance } from 'fastify';
import { verifyJwt } from '../../middlewares/verify-jwt';
import { createGymController } from './create';
import { searchGymsController } from './search';
import { nearbyGymsController } from './nearby';
import { verifyUserRole } from '@/http/middlewares/verify-user-role';

export async function gymsRoutes(app: FastifyInstance) {
  // must be authenticated
  app.addHook('onRequest', verifyJwt);

    app.post(
    "/gyms",
    { onRequest: [verifyUserRole('ADMIN')] },
    createGymController,
  );

  app.get('/gyms/search', searchGymsController);
    app.get('/gyms/nearby', nearbyGymsController);
}
