/** @type {import('next').NextConfig} */
const nextConfig = {
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
