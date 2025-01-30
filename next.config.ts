import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: 'standalone',
  webpack: (config) => {
    config.module.rules.push({
      test: /\.ya?ml$/,
      use: [
        {
          loader: 'raw-loader'
        },
        {
          loader: 'yaml-loader'
        }
      ]
    });
    return config;
  }
};

export default nextConfig;
