import { AboutMe } from '@/components/AboutMe'
import { BackgroundFlares } from '@/components/BackgroundFlares'
import { DataProjects } from '../components/DataProjects'
import { ExternalLink, ArrowUpRight } from 'lucide-react'
import { Footer } from '@/components/Footer'
import { GithubDescription } from '../components/GithubDescription'
import { GithubStats } from '@/components/GithubStats'
import { Header } from '@/components/Header'
import { HomeTitle } from '@/components/HomeTitle'
import { LF } from '@/sections/languages'
import { title, description, ogImg, favicon, inter } from '@/components/const'
import { useTranslation } from 'react-i18next'
import Head from 'next/head'
import Link from 'next/link'
import Particles from '@/components/particles'
import Visit from '@/components/Visits'

export default function Home() {
	const { t } = useTranslation()
	const projects = DataProjects()

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
				<meta name='theme-color' content={'#D4D4D8'} />
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
				<div className='sm:flex items-stretch mx-auto gap-4 sm:text-center p-6 md:p-0'>
					{projects.map((project) => (
						<div
							className='flex flex-col text-zinc-300 my-4 items-center w-full h-1/2 sm:w-1/2 lg:w-1/3 xl:w-1/3 border-white border-opacity-10 border md:rounded-2xl rounded-md hover:border-zinc-700 hover:bg-primary hover:bg-opacity-5 overflow-hidden project-card relative'
							key={project.title}
						>
							<img className='image-card h-36 md:h-auto' src={project.image} alt={project.title} />
							<span className='text-[10px] px-2 absolute top-[4px] left-[15px] z-10 bg-zinc-600/40 rounded-md update-dot capitalize'>
								updated <GithubDescription repoName={project.repoName} />
							</span>
							<div className='grid text-center space-y-3 -translate-y-10 md:-translate-y-8'>
								<span className='font-bold mb-2 text-zinc-50 z-50'>{project.title}</span>
								<span className='text-sm mb-2 opacity-[.7] h-12 description-project w-[200px]'>
									{project.description}
								</span>
							</div>
							<GithubStats repoName={project.repoName} />
							<a
								href={project.url}
								className='hover:brightness-150 px-3 pb-3 rounded mt-2 text-md link'
								target='_blank'
								title={`Ir a la web ${project.url}`}
								rel='noopener noreferrer'
							>
								Link
								<ExternalLink className='inline-flex ml-[2px] mb-[3px] relative transition-all duration-300 text-md w-[14px] h-[14px] link-icon' />
							</a>
						</div>
					))}
				</div>
			</main>
			<Link
				className='justify-center mx-auto flex w-fit text-amber-400 text-sm hover:underline underline-offset-4 decoration-wavy'
				href={t('cvLink')}
				target='_blank'
				title={t('cvTitle')}
			>
				{t('documentCv')}
				<ArrowUpRight className='inline w-4 h-4' />
			</Link>
			<Footer />
			{
				[
					{ repoName: 'portfolioWeb' }
				].map((repo) => (
					<div key={repo.repoName} className='text-zinc-200 p-1 text-xs rounded-md my-6 justify-center mx-auto flex bg-zinc-600/30 w-fit update-dot'>
						<p className='ml-1'>{t('update')} <GithubDescription className='text-xs mx-1' repoName={repo.repoName} /></p>
					</div>
				))
			}
			<Visit />
			<p className='text-center text-zinc-600 text-xs pb-2'>{t('last_footer')}</p>
		</>
	)
}
