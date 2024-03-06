import { useEffect, useState } from 'react'
import { StarIcon } from './icons/StarIcon'

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
				stargazers_count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
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
		<div className='inline-flex items-center space-x-1' title={`Ir al repositorio ${repoName}`}>
			<a
				className='text-xs hover:brightness-150 hover:no-underline'
				href={`https://github.com/solidsnk86/${repoName}/`}
				rel='noopener'
				target='_blank'
			>
				<StarIcon className='inline-block mb-[2px] shadow-star' />
			</a>
			<a
				className='text-xs text-zinc-300 hover:no-underline'
				href={`https://github.com/solidsnk86/${repoName}/`}
				rel='noopener'
				target='_blank'
			>
				<span className='text-sm md:text-base font-medium mx-1'>{data.stars}</span>
				<span className='hover:opacity-70'>stars</span>
			</a>
		</div>
	)
}
