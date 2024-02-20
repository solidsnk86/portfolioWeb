import React from 'react'
import Link from 'next/link'

export const Footer = () => {
	const githubLink = [
		{
			str: <p className='inline'>&copy;solidsnk86</p>,
			href: 'https://github.com/solidsnk86',
			year: new Date().getFullYear()
		}
	]
	return (
		<div className='flex pt-20 pb-5 justify-center m-auto'>
			{githubLink.map((i, index) => (
				<>
					<Link key={index} href={i.href} className='text-zinc-600 text-sm'>
						<span className='hover:text-red-500 hover:transition-[.5s] hover:brightness-150 mx-2'>
							{i.str}
						</span>
						·<span className='mx-2'>{i.year}</span>
					</Link>
				</>
			))}
		</div>
	)
}
