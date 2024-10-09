'use client'
import React from 'react'
import Image from 'next/image'
import Loader from './../../public/loader.gif'

const Loading = () => {
  return (
    <main className='flex justify-center items-center h-screen'>
      <Image src={Loader} width={200} height={200}  alt='loading-spinner' />
      {/* <h2 className='text-black'>Loading...</h2> */}
    </main>
  )
}

export default Loading
