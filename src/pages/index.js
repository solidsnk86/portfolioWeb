import { AboutMe } from '@/components/AboutMe'
import { BackgroundFlares } from '@/components/BackgroundFlares'
import { DataProjects } from '../components/DataProjects'
import { ExternalLink } from 'lucide-react'
import { Footer } from '@/components/Footer'
import { GithubStats } from '@/components/GithubStats'
import { GithubDescription } from '../components/GithubDescription'
import Head from 'next/head'
import { HomeTitle } from '@/components/HomeTitle'
import { Header } from '@/components/Header'
import { LF } from '@/sections/languages'
import Particles from '@/components/particles'
import { useTranslation } from 'react-i18next'
import { title, description, ogImg, favicon, inter } from '@/components/const'
import ChangeThemeColor from '@/components/ChangeThemeColor'
import Visit from '@/components/Visits'

export default function Home() {
	const { t } = useTranslation()
	const projects = DataProjects()
	const themes = ChangeThemeColor()

	return (
		<>
			<Head>
				<title>Calcagni Gabriel</title>
				<meta name='description' content={description} />
				<meta property='og:image' content={ogImg} />
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
				<link rel='shortcut icon' href={favicon} />
				<link rel='apple-touch-icon' href={favicon} />
				<meta name='theme-color' content={themes} />
			</Head>

			<header id='header' className='relative w-full mb-10 z-[9999]'>
				<Header />
			</header>
			<BackgroundFlares />
			<main className={`${inter.className} max-w-5xl mx-auto mt-14 pb-20 px-4 `}>
				<Particles className='absolute inset-0 -z-0 animate-fade-in' quantity={133} />
				<AboutMe />
				<LF />
				<HomeTitle>{t('projectsTitle')}</HomeTitle>
				<div className='sm:flex items-stretch mx-auto gap-4 sm:text-center'>
					{projects.map((project) => (
						<div
							className='flex flex-col text-zinc-300 my-4 items-center w-full h-1/2 sm:w-1/2 space-y-4 lg:w-1/3 xl:w-1/3 border-white border-opacity-10 border rounded-xl duration-300 hover:border-zinc-700 hover:bg-primary hover:bg-opacity-5 overflow-hidden project-card relative'
							key={project.title}
						>
							<img className='rounded-t-xl' src={project.image} alt={project.title} />
							<span className='text-[10px] font-mono absolute top-[-12px] left-[14px] z-10 bg-transparent update-dot uppercase'>
								updated <GithubDescription repoName={project.repoName} />
							</span>
							<span className='font-bold mt-6 mb-2'>{project.title}</span>
							<span className='text-sm mb-2 opacity-[.7] h-12 description-project'>
								{project.description}
							</span>

							<GithubStats repoName={project.repoName} />
							<a
								href={project.url}
								className='hover:brightness-150 px-3 pb-3 rounded mt-2 text-md link'
								target='_blank'
								title={`Ir a la web ${project.url}`}
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
			<p className='text-center text-zinc-600 text-xs pb-2'>{t('last_footer')}</p>
		</>
	)
}
