/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: "custom",
    loaderFile: "./lib/cloudinaryLoader.js",
    deviceSizes: [640, 828, 1080, 1200],
    imageSizes: [64, 128, 256, 384],
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;
