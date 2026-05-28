export const getProducts = async ({ category } = {}) => {
  let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products`;

  const params = new URLSearchParams();

  if (category) {
    params.append("category", category);
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
  const data = await res.json();

  return data.data;
};
