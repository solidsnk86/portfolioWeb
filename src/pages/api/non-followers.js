import { getGithubData } from '../../utils/getGithubData'

export default async function nonFollowers(req, res) {
	try {
		const { followers, following } = await getGithubData()

		const followingLogins = new Set(following.map((data) => data.login))
		const followersLogins = new Set(followers.map((data) => data.login))
		const nonFollowers = Array.from(followingLogins).filter((login) => !followersLogins.has(login))

		res.status(200).json({
			status: 'success',
			data: {
				dataFollowers: followers,
				dataFollowing: following,
				'non-following': nonFollowers
			}
		})
	} catch (err) {
		res.status(500).json({ status: 'error', message: err.message })
	}
}
