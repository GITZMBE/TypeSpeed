import React, { useEffect, useState } from "react";
import { MdTypeSpecimen } from "react-icons/md";
import { FaBell, FaUser, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { User } from "@prisma/client";
import { getCurrentUser, logout } from "api/api";
import { calcLevel } from "utils";
import { Icon } from "components/ui";

export const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const res = await getCurrentUser();

    if (!res) return;

    setUser(res);
  };

  return (
    <header className='w-full sticky top-0 z-10 flex justify-between items-center bg-primary py-4 px-4 sm:px-12'>
      <div className='flex items-center gap-4'>
        <div className="flex items-center gap-2" onClick={() => {navigate('/')}}>
          <Icon icon="AIcon" className='w-9 h-9 text-2xl sm:text-4xl text-yellowAcent' />
          <h1 className='font-robotoMono font-bold text-xl sm:text-2xl text-light cursor-pointer'>
            TypeSpeed
          </h1>          
        </div>
        <div className='flex gap-4 items-center'>
          <Link to='typing'>
            <Icon icon="keyboard" className='text-md sm:text-xl hover:text-light cursor-pointer' />
          </Link>
          <Link to='/leaderboard'>
            <Icon icon='crown' className='text-md sm:text-xl hover:text-light cursor-pointer' />
          </Link>
          <Link to='/'>
            <Icon icon='info' className='text-md sm:text-xl hover:text-light cursor-pointer' />
          </Link>
          <Link to='/settings'>
            <Icon icon="settings" className='text-md sm:text-xl text-secondary hover:text-light cursor-pointer' />
          </Link>
        </div>
      </div>
      <div className='flex gap-4 items-center'>
        <Icon icon="bell" className='sm:text-xl hover:text-light cursor-pointer' />
        <Link to={ user ? '/stats' : '/login' } className="group flex justify-center items-center gap-2 group-hover:text-light cursor-pointer">
          {user && (
            <p className="text-secondary group-hover:text-light">{ user.username }</p>
          )}
          <Icon icon="user" className='sm:text-xl group-hover:text-light' />
          {user && (
            <div className="h-fit px-[6px] rounded-sm bg-secondary group-hover:bg-light leading-[14px]">
              <span className="text-primary text-[12px] leading-[14px]">{ calcLevel(user.xp).level }</span>
            </div>
          )}
        </Link>
        {user && (
          <button onClick={() => {logout(); setUser(null); navigate('/login')}} className="text-secondary hover:text-light cursor-pointer">
            <Icon icon='signout' className='text-md sm:text-xl text-secondary hover:text-light cursor-pointer' />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
