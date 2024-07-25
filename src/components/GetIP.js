import { useState, useEffect } from 'react'
import { geolocation } from './const'

export const useIP = () => {
	const [item, setItem] = useState({})
	useEffect(() => {
		const fetchDataIP = async () => {
			try {
				const response = await fetch(geolocation)
				if (response.ok) {
					const data = await response.json(geolocation)
					setItem({
						city: {
							name: data.city.name,
							postalCode: data.city.postalCode
						},
						country: {
							name: data.country.name,
							flag: data.country.flag
						},
						ip: {
							address: data.ip.address,
							v6: data.ip.v6
						}
					})
				}
			} catch (error) {
				console.error('Error to fetch data', error)
			}
		}
		fetchDataIP()
	}, [])

	return item
}
