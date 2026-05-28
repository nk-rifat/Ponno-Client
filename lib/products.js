export const getProducts = async ({ category , price, sort, page} = {}) => {
  let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products`;

  const params = new URLSearchParams();

  if (category) {
    params.append("category", category);
  }
  
  if (price) {
    params.append("price", price);
  }
  if (sort) {
    params.append("sort", sort);
  }
  if (page) {
    params.append("page", page);
  }

  if (params.toString()) {
    url += `?${params.toString()}`;
  }

  const res = await fetch(url, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  return await res.json();
};
