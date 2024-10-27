const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const fetchModel = async () => {
    const response = await fetch(`${apiUrl}Model/Model/0/None`)
    const status = await response.status;

    if (status == 200) {
        const responseJson = await response.json();
        return responseJson
    }
}


export const saveModel = async (data:any) => {

    const response = await fetch(`${apiUrl}Model/UpsertModel`,{
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