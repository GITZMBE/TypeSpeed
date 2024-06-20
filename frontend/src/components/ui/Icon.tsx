import React from 'react';
import { BiQuestionMark } from 'react-icons/bi';
import { IconBaseProps } from 'react-icons';
import { FaTrash } from 'react-icons/fa';

interface IconProps extends IconBaseProps {
  icon: string;
  className?: string;
  size?: number;
}

export const Icon = ({ icon, className, size = 20, ...props }: IconProps) => {
  const defaultClasses = "w-5 aspect-square text-secondary";

  switch (icon) {
    case "trash":
      return <FaTrash size={size} className={`${className} ${defaultClasses}`} {...props} />;
    default:
      return <BiQuestionMark size={size} className={`${className} ${defaultClasses}`} {...props} />;
  }
};

export default Icon;
