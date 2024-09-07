import { FastifyInstance } from 'fastify';
import { registerController } from './register';
import { authenticateController } from './authenticate';
import { profileController } from './profile';
import { verifyJwt } from '../../middlewares/verify-jwt';
import { getUserMetricsController } from './metrics';
import { refreshTokenController } from './refresh';
import { findUserByEmailController } from './findUserByEmail';

export async function usersRoutes(app: FastifyInstance) {
  app.get('/find-user-by-email', findUserByEmailController);

    app.post('/users', registerController);
    app.post('/authenticate', authenticateController);

    app.patch('/refresh/token', refreshTokenController);

    // must be authenticated
    app.get('/me', { onRequest: [verifyJwt] }, profileController);
    app.get(
    "/users/metrics",
    { onRequest: [verifyJwt] },
    getUserMetricsController,
  );
}
