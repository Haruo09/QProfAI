'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import NavBar from '@/components/NavBar';
import { getUser } from '@/actions/getUser';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'

export default function Login() {
  const loginSchema = z.object({
    email: z.string().email().nonempty(),
    password: z.string().nonempty()
  });

  const [showErrorMsg, setShowErrorMsg] = useState("hidden");

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema)
  });

  async function handleLogin(data) {
    const user = await getUser(data.email, data.password);
    console.log(user);
    if (JSON.stringify(user) === "[]") {
      setShowErrorMsg("block");
      return;
    }

    setShowErrorMsg("hidden");
  }

  return (
    <>
      <NavBar />
      <div className='h-2/3 flex items-center justify-center'>
        <form onSubmit={handleSubmit(handleLogin)}
          className='w-1/4 border-indigo-950 border-solid border-2 shadow-deeppurple shadow-s p-5'
        >
          <h1>Login</h1>
          <input type="email" name="input_email" placeholder='e-mail:' className='txt-field' {...register("email", {
            required: true,
            pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/
          })} />

          <input type="password" name="input_pass" placeholder='senha:' className='txt-field' {...register("password", {
            required: true,
            minLength: 6
          })} />
          <p className={`${showErrorMsg} text-red-500 mt-2`}>Usuário ou senha incorretos. Tente novamente.</p>
          <input type="submit" value="Entrar" className='btn-primary'/>
          <p>Não possui cadastro? <Link className='text-indigo-400 hover:text-indigo-500 duration-100' href={'/cadastro'}>Clique aqui</Link></p>
        </form>
      </div>
    </>
  )
}
