/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    WRAPPER_URL: process.env.WRAPPER_URL,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
