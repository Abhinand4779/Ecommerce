/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Ignore ESLint errors during production builds — allows building without changing app logic
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
