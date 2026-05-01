/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'github.com' },
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
      { protocol: 'https', hostname: 'raw.githubusercontent.com' },
    ],
  },
  async redirects() {
    return [
      {
        source: '/install',
        destination: 'https://raw.githubusercontent.com/openonion/oo/main/install.sh',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
