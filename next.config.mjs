/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: [
            "@node-rs/argon2"
        ]
    },
    eslint: {
        dirs: ['src']
    },
    output: process.env.NODE_ENV == 'production' ? 'standalone' : undefined
};

export default nextConfig;
