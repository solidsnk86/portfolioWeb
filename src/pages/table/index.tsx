import FormatDate from '@/components/FormatDate'
import PrivateRoute from '@/components/PrivateRoute'
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
		<PrivateRoute>
			<section className='xl:p-16 p-3 overflow-hidden overflow-x-auto xl:flex mx-auto xl:justify-center text-zinc-100 h-full'>
				<table className='border-zinc-800 border z-50'>
					<thead className='border-zinc-800 border text-justify xl:text-sm text-xs'>
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
							<tr key={item.id} className='text-zinc-100/80 text-[10px] xl:text-sm result'>
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
		</PrivateRoute>
	)
}

export default VisitData
