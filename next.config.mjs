/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'placehold.co',
            },
        ],
        dangerouslyAllowSVG: true, 
        contentSecurityPolicy: "default-src 'self'; img-src *; media-src *; script-src 'none'; sandbox;", // שיפור אבטחה
    },
};

export default nextConfig;
