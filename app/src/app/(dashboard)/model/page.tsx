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
import ModelPagination from "@/app/components/model/ModelPagination"
import AddModel from "@/app/components/model/AddModel" 
import UpdateModel from "@/app/components/model/UpdateModel"
import { TiDelete } from "react-icons/ti";

export default function Model() {

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { token, setToken } = useGlobalContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0)
  const [paginatedModels, setPaginatedModels] = useState([]);
  const [isloading, setIsloading]= useState(false);
  const params = useSearchParams()

  const limit = 5;

  let userId = 0;
  let result: any = [];



  const deleteRow = async (id: any) => {
    setIsloading(true)
    const response = await fetch(`${apiUrl}Model/Model/${id}`, {
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
    const response = await fetch(`${apiUrl}Model/Model/0/None`);
    const resultJson = await response.json();
    result = await resultJson;
    setTotalPages(Math.ceil(await result.length / limit))
    let models: any = [];
    models = Array.isArray(await result) ? await result.slice((currentPage - 1) * limit, currentPage * limit) : [];
    setPaginatedModels(models);
    if (models.length>0) {
      setPaginatedModels(models)
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
        <CardTitle>List of Model</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex p-0 m-0 justify-end">
          <AddModel token={token} fetchData={fetchData}/>
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
              paginatedModels.map((model: any, idx: any) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium">
                    {model.title}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {model.createdAt}
                  </TableCell>
                  <TableCell>
                    <UpdateModel token={token} data={model} fetchData={fetchData} />{" "}
                    <Button variant="outline" onClick={(e) => deleteRow(model.id)}><TiDelete /></Button>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <ModelPagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} customToken={token != null ? token : params.get('customToken')} />
      </CardFooter>
    </Card>
  )
}
