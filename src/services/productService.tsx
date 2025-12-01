import axiosInstance from "../apiConfig/axios";

export const getProducts = (limit: number, skip: number, query?: string) => {
  const trimmed = query?.trim();
  if (trimmed && trimmed.length > 0) {
    const q = encodeURIComponent(trimmed);
    return axiosInstance.get(
      `products/search?q=${q}&limit=${limit}&skip=${skip}`
    );
  } else {
    return axiosInstance.get(`products?limit=${limit}&skip=${skip}`);
  }
};

export const addNewProducts = (body: any) => {
  return axiosInstance.post(`products/add`, body);
};

export const deleteProducts = (id: number) => {
  return axiosInstance.delete(`products/${id}`);
};

export const getProductById = (id: number) => {
  return axiosInstance.get(`products/${id}`);
};

export const updateProduct = (id: number, body: any) => {
  return axiosInstance.put(`products/${id}`, body);
};
