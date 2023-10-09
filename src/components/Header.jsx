import Link from 'next/link'
import { GithubStats } from '@/components/GithubStats'


export function Header() {
	const navigation = [
		{ name: 'Blog', href: 'https://neotecs.netlify.app' },
		{ name: 'Contacto', href: 'pages/contact/' }
	]

	return (
		<>
			<div className='relative w-full h-14 p-2 flex text-white !bg-cover !bg-center overflow-hidden'>
				<div className='relative z-10 flex items-center justify-center'>
					<div className='w-full flex gap-3 md:gap-6 items-center md:justify-center text-sm md:text-base !justify-center'>
						<ul className='flex'>
							{navigation.map((item) => (
								<li className='font-semibold space-x-4 text-orange-300 mr-5 cursor-pointer hover:text-zinc-300 transition-all'>
									<Link key={item.href} href={item.href}>
										{item.name}
									</Link>
								</li>
							))}

							<li>
								{[
									{
										repoName: 'NeoTecs'
									}
								].map((item) => (
									<GithubStats repoName={item.repoName} />
								))}
							</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	)
}
