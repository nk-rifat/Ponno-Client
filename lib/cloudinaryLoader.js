export default function cloudinaryLoader({ src, width, quality }) {
  // Local public folder images — skip
  if (!src.includes("res.cloudinary.com")) return src;

  // Strip any accidental existing transforms
  const clean = src.replace(/\/image\/upload\/[^/]+\//, "/image/upload/");

  // Apply width + format + quality — Next.js passes width from sizes prop
  return clean.replace(
    "/image/upload/",
    `/image/upload/w_${width},f_webp,q_${quality || 75}/`,
  );
}
