import { Inter, Inter_Tight as InterTight } from 'next/font/google'
import Head from 'next/head'
import { renderToString } from 'react-dom/server'
import { LF } from '@/sections/languages'
import { Header } from '@/components/Header'
import Particles from '@/components/particles'
import { AboutMe } from '@/components/AboutMe'
import { GithubStats } from '@/components/GithubStats'
import { ExternalLink } from 'lucide-react'
import { Footer } from '@/components/Footer'
import { MyIcon } from '../components/MyIcon'
import { NeoTecsIcon } from '../components/NeotecsIcon'
import { FormIcon } from '../components/FormIcon'
import { ScoreBoardIcon } from '../components/TablerIcon'
import { TresDButton } from '../components/TresDButton'
import { ScraperIcon } from '../components/ScraperIcon'
import Visit from '../components/Visits'

export const inter = Inter({ weight: ['400', '500', '600', '700', '900'], subsets: ['latin'] })
export const interTight = InterTight({ weight: ['500', '800', '900'], subsets: ['greek'] })

const cvIcon = renderToString(<MyIcon />)
const neoIcon = renderToString(<NeoTecsIcon />)
const formIcon = renderToString(<FormIcon />)
const scoreBoard = renderToString(<ScoreBoardIcon />)
const neoScraper = renderToString(<ScraperIcon />)

export default function Home() {
	const title = 'Portfolio Calcagni Gabriel'
	const description = '¡Ey, pásate y echa un vistazo a mi portfolio!'
	const ogImg = cvIcon

	const HomeTitle = ({ Tag = 'h2', children }) => {
		return (
			<Tag
				id='proyectos'
				className='flex justify-center m-auto my-16 text-sky-100 text-4xl xl:text-5xl md:text-5xl font-bold '
			>
				{children}
			</Tag>
		)
	}

	return (
		<>
			<Head>
				<title>Calcagni Gabriel</title>
				<meta name='description' content={description} />
				<meta property='og:image' />
				<meta property='author' content='solidSnk86' />
				<meta property='twitter:image' content={ogImg} />
				<meta property='og:title' content={title} />
				<meta property='twitter:title' content={title} />
				<meta property='og:description' content={description} />
				<meta property='twitter:description' content={description} />
				<meta property='og:url' content={ogImg} />
				<meta property='twitter:url' />
				<meta property='og:type' content='website' />
				<meta property='twitter:card' content='summary_large_image' />
				<link rel='shortcut icon' href={`data:image/svg+xml,${encodeURIComponent(cvIcon)}`} />
				<link rel='apple-touch-icon' href={`data:image/svg+xml,${encodeURIComponent(cvIcon)}`} />
				<meta name='theme-color' content='#F05252' />
			</Head>

			<header id='header' className='relative w-full mb-10 overflow-hidden z-[99999]'>
				<Header />
			</header>

			<main className={`${inter.className} max-w-5xl m-auto mt-14 pb-20 px-4 `}>
				<Particles className='absolute inset-0 -z-10 animate-fade-in' quantity={133} />
				<AboutMe />
				<LF />
				<HomeTitle>My Projects...</HomeTitle>
				<div className='sm:flex items-stretch max-w-3xl mx-auto space-y-4 text-left sm:space-y-0 sm:space-x-8 sm:text-center'>
					{[
						{
							url: 'https://neotecs.netlify.app/',
							title: 'NeoTecs Web',
							repoName: 'NeoTecs',
							logo: `data:image/svg+xml,${encodeURIComponent(neoIcon)}`,
							description: 'Documentation for Web Programing.'
						},
						{
							url: 'https://tablerobap.netlify.app/',
							title: 'Tablero Digital',
							repoName: 'tablero-369',
							logo: `data:image/svg+xml,${encodeURIComponent(scoreBoard)}`,
							description: 'Digital scoreboard for bocce.'
						},
						{
							url: 'https://github.com/solidsnk86/neo-scraper',
							title: 'Neo Scraper',
							repoName: 'neo-scraper',
							logo: `data:image/svg+xml,${encodeURIComponent(neoScraper)}`,
							description: 'Web scraping app with Flask.'
						},
						{
							url: 'https://solidsnk86.github.io/formularioWeb/',
							title: 'Formulario Web',
							repoName: 'formularioWeb',
							logo: `data:image/svg+xml,${encodeURIComponent(formIcon)}`,
							description: 'Project demo of online billing.'
						}
					].map((item) => (
						<div
							className='flex flex-col text-zinc-300 items-center w-full sm:w-1/2 lg:w-1/3 xl:w-1/3 border-white border-opacity-10 border rounded-xl px-4 py-6 duration-200 hover:shadow-lg hover:shadow-[#66666b] hover:border-opacity-0 hover:bg-primary hover:bg-opacity-5 hover:scale-[1.05]'
							key={item.title}
						>
							<img
								className='w-24 sm:w-24 md:w-24 lg:w-24 xl:w-28 sm:mr-0'
								src={item.logo}
								alt={item.title}
							/>
							<span className='font-bold mt-4 mb-2'>{item.title}</span>
							<span className='text-sm mb-2 opacity-[.7]'>{item.description}</span>

							<GithubStats repoName={item.repoName} />
							<a
								href={item.url}
								className='hover:brightness-150 px-3 py-1 rounded mt-2 text-md'
								target='_blank'
								rel='noopener noreferrer'
							>
								Link
								<ExternalLink className='inline-flex mx-1 mb-1 relative text-md w-4 h-4 ' />
							</a>
						</div>
					))}
				</div>
			</main>
			<TresDButton />
			<Footer />
			<Visit />
		</>
	)
}
