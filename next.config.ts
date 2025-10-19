import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.imgur.com",
        port: "",
        pathname: "/*",
        search: "",
      },
      {
        protocol: "https",
        hostname: "images.samsung.com",
        port: "",
        pathname: "/**", // allow all Samsung product images
      },
      {
        protocol: "https",
        hostname: "placeimg.com",
        port: "",
        pathname: "/**", // allow placeholder images
      },
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
        port: "",
        pathname: "/**", // allow all images from saludalas.com
      },
      {
        protocol: "https",
        hostname: "cdn.dummyjson.com",
        port: "",
        pathname: "/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.google.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
// cdn.dummyjson.com;
