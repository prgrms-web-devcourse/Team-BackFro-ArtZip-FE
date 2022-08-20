/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: `https://artzip.shop/:path*`,
      },
    ];
  },
  outputFileTracing: false,
  swcMinify: true,
  webpack(config) {
    config.resolve.modules.push(__dirname);
    return config;
  },
};

module.exports = nextConfig;
