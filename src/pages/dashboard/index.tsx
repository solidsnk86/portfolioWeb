import { Posts } from '@/components/Posts'
import PostSender from '@/pages/dashboard/components/PostSender'
import Head from 'next/head'
import { favicon } from '@/components/const'
import { Logout } from 'tabler-icons-react'

export default function Dashboard() {
	return (
		<>
			<Head>
				<title>SolidSnk86 - Dashboard</title>
				<link rel='shortcut icon' href={favicon} type='image/x-icon' />
			</Head>

			<div className='flex h-screen bg-[#1C1C1C] text-white'>
				{/* Sidebar */}
				<aside className='w-64 bg-[#1C1C1C] flex flex-col justify-between border-r-[1px] border-zinc-700'>
					<div>
						<div className='text-lg font-bold p-3 border-b border-zinc-700'>Dashboard</div>
						<nav className='p-1'>
							<ul>
								<li className='mb-4'>
									<a href='#' className='block p-2 rounded hover:bg-zinc-800/70 text-sm'>
										Create Posts
									</a>
								</li>
								<li>
									<a href='#' className='block p-2 rounded hover:bg-zinc-800/70 text-sm'>
										Edit Posts
									</a>
								</li>
							</ul>
						</nav>
					</div>
					<div>
						<nav className='p-1'>
							<ul>
								<li className='mb-4'>
									<a href='#' className='block p-2 rounded hover:bg-zinc-800/70 text-sm'>
										Preferences
									</a>
								</li>
								<li className='mb-4'>
									<a href='#' className='block p-2 rounded hover:bg-zinc-800/70 text-sm'>
										Access
									</a>
								</li>
								<li className='mb-4'>
									<a href='#' className='block p-2 rounded hover:bg-zinc-800/70 text-sm'>
										Security
									</a>
								</li>
								<li>
									<a href='#' className='block p-2 rounded hover:bg-zinc-800/70 text-sm'>
										<Logout className='inline w-4 mr-2' />
										Log out
									</a>
								</li>
							</ul>
						</nav>
					</div>
				</aside>

				{/* Main Content */}
				<main className='flex-1 overflow-y-auto'>
					<PostSender />
					<section className='p-4'>
						<h1 className='text-3xl font-bold text-zinc-300 text-center my-12'>Blog Posts</h1>
						<Posts edit={''} />
					</section>
				</main>
			</div>
		</>
	)
}
