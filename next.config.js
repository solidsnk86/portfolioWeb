/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
	experimental: {
		esmExternals: false,
		appDir: true,
		mdxRs: true
	}
}

module.exports = nextConfig
