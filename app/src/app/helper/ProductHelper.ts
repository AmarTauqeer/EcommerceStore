const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const fetchCategory = async () => {
    const response = await fetch(`${apiUrl}Category/Category/0/None`)
    const status = await response.status;

    if (status == 200) {
        const responseJson = await response.json();
        return responseJson
    }
}

export const fetchBrand = async () => {
    const response = await fetch(`${apiUrl}Brand/Brand/0/None`)
    const status = await response.status;

    if (status == 200) {
        const responseJson = await response.json();
        return responseJson
    }
}

export const fetchModel = async () => {
    const response = await fetch(`${apiUrl}Model/Model/0/None`)
    const status = await response.status;

    if (status == 200) {
        const responseJson = await response.json();
        return responseJson
    }
}

export const fetchProduct = async (id:number) => {
    const response = await fetch(`${apiUrl}Product/Products/${id}/0/0/0/None`)
    const status = await response.status;
    console.log(status);

    if (status == 200) {
        const responseJson = await response.json();
        // console.log(responseJson)
        return responseJson
    }
}

export const saveProduct = async (data:any) => {

    const response = await fetch(`${apiUrl}Product/UpsertProduct`,{
        method:"PUT",
        // not used stringnify becasuse we are passing file data
        body: data,
    })
    const status = await response.status;
    console.log(status)

    if (status == 200) {
       return status
    }
}