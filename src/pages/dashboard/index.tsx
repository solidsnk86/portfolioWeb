import { Posts } from '@/components/Posts'
import { Footer } from '@/components/Footer'
import { PostSender } from '@/components/PostSender'
import Head from 'next/head'
import { favicon } from '@/components/const'

export default function Post() {
	return (
		<>
			<Head>
				<title>SolidSnk86 - Dashboard</title>
				<link rel='shortcut icon' href={favicon} type='image/x-icon' />
			</Head>
			<main className='m-4'>
				<PostSender />
				<Posts edit={'flex'} />
				<Footer />
			</main>
		</>
	)
}
