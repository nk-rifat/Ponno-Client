export default function cloudinaryLoader({ src, width }) {
  // Local public folder images — skip
  if (!src.includes("res.cloudinary.com")) return src;

  // Strip any accidental existing transforms
  const clean = src.replace(/\/image\/upload\/[^/]+\//, "/image/upload/");

  return clean.replace(
    "/image/upload/",
    `/image/upload/w_${width},f_auto,q_auto:good/`,
  );
}
