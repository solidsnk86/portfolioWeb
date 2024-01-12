import { useEffect } from 'react'
import Link from 'next/link'
import { GithubStats } from './GithubStats'
import { useTranslation } from 'react-i18next'

export function Header() {
	const { t, i18n } = useTranslation()

	useEffect(() => {
		const storedLanguage = localStorage.getItem('language')
		if (storedLanguage) {
			i18n.changeLanguage(storedLanguage)
		}
	}, [i18n])

	const changeLanguage = (newLanguage) => {
		i18n.changeLanguage(newLanguage)
		localStorage.setItem('language', newLanguage)
	}
	const navigation = [
		{ name: t('navLink1'), href: '/contact/' },
		{ name: 'Blog', href: '/blog/' },
		{ name: t('navLink2'), href: '#proyectos' }
	]

	return (
		<>
			<div className='relative w-full h-14 p-2 flex text-white !bg-cover !bg-center overflow-hidden'>
				<div className='relative z-10 flex items-center justify-center'>
					<div className='w-full flex gap-3 md:gap-6 items-center md:justify-center text-sm md:text-base !justify-center'>
						<ul className='flex'>
							{navigation.map((item) => (
								<li
									key={item.href}
									className='text-header-shadow font-semibold space-x-4 text-[#E0F2FE] mr-5 cursor-pointer hover:text-zinc-300 transition-all'
								>
									<Link href={item.href} target='_self'>
										{item.name}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
				<ul className='absolute right-5 top-3 flex'>
					<div className=' space-x-2 px-4 pt-[1px]'>
						<button onClick={() => changeLanguage('en')} className='hover:scale-110'>
							<img src='/img/estados-unidos-flag.png' width={30} alt='English' />
						</button>
						<button onClick={() => changeLanguage('es')} className='hover:scale-110'>
							<img src='/img/espana-flag.png' width={30} alt='Español' />
						</button>
					</div>
					<li className='mt-[1px]'>
						{[
							{
								repoName: 'portfolioWeb'
							}
						].map((item, index) => (
							<GithubStats key={index} repoName={item.repoName} />
						))}
					</li>
				</ul>
			</div>
		</>
	)
}
