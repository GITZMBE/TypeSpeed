import React, { ComponentPropsWithoutRef, Dispatch, SetStateAction, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

interface IProps extends ComponentPropsWithoutRef<"button"> {
  state: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
};

export const TogglePassword = ({ state, setState, ...props }: IProps) => {
  return state ? (
    <FaEyeSlash size={20} onClick={() => setState(false)} className={`cursor-pointer text-secondary hover:text-light ${props.className}`} />
  ) : (
    <FaEye size={20} onClick={() => setState(true)} className={`cursor-pointer text-secondary hover:text-light ${props.className}`} />
  )}

export default TogglePassword;