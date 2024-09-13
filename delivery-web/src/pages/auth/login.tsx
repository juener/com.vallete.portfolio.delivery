import { loginApi } from '@/api/login'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom'
import { z } from 'zod'

const loginForm = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

type LoginForm = z.infer<typeof loginForm>

export function Login() {
  const [searchParams] = useSearchParams()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginForm>({
    defaultValues: {
      email: searchParams.get('email') ?? '',
    },
  })

  const navigate = useNavigate()

  const { toast } = useToast()

  const { mutateAsync: authenticateFn } = useMutation({
    mutationFn: loginApi,
  })

  async function handleLogin(data: LoginForm) {
    try {
      await authenticateFn({ email: data.email, password: data.password })

      navigate('/dashboard')
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
      <Helmet title="Login" />
      <div className="w-8/12 sm:w-11/12  flex flex-col gap-3">
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="flex flex-col gap-4"
        >
          <div>
            <Label htmlFor="email">Email:</Label>
            <Input id="email" type="text" {...register('email')} />
          </div>
          <div>
            <Label htmlFor="password">Password:</Label>
            <Input id="password" type="password" {...register('password')} />
          </div>
          <Button className="bg-primary" disabled={isSubmitting}>
            Login
          </Button>
        </form>
        <Button variant="link" asChild>
          <NavLink to="/register">Register</NavLink>
        </Button>
      </div>
    </>
  )
}
