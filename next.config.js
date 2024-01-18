/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  output: "standalone",
  webpack: (config, { isServer }) => {
    config.resolve.alias["~"] = path.join(__dirname, "src");
    return config;
  },
};

module.exports = nextConfig;
