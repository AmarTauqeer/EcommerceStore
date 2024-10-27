'use client'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { FaCircleMinus, FaCirclePlus } from 'react-icons/fa6';
import parseJwt from '../helper/DecodeJWT';
import { useGlobalContext } from '../Context/store';
import { loadStripe } from '@stripe/stripe-js';
import { OrderTypes } from '../../../types/type';
import HandleQty from '../helper/ShoppingCartHelper'
import Loading from '../loading';

const ShoptingCart = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const stripeAPIPublicKey = process.env.NEXT_PUBLIC_STRIPE_API_PUBLIC_KEY;
    const [isLoading, setIsLoading] = useState(false);
    const params = useSearchParams();
    const { token, setCartCount } = useGlobalContext();
    const tokenValue = params.get('token');


    var userId: string = "";

    if (tokenValue != "") {
        const jsonDecode = parseJwt(tokenValue as string);
        userId = jsonDecode.userId;
    } else {
        const jsonDecode = parseJwt(token);
        userId = jsonDecode.userId;
    }

    const [data, setData] = useState<OrderTypes[]>([]);
    const [grandTotal, setGrandTotal] = useState(0);
    const router = useRouter();


    const handleDelete = async (id: number, productId: number) => {

        if (id !== undefined && productId !== undefined && userId !== undefined) {
            const user = Number(userId)
            const deleteData = async () => {
                const response = await fetch(`${apiUrl}Cart/Cart/${id}/${productId}/${user}`, {
                    method: "DELETE",
                });

                const status = await response.status;
                if (status == 200) {
                    fetchData(user);
                }
                else {
                    console.log("errors to delete data.")
                }
            }
            deleteData()
            fetchData(user);
        }
    }

    const handleMinusQty = async (id: number) => {
        let cart: any = await HandleQty(id, data, "minus");
        if (cart) {
            setGrandTotal(cart.price * cart.quantity)
            fetchData(cart.userId);
        }

    }

    const handlePlusQty = async (id: number) => {
        let cart: any = await HandleQty(id, data, "plus");
        if (cart) {
            setGrandTotal(cart.price * cart.quantity)
            fetchData(cart.userId);
        }
    }

    const proceedToCheckOut = async (e: SyntheticEvent) => {
        const stripe = await loadStripe(`${stripeAPIPublicKey}`);

        var tokenForSuccessfulUrl = "";
        if (tokenValue !== null) {
            tokenForSuccessfulUrl = `${tokenValue}`
        } else {
            tokenForSuccessfulUrl = `${token}`
        }

        const headers = {
            'Content-Type': 'application/json'
        }

        const response = await fetch(`${apiUrl}stripe/create-checkout-session/${tokenForSuccessfulUrl}`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        })

        const session = await response.json();
        let result: any;
        if (stripe != null) {

            setIsLoading(true)
            // check if user has a cart already
            const orderResponse = await fetch(`${apiUrl}Cart/Cart/0/0/${Number(userId)}/0/0/0/None`);
            const orderResponseStatus = await orderResponse.status;
            if (orderResponseStatus == 200) {
                const orderResponseJson = await orderResponse.json();
                if (orderResponseJson.length != 0) {
                    // insert to order
                    const response = await fetch(`${apiUrl}Order/UpsertOrder`, {
                        method: "PUT",
                        headers: {
                            'Accept': 'application/json',
                            'content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            orderAmount: grandTotal,
                            userId: userId
                        })
                    });
                    const responseStatus: number = await response.status;

                    if (responseStatus != 200) {
                        console.log("errors")
                        return false;
                    }
                    setCartCount(0);
                }

            }

            // fetch order
            const responseOrder = await fetch(`${apiUrl}Order/Order/0/${Number(userId)}/None`);
            const responseOrderStatus: number = await responseOrder.status;
            var orderId: number = 0;
            if (responseOrderStatus == 200) {
                const responseOrderJson = await responseOrder.json();
                orderId = await responseOrderJson[0].orderId;
            }

            // add detail to order
            for (let i = 0; i < data.length; i++) {
                const element = data[i];
                // console.log(element.cartId)

                const orderDetailData =
                {
                    orderId: orderId,
                    cartId: element.cartId,
                    productId: element.productId,
                    quantity: element.quantity,
                    price: element.price,
                    amountPerProduct: element.amountPerProduct,
                    userId: Number(userId)
                }

                // create order detail
                const response = await fetch(`${apiUrl}OrderDetail/UpsertOrderDetail`, {
                    method: "PUT",
                    headers: {
                        'Accept': 'application/json',
                        'content-Type': 'application/json'
                    },
                    body: JSON.stringify(orderDetailData)
                });
                const responseStatus: number = await response.status;
                // console.log(responseStatus);
                if (responseStatus != 200) {
                    console.log("error to adding data into order detail.");
                    return false;
                }
                console.log("data saved successfully.");

                // delete cart
                await handleDelete(element.cartId, element.productId);
                setCartCount(0);
                // fetch cart data
                await fetchData(Number(userId));

            }

            result = await stripe.redirectToCheckout({
                sessionId: session.id
            });
            setIsLoading(false);
        }
    }

    const fetchData = async (id: number) => {
        // setIsLoading(true)
        const response = await fetch(`${apiUrl}Cart/Cart/0/0/${id}/0/0/0/None`);
        const result = await response.json();
        if (result.length > 0) {
            setData(result);
            setCartCount(result.length);
            var netTotal = 0;

            // compute grand total
            for (let i = 0; i < result.length; i++) {
                const element = result[i];
                netTotal += element.amountPerProduct;
            }
            setGrandTotal(netTotal);
        } else {
            console.log("No record is found.")
            setData([]);
            setCartCount(0);
        }
        // setIsLoading(false)
    }

    useEffect(() => {
        const id = Number(userId);
        fetchData(id);
    }, [userId])


    return (
        <div className='bg-slate-50'>
            <div className='flex justify-center items-center pb-5 pt-5'>
                <h1 className='text-xl font-bold'>Your Cart Information</h1>
            </div>
            {isLoading ? <div className='flex justify-center items-center h-screen'><Loading /></div> : <>
                <div className='flex justify-center items-center'>{data.length == 0 && <div>Your cart is empty!</div>}</div>
                <div className='grid grid-cols-1 md:grid-cols-2 p-5'>
                    <div className='flex flex-col items-end pr-2'>
                        {
                            data != null && data.map((d, index) => (
                                <div key={index} className='flex items-center bg-zinc-50 w-full rounded-xl md:w-[70%] p-2 md:h-[150px] shadow-2xl mb-1'>
                                    <div className='flex flex-row' key={index}>
                                        <div key={index}><img src={`http://localhost:5000/Uploads/${d.imagePath}`} width={150} height={150} alt="product-image" /></div>
                                        <div className='flex flex-col px-5'>
                                            <div key={index}>{d.productTitle}</div>
                                            <div className='flex flex-row pt-16 items-center'>
                                                <FaCirclePlus color='gray' size={20} onClick={(e: SyntheticEvent) => handlePlusQty(d.productId)} />
                                                <div className='px-2'>{d.quantity}</div>
                                                <FaCircleMinus color='gray' size={20} onClick={(e: SyntheticEvent) => handleMinusQty(d.productId)} />
                                            </div>


                                        </div>
                                        <div className='flex flex-col justify-between  w-48 md:w-48'>
                                            <div className='flex justify-end w-full border-green-500'>
                                                <div onClick={(e: SyntheticEvent) => handleDelete(d.cartId, d.productId)}><RiDeleteBin5Line onClick={(e: SyntheticEvent) => handleDelete(d.cartId, d.productId)} size={20} color='red' /></div>
                                            </div>
                                            <div className='w-full text-end'>
                                                <div>${d.amountPerProduct}</div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            ))
                        }
                    </div>
                    {data.length != 0 && <div className='flex'>
                        <div className='w-full p-1 rounded-xl bg-zinc-50 md:w-[60%] md:h-[170px] shadow-2xl'>
                            <div className='px-5 py-1 pt-5 font-semibold'>Sub Total: ${grandTotal}</div>
                            <div className='px-5 py-1 font-semibold'>Discount: $0000</div>
                            <div className='px-5 py-1 font-semibold'>Net Total: ${grandTotal}</div>
                            <div className='flex justify-center w-full pt-2'>
                                <div className='flex justify-center items-center w-full'>{isLoading ? <button className="bg-blue-500 w-48 text-gray-100 py-2 rounded hover:bg-blue-600 transition-colors text-sm" type='button' disabled>{isLoading ? <div className='w-48 flex justify-center items-center'><label>Checkout (Processing...)</label></div> : <label>Checkout</label>}</button> : <button className='bg-blue-500 w-48 text-gray-100 py-2 rounded hover:bg-blue-600 transition-colors text-sm' type='button' onClick={proceedToCheckOut}>Checkout</button>}</div>
                            </div>

                        </div>
                    </div>}

                </div>
            </>
            }
        </div>

    )
}

export default ShoptingCart
