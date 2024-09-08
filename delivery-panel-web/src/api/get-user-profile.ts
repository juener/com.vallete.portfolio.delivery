import { api } from '@/lib/axios'

interface GetUserProfileResponse {
  user: User
}

interface User {
  id: string
  name: string
  email: string
  createdAt: Date | null
  role: 'USER' | 'ADMIN'
}

export async function getUserProfileApi() {
  const response = await api.get<GetUserProfileResponse>('/me')

  return response.data
}
