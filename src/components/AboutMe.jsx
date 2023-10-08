import React from 'react'
import Link from 'next/link'
import { Logo } from './Logo'

export function AboutMe() {
	const CardTitle = ({ Tag = 'p', children }) => {
		return <Tag className='text-sm from-zinc-300 text-center my-20 italic font-thin'>{children}</Tag>
	}

	return (
		<>
			<nav className='text-white flex list-none relative justify-center m-auto'>
				<div className='img-container inline-flex'>
					<aside className='flex-col relative top-11 mx-3'>
						<div className='mt-12'>
							<div className='relative block'>
								<Logo className='w-[500px]' />
							</div>
						</div>
						<CardTitle>
							Hola mi nombre es Gabriel, soy desarrollador Front End con 1 año de experiencia, uso
							tecnolgías como React y NextJS, trabajo en mi proyecto
							<Link
								className='mx-1 duration-500 hover:text-orange-400 underline'
								href='https://neotecs.netlify.app/'
							>
								Neotecs
							</Link>
							en las noches. Actualmente estudiando!
						</CardTitle>
					</aside>
				</div>
			</nav>
		</>
	)
}
