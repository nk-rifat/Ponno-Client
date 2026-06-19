import EditProductClient from "@/components/admin/products/add-product/edit/EditProductClient";

export const metadata = { title: "Edit Product – Ponno Admin" };

const EditProductPage = async ({ params }) => {
  const { id } = await params;
  return <EditProductClient productId={id} />;
};

export default EditProductPage;
