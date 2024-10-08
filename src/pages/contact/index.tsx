import { Card } from '@/components/Card'
import Head from 'next/head'
import { Footer } from '@/components/Footer'
import ContactForm from '@/components/Form'
import { favicon, socials } from '@/components/const'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { Header } from '@/components/Header'

export default function Contact() {
	const { t } = useTranslation()
	return (
		<>
			<Head>
				<title>{t('contact')}</title>
				<link rel='shortcut icon' href={favicon} type='image/x-icon' />
			</Head>
			<Header />
			<div className='bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0'>
				<div className='container flex items-center justify-center px-6 mx-auto pt-14 xl:pt-0'>
					<div className='grid w-full grid-cols-1 gap-8 mx-auto mb-5 mt-0 xl:mt-32 sm:grid-cols-3 lg:gap-16'>
						{socials.map((s, index) => (
							<Card key={index}>
								<Link
									href={s.href}
									target='_blank'
									title={s.title + s.handle}
									className='p-4 relative flex flex-col items-center gap-4 duration-700 group md:gap-8 md:py-24  lg:pb-48  md:p-16'
								>
									<span
										className='absolute w-px h-2/3 bg-gradient-to-b from-zinc-500 via-zinc-500/50 to-transparent'
										aria-hidden='true'
									/>
									<span className='relative z-10 flex items-center justify-center w-12 h-12 text-sm duration-1000 border rounded-full text-zinc-200 group-hover:text-white group-hover:bg-zinc-900 border-zinc-600 bg-zinc-900 group-hover:border-zinc-500'>
										{s.icon}
									</span>
									<div className='z-10 flex flex-col items-center'>
										<span className='text-sm font-medium duration-150 lg:text-2xl text-zinc-200 group-hover:text-white'>
											{s.handle}
										</span>
										<span className='mt-4 text-sm text-center duration-1000 text-zinc-400 group-hover:text-zinc-200'>
											{s.label}
										</span>
									</div>
								</Link>
							</Card>
						))}
					</div>
				</div>
				<ContactForm />
				<Footer className='' />
			</div>
		</>
	)
}
