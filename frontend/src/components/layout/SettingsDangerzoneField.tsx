import React from "react";
import { Icon } from "components/ui";

interface IProps {
  iconName: string;
  title: string;
  message: string;
  dangerMessage: string;
  buttonText: string;
  action: () => void;
}

export const SettingsDangerzoneField = ({ title, iconName, message, dangerMessage, buttonText, action }: IProps) => {
  return (
    <div className='w-full flex flex-col gap-2'>
      <div className='flex items-center gap-2 text-secondary cursor-default'>
        <Icon icon={iconName} />
        <h2 className='text-nowrap'>{ title }</h2>
      </div>
      <div className='w-full flex justify-between gap-4 flex-wrap sm:flex-nowrap'>
        <div className='flex flex-col gap-2'>
          <p className='text-light cursor-default'>
            { message }
          </p>
          <p className='text-redAcent cursor-default'>
            { dangerMessage }
          </p>
        </div>
        <button
          onClick={action}
          className='w-full h-fit sm:w-1/3 py-2 px-4 rounded-lg bg-redAcent hover:bg-light text-primary font-semibold transition'
        >
          { buttonText }
        </button>
      </div>
    </div>
  );
};

export default SettingsDangerzoneField;
