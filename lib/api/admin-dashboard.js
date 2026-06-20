import axiosInstance from "../axiosInstance";

export const getDashboardSummary = async () => {
  const { data } = await axiosInstance.get("/api/admin/dashboard/summary");
  return data;
};
