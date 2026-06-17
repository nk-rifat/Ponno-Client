import axiosInstance from "../axiosInstance";

export const getAdminProducts = async (params) => {
  const { data } = await axiosInstance.get("/api/admin/products", {
    params,
  });

  return data;
};

export const deleteProduct = async (id) => {
  const { data } = await axiosInstance.delete(`/api/admin/products/${id}`);

  return data;
};
