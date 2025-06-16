/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['res.cloudinary.com', 'i.scdn.co'],
      loader: 'default',
      formats: ['image/webp', 'image/avif'],
    },
  }
  
  export default nextConfig;
  
  