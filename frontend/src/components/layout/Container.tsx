import React, { ComponentPropsWithoutRef, ReactNode } from 'react';

interface IProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
}

export const Container = ({ children, ...props }: IProps) => {
  return (
    <div { ...props } className={`w-full h-full flex-grow bg-primary flex flex-col justify-center items-center px-4 sm:px-12 py-12 gap-8 ${ props.className }`}>
      { children }
    </div>
  )
};

export default Container;