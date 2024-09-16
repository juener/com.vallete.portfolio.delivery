import { api } from '@/lib/axios'

interface GetRestaurantsResponse {
  restaurants: {
    id: string
    cnpj: string
    title: string
    managerId: string
    email: string
  }[]
}

export async function getRestaurantsApi() {
  const response = await api.get<GetRestaurantsResponse>('/restaurants')

  return response.data
}
