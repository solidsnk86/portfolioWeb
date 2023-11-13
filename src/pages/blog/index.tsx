import Link from 'next/link'
import { useState, useEffect } from 'react'
import ImageAvatar from './AvatarBlog'
import { ArrowLeft, ArrowRight, EyeIcon } from 'lucide-react'
import Head from 'next/head'
import { Card } from '@/components/Card'
import { MT } from '@/components/MeteorLanguages'
import { Footer } from '@/components/Footer'

const articles = [
	{
		user: '93176365',
		name: 'Calcagni Gabriel',
		companyDev: 'NeoTecs',
		posted: 'November 11, 2023',
		title: 'Exciting News: "I am grateful to present to you this project from NeoTecs."',
		description:
			'Explore our comprehensive web documentation designed to guide you through the process of programming and configuring wireless access points from various leading brands. Whether you are a seasoned developer or just getting started, our documentation offers step-by-step instructions, code examples, and valuable insights to streamline your experience.',
		url: 'https://neotecs.netlify.app'
	}
]

const handleButtonBack = () => {
	window.open('/', '_self')
}

function notDrag() {
	document.documentElement.addEventListener('dragstart', (e) => {
		e.preventDefault()
	})
}

const FollowOnTwitter = () => {
	window.open('https://twitter.com/CalcagniGabriel')
}

export default function MyBlog() {
	const [views, setViews] = useState(0)

	useEffect(() => {
		const storedViews = localStorage.getItem('articleViews')
		if (storedViews) {
			setViews(parseInt(storedViews, 10))
		}
	}, [])

	const articleVisited = () => {
		const newViews = views + 1
		setViews(newViews)
		localStorage.setItem('articleViews', newViews.toString())
	}

	return (
		<main
			onDrag={notDrag}
			className='text-slate-100 bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0 h-screen'
		>
			<Head>
				<meta name='theme-color' content='#FDBA8C' />
			</Head>
			<MT />
			<ArrowLeft
				className='flex relative xl:fixed left-[14px] top-[1.8rem] cursor-pointer text-zinc-300 hover:opacity-[.8]'
				onClick={handleButtonBack}
			/>
			{articles.map((a, index) => (
				<div key={index} className='xl:w-1/2 justify-center mx-auto pt-20 px-3'>
					<Card>
						<article className='p-6 space-y-6 relative'>
							<header>
								<span className='text-zinc-400 text-sm'>{a.posted}</span>
								<span className='text-zinc-400 absolute top-[25px] right-5 text-sm'>
									<EyeIcon className='float-right mx-2 my-[2px] w-4 h-4' />
									{views}
								</span>
								<h1 className='text-2xl font-semibold my-2'>{a.title}</h1>
								<p className='text-zinc-400 xl:line-clamp-none line-clamp-3'>
									{a.description}
								</p>
							</header>
							<aside className='flex space-x-3'>
								<ImageAvatar user={a.user} />
								<div className='flex-col cursor-pointer' onClick={FollowOnTwitter}>
									<span className='font-semibold'>{a.name}</span>
									<p className='font-light text-zinc-600 text-sm'>{a.companyDev}</p>
								</div>
								<Link
									href={a.url}
									onClick={articleVisited}
									className='read-more absolute right-2 bottom-5 xl:right-10 xl:bottom-10 flex hover:underline'
								>
									Read More <ArrowRight className='mx-1 arrow' />
								</Link>
							</aside>
						</article>
					</Card>
				</div>
			))}
			<Footer />
		</main>
	)
}