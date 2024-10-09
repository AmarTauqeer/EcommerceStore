'use client'
import React, { useEffect, useState } from 'react'
import { FiHeart } from 'react-icons/fi'
import { HiOutlineShoppingBag } from 'react-icons/hi'
import { useRouter, useSearchParams } from 'next/navigation'
import Navbar from './Navbar'
import { useGlobalContext } from '../Context/store'
import UserDropdown from './UserDropdown'

const Header = () => {
  const { token, cartCount } = useGlobalContext();
  const params = useSearchParams();
  var userToken = "";
  var userCartCount=0;
  var userId = 0;

  if (token == "" || token == null) {
    userToken = params.get('token')!;
  } else {
    userToken = token;
  }

  if (userToken!==null) {
    const base64Url = userToken.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    if (typeof window !== 'undefined'){
      const jsonDecode = JSON.parse(window.atob(base64));
      userId = jsonDecode.userId;
    }
  }

  if (params.get('cartCount')==null) {
    userCartCount = cartCount;
  } else {
    userCartCount = Number(params.get('cartCount'));
  }
  
  const navigate = useRouter();
  const [header, setHeader] = useState(false);

  const scrollHeader = () => {
    if (window.scrollY >= 20) {
      setHeader(true)
    } else {
      setHeader(false)
    }
  }

  const handleClick = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    const params = new URLSearchParams();
    const pathname: string = "/shopping-cart"
    if (token !== "") {
      params.set("token", token);
    } else {
      params.set("token", userToken);
    }

    navigate.push(`${pathname}?${params.toString()}`);
  }


  useEffect(() => {
    window.addEventListener('scroll', scrollHeader)

    return () => {
      window.addEventListener('scroll', scrollHeader)
    }
  }, [])

  return (
    <main>
      {userToken != null && <div className={header ? 'fixed w-full text-white bg-gray-400 flex flex-col px-2 pt-5 pb-5 sm:px-0 sm:justify-center sm:text-white md:px-2 md:w-[80%] md:text-white md:bg-gray-400 md:flex-row md:justify-between lg:text-white lg:px-2 lg:bg-gray-400 lg:flex-row lg:justify-between lg:w-[80%]' : 'flex flex-col px-2 pt-5 pb-5 text-white bg-blue-400 sm:px-0 sm:justify-center md:bg-blue-400 md:flex-row md:justify-between md:px-2 lg:px-2 lg:bg-blue-400 lg:flex-row lg:justify-between'}>
        <div className='font-bold text-lg text-center pb-4 sm:pb-0'>
          E-Commerce
        </div>
        <div><Navbar /></div>
        <div className='flex justify-center items-center mt-2 sm:flex lg:flex gap-4  text-[20px]'>
          <UserDropdown customToken ={userToken} />
          <div className='relative'>
            <FiHeart />
            <div className='bg-red-600 text-white rounded-full absolute top-0 right-0 w-[14px] h-[14px] text-[10px]  grid place-items-center translate-x-1 -translate-y-1'>
              0
            </div>
          </div>
          <div className='relative hover:cursor-pointer'>
            <HiOutlineShoppingBag onClick={handleClick} />

            <div className='bg-red-600 text-white rounded-full absolute top-0 right-0 w-[14px] h-[14px] text-[10px] grid place-items-center translate-x-1 -translate-y-1'>
              {userCartCount}
            </div>
          </div>
        </div>
      </div>}

    </main>
  )
}

export default Header
