'use client'
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../Context/store';
import { useSearchParams } from 'next/navigation';
import Loading from '../loading';

const User = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const { token } = useGlobalContext();
    const params = useSearchParams();
    const customToken = params.get('token')
    const [user, setUser] = useState([])
    const [isLoading, setIsLoading] = useState(false);
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


    useEffect(() => {
        async function fetchUser(userId: number) {
            setIsLoading(true)
            await new Promise(resolve => setTimeout(resolve, 1000))
            const response = await fetch(`${apiUrl}UserComplete/GetUsers/${userId}/true`, {
                headers: {
                    'content-Type': 'application/json'
                }
            });
            const result = await response.json();
            // console.log(result);
            setUser(await result)
            setIsLoading(false)
        }
        fetchUser(userId);
        
    }, [userId])

    return (
        <>
            {isLoading ? <div className='flex justify-center items-center h-screen'><Loading /></div> :
                <>
                    <div className="flex flex-col justify-items-center items-center bg-slate-50">

                        <div className="flex flex-col justify-center">
                            <div><h1 className="pt-5 pb-5 font-semibold">User Information</h1></div>
                        </div>

                        {
                            user.map((u:any, index) => (
                                <div className='flex justify-center w-full pb-24 pt-10' key={index}>
                                    <div className='grid grid-cols-1 md:grid-cols-2 max-w-[50%] gap-2 w-full shadow-2xl rounded-lg p-2'>
                                        <div className='px-5 basis-2 font-semibold'>First Name: </div>
                                        <div> {u.firstName}</div>

                                        <div className='px-5 basis-2 font-semibold'>Last Name: </div>
                                        <div> {u.lastName}</div>

                                        <div className='px-5 basis-2 font-semibold'>Email: </div>
                                        <div> {u.email}</div>

                                        <div className='px-5 basis-2 font-semibold'>Gender: </div>
                                        <div> {u.gender}</div>

                                        <div className='px-5 basis-2 font-semibold'>Department: </div>
                                        <div> {u.department}</div>



                                    </div>

                                </div>
                            ))
                        }

                    </div>
                </>
            }
        </>
    )
}

export default User
