import { useEffect } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { updateUserApi } from '@/api/update-user'
import { toast } from '@/hooks/use-toast'
import { z } from 'zod'
import { getUserProfileApi } from '@/api/get-user-profile'

const userForm = z.object({
  id: z.string().min(36),
  name: z.string().min(3).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
})

type UserForm = z.infer<typeof userForm>

export function PatchUserFormComponent() {
  const { data: profileDetails } = useQuery({
    queryKey: ['profile-details'],
    queryFn: getUserProfileApi,
  })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitted },
    reset,
  } = useForm<UserForm>({
    defaultValues: {
      id: profileDetails?.user.id,
      name: profileDetails?.user.name,
      email: profileDetails?.user.email,
    },
  })

  useEffect(() => {
    if (profileDetails?.user) {
      reset({
        id: profileDetails.user.id,
        name: profileDetails.user.name,
        email: profileDetails.user.email,
      })
    }
  }, [profileDetails, reset])

  const { mutateAsync: updateUserFn } = useMutation({
    mutationFn: updateUserApi,
  })

  async function handleUser(data: UserForm) {
    try {
      await updateUserFn({
        id: data.id,
        name: data.name,
        email: data.email,
        password: data.password || undefined,
      })

      toast({
        className: 'bg-background text-foreground',
        title: 'Success',
        description: 'The user has been updated.',
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        className: 'bg-background text-foreground',
        title: 'Error',
        description: `An error has been thrown: \n\n${error}`,
      })
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleUser)}
      className="flex flex-col gap-3 py-4"
    >
      <input hidden {...register('id')} />
      <Label htmlFor="name">Name</Label>
      <Input
        id="name"
        {...register('name')}
        disabled={isSubmitting || isSubmitted}
      />
      <Label htmlFor="email">Email</Label>
      <Input
        // value={profileDetails?.user.email}
        id="email"
        disabled={isSubmitting || isSubmitted}
        {...register('email')}
      />
      <Label htmlFor="password">Password</Label>
      <Input
        id="password"
        disabled={isSubmitting || isSubmitted}
        {...register('password')}
      />
      <Button type="submit" disabled={isSubmitting || isSubmitted}>
        {isSubmitted ? 'Changes saved successfully' : 'Save changes'}
      </Button>
    </form>
  )
}
