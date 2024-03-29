'use client'

import { ArrowRight, EyeIcon, Heart } from 'lucide-react'
import BlogForm from '@/components/BlogForm'
import { BlogHeader } from '@/components/BlogHeader'
import { Card } from '@/components/Card'
import FormatDate from '@/components/FormatDate'
import { Footer } from '@/components/Footer'
import Head from 'next/head'
import { Header } from '@/components/Header'
import ImageAvatar from './AvatarBlog'
import Link from 'next/link'
import { Preloader } from '@/components/Preloader'
import { ShareButton } from '@/components/ShareButton'
import { supabase } from '@/utils/supabase'
import sendViews from '@/components/SendViews'
import sendLike from '@/components/SendLikes'
import { v4 as uuidv4 } from 'uuid'
import { useState, useEffect } from 'react'
import PrivateRoute from '@/components/PrivateRoute'
import { BackButton } from '@/components/BackButton'

const MyBlog = ({ session }) => {
	const [posts, setPosts] = useState([])
	const [articleViews, setArticleViews] = useState({})
	const [likes, setLikes] = useState({})

	const userId = session?.user?.id || ''

	const [newPost, setNewPost] = useState({
		user_id: userId,
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

	const sendPost = async () => {
		try {
			const { data, error } = await supabase.from('posts').upsert([newPost])

			if (error) {
				console.error('Error sending post:', error)
			} else {
				console.log('Post sent successfully:', data)
				sendViews(newPost.article_id)
				setPosts((prevPosts) => [...prevPosts, { ...newPost, user_id: userId }])
			}
		} catch (error) {
			console.error('Error sending post:', error)
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
		<main className='text-slate-100 bg-gradient-to-tl from-zinc-900/0 h-[100%]'>
			<Preloader />
			<Head>
				<meta name='theme-color' content='#48484C' />
			</Head>
			<header id='header' className='relative w-full mb-10 z-[99999]'>
				<Header />
			</header>
			<BackButton />
			<BlogHeader />
			{posts.map((post) => (
				<div key={post.article_id} className='xl:w-1/2 justify-center mx-auto pt-[33px] px-3'>
					<Card>
						<article className='p-6 space-y-6 relative'>
							<header>
								<span className='text-zinc-400 text-sm'>{FormatDate(post.posted)}</span>
								<span className='text-zinc-400 absolute top-[27px] right-5 text-sm'>
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
									className='read-more absolute right-2 bottom-[25px] xl:right-10 xl:bottom-[26px] flex hover:underline'
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
			{/* eslint-disable-next-line multiline-ternary */}
			{userId === null ? (
				<PrivateRoute>
					<BlogForm newPost={newPost} setNewPost={setNewPost} sendPost={sendPost} />
				</PrivateRoute>
			) : (
				<BlogForm newPost={newPost} setNewPost={setNewPost} sendPost={sendPost} />
			)}
			<Footer />
		</main>
	)
}

export default MyBlog
