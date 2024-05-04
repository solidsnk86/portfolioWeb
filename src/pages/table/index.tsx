import { supabase } from '@/utils/supabase'
import { useState, useEffect } from 'react'
import FormatDate from '@/components/FormatDate'
import { LinkComponent } from '@/components/LinkComponent'

export const VisitData = () => {
	const [items, setItems] = useState([])
	const [followers, setFollowers] = useState([])
	const [following, setFollowing] = useState([])
	const [githubFollowersData, setGithubFollowersData] = useState([])
	const [githubFollowingData, setGithubFollowingData] = useState([])

	useEffect(() => {
		const fetchGitHubFollowing = async () => {
			try {
				let allFollowingUsers = []
				let page = 1
				while (true) {
					const response = await fetch(
						`https://api.github.com/users/solidsnk86/following?page=${page}`
					)
					if (!response.ok) {
						console.error(
							'Error al recibir los datos de GitHub (Following). Status:',
							response.status
						)
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
			} catch (error) {
				console.error('Error durante la recuperación de datos de GitHub (Following):', error)
			}
		}

		const fetchGitHubFollowers = async () => {
			try {
				let allFollowersUsers = []
				let page = 1
				while (true) {
					const response = await fetch(
						`https://api.github.com/users/solidsnk86/followers?page=${page}`
					)
					if (!response.ok) {
						console.error(
							'Error al recibir los datos de GitHub (Followers). Status:',
							response.status
						)
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
			} catch (error) {
				console.error('Error durante la recuperación de datos de GitHub (Followers):', error)
			}
		}

		const fetchAddressData = async () => {
			try {
				const { data, error } = await supabase
					.from('address')
					.select('*')
					.order('created_at', { ascending: false })
				if (error) {
					console.error('Error al recibir los datos de dirección IP:', error)
				} else {
					setItems(data)
				}
			} catch (error) {
				console.error('Error durante la recuperación de datos de dirección IP:', error)
			}
		}

		const fetchFollowers = async () => {
			try {
				const { data, error } = await supabase
					.from('github_followers')
					.select('*')
					.order('created_at', { ascending: false })
				if (error) {
					console.error('Error al recibir los seguidores de GitHub:', error)
				} else {
					setFollowers(data)
				}
			} catch (error) {
				console.error('Error durante la recuperación de datos de seguidores de GitHub:', error)
			}
		}

		const fetchFollowing = async () => {
			try {
				const { data, error } = await supabase
					.from('github_following')
					.select('*')
					.order('created_at', { ascending: false })
				if (error) {
					console.error('Error al recibir los seguidos de GitHub:', error)
				} else {
					setFollowing(data)
				}
			} catch (error) {
				console.error('Error durante la recuperación de datos de seguidos de GitHub:', error)
			}
		}

		const fetchData = async () => {
			await fetchGitHubFollowing()
			await fetchGitHubFollowers()
			await fetchAddressData()
			await fetchFollowers()
			await fetchFollowing()
		}

		fetchData()
	}, [])

	const followingLogins = new Set(githubFollowingData.map((user) => user.login))
	const followersLogins = new Set(githubFollowersData.map((user) => user.login))

	const nonFollowers = Array.from(followingLogins).filter((login) => !followersLogins.has(login))

	return (
		<>
			<section className='xl:p-16 p-3 overflow-hidden overflow-x-auto xl:flex mx-auto xl:justify-center text-zinc-100 h-full'>
				<table className='border-zinc-800 border z-50'>
					<thead className='border-zinc-800 border text-justify xl:text-sm text-xs'>
						<tr>
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

			<div className='grid justify-center mx-auto'>
				{githubFollowingData.map((data) => (
					<div key={data.node_id} className='flex mx-1 space-y-2'>
						<img src={data.avatar_url} className='w-24 h-24 rounded-full my-2' />
						<span className='text-zinc-100 text-center font-semibold pt-9 mx-4'>{data.login}</span>
						<LinkComponent url={data.html_url} color='orange' className='underline'>
							Visitar perfil
						</LinkComponent>
					</div>
				))}
				<p className='p-4 bg-slate-500/50 text-slate-50 my-2'>
					Total GitHub Following: {githubFollowingData.length}
				</p>

				{githubFollowersData.map((data) => (
					<div key={data.node_id} className='flex mx-1 space-y-2'>
						<img src={data.avatar_url} className='w-24 h-24 rounded-full my-2' />
						<span className='text-zinc-100 text-center font-semibold pt-9 mx-4'>{data.login}</span>
					</div>
				))}
				<p className='p-4 bg-slate-500/50 text-slate-50 my-2'>
					Total GitHub Followers: {githubFollowersData.length}
				</p>

				<div className='border border-zinc-700 p-4'>
					<h2 className='text-zinc-50 bg-zinc-700/50 w-full h-auto p-4'>{`No me siguen de vuelta: ${nonFollowers.length}`}</h2>
					{nonFollowers.map((login) => (
						<p key={login} className='text-zinc-50'>
							{login}
						</p>
					))}
				</div>
			</div>
		</>
	)
}

export default VisitData
