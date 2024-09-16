import { api } from '@/lib/axios'

interface postOrPutRestaurantBody {
  id?: string
  cnpj: string
  title: string
  managerId: string
  email: string
}

export async function postOrPutRestaurantApi({
  id,
  cnpj,
  title,
  managerId,
  email,
}: postOrPutRestaurantBody) {
  if (id) {
    await api.put('/restaurants', {
      id,
      cnpj,
      title,
      managerId,
      email,
    })
  } else {
    await api.post('/restaurants', {
      cnpj,
      title,
      managerId,
      email,
    })
  }
}
