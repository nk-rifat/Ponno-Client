const ProductDetailsPage = async({ params }) => {
  const { id } = await params;
  return <div className="text-black">{id}</div>;
};

export default ProductDetailsPage;
