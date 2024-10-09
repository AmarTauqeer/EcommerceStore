'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { CartTypes, CartTypesForUpdate } from '../../../types/type';
import Link from 'next/link';
import { useGlobalContext } from '../Context/store';
import UpsertCartProduct from '../helper/UpsertCartProduct';

const page = (types: CartTypes, typesForUpdate: CartTypesForUpdate) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { token } = useGlobalContext();
  const router = useRouter();
  const params = useSearchParams();
  
  var userToken="";
  if (token==null || token=="") {
    userToken = params.get('token')!;
  }else{
    userToken=token
  }
  const title = params.get('title');
  const description = params.get('description');
  const img = params.get('img');
  const price = Number(params.get('price'));
  const imageSource = `${apiUrl}Uploads/` + img;
  const productId = Number(params.get('productId'));
  const userId = Number(params.get('userId'));
  
  const quantity = Number(params.get('quantity'));
  const cartId = Number(params.get('cartId'));
  const cartCount = Number(params.get('cartCount'));
  const amountPerProduct =quantity*price;

  const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    const initialQty: number = 1;
    // check if cart exist with current user

    const fetchData = async (id: number) => {
      // console.log(id);

      const cartResponse = await fetch(`${apiUrl}Cart/Cart/0/0/${id}/0/0/0/None`);
      const status = await cartResponse.status;
      const result = await cartResponse.json();

      if (status !== 404 && status == 200 && result.length>0) {
        // console.log(result)

          // check cart id

          const response = await fetch(`${apiUrl}Cart/Cart/${result[0].cartId}/0/${id}/0/0/0/None`);
          const cartStatus = await cartResponse.status;

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
            router.push(`/shopping-cart?token=${userToken}`);
            } else {
              console.log("create a new product of existing cart")
              const status = await UpsertCartProduct(responseJson[0].cartId, productId, 1, price, amountPerProduct, userId);
              if (status!==200) {
                console.log("Errors to create cart product");
                return false;
              }
              router.push(`/shopping-cart?token=${userToken}`);
            }
          }
          else {
            // create new cart
            console.log('new cart-1')
            const status = await UpsertCartProduct(cartId, productId, 1, price, amountPerProduct, userId);
            if (status!==200) {
              console.log("Errors to create cart");
                return false;
            }
            router.push(`/shopping-cart?token=${userToken}`);
          }

      } else {
        console.log('new cart-2')
        // console.log(amountPerProduct);
        const status = await UpsertCartProduct(cartId, productId, 1, price, amountPerProduct, userId);
        if (status!==200) {
          console.log("Errors to create cart");
            return false;
        }
        router.push(`/shopping-cart?token=${userToken}`);
      }
    }
    const id = Number(userId);
    fetchData(id);
  }


  return (
    <>
      <div className='p-5 bg-slate-50 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2'>
        <div className='p-5'>
          <div className='hover:cursor-pointer pb-5 hover:text-blue-300 text-blue-500'><Link href={`/gallery?search=all&token=${userToken}&${cartCount}`}>Back to gallary</Link></div>
          <h2 className=' text-lg font-bold'>{title}</h2>
          <p className='pt-4'>{description}</p>
          <p className='pt-4'>${price}</p>
          <p className='pt-4 text-justify'>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur</p>
          <div className='flex justify-center items-center pt-10 text-sm'>
            <button className='bg-cyan-500 w-64 rounded-md text-white py-1 hover:bg-orange-600 hover:coursor-pointer' type='button' onClick={handleAddToCart}>Add to Cart</button>
          </div>
        </div>

        <div className='flex justify-end'><img className='object-cover' src={imageSource} alt={title ? title : ""} /></div>
      </div>


    </>
  )
}

export default page
