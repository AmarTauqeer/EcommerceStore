const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const fetchBrand = async () => {
    const response = await fetch(`${apiUrl}Brand/Brand/0/None`)
    const status = await response.status;

    if (status == 200) {
        const responseJson = await response.json();
        return responseJson
    }
}


export const saveBrand = async (data:any) => {

    const response = await fetch(`${apiUrl}Brand/UpsertBrand`,{
        method:"PUT",
        headers:{
            'content-type': 'application/json'
        },
        body: JSON.stringify(data),
    })
    const status = await response.status;
    // console.log(status)

    if (status == 200) {
       return status
    }
}