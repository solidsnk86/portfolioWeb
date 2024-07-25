/* eslint-disable multiline-ternary */
import { supabase } from '@/utils/supabase'
import { useState, useEffect } from 'react'
import FormatDate from '@/components/FormatDate'
import FormaPostsDate from '@/pages/dashboard/components/FormatPostsDate'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import useMatchMedia from '@/hooks/useMatchMedia'
import { useIsClient } from '@/hooks/useIsClient'
import {
	ChevronRight,
	DeviceFloppy,
	DotsVertical,
	Eye,
	History,
	MapPin,
	Pencil,
	Trash
} from 'tabler-icons-react'
import { Preloader } from '../../../components/Preloader'

export default function Posts({ edit }) {
	const [posts, setPosts] = useState([])
	const [editMode, setEditMode] = useState(null)
	const [activeMenu, setActiveMenu] = useState(null)
	const isClient = useIsClient()
	const mobile = useMatchMedia('(max-width: 700px)', false)

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
				console.log('Data deleted OK', deletedData)
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

	const toggleMenu = (id) => {
		setActiveMenu(activeMenu === id ? null : id)
	}

	async function countViews(id) {
		try {
			let { data: post, error } = await supabase.from('posts').select('views').eq('id', id).single()

			if (error) {
				throw new Error('Error fetching post views', error)
			}

			const currentViews = post.views || 0

			const { data, error: updateError } = await supabase
				.from('posts')
				.update({ views: currentViews + 1 })
				.eq('id', id)

			if (updateError) {
				throw new Error('Error updating post views', updateError)
			} else {
				console.log('View count updated', data)
			}
		} catch (error) {
			console.error('Error counting views:', error.message)
		}
	}

	return (
		<>
			{isClient && (
				<ResponsiveMasonry columnsCountBreakPoints={{ 400: 1, 700: 3, 900: 4, 1200: 4, 1600: 5 }}>
					<Masonry gutter={mobile ? '0.2rem' : '0.5rem'}>
						{posts.length > 0 ? (
							posts.map((post) => (
								<div key={post.id}>
									<article
										id={`article-${post.id}`}
										className='bg-gray-100 border border-gray-300 p-5 rounded-lg shadow-lg text-gray-800 hover:opacity-90 transition-colors relative w-full'
										contentEditable={editMode === post.id}
									>
										<DotsVertical
											onClick={() => toggleMenu(post.id)}
											className={`${edit} w-5 h-5 absolute right-1 top-1 cursor-pointer hover:bg-slate-300/50 rounded-full`}
										/>
										<div
											id='menu-edit'
											className={`${
												activeMenu === post.id ? 'block' : 'hidden'
											} absolute flex right-6 top-0 w-fit p-1 rounded-lg gap-3 bg-gray-100 border border-gray-300`}
										>
											<small title={`Editar post id: ${post.id}`}>
												<Pencil
													onClick={() => handleEdit(post.id)}
													className={`w-4 ${edit} hover:scale-125 cursor-pointer`}
												/>
											</small>
											<small title={`Borrar post: ${post.title}`}>
												<Trash
													className={`w-4 ${edit} hover:scale-125 cursor-pointer`}
													onClick={(e) => {
														e.preventDefault()
														handleDelete(post.id)
													}}
												/>
											</small>
										</div>
										<header className='mb-3 text-xs md:text-sm'>
											<h2 className='title text-xl font-bold'>{post.title}</h2>
											<small className='mt-1 text-gray-500 flex md:items-center'>
												<History className='inline w-3 h-3 mr-[2px] mt-[2px] md:mt-0' />
												Publicado ·
												<span
													className='ml-1 hover:underline cursor-default'
													title={FormatDate(post.created_at)}
												>
													{FormaPostsDate(post.created_at)}
												</span>
											</small>
											<small className='flex text-gray-500 items-center'>
												<MapPin className='inline w-3 h-3 mr-[2px]' />
												{post.city}, {post.country} {post.flag}
											</small>
											{post.views <= 0 ? (
												<small className='text-gray-500 text-xs items-center flex'>
													<Eye className='inline w-3 h-3 mr-[2px]' />
													Vistas {0}
												</small>
											) : (
												<small className='text-gray-500 text-xs items-center flex'>
													<Eye className='inline w-3 h-3 mr-[2px]' />
													Vistas {post.views}
												</small>
											)}
										</header>
										<div className='mb-3'>
											<p className='description text-sm text-zinc-600 font-semibold bg-slate-300/50 w-fit px-1 rounded-full border border-zinc-300'>
												{post.description}
											</p>
										</div>
										<div className='mb-4'>
											<p className='message text-sm text-gray-600'>{post.message}</p>
										</div>

										<footer className='grid justify-between items-center text-xs md:text-sm text-gray-500'>
											<div className='flex items-center justify-between font-semibold text-xs text-gray-600'>
												<img
													className='rounded-full w-8 h-8 mr-1'
													src='https://avatars.githubusercontent.com/u/93176365?s=400&u=256e212b81ba355aa6d1bda5b4f9882ed53474ea&v=4'
												/>
												solidSnk86
											</div>
										</footer>
										<a
											className='text-sm w-fit absolute bottom-8 right-4 hover:text-sky-600 text-gray-600 translate-y-3 see-more'
											href={post.url}
											target='_blank'
											onClick={() => countViews(post.id)}
											title={`Ver ${post.title} en ${post.url}`}
										>
											Ver más
											<ChevronRight className='inline w-4 -translate-y-[1px] arrow-right' />
										</a>
									</article>
									{editMode === post.id && (
										<button
											className='mt-2 px-2 py-1 font-semibold bg-blue-500 text-white text-sm rounded-full hover:brightness-110'
											onClick={() => handleUpdate(post.id)}
										>
											<DeviceFloppy className='w-4 inline -translate-y-[1px]' /> Guardar
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
