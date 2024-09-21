import { api } from '@/lib/axios'

interface GetOrdersResponse {
  orders: {
    id: string
    customer: {
      name: string
      phoneNumber: string
      address: {
        id: number
        street: string
        number: string
        complement?: string
        reference?: string
        neighborhood: string
        city?: string
      }
    }
    restaurant: {
      id: string
      cnpj: string
      title: string
      managerId: string
      email: string
    }
    status:
      | 'PENDING'
      | 'WORKING'
      | 'READY_FOR_PICKUP'
      | 'ON_THE_WAY'
      | 'DELIVERED'
      | 'CANCELED'
    items: {
      id: number
      name: string
      price: number
      quantity: number
      obs?: string
      orderId: string
    }[]
    totalItems: number
    total: number
    createdAt: Date
  }[]
}

export async function getOrdersApi() {
  const response = await api.get<GetOrdersResponse>('/orders')

  return response.data
}
