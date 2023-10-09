import Link from 'next/link'
import { GithubStats } from '@/components/GithubStats'


export function Header() {
	const navigation = [
		{ name: 'Contacto', href: 'https://www.linkedin.com/in/gabriel-calcagni/' },
		{ name: 'Blog', href: 'https://neotecs.netlify.app' },
		{ name: 'Proyectos', href: '#proyectos' }
		
	]

	return (
		<>
			<div className='relative w-full h-14 p-2 flex text-white !bg-cover !bg-center overflow-hidden'>
				<div className='relative z-10 flex items-center justify-center'>
					<div className='w-full flex gap-3 md:gap-6 items-center md:justify-center text-sm md:text-base !justify-center'>
						<ul className='flex'>
							{navigation.map((item) => (
								<li className='text-header-shadow font-semibold space-x-4 text-orange-300 mr-5 cursor-pointer hover:text-zinc-300 transition-all'>
									<Link key={item.href} href={item.href} target='_blank'>
										{item.name}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
				<ul>
				<li className='absolute right-5 top-3'>
								{[
									{
										repoName: 'portfolioWeb'
									}
								].map((item) => (
									<GithubStats repoName={item.repoName} />
								))}
							</li>
				</ul>
			</div>
		</>
	)
}
