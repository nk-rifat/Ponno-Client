import { getProductById } from "@/lib/products";

const ProductDetailsPage = async ({ params }) => {
  const { id } = await params;
  const product = await getProductById(id);
  return <div className="text-black">{product.productName}</div>;
};

export default ProductDetailsPage;
