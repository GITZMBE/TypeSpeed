import React from "react";
import { MdTypeSpecimen } from "react-icons/md";
import { FaKeyboard, FaCrown, FaInfo, FaBell, FaUser } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className='flex justify-between items-center w-full max-w-7xl py-4'>
      <div className='flex items-center gap-4'>
        <div className="flex items-center gap-2" onClick={() => {navigate('/')}}>
          <MdTypeSpecimen className='text-2xl sm:text-4xl text-yellowAcent' />
          <h1 className='font-robotoMono font-bold text-xl sm:text-2xl text-light cursor-pointer'>
            TypeSpeed
          </h1>          
        </div>
        <div className='flex gap-4 items-center'>
          <FaKeyboard className='text-md sm:text-xl text-secondary hover:text-light cursor-pointer' onClick={() => {navigate('/typing')}} />
          <FaCrown className='text-md sm:text-xl text-secondary hover:text-light cursor-pointer' />
          <FaInfo className='text-sm sm:text-md text-secondary hover:text-light cursor-pointer' />
          <IoMdSettings className='text-md sm:text-xl text-secondary hover:text-light cursor-pointer' />
        </div>
      </div>
      <div className='flex gap-4 items-center'>
        <FaBell className='text-md sm:text-xl text-secondary hover:text-light cursor-pointer' />
        <FaUser className='text-md sm:text-xl text-secondary hover:text-light cursor-pointer' />
      </div>
    </header>
  );
};

export default Header;
