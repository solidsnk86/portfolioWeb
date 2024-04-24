import { useState, useEffect } from 'react'
import { dateFormat } from './const'

function getLocalStats(repoName) {
	return {
		pushedAt: localStorage.getItem(`${repoName}-git-stats-pushed-at`)
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
		const { pushed_at } = await res.json()

		if (pushed_at) {
			const currentTime = new Date().getTime()
			localStorage.setItem(`${repoName}-git-stats-info`, currentTime)
			localStorage.setItem(
				`${repoName}-git-stats-pushed-at`,
				new Date(pushed_at).toLocaleDateString('es-Es', {
					year: 'numeric',
					month: 'short',
					day: '2-digit',
					hour: '2-digit',
					minute: '2-digit'
				})
			)
		}
		return getLocalStats(repoName)
	} catch (error) {
		console.error('Error fetching data:', error)
		return getLocalStats(repoName)
	}
}

export const GithubDescription = ({ repoName, className = '' }) => {
	const [repoData, setRepoData] = useState({ pushedAt: null })

	useEffect(() => {
		const gitStatsDate = localStorage.getItem(`${repoName}-git-stats-info`)
		const local = gitStatsDate && new Date().getTime() - gitStatsDate < 1000 * 60 * 24

		fetchGitStats(local, repoName).then((res) => {
			if (res.pushedAt !== null) {
				setRepoData(res)
			}
		})
	}, [repoName])

	return <>{repoData && <span className={`text-[10px] ${className}`}>{repoData.pushedAt}</span>}</>
}
