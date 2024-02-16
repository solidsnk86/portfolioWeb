import React from 'react'
import Link from 'next/link'
import { Logo } from './Logo'
import { useTranslation } from 'react-i18next'

export function AboutMe() {
	const { t } = useTranslation()

	const CardTitle = ({ Tag = 'p', children }) => {
		return (
			<Tag className='text-xs md:text-md xl:text-lg from-zinc-300 text-center my-20 italic font-thin'>
				{children}
			</Tag>
		)
	}

	return (
		<section className='relative text-white flex list-none justify-center'>
			<div className='block mt-24 xl:mt-10'>
				<div>
					<div className='relative flex'>
						<Logo className='w-[500px]' />
					</div>
				</div>
				<aside className='flex-col relative top-10 mx-3'>
					<CardTitle>
						{t('aboutMe')}
						<Link
							className='mx-1 duration-500 text-orange-400 underline link-shadow'
							href='https://neotecs.netlify.app/'
						>
							Neotecs
						</Link>
						{t('aboutMeLast')}
					</CardTitle>
				</aside>
			</div>
		</section>
	)
}
