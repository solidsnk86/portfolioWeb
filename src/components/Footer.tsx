import React from 'react'
import Link from 'next/link'

export const Footer = ({ className }: { className: string }) => {
	const githubLink = [
		{
			str: <p className='inline'>&copy;solidsnk86</p>,
			href: 'https://github.com/solidsnk86',
			year: new Date().getFullYear()
		}
	]
	return (
		<footer className={`flex pt-20 pb-5 justify-center m-auto ${className}`}>
			{githubLink.map((i) => (
				<div key={i.href} className='text-zinc-500 text-sm'>
					<Link href={i.href}>
						<span
							title={`Ir al perfil de Github: ${i.href}`}
							className='hover:text-[#928bf9] hover:transition-color duration-500 mx-2'
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
