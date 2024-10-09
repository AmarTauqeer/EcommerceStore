export interface ISignIn {
    email: string,
    password: string,
}

export interface ISignUp extends ISignIn {
    passwordConfirm: string,
    firstName: string,
    lastName: string
}

export interface IResetPassword{
    oldPassword: string,
    newPassword: string,
    confirmPassword: string,
    userId: string
}


export interface CartTypesForQuerySearch {
    productId: string,
    title: string,
    description: string,
    img: string,
    price: string,
    quantity: string
}

export interface CartTypes {
    productId: number,
    productTitle: string,
    productDescription:string,
    price: number,
    quantity: number,
    amountPerProduct:number,
    userId:number,
    imagePath:string
}

export interface CartTypesForUpdate extends CartTypes {
    cartId:number
}
export interface OrderTypes extends CartTypesForUpdate {
    orderId:number
}

