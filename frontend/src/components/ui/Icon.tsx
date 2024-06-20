import React from 'react';
import { BiQuestionMark } from 'react-icons/bi';
import { IconBaseProps } from 'react-icons';
import { FaBell, FaCrown, FaInfo, FaKeyboard, FaSignOutAlt, FaTrash, FaUser, FaUserCircle } from 'react-icons/fa';
import { IoIosMail, IoMdSettings } from 'react-icons/io';
import { MdAccessTimeFilled, MdTypeSpecimen } from 'react-icons/md';
import { TbSquareLetterA } from 'react-icons/tb';

interface IconProps extends IconBaseProps {
  icon: string;
  className?: string;
  size?: number;
}

export const Icon = ({ icon, className, size = 20, ...props }: IconProps) => {
  const defaultClasses = "w-5 aspect-square text-secondary";

  switch (icon) {
    case "AIcon":
      return <MdTypeSpecimen size={size} className={`${className} ${defaultClasses}`} {...props} />;
    case "trash":
      return <FaTrash size={size} className={`${className} ${defaultClasses}`} {...props} />;
    case "crown":
      return <FaCrown size={size} className={`${className} ${defaultClasses}`} {...props} />;
    case "settings":
      return <IoMdSettings size={size} className={`${className} ${defaultClasses}`} {...props} />;
    case "keyboard":
      return <FaKeyboard size={size} className={`${className} ${defaultClasses}`} {...props} />;
    case "info":
      return <FaInfo size={size} className={`${className} ${defaultClasses}`} {...props} />;
    case "user":
      return <FaUser size={size} className={`${className} ${defaultClasses}`} {...props} />;
    case "usercircle":
      return <FaUserCircle size={size} className={`${className} ${defaultClasses} `} {...props} />;
    case "bell":
      return <FaBell size={size} className={`${className} ${defaultClasses}`} {...props} />;
    case "signout":
      return <FaSignOutAlt size={size} className={`${className} ${defaultClasses}`} {...props} />;
    case "mail":
      return <IoIosMail size={size} className={`${className} ${defaultClasses}`} {...props} />;
    case "letterA":
      return <TbSquareLetterA size={size} className={`${className} ${defaultClasses}`} {...props} />;
    case "clock":
      return <MdAccessTimeFilled size={size} className={`${className} ${defaultClasses}`} {...props} />;
    default:
      return <BiQuestionMark size={size} className={`${className} ${defaultClasses}`} {...props} />;
  }
};

export default Icon;
