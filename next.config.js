/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        BE_URL: process.env.BE_URL
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/bus-operator/dashboard',
                permanent: true,
            },
            {
                source: '/bus-operator',
                destination: '/bus-operator/dashboard',
                permanent: true,
            },
        ]
    },
}

module.exports = nextConfig
