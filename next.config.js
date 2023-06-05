/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
        images: {
            domains: ['source.unsplash.com'],
        },
    },
};

module.exports = nextConfig;
