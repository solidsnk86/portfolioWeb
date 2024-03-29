/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx}',
		'./src/components/**/*.{js,ts,jsx,tsx}',
		'./src/sections/**/*.{js,ts,jsx,tsx}',
		'./src/app/**/*.{js,ts,jsx,tsx}',
		'./src/flavors/*.{js,ts,jsx,tsx}',
		'./node_modules/flowbite/**/*.js'
	],
	theme: {
		extend: {
			animation: {
				marquee: 'marquee var(--duration) linear infinite',
				spin: 'spin calc(var(--speed) * 2) infinite linear',
				slide: 'slide var(--speed) ease-in-out infinite alternate'
			},
			keyframes: {
				marquee: {
					from: { transform: 'translateX(0)' },
					to: { transform: 'translateX(calc(-50% - var(--gap)/2))' }
				},
				'text-gradient': {
					to: {
						backgroundPosition: '200% center'
					}
				},
				spin: {
					'0%': {
						rotate: '0deg'
					},
					'15%, 35%': {
						rotate: '90deg'
					},
					'65%, 85%': {
						rotate: '270deg'
					},
					'100%': {
						rotate: '360deg'
					}
				},
				slide: {
					to: {
						transform: 'translate(calc(100cqw - 100%), 0)'
					}
				}
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
			}
		}
	},
	plugins: [require('flowbite/plugin'), require('tailwindcss-textshadow')]
}
