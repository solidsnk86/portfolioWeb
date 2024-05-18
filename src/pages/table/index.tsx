import { supabase } from '@/utils/supabase'
import { useState, useEffect } from 'react'
import FormatDate from '@/components/FormatDate'
import { LinkComponent } from '@/components/LinkComponent'

export const VisitData = () => {
	const [items, setItems] = useState([])
	const [githubFollowersData, setGithubFollowersData] = useState([])
	const [githubFollowingData, setGithubFollowingData] = useState([])

	const sendDataFollowing = async (jsonData) => {
		await supabase.from('github_followings_user').insert({
			avatr_url: jsonData.avatar_url,
			events_url: jsonData.events_url,
			followers_url: jsonData.followers_url,
			following_url: jsonData.following_url,
			gists_url: jsonData.gists_url,
			gravatar_id: jsonData.gravatar_id,
			html_url: jsonData.html_url,
			id: jsonData.od,
			login: jsonData.login,
			node_id: jsonData.node_id,
			organizations_url: jsonData.organizations_url,
			received_events_url: jsonData.received_events_url,
			repos_url: jsonData.repos_url,
			site_admin: jsonData.site_admin,
			starred_url: jsonData.starred_url,
			subscriptions_url: jsonData.subscriptions_url,
			type: jsonData.type,
			url: jsonData.url
		})
		if (sendDataFollowing) {
			console.log('Data followings sent correctly')
		} else {
			console.log('Data followings not sent correctly')
		}
	}

	const sendDataFollowers = async (jsonData) => {
		await supabase.from('github_followers_user').insert({
			avatr_url: jsonData.avatar_url,
			events_url: jsonData.events_url,
			followers_url: jsonData.followers_url,
			following_url: jsonData.following_url,
			gists_url: jsonData.gists_url,
			gravatar_id: jsonData.gravatar_id,
			html_url: jsonData.html_url,
			id: jsonData.od,
			login: jsonData.login,
			node_id: jsonData.node_id,
			organizations_url: jsonData.organizations_url,
			received_events_url: jsonData.received_events_url,
			repos_url: jsonData.repos_url,
			site_admin: jsonData.site_admin,
			starred_url: jsonData.starred_url,
			subscriptions_url: jsonData.subscriptions_url,
			type: jsonData.type,
			url: jsonData.url
		})
		if (sendDataFollowers) {
			console.log('Data followers sent correctly')
		} else {
			console.log('Data followers not sent correctly')
		}
	}

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
					sendDataFollowing(jsonData)
				}
				setGithubFollowingData(allFollowingUsers)
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
					sendDataFollowers(jsonData)
				}
				setGithubFollowersData(allFollowersUsers)
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

		const fetchData = async () => {
			await fetchAddressData()
		}
		fetchData()
		fetchGitHubFollowers()
		fetchGitHubFollowing()
	}, [])

	const followingLogins = new Set(githubFollowingData.map((user) => user.login))
	const followersLogins = new Set(githubFollowersData.map((user) => user.login))

	const nonFollowers = Array.from(followingLogins).filter((login) => !followersLogins.has(login))

	return (
		<>
			<section className='xl:p-16 p-3 overflow-hidden overflow-x-auto xl:flex mx-auto xl:justify-center text-zinc-100 h-full'>
				<table className='border-zinc-800 border z-50' cellPadding={10}>
					<thead className='text-justify xl:text-sm text-xs'>
						<tr className='head-table'>
							<th>ID</th>
							<th>IP</th>
							<th>Latitude</th>
							<th>Longitude</th>
							<th>PC</th>
							<th>City</th>
							<th>Country</th>
							<th>Flag</th>
							<th>Date</th>
						</tr>
					</thead>
					<tbody>
						{items.map((item) => (
							<tr key={item.id} className='text-zinc-100/80 text-[10px] xl:text-sm result'>
								<td>{item.id}</td>
								<td className=' max-w-24 overflow-hidden'>{item.ip_address}</td>
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
						<img src={data.avatar_url} className='w-16 h-16 rounded-full my-2' />
						<LinkComponent
							url={data.html_url}
							iconName='ExternalLink'
							color='slate-100'
							className='text-slate-50 pt-4 pl-2 hover:underline'
						>
							{data.login}
						</LinkComponent>
					</div>
				))}
				<p className='p-4 bg-slate-500/50 text-slate-50 my-2 border border-zinc-700'>
					Total que Sigo: {githubFollowingData.length}
				</p>

				{githubFollowersData.map((data) => (
					<div key={data.node_id} className='flex mx-1 space-y-2'>
						<img src={data.avatar_url} className='w-16 h-16 rounded-full my-2' />
						<LinkComponent
							url={data.html_url}
							iconName='ExternalLink'
							color='slate-100'
							className='text-slate-50 pt-4 pl-2 hover:underline'
						>
							{data.login}
						</LinkComponent>
					</div>
				))}
				<p className='p-4 bg-slate-500/50 text-slate-50 my-2 border border-zinc-700'>
					Total Seguidores: {githubFollowersData.length}
				</p>

				<div className='border border-zinc-700 w-fit justify-center mx-auto my-5 rounded-lg bg-zinc-700/50'>
					<h2 className='text-zinc-50 max-w-fit h-auto p-4 justify-center mx-auto'>{`No me siguen de vuelta: ${nonFollowers.length}`}</h2>
					{nonFollowers.map((login) => (
						<div key={login} className='flex p-2 text-slate-50'>
							{login}
						</div>
					))}
				</div>
			</div>
		</>
	)
}

export default VisitData
