import { json } from "react-router-dom";

export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    //TODO: we will not hard code server url
    const response = await fetch("http://localhost:8080/products?limit=100");
    const data = await response.json();
    resolve({ data });
  });
}

export async function fetchProductsByFilters(filter, sort, pagination, admin) {
  let queryString = "";

  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length) {
      const lastCategoryValue = categoryValues[categoryValues.length - 1];
      queryString += `${key}=${lastCategoryValue}&`;
    }
  }

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  // queryString = queryString.slice(0, -1);

  if (admin) {
    queryString += `admin=true`;
  }

  try {
    const response = await fetch(
      "http://localhost:8080/products?" + queryString
    );
    const data = await response.json();
    const totalItems = await response.headers.get("X-Total-Count");
    return { data: { products: data, totalItems: totalItems } };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }

  // return new Promise(async (resolve) => {
  //   const response = await fetch(
  //     "http://localhost:8080/products?" + queryString
  //   );
  //   const data = await response.json();

  //   resolve({ data });
  // });
}

export async function fetchCategories() {
  try {
    const response = await fetch("http://localhost:8080/categories");
    const data = await response.json();
    return { data };
  } catch (error) {
    console.log(error);
  }
}

export async function fetchBrands() {
  try {
    const response = await fetch("http://localhost:8080/brands");
    const data = await response.json();
    return { data };
  } catch (error) {
    console.log(error);
  }
}

export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    //TODO: we will not hard code server url
    const response = await fetch("http://localhost:8080/products/" + id);
    const data = await response.json();
    resolve({ data });
  });
}

export function createProduct(product) {
  return new Promise(async (resolve) => {
    //TODO: we will not hard code server url
    const response = await fetch("http://localhost:8080/products/", {
      method: "POST",
      body: JSON.stringify(product),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function updateProduct(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8080/products/" + update.id,
      {
        method: "PATCH",
        body: JSON.stringify(update),
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();
    resolve({ data });
  });
}
