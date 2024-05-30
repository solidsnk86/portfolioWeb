import { supabase } from '@/utils/supabase'
import { useState, useEffect } from 'react'
import FormatDate from '@/components/FormatDate'
import { LinkComponent } from '@/components/LinkComponent'

const sendDataToSupabase = async (tableName, jsonData) => {
	try {
		const { data, error } = await supabase.from(tableName).upsert(
			[
				{
					avatar_url: jsonData.avatar_url,
					events_url: jsonData.events_url,
					followers_url: jsonData.followers_url,
					following_url: jsonData.following_url,
					gists_url: jsonData.gists_url,
					gravatar_id: jsonData.gravatar_id,
					html_url: jsonData.html_url,
					id: jsonData.id,
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
				}
			],
			{
				onConflict: 'id'
			}
		)

		if (error) {
			console.error(`Data not sent correctly to ${tableName}:`, error)
		} else {
			console.log(`Data sent correctly to ${tableName}:`, data)
		}
	} catch (error) {
		console.error(`Unexpected error sending data to ${tableName}:`, error)
	}
}

const fetchGitHubData = async (url) => {
	const response = await fetch(url)
	if (!response.ok) {
		throw new Error(`Error fetching GitHub data. Status: ${response.status}`)
	}
	return await response.json()
}

const fetchAndSendGitHubData = async (type, pageLimit, sendDataFunc) => {
	let allData = []
	let page = 1

	while (page <= pageLimit) {
		const url = `https://api.github.com/users/solidsnk86/${type}?page=${page}`
		const jsonData = await fetchGitHubData(url)
		if (jsonData.length === 0) break

		allData = allData.concat(jsonData)
		await Promise.all(jsonData.map((user) => sendDataFunc(user)))

		page++
	}

	return allData
}

export const VisitData = () => {
	const [items, setItems] = useState([])
	const [githubFollowersData, setGithubFollowersData] = useState([])
	const [githubFollowingData, setGithubFollowingData] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const { data: addressData, error: addressError } = await supabase
					.from('address')
					.select('*')
					.limit(50)
					.order('created_at', { ascending: false })

				if (addressError) throw addressError
				setItems(addressData)

				const [followers, following] = await Promise.all([
					fetchAndSendGitHubData('followers', 5, (user) =>
						sendDataToSupabase('github_followers_user', user)
					),
					fetchAndSendGitHubData('following', 5, (user) =>
						sendDataToSupabase('github_followings_user', user)
					)
				])

				setGithubFollowersData(followers)
				setGithubFollowingData(following)
			} catch (error) {
				console.error('Error during data fetching:', error)
			}
		}

		fetchData()
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
