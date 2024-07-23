import { Posts } from '@/components/Posts'
import { Footer } from '@/components/Footer'
import { PostSender } from '@/pages/dashboard/components/PostSender'
import Head from 'next/head'
import { favicon } from '@/components/const'
import { Header } from './components/HeaderDashboard'

export default function Post() {
	return (
		<>
			<Head>
				<title>SolidSnk86 - Dashboard</title>
				<link rel='shortcut icon' href={favicon} type='image/x-icon' />
			</Head>
			<Header
				className='bg-slate-300 border-b-[1px] border-zinc-500'
				h1='absolute top-2 left-4 font-bold text-blue-600'
			/>
			<main className='m-4 grid'>
				<PostSender />
				<Posts edit={'flex'} />
			</main>
			<Footer />
		</>
	)
}
