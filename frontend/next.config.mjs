/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*.cloudinary.com'
            },
            {
                protocol: 'https',
                hostname: 'placehold.co'
            }
        ]
    },
};

export default nextConfig;
