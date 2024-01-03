/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        BE_URL: process.env.BE_URL
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/bus-operator',
                permanent: true,
            },
        ]
    },
}

module.exports = nextConfig
