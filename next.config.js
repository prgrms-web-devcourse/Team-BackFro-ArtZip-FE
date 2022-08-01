/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack(config) {
    config.resolve.modules.push(__dirname);
    return config;
  },
  images:{
    domains:['www.culture.go.kr']
  }
};

module.exports = nextConfig;
