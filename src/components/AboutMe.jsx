import React from 'react'
import Link from 'next/link'
import { Logo } from './Logo'

export function AboutMe() {
	const CardTitle = ({ Tag = 'p', children }) => {
		return (
			<Tag className='text-sm md:text-md xl:text-lg from-zinc-300 text-center my-20 italic font-thin'>
				{children}
			</Tag>
		)
	}

	return (
		<>
			<nav className='text-white flex list-none relative justify-center m-auto'>
				<div className='block mt-24 xl:mt-10'>
					<div>
						<div className='relative flex'>
							<Logo className='w-[500px]' />
						</div>
					</div>
					<aside className='flex-col relative top-10 mx-3'>
						<CardTitle>
							Hi, my name is Gabriel. I am a Front End developer with 1 year of experience, using
							technologies such as React and Next.js. I work on my project
							<Link
								className='mx-1 duration-500 text-orange-400 underline link-shadow'
								href='https://neotecs.netlify.app/'
							>
								Neotecs
							</Link>
							during the evenings. Currently, I am studying and keep learning!
						</CardTitle>
					</aside>
				</div>
			</nav>
		</>
	)
}
