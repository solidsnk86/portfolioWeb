import Link from 'next/link'
import { GithubIcon } from 'lucide-react'

export const Footer = () => {

	const githubLink = [
		{
			str: '@solidsnk86',
			href: 'https://github.com/solidsnk86',
			icon: <GithubIcon className="inline mx-1 text-zinc-300 w-5 h-5 mb-1" />
		}
	]
	return (
		<div className='flex my-4 space-x-2 justify-center m-auto'>
			{
				githubLink.map((i) => (
					<Link
						key={i.href}
						href={i.href}
					>
						<span className='bg-[#0B1223] px-3 py-2 text-orange-400 text-sm rounded-full hover:text-red-500 hover:transition-[.5s] hover:brightness-150'>
							{i.icon}
							{i.str}
						</span>
					</Link>
				))
			}
		</div>
	)
}