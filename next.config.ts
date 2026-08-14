import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  transpilePackages: ["three"],
  allowedDevOrigins: [
    "*.e2b.app",
    "*.e2b.dev",
    "localhost",
    "127.0.0.1",
  ],
  images: {
    localPatterns: [{ pathname: "/**" }],
  },
};

export default withNextIntl(nextConfig);
