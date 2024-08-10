import { Logo } from './Logo'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { useIP } from './GetIP'
import TypingEffect from './TypoEffect.ts'

export function AboutMe() {
	const { t } = useTranslation()
	const data = useIP()
	const country = data.country?.flag
	const city = data.city?.name

	const CardTitle = ({ Tag = 'p', children }) => {
		return (
			<Tag className='text-xs text-pritty justify-center mx-auto md:text-md xl:text-lg from-zinc-300 text-center my-20 italic font-thin'>
				{children}
			</Tag>
		)
	}

	return (
		<section className='relative text-white flex list-none justify-center'>
			<div className='block mt-24 xl:mt-10'>
				<div>
					<div className='relative flex'>
						<Logo className='w-[500px]' />
					</div>
				</div>
				<aside className='flex-col relative top-10 mx-3'>
					<CardTitle>
						{city && (
							<TypingEffect typingSpeed={60}>{`${t(
								'welcome'
							)} ${city} ${country} ツ`}</TypingEffect>
						)}
						<br />
						{t('aboutMe')}
						<Link
							className='mx-1 duration-500 text-zinc-50 underline link-shadow'
							href='https://neotecs.vercel.app/'
						>
							NeoTecs
						</Link>
						{t('aboutMeLast')}
					</CardTitle>
				</aside>
			</div>
		</section>
	)
}
