import { api } from '@/lib/axios'

interface loginBody {
  email: string
  password: string
}

export async function loginApi({email, password}: loginBody){
  await api.post('/authenticate', {email, password})
}