import ProductGallery from "@/components/product-details/ProductGallery";
import { getProductById } from "@/lib/products";

const ProductDetailsPage = async ({ params }) => {
  const { id } = await params;
  const product = await getProductById(id);
  return (
    <>
      <ProductGallery images={product?.images} />
    </>
  );
};

export default ProductDetailsPage;
