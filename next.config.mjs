/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pwtqllwxedbqeqnbpxmk.supabase.co",
      },
    ],
  },

  reactCompiler: true,

  async redirects() {
    return [
      {
        source: "/course",
        destination: "/courses",
        permanent: true, // 308 Permanent Redirect
      },
    ];
  },
};

export default nextConfig;
