import React from "react"
import Link from "next/link"
import { ImageAvatar } from "./AvatarBlog"
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Head from 'next/head'
import { Card } from '@/components/Card'
import { MT } from '@/components/MeteorLanguages'


const articles = [{
	user: '93176365',
	name: 'Calcagni Gabriel',
	posted: `November 11, 2023`,
	title: 'Exciting News: "I am grateful to present to you this project from NeoTecs."',
	description: 'Explore our comprehensive web documentation designed to guide you through the process of programming and configuring wireless access points from various leading brands. Whether you are a seasoned developer or just getting started, our documentation offers step-by-step instructions, code examples, and valuable insights to streamline your experience.',
	url: 'https://neotecs.netlify.app'
},
]

const handleButtonBack = () => {
	window.open('/', '_self')
}

export default function MyBlog() {
	return (
		<main className='text-slate-100 bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0 h-screen'>
			<Head>
				<meta name='theme-color' content='#FDBA8C' />
			</Head>
			<MT />
			<ArrowLeft className='flex fixed left-[14px] top-[1.8rem] cursor-pointer text-zinc-300 hover:opacity-[.8]' onClick={handleButtonBack} />
				{[
					articles.map(({ user, name, title, description, posted, url }) => (
						<div className='xl:w-1/2 justify-center mx-auto pt-20 px-3'>
							<Card>
								<article className="p-6 space-y-6 relative">
								<header>
									<span className="text-zinc-400 text-sm">{posted}</span>
									<h1 className="text-2xl font-semibold my-2">{title}</h1>
									<p className="text-zinc-400 xl:line-clamp-none line-clamp-3">{description}</p>
								</header>
								<aside className='flex space-x-3'>
									<ImageAvatar key={user} user={user} />
									<div className='flex-col'>
										<span className='font-semibold'>{name}</span>
										<p className='font-light text-[#5D5D5D] text-sm'>NeoTecs Dev</p>
									</div>
									<Link href={url} className='absolute right-10 bottom-10 flex hover:underline'>
										Read More <ArrowRight className="mx-1" />
									</Link>
								</aside>
								</article>
							</Card>
						</div>
					))
				]}
			</main>
	)
}
