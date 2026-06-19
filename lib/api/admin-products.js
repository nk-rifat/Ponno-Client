import axiosInstance from "../axiosInstance";

export const getAdminProducts = async (params) => {
  const { data } = await axiosInstance.get("/api/admin/products", {
    params,
  });

  return data;
};

export const getProductById = async (id) => {
  const { data } = await axiosInstance.get(`/api/admin/products/${id}`);
  return data;
};

export const createProduct = async (formData) => {
  const { data } = await axiosInstance.post("/api/admin/products", formData);
  return data;
};

export const updateProduct = async (id, formData) => {
  const { data } = await axiosInstance.put(
    `/api/admin/products/${id}`,
    formData,
  );
  return data;
};

export const deleteProduct = async (id) => {
  const { data } = await axiosInstance.delete(`/api/admin/products/${id}`);

  return data;
};
