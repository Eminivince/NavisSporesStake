/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  reactStrictMode: true,
  env: {
    CURRENT_NETWORK: process.env.CURRENT_NETWORK,
    API_ENDPOINT_URL: process.env.API_ENDPOINT_URL,
  },
  transpilePackages: [
    'antd',
    '@ant-design',
    'rc-util',
    'rc-pagination',
    'rc-picker',
    'rc-notification',
    'rc-tooltip',
    'rc-tree',
    'rc-table',
  ],
  images: {
    unoptimized: true,
    domains: [
      'storage.googleapis.com',
      'nft-metadata.testnet.aptoslabs.com',
      'www.google.com',
      'huggingface.co',
      'letsenhance.io',
      'img-cdn.pixlr.com',
    ],
    minimumCacheTTL: 1500000,
  },
};

export default nextConfig;
