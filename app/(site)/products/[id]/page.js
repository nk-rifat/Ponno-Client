import ProductActions from "@/components/product-details/ProductActions";
import ProductGallery from "@/components/product-details/ProductGallery";
import ProductInfo from "@/components/product-details/ProductInfo";
import RelatedProducts from "@/components/product-details/RelatedProducts";
import { getProductById, getRelatedProducts } from "@/lib/products";

const ProductDetailsPage = async ({ params }) => {
  const { id } = await params;
  const product = await getProductById(id);
  const relatedProducts = await getRelatedProducts(
    product.category,
    product._id,
  );

  return (
    <>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 mt-20 sm:mt-25 md:mt-30 lg:mt-40">
        <ProductGallery images={product?.images} />
        <div>
          <ProductInfo product={product} />
          <ProductActions product={product} />
        </div>
      </div>
      <RelatedProducts products={relatedProducts} />
    </>
  );
};

export default ProductDetailsPage;
