import React from 'react'

export const LoginForm = () => {
  return (
    <form className='w-full sm:w-2/3 md:w-1/3 h-2/3 flex flex-col justify-between items-center gap-4 p-4 bg-gradient-to-b from-[#00000030] to-[#000000A0] rounded-xl'>
      <h2 className='text-4xl text-light font-bold'>Sign In</h2>
      <div>

      </div>
      <button type='submit' className='py-2 px-4 text-light border-[2px] border-secondary hover:bg-secondary transition-colors rounded-lg'>Submit</button>
    </form>
  )
}

export default LoginForm;