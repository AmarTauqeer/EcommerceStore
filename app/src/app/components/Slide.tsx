import Image from 'next/image';
import React from 'react'

interface propsType{
    img: string;
    title: string;
    mainTitle:string;
    price: string;
}

const Slide:React.FC<propsType> = ({img, title, mainTitle, price}) => {
  return (
    <main className='outline-none border-none'>
      <div className='absolute lef-[30px] md:lef-[70px] max-w-[375px] sm:max-w-[450px] top-[50%] -translate-y-[50%] space-y-2 
      lg:space-y-4 bg-[#ffffffa2] sm:bg-transparent  sm:p-0 rounded-lg sm:rounded-none'>
        <h3 className='text-white text-[24px] lg:text-[28px] px-6'>{title}</h3>
        <h2 className='text-white text-[26px] md:text-[30px] lg:text-[44px] font-bold leading-[1.2] px-6'>{mainTitle}</h2>
        {/* <h3 className='text-[24px] text-gray-500'>
            starting at{" "}
            <b className='text-[20px] md:text-[24px] lg:text-[30px'>
                {price}
            </b>
            .00
        </h3>
        <div className='bg-cyan-300 text-white text-[14px] md:text-[16px] p-2 px-4 rounded-lg inline-block cursor-pointer hover:bg-cyan-600'>
            Shop Now
        </div> */}
        <br />
        <br />
        <br />
        <br />

        <a className='text-white px-6' href="https://www.vecteezy.com/free-vector/tablet">Image source Vecteezy</a>
      </div>

      <div className='flex justify-center items-center object-cover'><img alt='slider image' src={img} /></div>
    </main>
  )
}

export default Slide
