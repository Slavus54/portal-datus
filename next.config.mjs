/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
    experimental: {
        optimizePackageImports: [
            'datus.js'
        ]
    }
};

export default nextConfig;