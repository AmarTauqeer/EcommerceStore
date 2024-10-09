'use client'
import Link from 'next/link'
import React, { useState, MouseEvent } from 'react'
import { useRouter } from 'next/navigation';
import { ISignUp } from '../../../types/type';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignUpSchema } from '../../../schemas/SignInAndUpSchema';
import { LiaUserLockSolid } from 'react-icons/lia';

const SignUp = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const { register, reset, handleSubmit, formState: { errors }, } = useForm<ISignUp>({
        resolver: zodResolver(SignUpSchema)
    })

    const [isLoading, setIsLoading] = useState(false)
    const navigate = useRouter();
    const [registerFailed, setRegisterFailed] = useState(false);

    const handleSignup = (data: ISignUp) => {
        setIsLoading(!isLoading);
        console.log(data);

        const url = `${apiUrl}Auth/Register`;

        async function SignUpDetail(data: ISignUp) {
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
                setRegisterFailed(true);
                return false;
            }
            const okResponse = await response.ok;
            if (!okResponse) {
                setIsLoading(false);
                setRegisterFailed(true);
                return false;
            }
            reset();
            setIsLoading(!isLoading);
            navigate.push("/");
        }
        SignUpDetail(data);
    }
    return (
        <form className='flex justify-center items-center h-screen p-6' onSubmit={handleSubmit(handleSignup)}>

            <div className='bg-slate-50 w-96 p-10 rounded-2xl shadow-2xl'>
                <div className='flex items-center justify-center mb-4'>
                    <LiaUserLockSolid size={50} className='h-10 text-blue-500 md:h-18 lg:h-18' />
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
                    errors.passwordConfirm && (
                        <p className='bg-red-600 text-sm px-1 py-1 rounded text-gray-100 mb-2'>{errors.passwordConfirm.message as string}</p>
                    )
                }
                {
                    registerFailed && (
                        <p className='bg-red-600 text-sm px-1 py-1 rounded text-gray-100 mb-2'>Registration faild.</p>
                    )
                }



                <label className='text-gray-700 px-1 text-sm'>Email</label>
                <input {...register("email")} type='email' placeholder='Email' className='text-sm w-full py-2 bg-gray-300 text-gray-500 px-1 outline-none mb-1' />

                <label className='text-gray-700 px-1 text-sm'>Password</label>
                <input {...register("password")} type='Password' name="password" placeholder='Password' className='text-sm w-full py-2 bg-gray-300 text-gray-500 px-1 outline-none mb-1' />

                <label className='text-gray-700 px-1 text-sm'>Password Confirm</label>
                <input {...register("passwordConfirm")} type='Password' name="passwordConfirm" placeholder='Password confirm' className='text-sm w-full py-2 bg-gray-300 text-gray-500 px-1 outline-none mb-1' />

                <div className='px-1 mb-4 mt-2'>
                    <Link className='coursor-pointer transition hover:text-cyan-200 outline-none text-sm' href='/'>Already a account?</Link>
                </div>

                <div>{isLoading ? <button className="bg-blue-500 w-full text-gray-100 py-2 rounded hover:bg-blue-600 transition-colors text-sm" type='submit' disabled>{isLoading ? <div className='flex justify-center items-center'><label>Sign Up (Processing...)</label></div> : <label>Sign Up</label>}</button> : <button className='bg-blue-500 w-full text-gray-100 py-2 rounded hover:bg-blue-600 transition-colors text-sm' type='submit'>Sign Up</button>}</div>
            </div>
        </form>


    )
}


export default SignUp
