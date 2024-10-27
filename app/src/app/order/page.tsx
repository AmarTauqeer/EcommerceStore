
import React, { Suspense } from 'react'
import PaginatedTable from '../components/PaginatedTable';
import fetchOrderSummary from '../helper/OrderHelper';
import Image from 'next/image'
import Loader from '../../../public/loader.gif'

export interface OrderTypes {
    productId: number,
    productTitle: string,
    productDescription: string,
    price: number,
    quantity: number,
    amountPerProduct: number,
    userId: number,
    imagePath: string,
    cartId: number,
    orderId: number,
    key: number
}

const OrderSummary = async (
    props: {
        searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
    }
) => {
    const searchParams = await props.searchParams;

    const userId = Number(await searchParams?.userId);

    const result = await fetchOrderSummary(userId);



    return (
        <>
            <div className="py-5 flex flex-col justify-items-center items-center bg-slate-50 w-full">
                <div className='md:w-[50%]'>
                    <div><h1 className="pt-5 pb-5 font-semibold text-lg text-center">Order Summary</h1></div>
                    <Suspense fallback={<div className='flex justify-center items-center'><Image src={Loader} width={100} height={100}  alt='loading-spinner' /></div>}><PaginatedTable orderData={result} /></Suspense>
                </div>
            </div>
        </>

    )
}

export default OrderSummary
