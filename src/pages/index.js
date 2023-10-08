import { Inter, Inter_Tight as InterTight } from 'next/font/google'
import Head from 'next/head'

import { Background } from '@/components/Background'
import { LF } from '@/sections/languages'
import { Header } from '@/components/Header'
import { MT } from '@/components/MeteorLanguages'
import { AboutMe } from '../components/AboutMe'


export const inter = Inter({ weight: ['400', '500', '600', '700', '900'], subsets: ['greek'] })
export const interTight = InterTight({ weight: ['500', '800', '900'], subsets: ['greek'] })

export default function Home() {
	const title = 'Portfolio Calcagni Gabriel'
	const description = '¡Echa un vistazo a mi portfolio!'

	return (
		<>
			<Head>
				<title>Calcagni Gabriel</title>
				<meta name='description' content={description} />
				<meta property='og:image' />
				<meta property='twitter:image' />
				<meta property='og:title' content={title} />
				<meta property='twitter:title' content={title} />
				<meta property='og:description' content={description} />
				<meta property='twitter:description' content={description} />
				<meta property='og:url' />
				<meta property='twitter:url' />
				<meta property='og:type' content='website' />
				<meta property='twitter:card' content='summary_large_image' />
				<link rel='icon' href='/favicon.svg' />
			</Head>

			<MT />
			<Background />

			<header id='header' className='relative w-full mb-10 overflow-hidden z-[99999]'>
				<Header />
			</header>

			<main className={`${inter.className} max-w-5xl m-auto mt-36 pb-20 px-4`}>
				<AboutMe />
				<LF />
			</main>
		</>
	)
}
