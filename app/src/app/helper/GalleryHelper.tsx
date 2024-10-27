async function fetchProducts(search: string) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
    await new Promise(resolve => setTimeout(resolve, 1000))
  
    const response = await fetch(`${apiUrl}Product/Products/0/0/0/0/None`);
    const result = await response.json();
  
    let data = [];
  
    if (result) {
      var filterData = [];
      if (search == 'mobile') {
        filterData = await result.filter((x: { categoryId: number }) => x.categoryId == 1);
        data = await filterData;
      } else if (search == 'laptop') {
        filterData = await result.filter((x: { categoryId: number }) => x.categoryId == 2);
        data = await filterData;
      } else if (search == 'ipad') {
        filterData = await result.filter((x: { categoryId: number }) => x.categoryId == 3);
        data = await filterData;
      } else {
        data = await result;
      }
    }
    return await data;
  }

  export default fetchProducts