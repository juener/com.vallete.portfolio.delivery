import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { postOrder } from './post-order'
import { getOrders } from './get-orders'

export async function ordersRoutes(app: FastifyInstance) {
  /* must be authenticated */
  app.addHook('onRequest', verifyJwt)

  app.get('/orders', getOrders)
  app.get('/orders/:id', postOrder)
  app.post('/orders', postOrder)
  app.put('/orders', postOrder)
  app.delete('/orders', postOrder)
}
