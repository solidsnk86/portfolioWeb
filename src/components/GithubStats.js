import { useEffect, useState } from 'react'
import { GithubIcon } from './GithubIcon'

function getLocalStats(repoName) {
	return {
		stars: localStorage.getItem(`${repoName}-git-stats-stars`)
	}
}

async function fetchGitStats(local, repoName) {
	if (local) {
		return getLocalStats(repoName)
	}

	try {
		const res = await fetch(`https://api.github.com/repos/solidsnk86/${repoName}`)
		if (!res.ok) {
			throw new Error('Error fetching data from GitHub API')
		}
		const { stargazers_count } = await res.json()

		if (stargazers_count) {
			localStorage.setItem(`${repoName}-git-stats-date`, new Date().getTime())
			localStorage.setItem(
				`${repoName}-git-stats-stars`,
				stargazers_count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') // eslint-disable-next-line camelcase | Probar desactivar esto del eslint o permitir snake-case
			)
		}

		return getLocalStats(repoName)
	} catch (error) {
		return getLocalStats(repoName)
	}
}

export const GithubStats = ({ repoName }) => {
	const [data, setData] = useState({ stars: 0 })

	useEffect(() => {
		const gitStatsDate = localStorage.getItem(`${repoName}-git-stats-date`)
		const local = gitStatsDate && new Date().getTime() - gitStatsDate * 1 < 1000 * 60 * 60

		fetchGitStats(local, repoName).then((res) => {
			if (res.stars !== null) {
				setData(res)
			}
		})
	}, [repoName])

	return (
		<div className='inline-flex items-center space-x-1'>
			<a
				className='text-xs hover:opacity-50 hover:no-underline'
				href={`https://github.com/solidsnk86/${repoName}/`}
				rel='noopener'
				target='_blank'
			>
				<GithubIcon className='inline-block text-zinc-300' height='20' />
			</a>
			<a
				className='text-xs text-zinc-300 hover:no-underline'
				href={`https://github.com/solidsnk86/${repoName}/`}
				rel='noopener'
				target='_blank'
			>
				<span className='text-sm md:text-base font-medium mx-1'>{data.stars}</span>
				<span>stars</span>
			</a>
		</div>
	)
}
