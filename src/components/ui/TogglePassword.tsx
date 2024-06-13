import React, { Dispatch, SetStateAction, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

interface IProps {
  state: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
};

export const TogglePassword = ({ state, setState }: IProps) => {
  return state ? (
    <FaEyeSlash size={20} onClick={() => setState(false)} className='cursor-pointer text-secondary hover:text-light' />
  ) : (
    <FaEye size={20} onClick={() => setState(true)} className='cursor-pointer text-secondary hover:text-light' />
  )}

export default TogglePassword;