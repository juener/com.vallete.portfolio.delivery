import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import { ZodError } from 'zod'
import { env } from './env'
import { usersRoutes } from './http/controllers/users/_routes'
import { gymsRoutes } from './http/controllers/gyms/_routes'
import { checkInsRoutes } from './http/controllers/check-ins/_routes'
import { restaurantsRoutes } from './http/controllers/restaurants/_routes'
import fastifyCors from '@fastify/cors'

export const app = fastify()

app.register(fastifyCors, {
  origin: [
    `http://localhost:${env.PORT_FRONTEND}`,
    `http://vallete.com.br:4173`,
  ],
  credentials: true,
})

// app.register(fastifyCookie)
app.register(fastifyCookie, {
  secret: env.JWT_SECRET,
  hook: 'onRequest',
  parseOptions: {
    httpOnly: true,
    secure: false, //process.env.NODE_ENV === 'production'
    sameSite: 'lax',
    domain: env.NODE_ENV === 'production' ? 'vallete.com.br' : 'vallete.com.br',
  },
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(usersRoutes)
app.register(gymsRoutes)
app.register(checkInsRoutes)
app.register(restaurantsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error('console.log >> ' + error)
  } else {
    // TODO: we should export the logs to an external tool
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
