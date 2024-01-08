import { supabase } from '@/utils/supabase'
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
						},
						ip: {
							address: jsonData.ip.address
						}
					})

					sendDataIp(jsonData.ip.address)
				} else {
					console.error('Error fetching visit data:', res.status, res.statusText)
				}
			} catch (error) {
				console.error('Error fetching visit data:', error)
			}
		}

		const sendDataIp = async (ip_address) => {
			try {
				const { data, error } = await supabase.from('address').insert({
					ip_address
				})

				if (error) {
					console.error('Error inserting IP data into Supabase:', error)
				} else {
					console.log('IP data inserted successfully:', data)
				}
			} catch (error) {
				console.error('Error inserting IP data into Supabase:', error)
			}
		}

		fetchData()
	}, [])

	return (
		<div>
			<div id='visit' className='p-3 text-amber-400 font-mono text-xs'>
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
