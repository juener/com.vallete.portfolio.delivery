import { z } from 'zod'

const envSchema = z.object({
  VITE_API_URL: z.string().url(),
})

console.log('Enviroment: ', import.meta.env.MODE)

export const env = envSchema.parse(import.meta.env)
