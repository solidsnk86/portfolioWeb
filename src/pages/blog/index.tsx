import { Posts } from '@/components/Posts'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import Head from 'next/head'

function Blog() {
	return (
		<>
			<Head>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
				/>
				<title>Blog - SolidSnk86</title>
			</Head>
			<Header />
			<main className='m-4 bg-[#18181b]'>
				<h1 className='text-4xl font-bold text-center text-zinc-300 my-20'>Blog</h1>
				<Posts edit={'hidden'} />
				<Footer />
			</main>
		</>
	)
}

export default Blog
