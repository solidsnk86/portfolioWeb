/* eslint-disable multiline-ternary */
import { supabase } from '../utils/supabase'
import { useState, useEffect } from 'react'
import FormatDate from './FormatDate'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import useMatchMedia from '@/hooks/useMatchMedia'
import { useIsClient } from '@/hooks/useIsClient'
import { History, Location } from 'tabler-icons-react'
import { detectIf } from '@/hooks/useIPIs'

export function FetchPost() {
	const [data, setData] = useState([])
	const isClient = useIsClient()
	const mobile = useMatchMedia('(max-width: 400px)', false)
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
								<a href={d.url} target='_blank' key={d.id}>
									<article className='bg-gray-100 border border-gray-300 p-5 rounded-lg shadow-lg text-gray-800 hover:bg-gray-200 transition-colors'>
										<header className='mb-3'>
											<h2 className='text-xl font-bold'>{d.title}</h2>
											<small className='text-xs mt-1 text-gray-500 flex items-center'>
												<History className='inline w-[14px] h-[14px] mr-[2px]' />
												Publicado {FormatDate(d.created_at)}
											</small>
										</header>
										<div className='mb-3'>
											<p className='text-sm font-semibold bg-slate-300/50 w-fit px-1 rounded-full border border-zinc-300'>
												{d.description}
											</p>
										</div>
										<div className='mb-4'>
											<p className='text-sm text-gray-600'>{d.message}</p>
										</div>
										<footer className='grid justify-between items-center text-sm text-gray-500'>
											{isI ? (
												<div className='flex items-center'>
													<img
														className='rounded-full w-8 h-8 mr-2'
														src='https://avatars.githubusercontent.com/u/93176365?s=400&u=256e212b81ba355aa6d1bda5b4f9882ed53474ea&v=4'
													/>
													solidSnk86
												</div>
											) : (
												<span>{d.ip}</span>
											)}
											<small className='flex items-center mt-2'>
												<Location className='inline w-[14px] h-[14px] mr-1' />
												{d.city}, {d.country} {d.flag}
											</small>
										</footer>
									</article>
								</a>
							))
						) : (
							<p className='absolute top-4 bg-red-500 p-2 rounded-lg text-white w-fit'>
								There are no posts...
							</p>
						)}
					</Masonry>
				</ResponsiveMasonry>
			)}
		</>
	)
}
/* eslint-enable multiline-ternary */
