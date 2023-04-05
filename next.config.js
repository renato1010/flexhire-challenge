/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.filestackcontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
        port: "",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    appDir: true,
  },
  webpack: (config) => {
    config.externals = config.externals.concat([
      "tedious",
      "mysql",
      "mysql2",
      "better-sqlite3",
      "oracledb",
      "pg",
      "pg-query-stream",
    ]);
    return config;
  },
};

module.exports = nextConfig;
