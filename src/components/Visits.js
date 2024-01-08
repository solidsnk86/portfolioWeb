import { useEffect, useState } from 'react'

const Visit = () => {
	const [visitData, setVisitData] = useState({})

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch('https://geolocation.microlink.io')
				if (res.ok) {
					const jsonData = await res.json()
					setVisitData({
						city: jsonData.city.name,
						country: {
							name: jsonData.country.name,
							flag: jsonData.country.flag
						}
					})
				} else {
					console.error('Error fetching visit data:', res.status, res.statusText)
				}
			} catch (error) {
				console.error('Error fetching visit data:', error)
			}
		}

		fetchData()
	}, [])

	return (
		<div>
			<div id='visit' className='bg-amber-400/10 p-3 text-zinc-100 font-mono text-xs'>
				{visitData.city && (
					<div className='flex mx-auto justify-center'>
						<p>
							Estás conectado desde: {visitData.city}, {visitData.country.name},{' '}
							{visitData.country.flag}
						</p>
					</div>
				)}
			</div>
		</div>
	)
}

export default Visit
