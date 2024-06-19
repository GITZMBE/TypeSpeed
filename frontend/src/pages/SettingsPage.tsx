import { deleteUser, logout } from 'api/api';
import { Container } from 'components/layout';
import React from 'react'
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export const SettingsPage = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <div className='w-full flex flex-col gap-2'>
        <div className='flex items-center gap-2 text-secondary cursor-default'>
          <FaTrash size={20} />
          <h2 className='text-nowrap'>Delete Account</h2>
        </div>
        <div className='w-full flex justify-between gap-4 flex-wrap sm:flex-nowrap'>
          <div className='flex flex-col gap-2'>
            <p className='text-light cursor-default'>This action is not reversable</p>
            <p className='text-redAcent cursor-default'>Your account and its data will be deleted permanently</p>
          </div>
          <button onClick={_ => {deleteUser(); navigate('/login'); window.location.reload()}} className='w-full h-fit sm:w-1/3 py-2 px-4 rounded-lg bg-redAcent hover:bg-light text-primary font-semibold transition'>Delete Account</button>
        </div>
      </div>
    </Container>
  )
}

export default SettingsPage;