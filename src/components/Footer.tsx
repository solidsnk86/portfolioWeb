import React from 'react'
import Link from 'next/link'

export const Footer = () => {
	const githubLink = [
		{
			str: <p className='inline'>&copy;solidsnk86</p>,
			href: 'https://github.com/solidsnk86',
			year: 2023
		}
	]
	return (
		<footer className='flex pt-20 pb-5 justify-center m-auto'>
			{githubLink.map((i) => (
				<div key={i.href} className='text-zinc-600 text-sm'>
					<Link href={i.href}>
						<span
							title='Visitar el perfil de Github'
							className='hover:text-red-500 hover:transition-color duration-500 hover:brightness-150 mx-2'
						>
							{i.str}
						</span>
					</Link>
					•<span className='mx-2'>{i.year}</span>
				</div>
			))}
		</footer>
	)
}
