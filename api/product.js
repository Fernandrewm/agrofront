import {BASE_PATH} from "../utils/constants";

export async function getLastProductsApi(limit) {
    try {
      const limitItems = `_limit=${limit}`;
      const sortItem = "_sort=created_at:desc";
      const url = `${BASE_PATH}/products?${limitItems}&${sortItem}`;
      const response = await fetch(url);
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

export async function getProductsCategoryApi(category, limit, start) {
  try {
    const limitItems = `_limit=${limit}`;
    const sortItems = `_sort=created_at:desc`;
    const startItems = `_start=${start}`;
    const url = `${BASE_PATH}/products?category.url=${category}&${limitItems}&${sortItems}&${startItems}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getTotalProductCategoryApi(category) {
  try {
    const url = `${BASE_PATH}/products/count?category.url=${category}`
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getProductByIdApi(idProduct) {
  try {
    const url = `${BASE_PATH}/products?id=${idProduct}`;
    const response = await fetch(url);
    const result = await response.json();
    return result[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function searchProductsApi(title){
  try {
    const url = `${BASE_PATH}/products?_q=${title}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}