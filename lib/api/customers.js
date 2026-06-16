import axiosInstance from "../axiosInstance";

export const getCustomers = async (params) => {
  const { data } = await axiosInstance.get("/api/admin/users", { params });

  return data;
};

export const blockCustomer = async (id) => {
  const { data } = await axiosInstance.patch(`/api/admin/users/${id}/block`);
  return data;
};

export const deleteCustomer = async (id) => {
  const { data } = await axiosInstance.delete(`/api/admin/users/${id}`);
  return data;
};
