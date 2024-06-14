import React from 'react'
import { IoIosMail } from "react-icons/io";

export const Footer = () => {
  return (
    <footer className='flex gap-8 w-full py-4'>
      <div className='group flex items-center gap-2'>
        <IoIosMail className='text-md sm:text-lg text-secondary group-hover:text-light cursor-pointer' />
        <p className='text-secondary group-hover:text-light text-sm'>Contact</p>
      </div>
    </footer>
  )
}

export default Footer