import { FetchPost } from '@/components/FetchPosts'
import { Footer } from '@/components/Footer'
import { PostSender } from '@/components/PostSender'
import Head from 'next/head'

export default function Post() {
	return (
		<>
			<Head>
				<title>SolidSnk86 - Dashboard</title>
			</Head>
			<main className='m-4'>
				<PostSender />
				<FetchPost edit={'flex'} />
				<Footer />
			</main>
		</>
	)
}
