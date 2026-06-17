import ManageProductsClient from "@/components/admin/products/ManageProductsClient";

export const metadata = { title: "Manage Products – Ponno Admin" };

const ManageProductPage = async ({ searchParams }) => {
  const params = await searchParams;

  return <ManageProductsClient searchParams={params} />;
};

export default ManageProductPage;
