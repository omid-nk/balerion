/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pwtqllwxedbqeqnbpxmk.supabase.co",
        pathname: "/storage/v1/object/public/avatars/**",
      },
      {
        protocol: "https",
        hostname: "pwtqllwxedbqeqnbpxmk.supabase.co",
        pathname: "/storage/v1/object/public/images/**",
      },
    ],
  },

  async redirects() {
    return [
      {
        source: "/course",
        destination: "/courses",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
