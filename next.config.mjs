/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['res.cloudinary.com', 'i.scdn.co', 'cdn-images-1.medium.com', 'miro.medium.com'],
      loader: 'default',
      formats: ['image/webp', 'image/avif'],
    },
  }
  
  export default nextConfig;
  
  