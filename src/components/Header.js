import { description } from './const'
import { GithubStats } from './GithubStats'
import { Language, Share } from 'tabler-icons-react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'

export function Header() {
	const { t, i18n } = useTranslation()
	const router = useRouter()

	const isPathBlog = router.asPath === '/blog'
	const isPathContact = router.asPath === '/contact'

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
		{
			name: router.asPath === '/' || router.asPath.includes('/#') ? null : t('navLink0'),
			href: '/'
		},
		{ name: isPathContact ? null : t('navLink1'), href: '/contact' },
		{ name: isPathContact || isPathBlog ? null : t('navLink2'), href: '#proyectos' },
		{ name: isPathBlog ? null : t('Blog'), href: '/blog' }
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

	return (
		<div className='relative w-full h-14 p-2 flex text-white !bg-cover !bg-center'>
			<div className='relative z-10 flex items-center justify-center'>
				<div className='w-full flex gap-3 md:gap-6 items-center md:justify-center text-sm md:text-base !justify-center'>
					<ul className='flex'>
						{navigation.map((item) => (
							<li
								key={item.href}
								className='font-semibold text-[#E0F2FE] mr-5 cursor-pointer hover:text-[#928BF9] transition-all item'
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
				<button
					onClick={share}
					className='font-semibold text-sm md:text-base mt-[2px] hover:text-[#928BF9]'
				>
					<span
						className={
							'px-[3px] pt-[2px] hidden sm:block duration-100 font-semibold xl:text-sm text-xs'
						}
						title={t('share')}
					>
						<Share className='inline w-[23px] mr-1' />
						{t('share')}
					</span>
					<span
						className={'px-[3px] pt-[2px] sm:hidden font-semibold xl:text-sm text-xs'}
						title={t('share')}
					>
						<Share className='inline w-[20px] xl:w-[23px] mr-1 xl:text-sm text-xs' />
					</span>
				</button>
				<div className='px-4 pt-[1px] language-button' title={t('language')}>
					<button className='font-semibold text-sm md:text-base mt-[2px] hover:text-[#928BF9]'>
						<span
							className={
								'px-[3px] pt-[2px] hidden sm:block duration-100 font-semibold xl:text-sm text-xs'
							}
							title={t('lang')}
						>
							<Language className='inline w-[23px]' />
							{t('lang')}
						</span>
						<span
							className={'px-[3px] pt-[2px] sm:hidden font-semibold xl:text-sm text-xs'}
							title={t('lang')}
						>
							<Language className='inline w-[20px] xl:w-[23px] xl:text-sm text-xs' />
						</span>
					</button>
					<div className='flex dropdown-content p-3'>
						<button id='top' onClick={() => changeLanguage('en')} className='hover:scale-[1.2]'>
							<img className='inline' src='/img/estados-unidos-flag.png' width={30} alt='English' />{' '}
							EN
						</button>
						<button id='bottom' onClick={() => changeLanguage('es')} className='hover:scale-[1.2]'>
							<img className='inline' src='/img/espana-flag.png' width={30} alt='Español' /> ES
						</button>
					</div>
				</div>
				<li className='mt-[1px]'>
					<GithubStats repoName='portfolioWeb' />
				</li>
			</ul>
		</div>
	)
}
