/* eslint-disable multiline-ternary */
/* eslint-disable no-mixed-spaces-and-tabs */
import { supabase } from '../utils/supabase'
import { useState, useEffect } from 'react'
import FormatDate from './FormatDate'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import useMatchMedia from '@/hooks/useMatchMedia'
import { useIsClient } from '@/hooks/useIsClient'
import { ArrowUpRight, History, Location, Pencil, Trash } from 'tabler-icons-react'
import { detectIf } from '@/hooks/useIPIs'
import { Preloader } from './Preloader'

export function FetchPost({ edit }) {
	const [posts, setPosts] = useState([])
	const [editMode, setEditMode] = useState(null)
	const isClient = useIsClient()
	const mobile = useMatchMedia('(max-width: 700px)', false)
	const isI = detectIf()

	useEffect(() => {
		const fetchData = async () => {
			const { data, error } = await supabase
				.from('posts')
				.select('*')
				.order('created_at', { ascending: false })

			if (error) {
				console.error('Data could not be fetched', error)
			} else if (data.length > 0) {
				setPosts(data)
			}
		}

		fetchData()
	}, [])

	const handleDelete = async (id) => {
		try {
			const { data: deletedData, error } = await supabase.from('posts').delete().match({ id })

			if (error) {
				throw error
			} else {
				console.log('Data delted OK', deletedData)
			}

			const { data: newData, error: newError } = await supabase
				.from('posts')
				.select('*')
				.order('created_at', { ascending: false })

			if (newError) {
				throw newError
			}

			setPosts(newData)
		} catch (error) {
			console.error('Error deleting item:', error.message)
		}
	}

	const handleEdit = (id) => {
		setEditMode(id)
	}

	const handleUpdate = async (id) => {
		const article = document.getElementById(`article-${id}`)
		const updatedContent = {
			title: article.querySelector('.title').innerText,
			description: article.querySelector('.description').innerText,
			message: article.querySelector('.message').innerText
		}

		try {
			const { data, error } = await supabase.from('posts').update(updatedContent).match({ id })

			if (error) {
				throw new Error('Error updating post', error)
			} else {
				console.log('Data updated', data)
			}

			const { data: newData, error: newError } = await supabase
				.from('posts')
				.select('*')
				.order('created_at', { ascending: false })

			if (newError) {
				throw newError
			}
			setPosts(newData)
			setEditMode(null)
		} catch (error) {
			console.error('Error updating post', error.message)
		}
	}

	return (
		<>
			{isClient && (
				<ResponsiveMasonry columnsCountBreakPoints={{ 750: 2, 800: 3, 900: 4, 1200: 5 }}>
					<Masonry gutter={mobile ? '0.2rem' : '0.5rem'}>
						{posts.length > 0 ? (
							posts.map((post) => (
								<div key={post.id}>
									<article
										id={`article-${post.id}`}
										className='bg-gray-100 border border-gray-300 p-5 rounded-lg shadow-lg text-gray-800 hover:opacity-90 transition-colors relative'
										contentEditable={editMode === post.id}
									>
										<Pencil
											onClick={() => handleEdit(post.id)}
											className={`w-4 ${edit} absolute top-1 left-3 hover:scale-125 cursor-pointer`}
										/>
										<Trash
											className={`w-4 ${edit} absolute top-1 right-3 hover:scale-125 cursor-pointer`}
											onClick={(e) => {
												e.preventDefault()
												handleDelete(post.id)
											}}
										/>
										<header className='mb-3 text-xs md:text-sm'>
											<h2 className='title text-xl font-bold'>{post.title}</h2>
											<small className='mt-1 text-gray-500 flex md:items-center'>
												<History className='inline w-[14px] h-[14px] mr-[2px] mt-[2px] md:mt-0' />
												Publicado {FormatDate(post.created_at)}
											</small>
										</header>
										<div className='mb-3'>
											<p className='description text-sm text-zinc-600 font-semibold bg-slate-300/50 w-fit px-1 rounded-full border border-zinc-300'>
												{post.description}
											</p>
										</div>
										<div className='mb-4'>
											<p className='message text-sm text-gray-600'>{post.message}</p>
										</div>
										<a
											className='text-sm flex justify-end hover:text-sky-500 text-gray-600'
											href={post.url}
										>
											Ver más
											<ArrowUpRight className='inline w-3 -translate-y-[1px]' />
										</a>
										<footer className='grid justify-between items-center text-xs md:text-sm text-gray-500'>
											{isI ? (
												<div className='flex items-center'>
													<img
														className='rounded-full w-8 h-8 mr-2'
														src='https://avatars.githubusercontent.com/u/93176365?s=400&u=256e212b81ba355aa6d1bda5b4f9882ed53474ea&v=4'
													/>
													solidSnk86
												</div>
											) : (
												<span>{post.ip}</span>
											)}
											<small className='flex md:items-center mt-2'>
												<Location className='inline w-[14px] h-[14px] mr-[1px] mt-[2px] md:mt-0' />
												{post.city}, {post.country} {post.flag}
											</small>
										</footer>
									</article>
									{editMode === post.id && (
										<button
											className='mt-2 p-2 bg-blue-500 text-white rounded'
											onClick={() => handleUpdate(post.id)}
										>
											Guardar
										</button>
									)}
								</div>
							))
						) : (
							<Preloader />
						)}
					</Masonry>
				</ResponsiveMasonry>
			)}
		</>
	)
}
/* eslint-enable multiline-ternary */
/* eslint-enable no-mixed-spaces-and-tabs */
