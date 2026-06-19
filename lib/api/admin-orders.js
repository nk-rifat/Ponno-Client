import axiosInstance from "../axiosInstance";

export const getAdminOrders = async (params) => {
  const { data } = await axiosInstance.get("/api/admin/orders", { params });
  return data;
};

export const changeOrderStatus = async (id) => {
  const { data } = await axiosInstance.patch(`/api/admin/orders/${id}/status/change`);
  return data;
};

export const cancelAdminOrder = async (id) => {
  const { data } = await axiosInstance.patch(`/api/admin/orders/${id}/cancel`);
  return data;
};
