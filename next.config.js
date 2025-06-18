/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["uploadthing"],
  },
  images: {
    domains: ["utfs.io"],
  },
  env: {
    UPLOADTHING_TOKEN: process.env.UPLOADTHING_TOKEN,
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
  },
};

module.exports = nextConfig;
