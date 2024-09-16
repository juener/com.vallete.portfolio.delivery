import { getRestaurantByIdApi } from '@/api/get-restaurant-by-id'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useEffect } from 'react'
import { postOrPutRestaurantApi } from '@/api/post-restaurant'
import { Button } from '../ui/button'

interface postRestaurantComponentRequest {
  restaurantId?: string
}

const restaurantForm = z.object({
  id: z.string().min(36).optional(),
  cnpj: z.string().min(11),
  title: z.string().min(3),
  managerId: z.string().length(36),
  email: z.string().email(),
})

type RestaurantForm = z.infer<typeof restaurantForm>

export function PostRestaurantComponent({
  restaurantId,
}: postRestaurantComponentRequest) {
  const { data: restaurantDetails } = useQuery({
    queryKey: ['restaurant-details', restaurantId],
    queryFn: () => getRestaurantByIdApi({ id: restaurantId }),
    enabled: !!restaurantId,
  })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitted },
    reset,
  } = useForm<RestaurantForm>({
    defaultValues: {
      id: restaurantDetails?.restaurant.id,
      cnpj: restaurantDetails?.restaurant.cnpj,
      title: restaurantDetails?.restaurant.title,
      managerId: restaurantDetails?.restaurant.managerId,
      email: restaurantDetails?.restaurant.email,
    },
  })

  useEffect(() => {
    if (restaurantDetails?.restaurant) {
      reset({
        id: restaurantDetails.restaurant.id,
        cnpj: restaurantDetails.restaurant.cnpj,
        title: restaurantDetails.restaurant.title,
        managerId: restaurantDetails.restaurant.managerId,
        email: restaurantDetails.restaurant.email,
      })
    }
  }, [restaurantDetails, reset])

  const { mutateAsync: postOrPutRestaurantFn } = useMutation({
    mutationFn: postOrPutRestaurantApi,
  })

  async function handleRestaurant(data: RestaurantForm) {
    try {
      await postOrPutRestaurantFn({
        id: data?.id,
        cnpj: data.cnpj,
        title: data.title,
        managerId: data.managerId,
        email: data.email,
      })
    } catch (error) {
      console.log(`Error: \n\n${error}`)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleRestaurant)}
      className="flex flex-col gap-3 py-4"
    >
      <input hidden {...register('id')} />

      <Label htmlFor="cnpj">CNPJ</Label>
      <Input
        id="cnpj"
        {...register('cnpj')}
        disabled={isSubmitting || isSubmitted}
      />

      <Label htmlFor="title">Restaurant Name</Label>
      <Input
        id="title"
        {...register('title')}
        disabled={isSubmitting || isSubmitted}
      />

      <Label htmlFor="managerId">Manager</Label>
      <Input
        id="managerId"
        {...register('managerId')}
        disabled={isSubmitting || isSubmitted}
      />

      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        type="email"
        {...register('email')}
        disabled={isSubmitting || isSubmitted}
      />

      <Button type="submit" disabled={isSubmitting || isSubmitted}>
        {isSubmitted ? 'Changes saved successfully' : 'Save'}
      </Button>
    </form>
  )
}
