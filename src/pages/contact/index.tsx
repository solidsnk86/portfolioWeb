import { Github, Mail, ArrowLeft } from 'lucide-react'
import Head from 'next/head'
import Link from 'next/link'
import { renderToString } from 'react-dom/server'
import { Card } from '@/components/Card'
import { TwitterIcon } from '@/components/TwitterIcon'

const twitter2String = renderToString(<TwitterIcon />)

const socials = [
	{
		icon: <TwitterIcon />,
		href: 'https://twitter.com/CalcagniGabriel',
		label: 'Twitter',
		handle: '@CalcagniGabriel'
	},
	{
		icon: <Mail size={24} />,
		href: 'mailto:calcagni.gabriel86@gmailcom',
		label: 'Mail',
		handle: 'calcagni.gabriel86@gmail.com'
	},
	{
		icon: <Github size={24} />,
		href: 'https://github.com/solidsnk86',
		label: 'Github',
		handle: 'solidsnk86'
	}
]

const handleButtonBack = () => {
	window.open('/', '_self')
}

export default function Example() {
	return (
		<>
		<Head>
		   <meta name='theme-color' content='#FDBA8C' />
		</Head>
			<div className='bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0'>
				<ArrowLeft className='flex sticky left-[14px] top-[1.8rem] cursor-pointer text-zinc-300 hover:opacity-[.8]' onClick={handleButtonBack} />
				<div className='container flex items-center min-h-screen justify-center px-4 mx-auto'>
					<div className='grid w-full grid-cols-1 gap-8 mx-auto mb-5 mt-0 xl:mt-32 sm:grid-cols-3 lg:gap-16'>
						{socials.map((s) => (
							<Card key={s.label}>
								<Link
									href={s.href}
									target='_blank'
									className='p-4 relative flex flex-col items-center gap-4 duration-700 group md:gap-8 md:py-24  lg:pb-48  md:p-16'
								>
									<span
										className='absolute w-px h-2/3 bg-gradient-to-b from-zinc-500 via-zinc-500/50 to-transparent'
										aria-hidden='true'
									/>
									<span className='relative z-10 flex items-center justify-center w-12 h-12 text-sm duration-1000 border rounded-full text-zinc-200 group-hover:text-white group-hover:bg-zinc-900 border-zinc-500 bg-zinc-900 group-hover:border-zinc-200 drop-shadow-orange'>
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
			</div>
		</>
	)
}
