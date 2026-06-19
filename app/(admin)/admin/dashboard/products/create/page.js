import ProductForm from "@/components/admin/products/add-product/ProductForm";
import Link from "next/link";

export const metadata = { title: "Add New Product – Ponno Admin" };

const CreateProductPage = () => {
  return <ProductForm />;
};

export default CreateProductPage;
