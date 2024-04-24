import { supabase } from '@/utils/supabase'
import { useState, useEffect } from 'react'
import FormatDate from '@/components/FormatDate'

export const VisitData = () => {
	const [items, setItems] = useState([])
	const [githubData, setGithubData] = useState([])

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
		const fetchGithubData = async () => {
			try {
				let allUsers = []
				let page = 1
				while (true) {
					const response = await fetch(
						`https://api.github.com/users/solidsnk86/following?page=${page}`
					)
					const jsonData = await response.json()

					if (!response.ok) {
						throw new Error('Error al requerir los datos de GitHub.')
					}

					if (jsonData.length === 0) {
						break
					}

					allUsers = [...allUsers, ...jsonData]
					page++
				}

				setGithubData(allUsers)
				const usersCount = allUsers.length
				console.log('La cantidad de personas que sigo es: ', usersCount)
			} catch (error) {
				console.error('Error al obtener datos de GitHub:', error)
			}
		}

		fetchGithubData()
		dataFetch()
	}, [])


	return (
		<>
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
			<div className='block justify-center mx-auto'>
				{githubData.map((data) => (
					<p className='text-zinc-100 text-center text-sm'>{data.login}</p>
				))}
				<p>{githubData.length}</p>
			</div>
		</>
	)
}

export default VisitData
