/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		minimumCacheTTL: 600,
		domains: [process.env.NEXT_PUBLIC_S3_DOMAIN],
	},
};

module.exports = nextConfig;
