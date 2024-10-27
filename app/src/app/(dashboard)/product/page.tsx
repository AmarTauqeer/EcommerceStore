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
import ProductPagination from "@/app/components/Product/ProductPagination"
import AddProduct from "@/app/components/Product/AddProduct"
import UpdateProduct from "@/app/components/Product/UpdateProduct"
import { TiDelete } from "react-icons/ti"

export default function Product() {

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { token, setToken } = useGlobalContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0)
  const [paginatedProducts, setPaginatedProducts] = useState([]);
  const [isloading, setIsloading]= useState(false);
  const params = useSearchParams()

  const limit = 5;

  let userId = 0;
  let result: any = [];



  const deleteRow = async (id: any) => {
    setIsloading(true)
    const response = await fetch(`${apiUrl}Product/Product/${id}`, {
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

  const getCategory = async (id: any) => {
    const response = await fetch(`${apiUrl}Category/Category/${id}/None`);
    const resultJson = await response.json();
    if (resultJson.length > 0) {
      for (let j = 0; j < resultJson.length; j++) {
        const element = resultJson[j];
        return element.title;
      }
    }
  }


  const fetchData= async()=>{
    setIsloading(true)
    const response = await fetch(`${apiUrl}Product/Products/0/0/0/0/None`);
    const resultJson = await response.json();
    result = await resultJson;
    // result with category title
    let resultWithCategoryTitle = []
    for (let i = 0; i < result.length; i++) {
      const element = result[i];
      const categoryTitle = await getCategory(element.categoryId);
      const newData = {
        categoryId: element.categoryId,
        categoryTitle: categoryTitle,
        productId: element.productId,
        productTitle: element.productTitle,
        productDescription: element.productDescription,
        price: element.price,
        imagePath: element.imagePath,
        createdAt: element.createdAt,
        brandId: element.brandId,
        modelId: element.modelId
      }
      resultWithCategoryTitle.push(newData);
    }
    
    // console.log(result)
    setTotalPages(Math.ceil(await resultWithCategoryTitle.length / limit))
    let products: any = [];
    products = Array.isArray(await resultWithCategoryTitle) ? await resultWithCategoryTitle.slice((currentPage - 1) * limit, currentPage * limit) : [];
    console.log(products)
    setPaginatedProducts(products);
    if (products.length>0) {
      setPaginatedProducts(products)
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
        <CardTitle>List of Products</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex p-0 m-0 justify-end">
          <AddProduct token={token} fetchData={fetchData}/>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="hidden md:table-cell">Price</TableHead>
              <TableHead className="hidden md:table-cell">Created at</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isloading && <div>Loading...</div>}
            {
              paginatedProducts.map((r: any, idx: any) => (
                <TableRow key={idx}>
                  <TableCell className="hidden sm:table-cell">
                    <img className='aspect-square rounded-md object-cover' src={`${apiUrl}Uploads/` + r.imagePath} alt={r.productTitle} />
                  </TableCell>
                  <TableCell className="font-medium">
                    {r.productTitle}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{r.categoryTitle}</TableCell>
                  <TableCell className="hidden md:table-cell">{r.price}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {r.createdAt}
                  </TableCell>
                  <TableCell>
                    <UpdateProduct token={token} data={r} fetchData={fetchData} />{" "}
                    <Button variant="outline" onClick={(e) => deleteRow(r.productId)}><TiDelete /></Button>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <ProductPagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} customToken={token != null ? token : params.get('customToken')} />
      </CardFooter>
    </Card>
  )
}
