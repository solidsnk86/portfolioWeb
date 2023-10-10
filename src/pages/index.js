import { Inter, Inter_Tight as InterTight } from 'next/font/google'
import Head from 'next/head'
import { renderToString } from 'react-dom/server'
import { Background } from '@/components/Background'
import { LF } from '@/sections/languages'
import { Header } from '@/components/Header'
import Particles from '@/components/particles'
import { AboutMe } from '@/components/AboutMe'
import { GithubStats } from '@/components/GithubStats'
import { ExternalLink } from 'lucide-react'
import { Footer } from '@/components/Footer'
import { FaviconIcon } from '@/components/FaviconIcon'

export const inter = Inter({ weight: ['400', '500', '600', '700', '900'], subsets: ['latin'] })
export const interTight = InterTight({ weight: ['500', '800', '900'], subsets: ['greek'] })

export default function Home() {
	const title = 'Portfolio Calcagni Gabriel'
	const description = '¡Ey, chequea por mi portfolio!'
	const ogImg = 'https://github.com/solidsnk86/neotecs.tech/blob/master/img/Image-og.png?raw=true'

	const HomeTitle = ({ Tag = 'h2', children }) => {
		return (
			<Tag
				id='proyectos'
				className='flex justify-center m-auto my-16 text-sky-100 text-4xl xl:text-6xl md:text-5xl font-bold '
			>
				{children}
			</Tag>
		)
	}

	const favicon2String = renderToString(<FaviconIcon />)

	return (
		<>
			<Head>
				<title>Calcagni Gabriel</title>
				<meta name='description' content={description} />
				<meta property='og:image' />
				<meta property='twitter:image' content={ogImg} />
				<meta property='og:title' content={title} />
				<meta property='twitter:title' content={title} />
				<meta property='og:description' content={description} />
				<meta property='twitter:description' content={description} />
				<meta property='og:url' content={ogImg} />
				<meta property='twitter:url' />
				<meta property='og:type' content='website' />
				<meta property='twitter:card' content='summary_large_image' />
				<link
					rel='shortcut icon'
					href={`data:image/svg+xml,${encodeURIComponent(favicon2String)}`}
				/>
				<link
					rel='apple-touch-icon'
					href={`data:image/svg+xml,${encodeURIComponent(favicon2String)}`}
				/>
				<meta name='theme-color' content='#FDBA8C' />
			</Head>

			<Background />

			<header id='header' className='relative w-full mb-10 overflow-hidden z-[99999]'>
				<Header />
			</header>

			<main className={`${inter.className} max-w-5xl m-auto mt-14 pb-20 px-4`}>
				<Particles className='absolute inset-0 -z-10 animate-fade-in' quantity={133} />
				<AboutMe />
				<LF />
				<HomeTitle>Mis proyectos...</HomeTitle>
				<div className='sm:flex items-stretch max-w-3xl mx-auto space-y-4 text-left sm:space-y-0 sm:space-x-8 sm:text-center'>
					{[
						{
							url: 'https://solidsnk86.github.io/formularioWeb/',
							title: 'Formulario Web',
							repoName: 'formularioWeb',
							repo: 'https://github.com/solidsnk86/formularioWeb/blob/master/img/factura.png?raw=true',
							description: 'Proyecto demo de facturación online',
							logo: 'factura.png'
						},
						{
							url: 'https://neotecs.netlify.app/',
							title: 'NeoTecs',
							repoName: 'NeoTecs',
							repo: 'https://raw.githubusercontent.com/solidsnk86/NeoTecs/d885993b4b1b43703dfbe29aa0daf07f97db04fb/public/images/favicon.svg',
							description: 'Documentación web de configuración Wi-Fi',
							logo: 'icon.png'
						},
						{
							url: 'https://solidsnk86.github.io/GerArt/',
							title: 'Ger Art',
							repoName: 'GerArt',
							repo: 'https://github.com/solidsnk86/GerArt/blob/master/assets/img/android-chrome-512x512.png?raw=true',
							description: 'Portfolio web de arte y dibujo tradicional',
							logo: 'icon.svg'
						}
					].map((item) => (
						<div
							className='flex flex-col text-zinc-300 items-center w-full sm:w-1/2 lg:w-1/3 xl:w-1/3 border-white border-opacity-10 border rounded-xl px-4 py-6 duration-200 hover:shadow-lg sm:hover:shadow-2xl hover:border-opacity-0 hover:bg-primary hover:bg-opacity-5 hover:scale-[1.05]'
							key={item.title}
						>
							<img className='w-20 sm:w-auto xl:w-32 sm:mr-0' src={item.repo} alt={item.title} />
							<span className='font-bold mt-4 mb-2'>{item.title}</span>
							<span className='text-sm mb-2 opacity-[.7]'>{item.description}</span>

							<GithubStats repoName={item.repoName} />
							<a
								href={item.url}
								className='hover:opacity-60 px-3 py-1 rounded mt-2 text-md'
								target='_blank'
								rel='noopener noreferrer'
							>
								Link
								<ExternalLink className='inline-flex mx-1 mb-2 relative text-md' />
							</a>
						</div>
					))}
				</div>
			</main>
			<Footer />
		</>
	)
}
