import { description } from './const'
import { GithubStats } from './GithubStats'
import { Language, Menu2, X } from 'tabler-icons-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { ShareIcon } from 'lucide-react'
import Particles from './particles'

export function Header() {
	const { t, i18n } = useTranslation()
	const [isMenuOpen, setIsMenuOpen] = useState(false)

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
		{ name: t('navLink0'), href: '/' },
		{ name: t('navLink1'), href: '/contact' },
		{ name: t('navLink2'), href: '/#proyectos' },
		{ name: t('Blog'), href: '/blog' }
	]

	const share = () => {
		try {
			if (navigator.share) {
				navigator.share({
					title: document.title,
					text: description,
					url: location.href
				})
			}
		} catch (_) {
			console.error('Navigator cannot allow to share')
		}
	}

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen)
	}

	return (
		<header className='relative w-full text-white z-50 h-16' id='header'>
			<div className='container mx-auto px-4 pt-3 flex justify-between items-center'>
				<div className='flex items-center overflow-visible' title='solidSnk86'>
					<Link href='/' className='text-xl font-bold'>
						<img
							src='https://raw.githubusercontent.com/solidsnk86/portfolio-mgc-2024/master/public/solidsnk86.png'
							className='w-10 h-10 text-header-shadow'
						/>
					</Link>
				</div>
				{/* Desktop Navigation */}
				<nav className='hidden md:flex space-x-4'>
					{navigation.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className='hover:text-blue-400 transition-colors'
						>
							{item.name}
						</Link>
					))}
				</nav>
				{/* Mobile Menu Button */}
				<button
					className='md:hidden text-white focus:outline-none'
					onClick={toggleMenu}
					aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
				>
					{isMenuOpen ? '' : <Menu2 size={25} className='burguer' />}
				</button>
				{/* Language and Share buttons */}
				<div className='hidden md:flex items-center space-x-4'>
					<button
						onClick={share}
						className='hover:text-blue-400 transition-colors flex items-center'
					>
						<ShareIcon size={18} className='mr-1' />
						<span>{t('share')}</span>
					</button>
					<div className='relative group'>
						<button className='hover:text-blue-400 transition-colors flex items-center'>
							<Language size={20} className='mr-1' />
							<span>{t('lang')}</span>
						</button>
						<div className='absolute right-0 w-48 bg-[#18181b] overflow-hidden border border-zinc-800 rounded-md shadow-lg hidden group-hover:block'>
							<button
								onClick={() => changeLanguage('en')}
								className='block px-4 py-2 text-sm text-gray-400 hover:bg-zinc-800/50 w-full text-left items-center'
							>
								<img
									src='/img/estados-unidos-flag.png'
									alt='English'
									className='w-5 h-5 inline-block mr-2'
								/>
								English
							</button>
							<button
								onClick={() => changeLanguage('es')}
								className='block px-4 py-2 text-sm text-gray-400 hover:bg-zinc-800/50 w-full text-left'
							>
								<img
									src='/img/espana-flag.png'
									alt='Español'
									className='w-5 h-5 inline-block mr-2'
								/>
								Español
							</button>
						</div>
					</div>
					<GithubStats repoName='portfolioWeb' />
				</div>
			</div>
			{/* Mobile Menu */}
			{isMenuOpen && (
				<div className='fixed top-0 inset-0 z-50'>
					<div className='container bg-[#18181b] h-screen mx-auto px-4 py-6 flex flex-col'>
						<div className='flex justify-end z-50'>
							<button
								className='text-white focus:outline-none'
								onClick={toggleMenu}
								aria-label='Close menu'
							>
								<X size={26} className='x' />
							</button>
						</div>
						<nav className='flex flex-col items-center justify-center flex-grow'>
							<Particles
								quantity={66}
								className='absolute w-screen h-screen justify-center mx-auto flex -z-0'
							/>
							{navigation.map((item) => (
								<Link
									key={item.href}
									href={item.href}
									className='text-2xl py-4 hover:text-blue-400 transition-colors z-50'
									onClick={toggleMenu}
								>
									{item.name}
								</Link>
							))}
						</nav>
						<div className='flex flex-col items-center space-y-4 pb-12 footer-menu'>
							<button
								onClick={share}
								className='hover:text-blue-400 transition-colors flex items-center z-50'
							>
								<ShareIcon size={18} className='mr-2' />
								<span>{t('share')}</span>
							</button>
							<div className='flex space-x-4 z-50'>
								<button
									onClick={() => changeLanguage('en')}
									className='hover:text-blue-400 transition-colors flex items-center'
								>
									<img src='/img/estados-unidos-flag.png' alt='English' className='w-5 h-5 mr-2' />
									EN
								</button>
								<button
									onClick={() => changeLanguage('es')}
									className='hover:text-blue-400 transition-colors flex items-center'
								>
									<img src='/img/espana-flag.png' alt='Español' className='w-5 h-5 mr-2' />
									ES
								</button>
							</div>
							<GithubStats className='z-50' repoName='portfolioWeb' />
						</div>
					</div>
				</div>
			)}
		</header>
	)
}
