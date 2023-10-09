import Link from "next/link"
import { GithubIcon } from "lucide-react"

export const Footer = () => {
	const githubLink = [
		{ str: 'seguir @solidSnk86', href: 'https://github.com/solidsnk86' }
	]
	return (
		<div className='flex justify-center m-auto my-4'>
			{
				githubLink.map((i) => (
					<Link
						key={i.href}
						href={i.href}
					>
						<span className='bg-[#0B1223] px-3 py-2 text-orange-400 text-sm rounded-full hover:text-red-500 hover:transition-[.5s] hover:opacity-[.6]'>
							<GithubIcon className="inline mx-1 text-zinc-300 w-5 h-5 mb-1" />
							{i.str}
						</span>
					</Link>
				))
			}
		</div>
	)
}