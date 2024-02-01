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
						const [url, title, repoName, image, description, update] = row.split(',')
						return {
							url,
							title,
							repoName,
							image,
							description,
							update
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
				<meta name='theme-color' content='#48484C' />
			</Head>

			<header id='header' className='relative w-full mb-10 z-[9999]'>
				<Header />
			</header>

			<div className='flares w-full h-full'>
				<img
					src='img/flare-top.png'
					loading='lazy'
					sizes='(max-width: 1920px) 100vw, 1920px'
					srcSet='img/flare-top-500.png 500w, img/flare-top-800.png 800w, img/flare-top-1080.png 1080w, img/flare-top.png 1920w'
					alt=''
					className='flares-top w-full h-full'
				/>
				<img
					src='img/flare-right.png'
					loading='lazy'
					sizes='(max-width: 1622px) 100vw, 1622px'
					srcSet='img/flare-right-500.png 500w, img/flare-right-800.png 800w, img/flare-right-1080.png 1080w, img/flare-right.png 1622w'
					alt=''
					className='new-flare-nav top-right hide-mobile w-full h-full'
				/>
				<img
					src='img/flare-left.png'
					loading='lazy'
					sizes='(max-width: 1518px) 100vw, 1518px'
					srcSet='img/flare-left-500.png 500w, img/flare-left-800.png 800w, img/flare-left.png 1518w'
					alt=''
					className='new-flare-nav top-left hide-mobile w-full h-full'
				/>
			</div>

			<main className={`${inter.className} max-w-5xl mx-auto mt-14 pb-20 px-4 `}>
				<Particles className='absolute inset-0 -z-0 animate-fade-in' quantity={133} />
				<AboutMe />
				<LF />
				<HomeTitle>{t('projectsTitle')}</HomeTitle>
				<div className='sm:flex items-stretch mx-auto gap-4 sm:text-center'>
					{projects.map((project) => (
						<div
							className='flex flex-col text-zinc-300 my-4 items-center w-full h-1/2 sm:w-1/2 space-y-4 lg:w-1/3 xl:w-1/3 border-white border-opacity-10 border rounded-xl duration-200 hover:shadow-lg hover:shadow-[#a8a081a6] hover:border-opacity-0 hover:bg-primary hover:bg-opacity-5 overflow-hidden project-card relative'
							key={project.title}
						>
							<img className='rounded-t-xl' src={project.image} alt={project.title} />
							<span className='text-[10px] font-mono absolute top-[-12px] left-[14px] z-10 bg-transparent update-dot uppercase'>
								update {project.update}
							</span>
							<span className='font-bold mt-6 mb-2'>{project.title}</span>
							<span className='text-sm mb-2 opacity-[.7] h-12'>{project.description}</span>

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
			<p className='text-center text-zinc-600 text-xs pb-2'>
				Todos los nombres de productos, logos y marcas son propiedad de sus respectivos creadores.
			</p>
		</>
	)
}
