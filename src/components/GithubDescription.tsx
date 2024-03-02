import { useState, useEffect } from 'react'

export default function GisthubDescription({ repos, repoName }) {
	const [repoData, setRepoData] = useState(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(`https://api.github.com/repos/solidsnk86/${repoName}`)
				const data = await response.json()
				setRepoData(data)
			} catch (error) {
				console.error('Error fetching data:', error)
			}
		}

		fetchData()
	}, [repoName, repos])

	return repoData
}
