import { User } from '@prisma/client';
import { getCurrentUser } from 'api/api';
import { ToolTip } from 'components/ui';
import { format } from 'date-fns';
import { LevelInfo } from 'models';
import React, { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { addUnitToXp, calcLevel } from 'utils';

export const UserExperience = () => {
  const [user, setUser] = useState<User>(null);
  const [levelInfo, setLevelInfo] = useState<LevelInfo>(null);

  useEffect(() => {
    getCurrentUser().then(setUser);
  }, []);

  useEffect(() => {
    if (!user) return;

    setLevelInfo(calcLevel(user.xp));
  }, [user]);

  return user && (
    <div className='w-full'>
      <div className='w-fit sm:min-w-80 flex flex-col gap-4 bg-dark text-secondary p-4 rounded-lg'>
        <div className='flex gap-4'>
          <FaUserCircle size={70} className='' />
          <div className='flex flex-col gap-2'>
            <span className='text-light text-4xl font-semibold'>{ user.username }</span>
            <span className='text-sm'>Joined { format(new Date(user.joinedAt), 'dd MMMM yyyy') }</span>
          </div>
        </div>
        {levelInfo && (
          <div className='flex gap-4 items-center'>
            <span className='text-light text-xl'>{ calcLevel(user.xp).level }</span>
            <div className='w-full h-2 bg-primary rounded-full overflow-hidden'>
              <div style={{ width: `${100 * levelInfo.remainingXp / levelInfo.xpForLevel}%` }} className='h-full bg-yellowAcent'></div>
            </div>
            <ToolTip content={
              <span>{ levelInfo.xpToNextLevel } xp until next level</span>
            }>
              <span className='text-sm text-nowrap'>{ addUnitToXp(levelInfo.remainingXp) } / { addUnitToXp(levelInfo.xpForLevel) }</span>
            </ToolTip>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserExperience