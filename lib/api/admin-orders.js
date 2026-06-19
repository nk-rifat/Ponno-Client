import axiosInstance from "../axiosInstance";

export const getAdminOrders = async (params) => {
  const { data } = await axiosInstance.get("/api/admin/orders", { params });
  return data;
};

export const advanceOrderStatus = async (id) => {
  const { data } = await axiosInstance.patch(`/api/admin/orders/${id}/advance`);
  return data;
};

export const cancelAdminOrder = async (id) => {
  const { data } = await axiosInstance.patch(`/api/admin/orders/${id}/cancel`);
  return data;
};
