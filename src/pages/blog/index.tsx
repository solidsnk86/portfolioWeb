import Posts from '@/pages/dashboard/components/Posts'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import Head from 'next/head'
import { favicon } from '@/components/const'

function Blog() {
	return (
		<>
			<Head>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
				/>
				<link rel='shortcut icon' href={favicon} type='image/x-icon' />
				<title>Blog</title>
			</Head>
			<Header />
			<main className='m-10 bg-[#18181b]'>
				<h1 className='text-4xl font-bold text-center text-zinc-300 my-20'>Blog</h1>
				<Posts edit='hidden' className='aspect-square' />
				<Footer className='' />
			</main>
		</>
	)
}

export default Blog
