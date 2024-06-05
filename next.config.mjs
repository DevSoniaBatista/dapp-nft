/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    env: {
        CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS,
        OPENSEA_URL: process.env.OPENSEA_URL,
        CHAIN_ID: process.env.CHAIN_ID,
        EXPLORER_SCAN: process.env.EXPLORER_SCAN
      }
};

export default nextConfig;
