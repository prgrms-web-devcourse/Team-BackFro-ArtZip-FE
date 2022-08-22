/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracing: false,
  swcMinify: true,
  webpack(config) {
    config.resolve.modules.push(__dirname);
    return config;
  },
  images: {
    domains: ['www.culture.go.kr', 'devcourse-backfro-s3.s3.ap-northeast-2.amazonaws.com'],
  },
};

module.exports = nextConfig;
