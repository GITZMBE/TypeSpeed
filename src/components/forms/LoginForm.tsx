import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { TogglePassword } from '../ui';

interface IForm { 
  email: string, 
  password: string 
};

export const LoginForm = () => {
  const { register } = useForm<IForm>({defaultValues: { email: '', password: '' }});
  const [show, setShow] = useState(false);

  return (
    <form className='w-full sm:w-2/3 md:w-1/3 h-2/3 flex flex-col justify-between items-center gap-4 p-4 bg-gradient-to-b from-[#00000030] to-[#000000A0] rounded-xl'>
      <h2 className='text-4xl text-light font-bold'>Sign In</h2>
      <div className='w-full flex flex-col gap-2'>
        <h3 className='text-light'>Email</h3>
        <input type="text" {...register('email')} className='px-2 rounded-full' />
        <h3 className='text-light'>Password</h3>
        <div className='relative w-full'>
          <input type={show ? "text" : "password"} {...register('password')} className='w-full px-2 rounded-full' />
          <TogglePassword state={show} setState={setShow} className='absolute top-[2px] right-2' />
        </div>
      </div>
      <button type='submit' className='py-2 px-4 text-light border-[2px] border-secondary hover:bg-secondary transition-colors rounded-lg'>Submit</button>
    </form>
  )
}

export default LoginForm;