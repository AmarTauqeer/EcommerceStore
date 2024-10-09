
const HandleQty = async (id: number, data: any, op: string) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    let cart = data.find((prod: { productId: number; }) => prod.productId === id)
    if (cart && cart.quantity > 1 && op == "minus") {
        cart.quantity = cart.quantity - 1;
    }

    if (cart && cart.quantity >= 1 && op == "plus") {
        cart.quantity = cart.quantity + 1;
    }
    cart.amountPerProduct = cart.quantity * cart.price;
    // update cart item

    const response = await fetch(`${apiUrl}Cart/UpsertCart`, {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'content-Type': 'application/json'
        },
        body: JSON.stringify(cart)
    });
    const status: number = await response.status;
    if (status != 200) {
        console.log("Errors to update cart");
        return false;
    }
    return await cart;


}

export default HandleQty