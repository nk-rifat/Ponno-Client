import ProductActions from "@/components/product-details/ProductActions";
import ProductGallery from "@/components/product-details/ProductGallery";
import ProductInfo from "@/components/product-details/ProductInfo";
import { getProductById } from "@/lib/products";

const ProductDetailsPage = async ({ params }) => {
  const { id } = await params;
  const product = await getProductById(id);
  return (
    <>
      <ProductGallery images={product?.images} />
      <ProductInfo product={product} />
      <ProductActions product={product}/>
    </>
  );
};

export default ProductDetailsPage;
