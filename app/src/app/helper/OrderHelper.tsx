
async function fetchOrderSummary(id: number) {
    
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    let newData = [];
    let dataWithKey = [];

    const response = await fetch(`${apiUrl}OrderDetail/OrderDetail/0/0/0/${id}/None?modelId=0&brandId=0`);
    const result = await response.json();

    if (result.length > 0) {

        for (let j = 0; j < result.length; j++) {
            const element = result[j];

            const responseProduct = await fetch(`${apiUrl}Product/Products/${element.productId}/0/0/0/None`);
            const resultProduct = await responseProduct.json();
            const productTilte = await resultProduct[0].productTitle;
            const imagePath= await resultProduct[0].imagePath;


            const updatedData = {
                orderId: element.orderId,
                cartId: element.cartId,
                productId: element.productId,
                productDescription: element.productDescription,
                imagePath: imagePath,
                productTitle: productTilte,
                quantity: element.quantity,
                price: element.price,
                amountPerProduct: element.amountPerProduct,
                userId: Number(id)
            }
            newData.push(updatedData);
        }

        // create a unique key
        var count = 0;
        for (let i = 0; i < newData.length; i++) {
            count++;
            const element = newData[i];

            const data = {
                key: count,
                orderId: Number(element.orderId),
                productId:Number(element.productId),
                productTitle: String(element.productTitle),
                productDescription: String(element.productDescription),
                quantity: Number(element.quantity),
                price: Number(element.price),
                amountPerProduct: Number(element.amountPerProduct),
                imagePath:String(element.imagePath),
                userId: Number(element.userId),
                cartId:Number(element.cartId)
            }
            dataWithKey.push(data);
        }

    } else {
        console.log("No record is found.")
    }

    return await dataWithKey;
}

export default fetchOrderSummary