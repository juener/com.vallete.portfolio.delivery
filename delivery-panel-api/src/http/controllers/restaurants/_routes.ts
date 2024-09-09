import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { createRestaurant } from './create'
import { updateRestaurant } from './update'
import { fetchRestaurants } from './fetch'
import { deleteRestaurant } from './delete'

export async function restaurantsRoutes(app: FastifyInstance) {
  /* must be authenticated */
  app.addHook('onRequest', verifyJwt)

  app.get('/restaurants', fetchRestaurants)
  app.post('/restaurants', createRestaurant)
  app.put('/restaurants', updateRestaurant)
  app.delete('/restaurants', deleteRestaurant)
}
