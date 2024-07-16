import { supabase } from '@/utils/supabase'
import { useState, useEffect } from 'react'
import FormatDate from '@/components/FormatDate'
import { Footer } from '@/components/Footer'

const sendDataToSupabase = async (
	tableName: string,
	jsonData: {
		avatar_url: any
		events_url: any
		followers_url: any
		following_url: any
		gists_url: any
		gravatar_id: any
		html_url: any
		id: any
		login: any
		node_id: any
		organizations_url: any
		received_events_url: any
		repos_url: any
		site_admin: any
		starred_url: any
		subscriptions_url: any
		type: any
		url: any
	}
) => {
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

const fetchGitHubData = async (url: string | URL | Request) => {
	const response = await fetch(url)
	if (!response.ok) {
		throw new Error(`Error fetching GitHub data. Status: ${response.status}`)
	}
	return await response.json()
}

const fetchAndSendGitHubData = async (
	type: string,
	pageLimit: number,
	sendDataFunc: { (user: any): Promise<void>; (user: any): Promise<void>; (arg0: any): any }
) => {
	let allData = []
	let page = 1

	while (page <= pageLimit) {
		const url = `https://api.github.com/users/solidsnk86/${type}?page=${page}`
		const jsonData = await fetchGitHubData(url)
		if (jsonData.length === 0) break

		allData = allData.concat(jsonData)
		await Promise.all(jsonData.map((user: any) => sendDataFunc(user)))

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
					fetchAndSendGitHubData(
						'followers',
						5,
						(user: {
							avatar_url: any
							events_url: any
							followers_url: any
							following_url: any
							gists_url: any
							gravatar_id: any
							html_url: any
							id: any
							login: any
							node_id: any
							organizations_url: any
							received_events_url: any
							repos_url: any
							site_admin: any
							starred_url: any
							subscriptions_url: any
							type: any
							url: any
						}) => sendDataToSupabase('github_followers_user', user)
					),
					fetchAndSendGitHubData(
						'following',
						5,
						(user: {
							avatar_url: any
							events_url: any
							followers_url: any
							following_url: any
							gists_url: any
							gravatar_id: any
							html_url: any
							id: any
							login: any
							node_id: any
							organizations_url: any
							received_events_url: any
							repos_url: any
							site_admin: any
							starred_url: any
							subscriptions_url: any
							type: any
							url: any
						}) => sendDataToSupabase('github_followings_user', user)
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
			<h1 className='text-center font-bold text-4xl mt-10 text-zinc-50'>
				Control de Usuarios de la web y usuarios de Github
			</h1>
			<section className='xl:p-16 p-3 overflow-hidden overflow-x-auto xl:flex mx-auto xl:justify-center text-zinc-100 h-full'>
				<table className='border-zinc-800 border z-50' cellPadding={10}>
					<thead className='text-justify xl:text-sm text-xs'>
						<tr className='head-table'>
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
								<td className='max-w-28 overflow-hidden'>{item.ip_address}</td>
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
			<h1 className='my-10 text-slate-50 text-3xl text-center font-bold'>
				Control de Usuarios de Github
			</h1>
			<div className='justify-center github-users xl:w-10/12'>
				{githubFollowingData.map((data) => (
					<div key={data.node_id} className='flex mx-1 space-y-2'>
						<a href={`https://github.com/${data.login}/`} title={`@${data.login}`}>
							<img src={data.avatar_url} className='w-14 h-14 rounded-full my-2' />
						</a>
					</div>
				))}
			</div>
			<div>
				<p className='p-4 border border-zinc-700 w-1/2 justify-center font-mono font-semibold mx-auto my-5 rounded-lg bg-zinc-700/50 text-zinc-50 text-center'>
					Total de usuarios que sigo:{' '}
					<span className='text-orange-400'>{githubFollowingData.length}</span>
				</p>
			</div>
			<div className='justify-center github-users xl:w-10/12'>
				{githubFollowersData.map((data) => (
					<div key={data.node_id} className='flex mx-1 space-y-2'>
						<a href={`https://github.com/${data.login}/`} title={`@${data.login}`}>
							<img src={data.avatar_url} className='w-14 h-14 rounded-full my-2' />
						</a>
					</div>
				))}
			</div>
			<div>
				<p className='p-4 border border-zinc-700 w-1/2 justify-center mx-auto my-5 rounded-lg font-mono font-semibold bg-zinc-700/50 text-zinc-50 text-center'>
					Total de usuarios seguidores:{' '}
					<span className='text-orange-400'>{githubFollowersData.length}</span>
				</p>
			</div>
			<div className='border border-zinc-700 xl:w-1/2 justify-center mx-auto my-5 rounded-lg bg-zinc-700/50 overflow-hidden'>
				<h2 className='text-zinc-50 text-center h-auto p-4 bg-zinc-800/60 w-[100%] border-b border-zinc-700/80 font-mono font-semibold'>
					Usuarios que no me siguen de vuelta:{' '}
					<span className='text-orange-400'>{nonFollowers.length}</span>
				</h2>
				{nonFollowers.map((login) => (
					<div key={login} className='flex p-2 text-slate-50 mx-auto justify-center'>
						<a href={`https://github.com/${login}/`} className=' hover:underline'>
							{login}
						</a>
					</div>
				))}
			</div>
			<Footer />
		</>
	)
}

export default VisitData
