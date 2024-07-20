/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  api: {
    bodyParser: {
      sizeLimit: '2mb', // Set desired value here
    },
  },
};

export default nextConfig;
