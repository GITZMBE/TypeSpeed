import { Icon } from 'components/ui';
import React from 'react'
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className='flex gap-8 w-full py-4 px-4 sm:px-12 bg-primary'>
      <Link to='/' className='group flex items-center gap-2'>
        <Icon icon='mail' className='text-md sm:text-lg text-secondary group-hover:text-light cursor-pointer' />
        <span className='text-secondary group-hover:text-light text-sm'>Contact</span>
      </Link>
    </footer>
  )
}

export default Footer