import React from 'react'
import { AboutMe } from '@/components/AboutMe'
import { DataProjects } from '../components/DataProjects'
import { ArrowUpRight } from 'lucide-react'
import { Footer } from '@/components/Footer'
import { GitBranch } from 'tabler-icons-react'
import { GithubDescription } from '../components/GithubDescription'
import { GithubStats } from '@/components/GithubStats'
import { Header } from '@/components/Header'
import { HomeTitle } from '@/components/HomeTitle'
import { Flavors } from '@/sections/flavors'
import { title, description, ogImg, favicon, inter } from '@/components/const'
import { useTranslation } from 'react-i18next'
import Head from 'next/head'
import Link from 'next/link'
import Particles from '@/components/particles'
import Visit from '@/components/Visits'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import useMatchMedia from '@/hooks/useMatchMedia'
import { useIsClient } from '@/hooks/useIsClient'

export default function Home() {
	const { t } = useTranslation()
	const projects = DataProjects()
	const mobile = useMatchMedia('(max-width: 768px)', false)
	const isClient = useIsClient()

	return (
		<>
			<Head>
				<title>{title}</title>
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
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
				/>
				<meta name='theme-color' content={'#D4D4D8'} />
			</Head>

			<header id='header' className='relative w-full mb-10 z-[9999]'>
				<Header />
			</header>
			<main
				className={`${inter.className} max-w-5xl mx-auto mt-14 pb-20 px-4 bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0`}
			>
				<Particles className='absolute inset-0 -z-0 animate-fade-in' quantity={133} />
				<AboutMe />
				<Flavors />
				<HomeTitle>{t('projectsTitle')}</HomeTitle>

				{isClient && (
					<ResponsiveMasonry columnsCountBreakPoints={{ 750: 2, 900: 3, 1200: 4 }}>
						<Masonry gutter={mobile ? '0.3rem' : '0.4rem'}>
							{projects.map((project) => (
								<div
									className='grid text-zinc-300 text-center border-white border-opacity-10 border md:rounded-2xl rounded-md hover:border-zinc-700 overflow-hidden project-card relative'
									key={project.title}
								>
									<img
										className='image-card h-36 md:h-auto'
										src={project.image}
										alt={project.title}
									/>
									<span className='text-[10px] px-2 absolute top-[4px] left-[15px] z-10 rounded-md update-dot capitalize'>
										{t('updated')} <GithubDescription repoName={project.repoName} />
									</span>
									<div className='grid text-center space-y-3 -translate-y-10 md:-translate-y-8'>
										<span className='font-bold text-zinc-50 z-50'>{project.title}</span>
										<span className='text-xs xl:text-sm mb-2 opacity-[.7] h-12 description-project'>
											{project.description}
										</span>
									</div>
									<div>
									<GithubStats repoName={project.repoName} />
									</div>
									<a
										href={project.url}
										className='brightness-150 px-3 pb-3 rounded mt-2 text-md link hover:text-[#928BF9] hover:underline'
										target='_blank'
										title={`Ir a la web ${project.url}`}
										rel='noopener noreferrer'
									>
										Link
										<ArrowUpRight className='inline-flex ml-[2px] mb-[3px] relative transition-all duration-300 text-md w-[14px] h-[14px]' />
									</a>
								</div>
							))}
						</Masonry>
					</ResponsiveMasonry>
				)}
			</main>
			<Link
				className='justify-center mx-auto flex w-fit text-zinc-50 text-sm border p-2 rounded-md border-zinc-600/40 hover:border-zinc-700 transition-all duration-300 cv-link'
				href={t('cvLink')}
				target='_blank'
				title={t('cvTitle')}
			>
				<p className=''>{t('documentCv')}</p>
				<ArrowUpRight className='inline w-4 h-4' />
			</Link>
			<Footer />
			{[{ repoName: 'portfolioWeb' }].map((repo) => (
				<div
					key={repo.repoName}
					className='text-zinc-200 p-1 text-[10px] rounded-md my-6 justify-center mx-auto flex bg-zinc-600/30 w-fit border border-zinc-700 update-dot cursor-default'
				>
					<p className='ml-1'>
						{t('update')}{' '}
						<GithubDescription className='text-[10px] mx-1' repoName={repo.repoName} />
						<GitBranch className='inline mb-[2px] mx-[2px] w-4 h-4' />
					</p>
				</div>
			))}
			<Visit />
			<p className='text-center text-zinc-600 text-[11px] pb-2'>{t('last_footer')}</p>
		</>
	)
}
