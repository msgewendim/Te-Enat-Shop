/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  // Remove the conflicting setting
  // transpilePackages: ["react-i18next"],
  serverExternalPackages: ["i18next"],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    // Allow importing images from anywhere
    domains: ['localhost'],
    // Fix for imported SVGs and static images
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Disable ESLint during build temporarily
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable TypeScript checking during build temporarily
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
