import { makeFetchRestaurantsUseCase } from '@/use-cases/factories/make-fetch-restaurants'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function fetchRestaurants(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const fetchRestaurantsUseCase = makeFetchRestaurantsUseCase()

    const restaurants = await fetchRestaurantsUseCase.execute()

    return reply.status(200).send(restaurants)
  } catch (err: any) {
    console.log(err)
    return reply.status(500).send({ message: err?.message })
  }
}
