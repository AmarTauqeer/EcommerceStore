"use client"

import OrderPagination from "@/app/(dashboard)/orders/OrderPagination";
import { useGlobalContext } from "@/app/Context/store";
import fetchOrderSummary from "@/app/helper/OrderHelper";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Orders() {

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { token, setToken } = useGlobalContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0)
  const [paginatedOrders, setPaginatedOrders] = useState([]);
  const [userToken, setUserToken] = useState("")
  const params = useSearchParams()


  useEffect(() => {
    const limit = 5;
    let userId = 0;
    let result: any = [];

    const fetchData = async () => {
      // check if token is available
      if (token != null && token != undefined && token != "") {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        if (typeof window !== 'undefined') {
          const jsonDecode = JSON.parse(window.atob(base64));
          userId = jsonDecode.userId;
          const response = await fetch(`${apiUrl}OrderDetail/OrderDetail/0/0/0/${userId}/None?modelId=0&brandId=0`);
          const resultJson = await response.json();
          result = resultJson;
          // console.log(result)
          setTotalPages(Math.ceil(result.length / limit))
          let orders: any = [];
          orders = Array.isArray(result) ? result.slice((currentPage - 1) * limit, currentPage * limit) : [];
          if (orders != null) {
            setPaginatedOrders(orders)
          }
        }
      } else {
        // get query params

        let userToken = params.get('customToken')
        if (userToken != null) {
          setToken(userToken);
          const base64Url = userToken.split('.')[1];
          const base64 = base64Url.replace('-', '+').replace('_', '/');
          if (typeof window !== 'undefined') {
            const jsonDecode = JSON.parse(window.atob(base64));
            userId = jsonDecode.userId;
            const response = await fetch(`${apiUrl}OrderDetail/OrderDetail/0/0/0/${userId}/None?modelId=0&brandId=0`);
            const resultJson = await response.json();
            result = resultJson;
            setTotalPages(Math.ceil(result.length / limit))
            let orders: any = [];
            orders = Array.isArray(result) ? result.slice((currentPage - 1) * limit, currentPage * limit) : [];
            if (orders != null) {
              setPaginatedOrders(orders)
            }

          }
        }
      }
    }
    fetchData();
  }
    , [params, currentPage])

  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="py-4">
              <TableHead>Order#</TableHead>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead className="hidden md:table-cell">Product</TableHead>
              <TableHead className="hidden md:table-cell">Qty</TableHead>
              <TableHead className="hidden md:table-cell">Price</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              paginatedOrders.map((r: any, idx: any) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium">
                    {r.orderId}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <img className='aspect-square rounded-md object-cover' src={`${apiUrl}Uploads/` + r.imagePath} alt={r.productTitle} />
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{r.productTitle}</TableCell>

                  <TableCell className="hidden md:table-cell">{r.quantity}</TableCell>
                  <TableCell className="hidden md:table-cell">{r.price}</TableCell>
                  <TableCell className="text-right">${r.amountPerProduct}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <OrderPagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} customToken={token != null ? token : params.get('customToken')} />
      </CardFooter>
    </Card>
  )
}
