/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
	experimental: {
		esmExternals: false
	},
	env: {
		NEXT_PUBLIC_DATA_IP_1: process.env.NEXT_PUBLIC_DATA_IP_1,
		NEXT_PUBLIC_DATA_IP_2: process.env.NEXT_PUBLIC_DATA_IP_2
	}
}

module.exports = nextConfig
