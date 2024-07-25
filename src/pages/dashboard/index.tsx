/* eslint-disable multiline-ternary */
import Posts from '@/pages/dashboard/components/Posts'
import PostSender from '@/pages/dashboard/components/PostSender'
import Head from 'next/head'
import { favicon } from '@/components/const'
import { Logout } from 'tabler-icons-react'
import { useEffect, useState } from 'react'

export default function Dashboard() {
	const [mobile, setMobile] = useState(null)

	useEffect(() => {
		const media = window.matchMedia('(max-width: 700px)')
		const handleChange = () => setMobile(media.matches)
		handleChange()
		media.addEventListener('change', handleChange)

		return () => {
			media.removeEventListener('change', handleChange)
		}
	}, [])

	return (
		<>
			<Head>
				<title>Dashboard</title>
				<link rel='shortcut icon' href={favicon} type='image/x-icon' />
			</Head>

			{mobile ? (
				<main className='h-screen flex flex-col items-center justify-center'>
					<h2 className='text-zinc-300 text-xl font-bold'>This section is for desktop mode!</h2>
				</main>
			) : (
				<div className='flex h-screen bg-[#1C1C1C] text-white'>
					{/* Sidebar */}
					<aside className='w-64 bg-[#1C1C1C] flex flex-col justify-between border-r-[1px] border-zinc-700'>
						<div>
							<div className='text-lg font-bold p-3 border-b border-zinc-700'>Dashboard</div>
							<nav className='p-1'>
								<ul className='font-semibold'>
									<li className='mb-4'>
										<a href='#create' className='block p-2 rounded hover:bg-zinc-800/70 text-sm'>
											Crear Posts
										</a>
									</li>
									<li>
										<a href='#edit' className='block p-2 rounded hover:bg-zinc-800/70 text-sm'>
											Editar Posts
										</a>
									</li>
								</ul>
							</nav>
						</div>
						<div>
							<nav className='p-1'>
								<ul className='font-semibold'>
									<li className='mb-4'>
										<a href='#' className='block p-2 rounded hover:bg-zinc-800/70 text-sm'>
											Preferencias
										</a>
									</li>
									<li className='mb-4'>
										<a href='#' className='block p-2 rounded hover:bg-zinc-800/70 text-sm'>
											Políticas
										</a>
									</li>
									<li className='mb-4'>
										<a href='#' className='block p-2 rounded hover:bg-zinc-800/70 text-sm'>
											Seguridad
										</a>
									</li>
									<li>
										<a href='#' className='block p-2 rounded hover:bg-zinc-800/70 text-sm'>
											<Logout className='inline w-4 mr-2' />
											Cerrar Sesión
										</a>
									</li>
								</ul>
							</nav>
						</div>
					</aside>

					{/* Main Content */}
					<main className='flex-1 overflow-y-auto'>
						<span id='create'></span>
						<PostSender />
						<section className='p-4'>
							<h1 className='text-3xl font-bold text-zinc-300 text-center my-12'>
								Edición del Post
							</h1>
							<span id='edit'></span>
							<Posts edit={''} />
						</section>
					</main>
				</div>
			)}
		</>
	)
}
/* eslint-enable multiline-ternary */
