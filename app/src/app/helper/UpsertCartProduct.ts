export const UpsertCartProduct = async (cartId: number, productId: number, quantity: number, price: number,
    amountPerProduct: number, userId: number) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    // defining types of data
    const data = {
        productId: productId,
        price: price,
        quantity: quantity,
        amountPerProduct: amountPerProduct,
        UserId: userId,
        cartId: cartId
    }
    // assigning values
    data.productId = productId;
    data.price = price;
    data.quantity = quantity;
    data.amountPerProduct = data.quantity * data.price;
    data.UserId = userId;
    if (cartId>0) {
        data.cartId = cartId;    
    }

    const upSertCart = await fetch(`${apiUrl}Cart/UpsertCart`, {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const status: number = await upSertCart.status;
    return status;
}

export default UpsertCartProduct;