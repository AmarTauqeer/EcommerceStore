'use client'
import { useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react'
import { useGlobalContext } from '../Context/store';
import { OrderTypes } from '../../../types/type';
import Loading from '../loading';
import PaginatedTable from '../components/PaginatedTable';

const OrderSummary = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const params = useSearchParams();
    const { token } = useGlobalContext();
    const tokenValue = params.get('token')!;
    const [data, setData] = useState<OrderTypes[]>([])
    const [dataWithKey, setDataWithKey] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [grandTotal, setGrandTotal] = useState(0);
    const [grandQty, setGrandQty] = useState(0);
    var userId: string = "";

    if (tokenValue != "") {
        const base64Url = tokenValue.split('.')[1];
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

    const fetchData = async (id: number) => {
        setIsLoading(true);
        // await new Promise(resolve => setTimeout(resolve, 3000))
        // console.log(id);
        const response = await fetch(`${apiUrl}OrderDetail/OrderDetail/0/0/0/${id}/None?modelId=0&brandId=0`);
        const result = await response.json();
        console.log(result)
        var newData = [];
        if (result.length > 0) {

            for (let j = 0; j < result.length; j++) {
                const element = result[j];

                const responseProduct = await fetch(`${apiUrl}Product/Products/${element.productId}/0/0/0/None`);
                const resultProduct = await responseProduct.json();
                const productTilte = await resultProduct[0].productTitle;


                const updatedData = {
                    orderId: element.orderId,
                    cartId: element.cartId,
                    productId: element.productId,
                    productDescription: element.productDescription,
                    imagePath: element.imagePath,
                    productTitle: productTilte,
                    quantity: element.quantity,
                    price: element.price,
                    amountPerProduct: element.amountPerProduct,
                    userId: Number(userId)
                }
                newData.push(updatedData);
            }

            setData(newData);
            // create a unique key
            var updatedOrderData: any = [];
            var count = 0;
            for (let i = 0; i < newData.length; i++) {
                count++;
                const element = newData[i];

                const data = {
                    key: count.toString(),
                    orderId: element.orderId,
                    productTitle: element.productTitle,
                    quantity: element.quantity,
                    price: element.price,
                    amountPerProduct: element.amountPerProduct
                }
                updatedOrderData.push(data);
            }
            // console.log(updatedOrderData)
            setDataWithKey(updatedOrderData);

            var netTotal = 0;
            var netQty = 0;
            // compute grand total
            for (let i = 0; i < result.length; i++) {
                const element = result[i];
                netTotal += element.amountPerProduct;
                netQty += element.quantity;
            }
            setGrandTotal(netTotal);
            setGrandQty(netQty);
        } else {
            console.log("No record is found.")
            setData([]);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        fetchData(Number(userId));
    }, [])

    return (
        <>
            {isLoading ? <div ><Loading /></div> :
                <div className="py-5 flex flex-col justify-items-center items-center bg-slate-50 w-full">
                    <div className='md:w-[50%]'>
                        <div><h1 className="pt-5 pb-5 font-semibold text-lg text-center">Order Summary</h1></div>
                        <div>{dataWithKey.length > 0 && <PaginatedTable orderData={dataWithKey} />}</div>
                    </div>
                </div>
            }
        </>

    )
}

export default OrderSummary
