'use client'
import React, { Suspense, useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { useSearchParams } from 'next/navigation'
import { useGlobalContext } from '../Context/store'
import { CartTypesForUpdate } from '../../../types/type'
import Loading from '../loading'



const Gallary = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [data, setData] = useState<CartTypesForUpdate[]>([])
  const { cartCount } = useGlobalContext();

  const params = useSearchParams()
  const search = params.get('search')
  const token = params.get('token')!;
  let paramCartCount = params.get('cartCount');
  var customCartCount: number = 0;
  const [loading, setLoading] = useState(false);

  if (paramCartCount != null || paramCartCount != "") {
    customCartCount = Number(paramCartCount);
  } else {
    customCartCount = cartCount
  }

  var userId: number = 0;

  if (token != null || token != "") {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    if (typeof window !== 'undefined') {
      const jsonDecode = JSON.parse(window.atob(base64));
      userId = jsonDecode.userId;
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      // await new Promise(resolve => setTimeout(resolve, 3000))
      const response = await fetch(`${apiUrl}Product/Products/0/0/0/0/None`);
      const result = await response.json();
      // console.log(result)
      if (result) {
        var filterData = [];
        if (search == 'mobile') {
          filterData = result.filter((x: { categoryId: number }) => x.categoryId == 1);
          setData(filterData)
        } else if (search == 'laptop') {
          filterData = result.filter((x: { categoryId: number }) => x.categoryId == 2);
          setData(filterData)
        } else if (search == 'ipad') {
          filterData = result.filter((x: { categoryId: number }) => x.categoryId == 3);
          setData(filterData)
        } else {
          setData(result)
        }
      }
      setLoading(false)
    }
    fetchData();
  }, [search])


  return (
    <>
      <div className='bg-slate-50 p-5 flex justify-center items-center'>
        <h2 className='text-sm text-justify'>Note: Images sources:
          Photo by <a href="https://unsplash.com/@wasdrew?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Andras Vas</a> on <a href="https://unsplash.com/photos/macbook-pro-turned-on-Bd7gNnWJBkU?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>,
          <a href="https://unsplash.com/@agk42?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Alex Knight</a> on <a href="https://unsplash.com/photos/laptop-computer-beside-coffee-mug-j4uuKnN43_M?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>,
          <a href="https://unsplash.com/@crew?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Crew</a> on <a href="https://unsplash.com/photos/person-using-a-laptop-4Hg8LH9Hoxc?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>,
          <a href="https://unsplash.com/@dell?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Dell</a> on <a href="https://unsplash.com/photos/person-using-black-laptop-computer-on-brown-wooden-table-8pb7Hq539Zw?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>,
          <a href="https://unsplash.com/@dell?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Dell</a> on <a href="https://unsplash.com/photos/person-using-black-laptop-computer-on-brown-wooden-table-8pb7Hq539Zw?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>,
          <a href="https://unsplash.com/@williamtm?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">William Hook</a> on <a href="https://unsplash.com/photos/space-gray-iphone-x-9e9PD9blAto?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>,
          <a href="https://unsplash.com/@coinviewapp?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">CoinView App</a> on <a href="https://unsplash.com/photos/person-holding-space-gray-iphone-x-h7a6g0ua6LM?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>,
          <a href="https://unsplash.com/@georgiadelotz?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Georgia de Lotz</a> on <a href="https://unsplash.com/photos/a-person-holding-a-cell-phone-in-their-hand-Ebb8fe-NZtM?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>,
          <a href="https://unsplash.com/@jfdelp?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Jessica Mangano</a> on <a href="https://unsplash.com/photos/person-holding-black-iphone-7-p1P_e86R2DI?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>,
          <a href="https://unsplash.com/@mr_fresh?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Yura Fresh</a> on <a href="https://unsplash.com/photos/person-holding-space-gray-iphone-x-n31x0hhnzOs?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>,
          <a href="https://unsplash.com/@designmesk?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Marek Levák</a> on <a href="https://unsplash.com/photos/woman-using-gold-ipad-GNVxujZ_CxU?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>,
          <a href="https://unsplash.com/@yapics?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Leon Seibert</a> on <a href="https://unsplash.com/photos/person-holding-black-android-smartphone-LJypKPEBt4I?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>,
          <a href="https://unsplash.com/@rpnickson?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Roberto Nickson</a> on <a href="https://unsplash.com/photos/black-ipad-hLgYtX0rPgw?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>,
          <a href="https://unsplash.com/@dollargill?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Dollar Gill</a> on <a href="https://unsplash.com/photos/silver-ipad-on-white-table-feXbDPB8dmQ?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>,
          <a href="https://unsplash.com/@rpnickson?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Roberto Nickson</a> on <a href="https://unsplash.com/photos/person-holding-tablet-computer-TB_cvdUHUuc?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
        </h2>
      </div>
      {loading ? <div className='flex justify-center items-center h-screen'><Loading /></div> :
        <div className='grid w-full grid-cols-1 gap-16 md:grid-cols-4 lg:grid-cols-4 bg-slate-50 p-5'>
          {
            data.map((d, idx) => (
              <ProductCard
                key={idx}
                productId={d.productId}
                title={d.productTitle}
                description={d.productDescription}
                quantity={d.quantity}
                price={d.price}
                amountPerProduct={d.amountPerProduct}
                img={d.imagePath}
                userId={userId}
                cartId={d.cartId}
                cartCount={customCartCount}
                token={token}
              />

            ))
          }

        </div>
      }
    </>
  )
}

export default Gallary
