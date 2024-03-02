import { useEffect, useState } from 'react'
import { csvData } from './const'

export const DataProjects = () => {
	const [projects, setProjects] = useState([])

	useEffect(() => {
		const fetchProjects = async () => {
			try {
				const res = await fetch(csvData)
				const csv = await res.text()
				const parsedProjects = csv
					.split('\n')
					.slice(1)
					.map((row) => {
						const [url, title, repoName, image, description, update] = row.split(',')
						return {
							url,
							title,
							repoName,
							image,
							description,
							update: new Date(update).toLocaleDateString('es-Es', {
								year: 'numeric',
								month: 'short',
								day: 'numeric'
							})
						}
					})
				setProjects(parsedProjects)
			} catch (error) {
				console.error('Error fetching projects data 😕:', error)
			}
		}

		fetchProjects()
	}, [])

	return projects
}
