import Link from "next/link"

export const Footer = () => {
	const githubLink = [
		{ name: '@solidSnk86', href: 'https://github.com/solidsnk86' }
	]
	return (
		<div className='flex justify-center m-auto my-4'>
			{
				githubLink.map((i) => (
					<Link
					key={i.href}
					href={i.href}
					>
					<span className='text-orange-400 text-sm hover:text-zinc-300 transition-all bg-gray-800 px-3 py-2 rounded-full'>{i.name}</span>
					</Link>
				))
			}
		</div>
	)
}