'use client'
import Link from 'next/link';
import React from 'react'
import { useRouter } from 'next/navigation';
import { UpsertCartProduct } from '../helper/UpsertCartProduct';

interface propsTypes {
  img: string;
  title: string;
  description: string;
  price: number;
  productId: number;
  userId: number;
  token: string;
  quantity: number;
  amountPerProduct: number;
  cartId: number;
  cartCount: number;
}

const ProductCard: React.FC<propsTypes> = async ({ img, title, description, price, productId, userId, token, quantity, amountPerProduct, cartId, cartCount }) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const router = useRouter();

  const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    const initialQty: number = 1;
    // check if cart exist with current user

    const fetchData = async (id: number) => {
      // console.log(id);

      const cartResponse = await fetch(`${apiUrl}Cart/Cart/0/0/${id}/0/0/0/None`);
      const status = await cartResponse.status;
      const result = await cartResponse.json();

      if (status !== 404 && status == 200 && result.length > 0) {
        // console.log(result)

        // check cart id

        const response = await fetch(`${apiUrl}Cart/Cart/${result[0].cartId}/0/${id}/0/0/0/None`);
        const cartStatus = await cartResponse.status;
        console.log(await cartStatus);

        if (cartStatus !== 404) {

          console.log("cart found")
          const responseJson = await response.json();

          // check if product already exist
          const filterProd = responseJson.filter((prod: { productId: number; }) => prod.productId == productId);

          // console.log(filterProd)
          if (filterProd.length > 0) {

            // update product of cart
            console.log("update cart with existing product");

            const status = await UpsertCartProduct(filterProd[0].cartId, productId, filterProd[0].quantity + 1, price, amountPerProduct, userId);
            if (status != 200) {
              console.log("Errors to update cart product");
              return false;
            }
            router.push(`/shopping-cart?token=${token}`);
          } else {
            console.log("create a new product of existing cart")
            const status = await UpsertCartProduct(responseJson[0].cartId, productId, 1, price, amountPerProduct, userId);
            if (status !== 200) {
              console.log("Errors to create cart product");
              return false;
            }
            router.push(`/shopping-cart?token=${token}`);
          }
        }
        else {
          // create new cart
          console.log('new cart-1')
          const status = await UpsertCartProduct(cartId, productId, 1, price, amountPerProduct, userId);
          if (status !== 200) {
            console.log("Errors to create cart");
            return false;
          }
          router.push(`/shopping-cart?token=${token}`);
        }

      } else {
        console.log('new cart-2')
        // console.log(amountPerProduct);
        const status = await UpsertCartProduct(cartId, productId, 1, price, amountPerProduct, userId);
        if (status !== 200) {
          console.log("Errors to create cart");
          return false;
        }
        router.push(`/shopping-cart?token=${token}`);
      }
    }
    const id = Number(userId);
    fetchData(id);
  }

  return <div className='bg-zinc-50 rounded-xl max-w-[450px] h-[430px] shadow-2xl'>
    <div>
      <Link href={{
        pathname: "/ProductDtl",
        query: { img: img, title: title, description: description, price: price, productId: productId, userId: userId, token: token, cartCount: cartCount }
      }} className='text-blue-600 hover:text-blue-300 hover:coursor-pointer'><img className='object-cover' src={`${apiUrl}Uploads/` + img} alt={title} />
      </Link>
    </div>

    <div className='space-y-2 py-2 px-2'>
      <h2 className='text-orange-600 font-medium'>{title}</h2>
      <p className='text-gray-500 max-w-[200px]'>{description}</p>
    </div>

    <div className='font-bold flex gap-4 px-2'>
      ${price}
    </div>

    <div className='px-2 pt-2 pb-2'>
      <Link href={{
        pathname: "/ProductDtl",
        query: { img: img, title: title, description: description, price: price, productId: productId, userId: userId, token: token, cartCount: cartCount }
      }} className='text-blue-600 hover:text-blue-300 hover:coursor-pointer'>More detail...
      </Link>
    </div>

    <div className='font-bold flex px-2 mt-2'>
      <button className='bg-cyan-500 w-full rounded-md text-white py-1 hover:bg-orange-600 hover:coursor-pointer' type='button' onClick={handleAddToCart}>Add to Cart</button>
    </div>

  </div>
}

export default ProductCard
