import FormatDate from '@/components/FormatDate'
import { supabase } from '@/utils/supabase'
import { useState, useEffect } from 'react'

export const VisitData = () => {
	const [items, setItems] = useState([])

	useEffect(() => {
		const dataFetch = async () => {
			const { data, error } = await supabase
				.from('address')
				.select('*')
				.order('created_at', { ascending: false })

			if (error) {
				throw error
			}
			setItems(data)
		}

		dataFetch()
	}, [])

	return (
		<section className='xl:p-16 xl:flex mx-auto xl:justify-center text-zinc-100 h-full'>
			<div className='flares'>
				<img
					src='img/flare-top.png'
					loading='lazy'
					sizes='(max-width: 1920px) 100vw, 1920px'
					srcSet='img/flare-top-500.png 500w, img/flare-top-800.png 800w, img/flare-top-1080.png 1080w, img/flare-top.png 1920w'
					alt=''
					className='flares-top w-full h-full'
				/>
				<img
					src='img/flare-right.png'
					loading='lazy'
					sizes='(max-width: 1622px) 100vw, 1622px'
					srcSet='img/flare-right-500.png 500w, img/flare-right-800.png 800w, img/flare-right-1080.png 1080w, img/flare-right.png 1622w'
					alt=''
					className='new-flare-nav top-right hide-mobile w-full h-full'
				/>
				<img
					src='img/flare-left.png'
					loading='lazy'
					sizes='(max-width: 1518px) 100vw, 1518px'
					srcSet='img/flare-left-500.png 500w, img/flare-left-800.png 800w, img/flare-left.png 1518w'
					alt=''
					className='new-flare-nav top-left hide-mobile w-full h-full'
				/>
			</div>




			<table className='border-zinc-800 border z-50'>
				<thead className='border-zinc-800 border text-justify'>
					<tr className='head-table'>
						<th>ID</th>
						<th>IP Address</th>
						<th>Latitude</th>
						<th>Longitude</th>
						<th>Postal Code</th>
						<th>City Name</th>
						<th>Country Name</th>
						<th>Country Flag</th>
						<th>Date</th>
					</tr>
				</thead>
				<tbody>
					{items.map((item) => (
						<tr key={item.id} className='text-zinc-100/80 text-xs xl:text-sm result'>
							<td>{item.id}</td>
							<td>{item.ip_address}</td>
							<td>{item.latitude}</td>
							<td>{item.longitude}</td>
							<td>{item.postal_code}</td>
							<td>{item.city_name}</td>
							<td>{item.country_name}</td>
							<td>{item.country_flag}</td>
							<td>{FormatDate(item.created_at)}</td>
						</tr>
					))}
				</tbody>
			</table>
		</section>
	)
}

export default VisitData
