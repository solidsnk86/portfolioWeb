import { BackButton } from '@/components/BackButton'
import { BackgroundFlares } from '@/components/BackgroundFlares'
import { Card } from '@/components/Card'
import { Footer } from '@/components/Footer'
import ContactForm from '@/components/Form'
import { socials } from '@/components/const'
import Link from 'next/link'

export default function Contact() {
	return (
		<>
			<BackgroundFlares />
			<BackButton className=' md:fixed relative' />
			<div className='bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0'>
				<div className='container flex items-center min-h-screen justify-center px-6 mx-auto'>
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
									<span className='relative z-10 flex items-center justify-center w-12 h-12 text-sm duration-1000 border rounded-full text-zinc-200 group-hover:text-white group-hover:bg-zinc-900 border-zinc-500 bg-zinc-900 group-hover:border-zinc-200'>
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
				<Footer />
			</div>
		</>
	)
}
