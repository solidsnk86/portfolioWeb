import React from 'react'
import Link from 'next/link'
import { MyIcon } from '@/components/MyIcon'

export const Footer = () => {
	const githubLink = [
		{
			str: 'solidsnk86',
			href: 'https://github.com/solidsnk86',
			icon: <MyIcon className='inline mx-2 text-zinc-300 w-6 h-6 mb-1 fill-red-500' />,
			year: new Date().getFullYear()
		}
	]
	return (
		<div className='flex pt-20 pb-5 justify-center m-auto'>
			{githubLink.map((i) => (
				<Link key={i.href} href={i.href} className='text-orange-400 text-sm'>
					<span className='hover:text-red-500 hover:transition-[.5s] hover:brightness-150 mx-2'>
						{i.icon}
						{i.str}
					</span>
					·<span className='mx-2'>{i.year}</span>
				</Link>
			))}
		</div>
	)
}
