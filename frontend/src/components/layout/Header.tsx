import React, { useEffect, useState } from "react";
import { MdTypeSpecimen } from "react-icons/md";
import { FaKeyboard, FaCrown, FaInfo, FaBell, FaUser } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { User } from "@prisma/client";
import { getCurrentUser, logout } from "src/api/api";

export const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const res: User | { message: string } = await getCurrentUser();

    if (!res || 'message' in res) return;

    setUser(res);
  };

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
        <Link to='/login' className="group flex justify-center items-center gap-2 group-hover:text-light cursor-pointer">
          {user && (
            <p className="text-secondary group-hover:text-light">{ user.username }</p>
          )}
          <FaUser className='text-md sm:text-xl text-secondary group-hover:text-light' />
        </Link>
        {user && (
          <button onClick={() => {logout(); setUser(null); window.location.reload()}} className="text-secondary hover:text-light cursor-pointer">Logout</button>
        )}
      </div>
    </header>
  );
};

export default Header;
