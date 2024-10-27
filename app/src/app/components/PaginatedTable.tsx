'use client'
import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue } from "@nextui-org/react";
import { columns } from "../order/columns";


export interface OrderTypes {
    productId: number,
    productTitle: string,
    productDescription: string,
    price: number,
    quantity: number,
    amountPerProduct: number,
    userId: number,
    imagePath: string,
    cartId: number,
    orderId: number,
    key: number
}

const PaginatedTable= async ({ orderData }: { orderData: OrderTypes[] }) =>{
    const [page, setPage] = React.useState(1);
    const rowsPerPage = 5;

    const pages = Math.ceil(orderData.length / rowsPerPage);

    const items = await React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return orderData.slice(start, end);
    }, [page, orderData]);

    return (
        <Table
            aria-label="Example table with client side pagination"
            bottomContent={
                <div className="flex w-full justify-center">
                    <Pagination
                        isCompact
                        showControls
                        showShadow
                        color="secondary"
                        page={page}
                        total={pages}
                        onChange={(page) => setPage(page)}
                    />
                </div>
            }
            classNames={{
                wrapper: "min-h-[222px]",
            }}
        >

            <TableHeader columns={columns}>
                {(column: any) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody items={items}>
                {(item) => (
                    <TableRow key={item.key}>
                        {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}

export default PaginatedTable