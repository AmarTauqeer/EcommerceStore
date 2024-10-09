'use client'
import { useGlobalContext } from '@/app/Context/store';
import Loading from '@/app/loading';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { IResetPassword } from '../../../../types/type';
import { ResetPasswordSchema } from '../../../../schemas/SignInAndUpSchema';

const ResetPassword = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const { token } = useGlobalContext();
    const params = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState([]);
    const customToken = params.get('token')
    var userId = 0;

    if (customToken != null) {
        const base64Url = customToken.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        if (typeof window !== 'undefined') {
            const jsonDecode = JSON.parse(window.atob(base64));
            userId = jsonDecode.userId;
        }

    } else {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        if (typeof window !== 'undefined') {
            const jsonDecode = JSON.parse(window.atob(base64));
            userId = jsonDecode.userId;
        }
    }

    const { register, reset, handleSubmit, formState: { errors }, } = useForm<IResetPassword>({
        resolver: zodResolver(ResetPasswordSchema)
    })

    const navigate = useRouter();
    const [resetPasswordFailed, setResetPasswordFailed] = useState(false);


    const handleResetPassword = (data: IResetPassword) => {
        setIsLoading(!isLoading);
        console.log(data);
        const newData ={
            userId:userId,
            currentPassword:data.oldPassword,
            newPassword:data.newPassword
        }

        async function ResetPasswordDetail(data: IResetPassword) {
            const response = await fetch(`${apiUrl}Auth/ResetPassword`, {
                method: "PUT",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${customToken}`
                },
                body: JSON.stringify(newData),
            })
            // console.log(await response.json());
            const responseStatus = await response.status;
            console.log(responseStatus)
            if (responseStatus == 401) {
                setIsLoading(false);
                setResetPasswordFailed(true);
                return false;
            }
            const okResponse = await response.ok;
            if (!okResponse) {
                setIsLoading(false);
                setResetPasswordFailed(true);
                return false;
            }
            // // const responseJson = await response.json();
            // //   setToken(responseJson.token);
            // reset();
            // setIsLoading(!isLoading);
            // navigate.push("/");
        }
        ResetPasswordDetail(data);
    }

    // useEffect(() => {
    //     async function fetchUser(userId: number) {
    //         setIsLoading(true)
    //         await new Promise(resolve => setTimeout(resolve, 1000))
    //         const response = await fetch(`${apiUrl}UserComplete/GetUsers/${userId}/true`, {
    //             method:'POST',
    //             headers: {
    //                 'content-Type': 'application/json'
    //             }
    //         });
    //         const result = await response.json();
    //         // console.log(result);
    //         setUser(await result)
    //         setIsLoading(false)
    //     }
    //     fetchUser(userId);

    // }, [userId])
    return (
        <>
            {isLoading ? <div className='flex justify-center items-center h-screen'><Loading /></div> :
                <>
                    <div className="flex flex-col justify-items-center items-center bg-slate-50">

                        <div className="flex flex-col justify-center">
                            <div><h1 className="pt-5 pb-5 font-semibold">Reset Password</h1></div>
                        </div>

                        {
                            errors.oldPassword && (
                                <p className='bg-red-600 text-sm px-1 py-1 rounded text-gray-100 mb-2'>{errors.oldPassword.message as string}</p>
                            )
                        }
                        {
                            errors.newPassword && (
                                <p className='bg-red-600 text-sm px-1 py-1 rounded text-gray-100 mb-2'>{errors.newPassword.message as string}</p>
                            )
                        }
                        {
                            errors.confirmPassword && (
                                <p className='bg-red-600 text-sm px-1 py-1 rounded text-gray-100 mb-2'>{errors.confirmPassword.message as string}</p>
                            )
                        }



                        <div className='flex justify-center w-full pb-24 pt-10' >


                            <div className='grid grid-cols-1 md:grid-cols-2 max-w-[50%] gap-2 w-full shadow-2xl rounded-lg p-2'>
                                <div className='px-5 basis-2 font-semibold'>Old Password: </div>
                                <div><input {...register("oldPassword")} type='password' placeholder='old password' className='text-sm w-full py-2 bg-gray-300 text-gray-500 px-1 outline-none mb-1' /> </div>

                                <div className='px-5 basis-2 font-semibold'>New Password: </div>
                                <div><input {...register("newPassword")} type='password' placeholder='new password' className='text-sm w-full py-2 bg-gray-300 text-gray-500 px-1 outline-none mb-1' /> </div>

                                <div className='px-5 basis-2 font-semibold'>Confirm Password: </div>
                                <div><input {...register("confirmPassword")} type='password' placeholder='confirm Password' className='text-sm w-full py-2 bg-gray-300 text-gray-500 px-1 outline-none mb-1' /> </div>

                                <div> </div>
                                <div className='px-5 basis-2 font-semibold'>
                                    {/* <div><button onClick={handleSubmit((e)=>handleResetPassword(e))}>submit</button></div> */}
                                    <div>{isLoading ? <button className="bg-blue-500 w-full text-gray-100 py-2 rounded hover:bg-blue-600 transition-colors text-sm" onClick={handleSubmit((e) => handleResetPassword(e))} disabled>{isLoading ? <div className='flex justify-center items-center'><label>Reset Password (Processing...)</label></div> : <label>Rest Password</label>}</button> : <button className='bg-blue-500 w-full text-gray-100 py-2 rounded hover:bg-blue-600 transition-colors text-sm' onClick={handleSubmit((e) => handleResetPassword(e))} >Rest Password</button>}</div>
                                </div>

                            </div>


                        </div>
                        {/* </form> */}

                    </div>
                </>
            }
        </>
    )
}

export default ResetPassword
