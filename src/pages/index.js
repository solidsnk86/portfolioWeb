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
import Visit from '../components/Visits'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import i18n from '../lib/i18next'

export const inter = Inter({ weight: ['400', '500', '600', '700', '900'], subsets: ['latin'] })
export const interTight = InterTight({ weight: ['500', '800', '900'], subsets: ['greek'] })

const favicon = renderToString(<MyIcon />)

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

export default function Home() {
	const { t } = useTranslation()
	const [projects, setProjects] = useState([])

	const title = 'Portfolio Calcagni Gabriel'
	const description = '¡Ey, pásate y echa un vistazo a mi portfolio!'
	const ogImg =
		'https://raw.githubusercontent.com/solidsnk86/NeoTecs/master/public/images/logos/NeoTecs_Tutorial_logo.png'

	useEffect(() => {
		const fetchProjects = async () => {
			try {
				const res = await fetch(
					'https://docs.google.com/spreadsheets/d/e/2PACX-1vQEGCqgrFBB4vWjUzNlslVB-rHkbUrcgFcS6dVLjiW94a5yS0KrLebgAHgdDXX0HfYDbYGvos-oFs-O/pub?output=csv'
				)
				const csv = await res.text()
				const parsedProjects = csv
					.split('\n')
					.slice(1)
					.map((row) => {
						const [url, title, repoName, image, description] = row.split(',')
						return {
							url,
							title,
							repoName,
							image,
							description
						}
					})
				setProjects(parsedProjects)
			} catch (error) {
				console.error('Error fetching projects data 😕:', error)
			}
		}

		fetchProjects()
	}, [])

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
				<link rel='shortcut icon' href={`data:image/svg+xml,${encodeURIComponent(favicon)}`} />
				<link rel='apple-touch-icon' href={`data:image/svg+xml,${encodeURIComponent(favicon)}`} />
				<meta name='theme-color' content='#F05252' />
			</Head>

			<header id='header' className='relative w-full mb-10 z-[9999]'>
				<Header />
			</header>

			<main className={`${inter.className} max-w-5xl m-auto mt-14 pb-20 px-4 `}>
				<Particles className='absolute inset-0 -z-10 animate-fade-in' quantity={133} />
				<AboutMe />
				<LF />
				<HomeTitle>{t('projectsTitle')}</HomeTitle>
				<div className='sm:flex items-stretch max-w-3xl mx-auto text-left sm:space-y-0 sm:space-x-8 sm:text-center'>
					{projects.map((project) => (
						<div
							className='flex flex-col text-zinc-300 items-center w-full sm:w-1/2 space-y-4 lg:w-1/3 xl:w-1/3 border-white border-opacity-10 border rounded-xl duration-200 hover:shadow-lg hover:shadow-[#66666b] hover:border-opacity-0 hover:bg-primary hover:bg-opacity-5 overflow-hidden project-card relative'
							key={project.title}
						>
							<img className='w-full h-1/2 rounded-t-xl' src={project.image} alt={project.title} />
							<span className='font-bold mt-4 mb-2'>{project.title}</span>
							<span className='text-sm mb-2 opacity-[.7]'>{project.description}</span>

							<GithubStats repoName={project.repoName} />
							<a
								href={project.url}
								className='hover:brightness-150 px-3 pb-3 rounded mt-2 text-md link'
								target='_blank'
								rel='noopener noreferrer'
							>
								Link
								<ExternalLink className='inline-flex mx-1 mb-1 relative text-md w-4 h-4 link-icon' />
							</a>
						</div>
					))}
				</div>
			</main>
			<Footer />
			<Visit />
		</>
	)
}
