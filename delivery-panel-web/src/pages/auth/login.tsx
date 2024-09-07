import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { z } from 'zod';

const loginForm = z.object({
  email: z.string().email(), 
  password: z.string().min(6), 
})

type LoginForm = z.infer<typeof loginForm>

export function Login(){
  const {register, handleSubmit, formState: {isSubmitting}} = useForm<LoginForm>()

  async function handleLogin(){
    console.log('login 1')
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log('after login 2')
  }

  return(
    <>
      <Helmet title='Login' />
      <div className='w-8/12 sm:w-11/12  flex flex-col gap-3'>
      <form onSubmit={handleSubmit(handleLogin)} className='flex flex-col gap-4'>
      <div>     
          <Label htmlFor='email'>Email:</Label>
          <Input id='email' type='text' {...register('email')} />
        </div>
        <div>
          <Label htmlFor='password'>Password:</Label>
          <Input id='password' type='password' {...register('password')} />
        </div>
        <Button className='bg-primary' disabled={isSubmitting}>Login</Button>
      </form>
        <Button variant='link' asChild>
          <NavLink to='/register'>Register</NavLink>
        </Button>
      </div>
    </>
  )
}