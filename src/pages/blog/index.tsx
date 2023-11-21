import Link from 'next/link'
import { useState, useEffect } from 'react'
import ImageAvatar from './AvatarBlog'
import { ArrowLeft, ArrowRight, EyeIcon, Heart } from 'lucide-react'
import Head from 'next/head'
import { Card } from '@/components/Card'
import { Footer } from '@/components/Footer'
import { supabase } from '@/utils/supabase'
import { BlogHeader } from '@/components/BlogHeader'
import BlogForm from '@/components/BlogForm'
import { v4 as uuidv4 } from 'uuid'
import { ShareButton } from '@/components/ShareButton'
import { Preloader } from '@/lib/Preloader'
import { FormatDate } from '@/components/FormatDate'

const MyBlog = () => {
	const [articleViews, setArticleViews] = useState({})
	const [posts, setPosts] = useState([])
	const [likes, setLikes] = useState({})
	const [newPost, setNewPost] = useState({
		user_id: '',
		name: '',
		company_dev: '',
		title: '',
		description: '',
		url: '',
		posted: new Date().toISOString(),
		article_id: uuidv4()
	})

	useEffect(() => {
		const fetchArticleViews = async () => {
			try {
				const { data, error } = await supabase.from('views').select()

				if (error) {
					console.error('Error fetching article views:', error)
				} else {
					const viewsData = data.reduce((acc, view) => {
						if (!acc[view.article_id]) {
							acc[view.article_id] = 0
						}
						acc[view.article_id]++
						return acc
					}, {})

					setArticleViews(viewsData)
				}
			} catch (error) {
				console.error('Error fetching article views:', error)
			}
		}

		const fetchLikes = async () => {
			try {
				const { data, error } = await supabase.from('likes').select('post_id, user_id')

				if (error) {
					console.error('Error fetching likes:', error)
				} else {
					const likesData = data.reduce((acc, like) => {
						if (!acc[like.post_id]) {
							acc[like.post_id] = []
						}
						acc[like.post_id].push(like.user_id)
						return acc
					}, {})

					setLikes(likesData)
				}
			} catch (error) {
				console.error('Error fetching likes:', error)
			}
		}

		const fetchPosts = async () => {
			try {
				const { data, error } = await supabase
					.from('posts')
					.select('article_id, user_id, name, company_dev, title, description, url, posted')
					.order('posted', { ascending: false })

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
		fetchLikes()
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
				sendViews(newPost.article_id)
				setPosts([...posts, newPost])
			}
		} catch (error) {
			console.error('Error sending post:', error)
		}
	}

	const sendLike = async (article_id) => {
		try {
			const { data: postExists, error: postExistsError } = await supabase
				.from('posts')
				.select('id')
				.eq('article_id', article_id)
				.single()

			if (postExistsError) {
				console.error('Error checking if post exists:', postExistsError)
				return
			}

			if (!postExists) {
				console.error('Post does not exist')
				return
			}

			const user_id = 'Neo'
			const { data, error } = await supabase
				.from('likes')
				.upsert([{ post_id: article_id, user_id }])

			if (error) {
				console.error('Error sending like:', error)
			} else {
				console.log('Like sent successfully:', data)
			}
		} catch (error) {
			console.error('Error sending like:', error)
		}
	}

	const handleLike = async (post_id) => {
		try {
			await sendLike(post_id)

			setLikes((prevLikes) => {
				const existingLikes = prevLikes[post_id] || []
				const updatedLikes = {
					...prevLikes,
					[post_id]: [...existingLikes, '']
				}
				console.log('Updated Likes:', updatedLikes)
				return updatedLikes
			})
		} catch (error) {
			console.error('Error handling like:', error)
		}
	}

	const articleVisited = async (article_id) => {
		setArticleViews((prevViews) => {
			const newViews = (prevViews[article_id] || 0) + 1
			const updatedViews = { ...prevViews, [article_id]: newViews }
			console.log('Updated Views:', updatedViews)
			return updatedViews
		})

		sendViews(article_id)
	}

	return (
		<main className='text-slate-100 bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0 h-[100%]'>
			<Preloader />
			<Head>
				<meta name='theme-color' content='#F05252' />
			</Head>
			<ArrowLeft
				className='flex relative xl:fixed left-[14px] top-[1.6rem] cursor-pointer text-zinc-300 hover:opacity-[.8]'
				onClick={() => window.open('/', '_self')}
			/>
			<BlogHeader />
			{posts.map((post) => (
				<div key={post.article_id} className='xl:w-1/2 justify-center mx-auto pt-[33px] px-3'>
					<Card>
						<article className='p-6 space-y-6 relative'>
							<header>
								<FormatDate post={post} />
								<span className='text-zinc-400 absolute top-[25px] right-5 text-sm'>
									<EyeIcon className='float-right mx-2 my-[2px] w-4 h-4' />
									{articleViews[post.article_id] || 0}
								</span>
								<h1 className='text-2xl font-semibold my-2'>{post.title}</h1>
								<p className='text-zinc-400 xl:line-clamp-none line-clamp-3'>{post.description}</p>
							</header>
							<aside className='flex space-x-3'>
								<ImageAvatar user={post.user_id} />
								<div
									className='flex-col cursor-pointer'
									onClick={() => window.open(post.url, '_blank')}
								>
									<span className='font-semibold'>{post.name}</span>
									<p className='font-light text-zinc-600 text-sm'>{post.company_dev}</p>
								</div>
								<Link
									href={post.url}
									onClick={() => articleVisited(post.article_id)}
									className='read-more absolute right-2 bottom-5 xl:right-10 xl:bottom-[26px] flex hover:underline'
								>
									Read More <ArrowRight className='mx-1 arrow' />
								</Link>
							</aside>
							<button onClick={() => handleLike(post.article_id)}>
								<Heart className='inline mx-2 hover:fill-red-500 transition-all' />
								{likes[post.article_id] ? likes[post.article_id].length : 0}
							</button>
							<button>
								<ShareButton
									postTitle={post.title}
									postDescription={post.description}
									postUrl={post.url}
								/>
							</button>
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
