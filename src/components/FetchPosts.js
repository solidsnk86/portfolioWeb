/* eslint-disable multiline-ternary */
import { supabase } from '../utils/supabase'
import { useState, useEffect } from 'react'
import FormatDate from './FormatDate'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import useMatchMedia from '@/hooks/useMatchMedia'
import { useIsClient } from '@/hooks/useIsClient'

export function FetchPost() {
	const [data, setData] = useState([])
	const isClient = useIsClient()
	const mobile = useMatchMedia('(max-width: 400px)', false)

	useEffect(() => {
		const fetchData = async () => {
			const { data, error } = await supabase
				.from('posts')
				.select('*')
				.order('created_at', { ascending: false })

			if (error) {
				console.error('Data could not be fetched', error)
			} else if (data.length > 0) {
				setData(data)
			}
		}

		fetchData()
	}, [])

	return (
		<>
			{isClient && (
				<ResponsiveMasonry columnsCountBreakPoints={{ 750: 2, 800: 3, 900: 4, 1200: 5 }}>
					<Masonry gutter={mobile ? '0.2rem' : '0.3rem'}>
						{data.length > 0 ? (
							data.map((d) => (
								<article
									key={d.id}
									className='bg-zinc-900 border border-zinc-700 p-6 rounded-xl shadow-xl text-zinc-300'
								>
									<header className='flex justify-between items-center mb-3'>
										<small className='text-xs text-zinc-500'>Post número {d.id}</small>
										<small className='text-xs text-zinc-500'>{FormatDate(d.created_at)}</small>
									</header>
									<div className='space-y-3'>
										<p className='text-base md:text-lg font-bold text-zinc-200'>{d.title}</p>
										<p className='text-sm md:text-base text-zinc-400'>{d.description}</p>
										<p className='text-base md:text-lg'>{d.message}</p>
									</div>
									<footer className='mt-4 text-xs text-zinc-500 grid'>
										<span>Post enviado desde: {d.city}</span>
										<span>IP: {d.ip}</span>
									</footer>
								</article>
							))
						) : (
							<p className='bg-red-400 p-2 rounded-lg text-white w-fit mx-auto'>No posts found</p>
						)}
					</Masonry>
				</ResponsiveMasonry>
			)}
		</>
	)
}
/* eslint-enable multiline-ternary */
