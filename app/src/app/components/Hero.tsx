"use client"
import React from 'react'
import Slider from 'react-slick'
import Slide from './Slide'

const Hero = () => {
    var settings ={
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        pauseOnHover: false,
        speed:500,
        fade: true,
        opacity: 0.1,
        
    }

    const slideData =[
        {
            id:0,
            img:"/banner-1.jpg",
            title:"Grand Sale",
            mainTitle:"Mobile phone, laptop and Ipad sale",
            price:"$900",
        },
        {
            id:1,
            img:"/banner-2.jpg",
            title:"Grand Sale",
            mainTitle:"Mobile phone, laptop and Ipad sale",
            price:"$400",
        },
    ]
  return (
    <div className='sm:w-[80%] md:w-full lg:w-full'>
        <Slider {...settings}>
            {slideData.map((item)=>
            <Slide 
                key={item.id}
                img={item.img}
                title={item.title}
                mainTitle={item.mainTitle}
                price={item.price} 
            />)}
        </Slider>
      
    </div>
  )
}

export default Hero
