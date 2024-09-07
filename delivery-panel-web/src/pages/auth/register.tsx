import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Helmet } from 'react-helmet-async';
import {useForm} from 'react-hook-form'
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { NavLink } from 'react-router-dom';
import { ToastAction } from '@/components/ui/toast';

const registerForm = z.object({
  name: z.string().min(3), 
  store: z.string().min(3), 
  cnpj: z.string().min(14), 
  email: z.string().email(),
  password: z.string().min(6)
})

type RegisterForm = z.infer<typeof registerForm>

export function Register(){
  const { register, handleSubmit, formState: {isSubmitting} } = useForm<RegisterForm>()
  const {toast} = useToast()

  async function handleRegister(){
    console.log('1')
    toast({
      className: 'bg-background text-foreground',
      title: 'Title',
      description: 'Description...', 
      action: <ToastAction altText='Try again'>Try again</ToastAction>
    })
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log('2')
  }

  return(
    <>
      <Helmet title='Register' />
      <div className='w-8/12 sm:w-11/12 flex flex-col gap-3'>
      <form onSubmit={handleSubmit(handleRegister)} className='flex flex-col gap-4'>
        <div>     
          <Label htmlFor='name'>Your name:</Label>
          <Input id='name' type='text' {...register('name')} />
        </div>
        <div>     
          <Label htmlFor='store'>Store name:</Label>
          <Input id='store' type='text' {...register('store')} />
        </div>
        <div>     
          <Label htmlFor='cnpj'>CNPJ:</Label>
          <Input id='cnpj' type='text' {...register('cnpj')} />
        </div>
        <div>     
          <Label htmlFor='email'>Email:</Label>
          <Input id='email' type='text' {...register('email')} />
        </div>
        <div>
          <Label htmlFor='password'>Password:</Label>
          <Input id='password' type='password' {...register('password')} />
        </div>
        <Button className='bg-primary' disabled={isSubmitting}>{isSubmitting ? 'Registering' : 'Register'}</Button>
      </form>
      <Button variant='link' asChild>
          <NavLink to='/login'>Login</NavLink>
        </Button>
      </div>
    </>
  )
}