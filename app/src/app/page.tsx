'use client'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import LoadingIcon from '../../public/loading-updated.gif';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignInSchema } from '../../schemas/SignInAndUpSchema'; 
import { ISignIn } from '../../types/type';
import { useGlobalContext } from './Context/store';
import { LiaUserLockSolid } from 'react-icons/lia';
import parseJwt from './helper/DecodeJWT';



function page() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { register, reset, handleSubmit, formState: { errors }, } = useForm<ISignIn>({
    resolver: zodResolver(SignInSchema)
  })

  const [isLoading, setIsLoading] = useState(false);
  const [invalidLogin, setInvalidLogin] = useState(false);
  const navigate = useRouter();
  const { token, setToken, cartCount, setCartCount } = useGlobalContext();

  const handleSignin = (data: ISignIn) => {
    setIsLoading(!isLoading);
    // console.log(data);
    const url = `${apiUrl}Auth/Login`;

    async function SignInDetail(data: ISignIn) {

      const response = await fetch(`${url}`, {
        method: "post",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      })
      // console.log(await response.json());
      const responseStatus = await response.status;
      if (responseStatus == 401) {
        setIsLoading(false);
        setInvalidLogin(true);
        return false;
      }
      const okResponse = await response.ok;
      if (!okResponse) {
        setIsLoading(false);
        setInvalidLogin(true);
        return false;
      }
      const responseJson = await response.json();
      // count cart items
      const fetchData = async (id:number) => {
        const response = await fetch(`${apiUrl}Cart/Cart/0/0/${id}/0/0/0/None`);
        const result = await response.json();
        if (result) {
          setCartCount(result.length);  
        }
        return await result.length;
      }
      const jsonDecode = parseJwt(responseJson.token);
      const userId = jsonDecode.userId;
      
      const countCartLength:number= await fetchData(userId);
      // console.log(countCartLength);
          
      
      setToken(responseJson.token);
      reset();
      setIsLoading(!isLoading);
      
      
      navigate.push(`/home?token=${responseJson.token}&cartCount=${countCartLength}`);
    }
    SignInDetail(data);
  }

  return (
      <form className='flex justify-center items-center h-screen p-6' onSubmit={handleSubmit(handleSignin)}>

        <div className='bg-slate-50 w-96 p-10 rounded-2xl shadow-2xl'>
          <div className='flex items-center justify-center mb-4'>
            <LiaUserLockSolid size={50} className='h-18 text-blue-500' />
          </div>

          {
            errors.email && (
              <p className='bg-red-600 text-sm px-1 py-1 rounded text-gray-100'>{errors.email.message as string}</p>
            )
          }
          {
            errors.password && (
              <p className='bg-red-600 text-sm px-1 py-1 rounded text-gray-100 mb-2'>{errors.password.message as string}</p>
            )
          }

          {
            invalidLogin && (
              <p className='bg-red-600 text-sm px-1 py-1 rounded text-gray-100 mb-2'>Invalid credentials! try again.</p>
            )
          }

          <label className='text-gray-700 px-1 text-sm'>Email</label>
          <input {...register("email")} type='email' placeholder='Email' className='text-sm w-full py-2 bg-gray-300 text-gray-500 px-1 outline-none mb-1' />

          <label className='text-gray-700 px-1 text-sm'>Password</label>
          <input {...register("password")} type='Password' name="password" placeholder='Password' className='text-sm w-full py-2 bg-gray-300 text-gray-500 px-1 outline-none mb-1' />

          <div className='px-1 mb-4 mt-2'>
            <Link className='coursor-pointer transition hover:text-cyan-200 outline-none text-sm' href='/sign-up'>Not Yet Registered?</Link>
          </div>

          <div>{isLoading ? <button className="bg-blue-500 w-full text-gray-100 py-2 rounded hover:bg-blue-600 transition-colors text-sm" type='submit' disabled>{isLoading ? <div className='flex justify-center items-center'><label>Sign In (Processing...)</label></div> : <label>Sign In</label>}</button> : <button className='bg-blue-500 w-full text-gray-100 py-2 rounded hover:bg-blue-600 transition-colors text-sm' type='submit'>Sign In</button>}</div>
        </div>
      </form>


  )
}

export default page
