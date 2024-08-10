import { description } from './const'
import { GithubStats } from './GithubStats'
import { Language, Menu2, X } from 'tabler-icons-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { ShareIcon } from 'lucide-react'
import { useRouter } from 'next/router'

export function Header() {
	const { t, i18n } = useTranslation()
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const router = useRouter()

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
		{ name: t('navLink2'), href: '#proyectos' },
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
		<header className='relative w-full bg-stone-600/10 backdrop-blur-md text-white z-50 h-16'>
			<div className='container mx-auto px-4 py-4 flex justify-between items-center'>
				<div className='flex items-center'>
					<Link href='/' className='text-xl font-bold'>
						solidSnk86
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
					{isMenuOpen ? '' : <Menu2 size={24} />}
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
						<div className='absolute right-0 w-48 bg-white rounded-md shadow-lg hidden group-hover:block'>
							<button
								onClick={() => changeLanguage('en')}
								className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md w-full text-left'
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
								className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md w-full text-left'
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
				<div className='fixed inset-0 bg-gray-900/10 backdrop-blur-md z-50'>
					<div className='container bg-[#18181b] h-screen mx-auto px-4 py-6 flex flex-col'>
						<div className='flex justify-end'>
							<button
								className='text-white focus:outline-none'
								onClick={toggleMenu}
								aria-label='Close menu'
							>
								<X size={24} />
							</button>
						</div>
						<nav className='flex flex-col items-center justify-center flex-grow'>
							{navigation.map((item) => (
								<Link
									key={item.href}
									href={item.href}
									className='text-2xl py-4 hover:text-blue-400 transition-colors'
									onClick={toggleMenu}
								>
									{item.name}
								</Link>
							))}
						</nav>
						<div className='flex flex-col items-center space-y-4 pb-8'>
							<button
								onClick={share}
								className='hover:text-blue-400 transition-colors flex items-center'
							>
								<ShareIcon size={18} className='mr-2' />
								<span>{t('share')}</span>
							</button>
							<div className='flex space-x-4'>
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
							<GithubStats repoName='portfolioWeb' />
						</div>
					</div>
				</div>
			)}
		</header>
	)
}
