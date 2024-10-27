import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"


  export type orderPaginationProps={
    currentPage:number,
    totalPages:number,
    setCurrentPage:(page:number)=>void;
    customToken:string|null
  }
  
  export function OrderPagination({currentPage,totalPages,setCurrentPage, customToken}:orderPaginationProps) {

    const handlePrevious=()=>{
      if (currentPage>1) {
        setCurrentPage(currentPage-1);
      }
    }
    const handleNext=()=>{
      if (currentPage<totalPages) {
        setCurrentPage(currentPage+1);
      }
    }

    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href={`/orders?customToken=${customToken}`} onClick={handlePrevious} className={currentPage===1?"cursor-not-allowed opacity-50":""} />
          </PaginationItem>
          <PaginationItem>
            {
              [...Array(Math.max(totalPages,1))].map((_,index)=>(
                <PaginationLink
                  key={index} 
                  href={`/orders?customToken=${customToken}`}
                  className={currentPage===index+1?"bg-red-500 text-white rounded-full":""}
                  onClick={()=>setCurrentPage(index+1)}
                  >
                    {index+1}
                </PaginationLink>
              ))
            }
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              href={`/orders?customToken=${customToken}`}
              onClick={handleNext}
              className={currentPage===totalPages?"cursor-not-allowed opacity-50":""} 
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
  }

  export default OrderPagination
  