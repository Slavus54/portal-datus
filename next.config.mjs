/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
    experimental: {
        optimizePackageImports: [
            'datus.js',
            'codus.js'
        ]
    },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'web.telegram.org',
            port: '',
            pathname: '/k/assets/**',
            search: ''
          },
        ],
      },
};

export default nextConfig;