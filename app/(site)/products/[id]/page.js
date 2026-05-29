import ProductActions from "@/components/product-details/ProductActions";
import ProductGallery from "@/components/product-details/ProductGallery";
import ProductInfo from "@/components/product-details/ProductInfo";
import { getProductById } from "@/lib/products";

const ProductDetailsPage = async ({ params }) => {
  const { id } = await params;
  const product = await getProductById(id);
  return (
    <>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        <ProductGallery images={product?.images} />
        <div>
          <ProductInfo product={product} />
          <ProductActions product={product} />
        </div>
      </div>
    </>
  );
};

export default ProductDetailsPage;
