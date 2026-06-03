// Get all products

export const getProducts = async ({ category, price, sort, page } = {}) => {
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
  return res.json();
};

// Get single product
export const getProductById = async (id) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/${id}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) throw new Error("Failed to fetch product");

  return res.json();
};

// Get related products

export const getRelatedProducts = async (category, id) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/related?category=${encodeURIComponent(category)}&id=${id}`,
    { cache: "no-store" },
  );

  if (!res.ok) throw new Error("Failed to fetch related products");

  return res.json();
};

// Get featured products

export const getFeaturedProducts = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/featured`,
    {
      next: { revalidate: 60 },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch featured products");
  }

  return res.json();
};
