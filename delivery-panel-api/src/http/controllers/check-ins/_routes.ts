import { verifyJwt } from '@/http/middlewares/verify-jwt';
import { FastifyInstance } from 'fastify';
import { createCheckInController } from './create';
import { historyCheckInsController } from './history';
import { validateCheckInController } from './validate';
import { verifyUserRole } from '@/http/middlewares/verify-user-role';

export async function checkInsRoutes(app: FastifyInstance) {
  /* must be authenticated */
  app.addHook('onRequest', verifyJwt);

    app.post('/check-ins', createCheckInController);
    app.patch(
    "/check-ins/:checkInId/validate",
    { onRequest: [verifyUserRole('ADMIN')] },
    validateCheckInController,
  );
  app.get('/check-ins/history', historyCheckInsController);
}
