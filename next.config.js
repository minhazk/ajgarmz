/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['source.unsplash.com', 'drive.google.com'],
    },
    experimental: {
        serverActions: true,
    },
};

module.exports = nextConfig;
