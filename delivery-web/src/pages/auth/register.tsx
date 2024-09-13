import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useToast } from '@/hooks/use-toast'
import { NavLink, useNavigate } from 'react-router-dom'
import { ToastAction } from '@/components/ui/toast'
import { useMutation } from '@tanstack/react-query'
import { registerUserApi } from '@/api/register-user'

const registerUserForm = z.object({
  name: z.string().min(3),
  store: z.string().min(3),
  cnpj: z.string().min(14),
  email: z.string().email(),
  password: z.string().min(6),
})

type RegisterUserForm = z.infer<typeof registerUserForm>

export function Register() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RegisterUserForm>()

  const navigate = useNavigate()

  const { toast } = useToast()

  const { mutateAsync: registerUserFn } = useMutation({
    mutationFn: registerUserApi,
  })

  async function handleRegister(data: RegisterUserForm) {
    try {
      await registerUserFn({
        name: data.name,
        email: data.email,
        password: data.password,
      })

      toast({
        className: 'bg-background text-foreground',
        title: 'Success',
        description: 'You are registered successfully.',
        action: (
          <ToastAction
            altText="Login"
            onClick={() => navigate(`/login?email=${data.email}`)}
            className="bg-green-700 text-white hover:bg-green-900"
          >
            Click here to login
          </ToastAction>
        ),
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
    <>
      <Helmet title="Register" />
      <div className="w-8/12 sm:w-11/12 flex flex-col gap-3">
        <form
          onSubmit={handleSubmit(handleRegister)}
          className="flex flex-col gap-4"
        >
          <div>
            <Label htmlFor="name">Your name:</Label>
            <Input id="name" type="text" {...register('name')} />
          </div>
          <div>
            <Label htmlFor="store">Store name:</Label>
            <Input id="store" type="text" {...register('store')} />
          </div>
          <div>
            <Label htmlFor="cnpj">CNPJ:</Label>
            <Input id="cnpj" type="text" {...register('cnpj')} />
          </div>
          <div>
            <Label htmlFor="email">Email:</Label>
            <Input id="email" type="text" {...register('email')} />
          </div>
          <div>
            <Label htmlFor="password">Password:</Label>
            <Input id="password" type="password" {...register('password')} />
          </div>
          <Button className="bg-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Registering' : 'Register'}
          </Button>
        </form>
        <Button variant="link" asChild>
          <NavLink to="/login">Login</NavLink>
        </Button>
      </div>
    </>
  )
}
