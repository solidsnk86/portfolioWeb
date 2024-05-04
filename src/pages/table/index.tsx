import { supabase } from '@/utils/supabase'
import { useState, useEffect } from 'react'
import FormatDate from '@/components/FormatDate'

export const VisitData = () => {
	const [items, setItems] = useState([])
	const [githubFollowersData, setGithubFollowersData] = useState([])
	const [githubFollowingData, setGithubFollowingData] = useState([])

	useEffect(() => {
		const fetchGitHubFollowing = async () => {
			let allFollowingUsers = []
			let page = 1
			while (true) {
				const response = await fetch(
					`https://api.github.com/users/solidsnk86/following?page=${page}`
				)
				if (!response.ok) {
					console.error('Error al recibir los datos de GitHub (Following).')
					break
				}
				const jsonData = await response.json()
				if (jsonData.length === 0) {
					break
				}
				allFollowingUsers = allFollowingUsers.concat(jsonData)
				page++
			}
			setGithubFollowingData(allFollowingUsers)

			const { error } = await supabase.from('github_following').upsert(allFollowingUsers)
			if (error) {
				console.error('Error al enviar los datos a Supabase (Following):', error)
			} else {
				console.log('Datos enviados satisfactoriamente (Following).')
			}
		}

		const fetchGitHubFollowers = async () => {
			let allFollowersUsers = []
			let page = 1
			while (true) {
				const response = await fetch(
					`https://api.github.com/users/solidsnk86/followers?page=${page}`
				)
				if (!response.ok) {
					console.error('Error al recibir los datos de GitHub (Followers).')
					break
				}
				const jsonData = await response.json()
				if (jsonData.length === 0) {
					break
				}
				allFollowersUsers = allFollowersUsers.concat(jsonData)
				page++
			}
			setGithubFollowersData(allFollowersUsers)

			const { error } = await supabase.from('github_followers').upsert(allFollowersUsers)
			if (error) {
				console.error('Error al enviar los datos a Supabase (Followers):', error)
			} else {
				console.log('Datos enviados satisfactoriamente (Followers).')
			}
		}

		const fetchAddressData = async () => {
			const { data, error } = await supabase
				.from('address')
				.select('*')
				.order('created_at', { ascending: false })
			if (error) {
				console.error('Error fetching address data:', error)
			} else {
				setItems(data)
			}
		}

		const fetchData = async () => {
			await fetchGitHubFollowing()
			await fetchGitHubFollowers()
			await fetchAddressData()
		}

		fetchData()
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
				{githubFollowingData.map((data) => (
					<div key={data.node_id}>
						<img src={data.avatar_url} className='w-24 h-24' />
						<p className='text-zinc-100 text-center text-sm'>{data.login}</p>
					</div>
				))}
				<p>Total GitHub Following: {githubFollowingData.length}</p>

				{githubFollowersData.map((data) => (
					<div key={data.node_id}>
						<img src={data.avatar_url} className='w-24 h-24' />
						<p className='text-zinc-100 text-center text-sm'>{data.login}</p>
					</div>
				))}
				<p>Total GitHub Followers: {githubFollowersData.length}</p>
			</div>
		</>
	)
}

export default VisitData
