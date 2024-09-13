import { api } from '@/lib/axios'

interface registerUserBody {
  name: string
  email: string
  password: string
}

export async function registerUserApi({
  name,
  email,
  password,
}: registerUserBody) {
  await api.post('/users', {
    name,
    email,
    password,
  })
}
