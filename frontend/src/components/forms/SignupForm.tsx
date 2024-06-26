import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { TogglePassword } from "../ui";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "api/api";
import { User } from "@prisma/client";
import { toast } from "react-toastify";

interface IForm {
  username: string;
  email: string;
  password: string;
}

export const SignupForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm<IForm>({
    defaultValues: { username: "", email: "", password: "" },
  });
  const [show, setShow] = useState(false);

  const onSubmit: SubmitHandler<IForm> = async (data) => {
    const res: User | { message: string } = await signup(data.username, data.email, data.password);

    if ('message' in res) {
      toast.error(res.message);
      reset();
      return;
    }
    
    toast.success('Account created successfully');
    navigate('/');
    window.location.reload();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='w-full sm:w-2/3 md:w-1/3 h-2/3 flex flex-col justify-between items-center gap-4 p-4 bg-gradient-to-b from-[#00000030] to-[#000000A0] rounded-xl'
    >
      <h2 className='text-4xl text-yellowAcent font-bold'>Sign Up</h2>
      <div className='w-full flex flex-col gap-2'>
        <h3 className='text-light'>Username</h3>
        <input
          type='text'
          required
          {...register("username")}
          className='px-2 rounded-full py-1'
        />
        <h3 className='text-light'>Email</h3>
        <input
          type='text'
          required
          {...register("email")}
          className='px-2 rounded-full py-1'
        />
        <h3 className='text-light'>Password</h3>
        <div className='relative w-full'>
          <input
            type={show ? "text" : "password"}
            required
            {...register("password")}
            className='w-full px-2 rounded-full py-1'
          />
          <TogglePassword
            state={show}
            setState={setShow}
            className='absolute top-[5px] right-4'
          />
        </div>
      </div>
      <div className='w-full flex flex-col items-center gap-2'>
        <button
          type='submit'
          className='w-full py-2 px-4 text-light border-[2px] border-secondary hover:bg-secondary transition-colors rounded-lg'
        >
          Sign Up
        </button>
        <Link
          to='/login'
          className='w-fit text-center text-secondary hover:text-yellowAcent'
        >
          Already go an account?
        </Link>
      </div>
    </form>
  );
};

export default SignupForm;
