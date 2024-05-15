import { csvData } from './const'
import { useEffect, useState } from 'react'

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
						const [url, title, repoName, image, description, colors] = row.split(',')
						return {
							url,
							title,
							repoName,
							image,
							description,
							colors: colors.split('\r').shift()
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
