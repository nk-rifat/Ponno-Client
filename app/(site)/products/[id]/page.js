import ProductActions from "@/components/product-details/ProductActions";
import ProductGallery from "@/components/product-details/ProductGallery";
import ProductInfo from "@/components/product-details/ProductInfo";
import RelatedProducts from "@/components/product-details/RelatedProducts";
import { getProductById, getRelatedProducts } from "@/lib/api/products";
import Link from "next/link";

const ProductDetailsPage = async ({ params }) => {
  const { id } = await params;
  const product = await getProductById(id);
  const relatedProducts = await getRelatedProducts(
    product.category,
    product._id,
  );

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 pt-5 sm:pt-7 md:pt-10">

        {/* Breadcrumb */}
        <nav className="text-base font-medium text-gray-500 flex items-center gap-2 pl-4">
          <Link href="/" className="hover:text-green-600">
            Home
          </Link>
          <span>&gt;</span>
          <Link href="/products" className="hover:text-green-600">
            Products
          </Link>
          <span>&gt;</span>
          <span className="text-gray-800 font-semibold">
            {product.productName}
          </span>
        </nav>

        {/* Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-5 sm:mt-7 md:mt-10 lg:mt-12">
          <ProductGallery images={product?.images} />
          <div>
            <ProductInfo product={product} />
            <ProductActions product={product} />
          </div>
        </div>
      </div>
      <RelatedProducts products={relatedProducts} />
    </>
  );
};

export default ProductDetailsPage;
