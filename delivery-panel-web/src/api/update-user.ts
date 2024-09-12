import { api } from '@/lib/axios'

interface updateUserBody {
  id: string
  name?: string
  email?: string
  password?: string
}
export async function updateUserApi({
  id,
  name,
  email,
  password,
}: updateUserBody) {
  await api.patch('/users', {
    id,
    name,
    email,
    password,
  })
}
