import { supabase } from '@/utils/supabase'

const sendDataFollowing = async (jsonData) => {
	try {
		const { data, error } = await supabase.from('github_followings_user').upsert(
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
			console.error('Data followings not sent correctly:', error)
		} else {
			console.log('Data followings sent correctly:', data)
		}
	} catch (error) {
		console.error('Unexpected error:', error)
	}
}

const sendDataFollowers = async (jsonData) => {
	try {
		const { data, error } = await supabase.from('github_followers_user').upsert(
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
			console.error('Data followers not sent correctly:', error)
		} else {
			console.log('Data followers sent correctly:', data)
		}
	} catch (error) {
		console.error('Unexpected error:', error)
	}
}

export { sendDataFollowers, sendDataFollowing }
