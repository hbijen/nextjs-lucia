/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: [
            "@node-rs/argon2"
        ]
    },
    eslint: {
        dirs: ['src']
    }
    
};

export default nextConfig;
