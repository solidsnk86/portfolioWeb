import Link from 'next/link'
import { useState, useEffect } from 'react'
import ImageAvatar from './AvatarBlog'
import { ArrowLeft, ArrowRight, EyeIcon } from 'lucide-react'
import Head from 'next/head'
import { Card } from '@/components/Card'
import { MT } from '@/components/MeteorLanguages'
import { Footer } from '@/components/Footer'
import { createClient } from '@supabase/supabase-js'
import { BlogHeader } from '@/components/BlogHeader'
import BlogForm from '@/components/BlogForm'

const supabase = createClient(
	'https://wbywikatpjrneagwppxf.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndieXdpa2F0cGpybmVhZ3dwcHhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk4Mzg5MzAsImV4cCI6MjAxNTQxNDkzMH0.nv6KxxPZBSiROB3-bak4LGAud2ex-wCDvyykMrYDCZQ'
)

const formatDate = (dateString) => {
	const formattedDate = new Date(dateString).toLocaleDateString('es-ES', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: '2-digit'
	})
	return formattedDate
}

const MyBlog = () => {
	const [articleViews, setArticleViews] = useState({})
	const [posts, setPosts] = useState([])
	const [newPost, setNewPost] = useState({
		user: '',
		name: '',
		company_dev: 'NeoTecs',
		title: '',
		description: '',
		url: '',
		posted: new Date().toISOString(),
		articleId: Date.now()
	})

	useEffect(() => {
		const fetchArticleViews = async () => {
			try {
				const { data, error } = await supabase.from('views').select()

				if (error) {
					console.error('Error fetching article views:', error)
				} else {
					const viewsData = data.reduce((acc, view) => {
						acc[parseInt(view.article_id, 10)] = view.id
						return acc
					}, {})

					setArticleViews(viewsData)
				}
			} catch (error) {
				console.error('Error fetching article views:', error)
			}
		}

		const fetchPosts = async () => {
			try {
				const { data, error } = await supabase.from('posts').select()

				if (error) {
					console.error('Error fetching posts:', error)
				} else {
					setPosts(data)
				}
			} catch (error) {
				console.error('Error fetching posts:', error)
			}
		}

		fetchArticleViews()
		fetchPosts()
	}, [])

	const sendViews = async (articleId) => {
		try {
			const { data, error } = await supabase.from('views').upsert([{ article_id: articleId }])

			if (error) {
				console.error('Error sending views:', error)
			} else {
				console.log('Views sent successfully:', data)
			}
		} catch (error) {
			console.error('Error sending views:', error)
		}
	}

	const sendPost = async () => {
		try {
			const { data, error } = await supabase.from('posts').upsert([newPost])

			if (error) {
				console.error('Error sending post:', error)
			} else {
				console.log('Post sent successfully:', data)
				sendViews(newPost.articleId)
				setPosts([...posts, newPost])
			}
		} catch (error) {
			console.error('Error sending post:', error)
		}
	}

	const articleVisited = async (articleId) => {
		const newViews = (articleViews[articleId] || 0) + 1
		setArticleViews((prevViews) => {
			const updatedViews = { ...prevViews, [articleId]: newViews }
			console.log('Updated Views:', updatedViews)
			return updatedViews
		})
		sendViews(articleId)
	}

	return (
		<main className='text-slate-100 bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0 h-[100%]'>
			<Head>
				<meta name='theme-color' content='#F05252' />
			</Head>
			<MT />
			<ArrowLeft
				className='flex relative xl:fixed left-[14px] top-[1.8rem] cursor-pointer text-zinc-300 hover:opacity-[.8]'
				onClick={() => window.open('/', '_self')}
			/>
			<BlogHeader />
			{posts.map((post) => (
				<div key={post.articleId} className='xl:w-1/2 justify-center mx-auto pt-20 px-3'>
					<Card>
						<article className='p-6 space-y-6 relative'>
							<header>
								<span className='text-zinc-400 text-sm'>{formatDate(post.posted)}</span>
								<span className='text-zinc-400 absolute top-[25px] right-5 text-sm'>
									<EyeIcon className='float-right mx-2 my-[2px] w-4 h-4' />
									{articleViews[post.articleId] || 0}
								</span>
								<h1 className='text-2xl font-semibold my-2'>{post.title}</h1>
								<p className='text-zinc-400 xl:line-clamp-none line-clamp-3'>{post.description}</p>
							</header>
							<aside className='flex space-x-3'>
								<ImageAvatar user={post.user} />
								<div
									className='flex-col cursor-pointer'
									onClick={() => window.open(post.url, '_blank')}
								>
									<span className='font-semibold'>{post.name}</span>
									<p className='font-light text-zinc-600 text-sm'>{post.companyDev}</p>
								</div>
								<Link
									href={post.url}
									onClick={() => articleVisited(post.articleId)}
									className='read-more absolute right-2 bottom-5 xl:right-10 xl:bottom-10 flex hover:underline'
								>
									Read More <ArrowRight className='mx-1 arrow' />
								</Link>
							</aside>
						</article>
					</Card>
				</div>
			))}
			<BlogForm newPost={newPost} setNewPost={setNewPost} sendPost={sendPost} />
			<Footer />
		</main>
	)
}

export default MyBlog
