import { Footer } from '@/components/Footer'
import { PostSender } from '@/components/PostSender'
import Head from 'next/head'

export default function Post() {
	return (
		<>
			<Head>
				<title>Send Post</title>
			</Head>
			<main className='m-4'>
				<PostSender />
				<Footer />
			</main>
		</>
	)
}
