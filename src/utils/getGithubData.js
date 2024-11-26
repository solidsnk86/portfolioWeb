import { supabase } from './supabase'

export const getGithubData = async () => {
	try {
		const { data: githubFollowers, error: followersError } = await supabase
			.from('github_followers_user')
			.select('login')
		const { data: githubFollowing, error: followingError } = await supabase
			.from('github_followings_user')
			.select('login')

		if (followersError || followingError) {
			throw new Error(followersError?.message || followingError?.message)
		}

		return {
			followers: githubFollowers,
			following: githubFollowing
		}
	} catch (err) {
		throw new Error(err.message)
	}
}
