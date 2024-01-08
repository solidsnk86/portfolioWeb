import { supabase } from '@/utils/supabase'
import { useEffect, useState } from 'react'

const Visit = () => {
	const [visitData, setVisitData] = useState({})
	const [lastVisit, setLastVisit] = useState('')

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch('https://geolocation.microlink.io')
				if (res.ok) {
					const jsonData = await res.json()
					setVisitData({
						city: {
							name: jsonData.city.name,
							postalCode: jsonData.city.postalCode
						},
						country: {
							name: jsonData.country.name,
							flag: jsonData.country.flag
						},
						ip: {
							address: jsonData.ip.address
						},
						coordinates: {
							latitude: jsonData.coordinates.latitude,
							longitude: jsonData.coordinates.longitude
						}
					})

					sendDataIp(
						jsonData.ip.address,
						jsonData.coordinates.latitude,
						jsonData.coordinates.longitude,
						jsonData.city.postalCode
					)
				} else {
					console.error('Error fetching visit data:', res.status, res.statusText)
				}
			} catch (error) {
				console.error('Error fetching visit data:', error)
			}
		}

		const sendDataIp = async (ip_address, latitude, longitude, postal_code) => {
			await supabase.from('address').insert({
				ip_address,
				latitude,
				longitude,
				postal_code
			})
		}

		const fetchLastVisit = async () => {
			try {
				const { data, error } = await supabase
					.from('address')
					.select('ip_address')
					.order('ip_address', { ascending: false })
					.limit(1)

				if (error) {
					console.error('Error fetching last visit data:', error)
				} else if (data.length > 0) {
					setLastVisit(data[0].ip_address)
				}
			} catch (error) {
				console.error('Error fetching last visit data:', error)
			}
		}

		fetchData()
		fetchLastVisit()
	}, [])

	return (
		<div>
			<div id='visit' className='p-3 text-amber-400 font-mono text-xs'>
				{visitData.city && (
					<div className='flex mx-auto justify-center'>
						<p>
							Last visit from: {visitData.city.name}, {visitData.country.name},{' '}
							{visitData.country.flag}
						</p>
					</div>
				)}
			</div>
		</div>
	)
}

export default Visit
