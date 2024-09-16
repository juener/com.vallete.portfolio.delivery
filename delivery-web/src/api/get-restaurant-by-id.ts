import { api } from '@/lib/axios'

interface GetRestaurantByIdResponse {
  restaurant: {
    id: string
    cnpj: string
    title: string
    managerId: string
    email: string
  }
}

interface GetRestaurantByIdParams {
  id?: string
}

export async function getRestaurantByIdApi({ id }: GetRestaurantByIdParams) {
  const response = await api.get<GetRestaurantByIdResponse>(
    `/restaurants/${id}`,
  )

  return response.data
}
