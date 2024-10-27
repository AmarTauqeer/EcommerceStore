"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
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
import { useGlobalContext } from "@/app/Context/store"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import BrandPagination from "@/app/components/brand/BrandPagination"
import AddBrand from "@/app/components/brand/AddBrand" 
import UpdateBrand from "@/app/components/brand/UpdateBrand"
import { TiDelete } from "react-icons/ti";

export default function Brand() {

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { token, setToken } = useGlobalContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0)
  const [paginatedBrands, setPaginatedBrands] = useState([]);
  const [isloading, setIsloading]= useState(false);
  const params = useSearchParams()

  const limit = 5;

  let userId = 0;
  let result: any = [];



  const deleteRow = async (id: any) => {
    setIsloading(true)
    const response = await fetch(`${apiUrl}Brand/Brand/${id}`, {
      method: "delete"
    });
    const status = await response.status;
    if (status != 200) {
      console.log('There are issues to delete data.')
      return false
    }
    console.log('Data is deleted successfully.')
    fetchData();
    setIsloading(false)
  }

  const fetchData= async()=>{
    setIsloading(true)
    const response = await fetch(`${apiUrl}Brand/Brand/0/None`);
    const resultJson = await response.json();
    result = await resultJson;
    setTotalPages(Math.ceil(await result.length / limit))
    let brands: any = [];
    brands = Array.isArray(await result) ? await result.slice((currentPage - 1) * limit, currentPage * limit) : [];
    setPaginatedBrands(brands);
    if (brands.length>0) {
      setPaginatedBrands(brands)
    }
    setIsloading(false);
  }

  useEffect(() => {
    const fetchUserId = async () => {
      let uid = 0;
      // check if token is available
      if (token != null && token != undefined && token != "") {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        if (typeof window !== 'undefined') {
          const jsonDecode = JSON.parse(window.atob(base64));
          uid = jsonDecode.userId;
          return uid;
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
            return uid;
          }
        }
      }
      // const user = await fetchUserId();
      // const fetchData= async
    }
    userId = Number(fetchUserId());

    fetchData();
  }
    , [params, currentPage])

  return (
    <Card>
      <CardHeader>
        <CardTitle>List of Brands</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex p-0 m-0 justify-end">
          <AddBrand token={token} fetchData={fetchData}/>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead className="hidden md:table-cell">Created at</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isloading && <div>Loading...</div>}
            {
              paginatedBrands.map((brand: any, idx: any) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium">
                    {brand.brandTitle}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {brand.createdAt}
                  </TableCell>
                  <TableCell>
                    <UpdateBrand token={token} data={brand} fetchData={fetchData} />{" "}
                    <Button variant="outline" onClick={(e) => deleteRow(brand.brandId)}><TiDelete /></Button>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <BrandPagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} customToken={token != null ? token : params.get('customToken')} />
      </CardFooter>
    </Card>
  )
}
