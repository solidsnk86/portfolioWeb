import { BackButton } from '@/components/BackButton'
import { FetchPost } from '@/components/FetchPosts'
import { Footer } from '@/components/Footer'
import Visit from '@/components/Visits'
import Head from 'next/head'

function Blog() {
	return (
		<>
			<Head>
				<title>Blog - SolidSnk86</title>
			</Head>
			<BackButton className='m-3 static' />
			<main className='m-4 bg-[#18181b]'>
				<h1 className='text-4xl font-bold text-center text-zinc-300 my-20'>Blog</h1>
				<article className=' h-screen'>
					<FetchPost />
				</article>
				<Footer />
				<Visit className='mt-10' />
			</main>
		</>
	)
}

export default Blog
