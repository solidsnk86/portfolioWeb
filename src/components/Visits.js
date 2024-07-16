import { geolocation } from './const'
import { supabase } from '@/utils/supabase'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import FormatDate from './FormatDate'

const dataIp1 = process.env.NEXT_PUBLIC_DATA_IP_1
const dataIp2 = process.env.NEXT_PUBLIC_DATA_IP_2
const dataIpV6 = process.env.NEXT_PUBLIC_DATA_IP_V6

const Visit = () => {
	const { t } = useTranslation()

	const [visitData, setVisitData] = useState({})
	const [lastVisit, setLastVisit] = useState({})

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch(geolocation)
				if (res.ok) {
					const jsonData = await res.json(geolocation)
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
							address: jsonData.ip.address,
							v6: jsonData.ip.v6
						},
						coordinates: {
							latitude: jsonData.coordinates.latitude,
							longitude: jsonData.coordinates.longitude
						}
					})
					const localURL = window.location.href
					if (
						localURL !== 'http://localhost:3000/' &&
						localURL !== 'http://localhost:3001/' &&
						jsonData.ip.v6 !== dataIpV6 &&
						jsonData.ip.address !== dataIp1 &&
						jsonData.ip.address !== dataIp2
					) {
						sendDataToSupabase(jsonData)
					}
				} else {
					console.error('Error fetching visit data:', res.status, res.statusText)
				}
			} catch (error) {
				console.error('Error fetching visit data:', error)
			}
		}

		const sendDataToSupabase = async (jsonData) => {
			await supabase.from('address').insert({
				ip_address: jsonData.ip.address,
				latitude: jsonData.coordinates.latitude,
				longitude: jsonData.coordinates.longitude,
				postal_code: jsonData.city.postalCode,
				city_name: jsonData.city.name,
				country_name: jsonData.country.name,
				country_flag: jsonData.country.flag
			})
		}

		const fetchLastVisit = async () => {
			try {
				const { data, error } = await supabase
					.from('address')
					.select('id, city_name, country_name, country_flag, created_at')
					.order('created_at', { ascending: false })
					.limit(1)
				if (error) {
					console.error('Error fetching last visit data:', error)
				} else if (data.length > 0) {
					const lastVisitData = data[0]
					setLastVisit(lastVisitData)
				}
			} catch (error) {
				console.error('Error fetching last visit data:', error)
			}
		}
		fetchData()
		fetchLastVisit()
	}, [])

	return (
		<div className='cursor-default'>
			<p className='text-zinc-100 update-dot text-xs text-center'>
				{t('profileViews')} {lastVisit.id}
			</p>
			<div id='visit' className='p-3 text-center text-[#928bf9] update-dot'>
				{visitData.city && (
					<div className='flex mx-auto justify-center'>
						<span className='span-location mt-[3px] px-1 h-[8px] rounded-full bg-[#928bf9] xl:mr-2 mr-1 custom-ping hidden xl:flex' />
						<p className='text-[10px] xl:text-xs last-visit'>
							{t('lastVisit')} {FormatDate(lastVisit.created_at)} {t('lastVisitFrom')}{' '}
							{lastVisit.city_name}, {lastVisit.country_name} {lastVisit.country_flag}
						</p>
					</div>
				)}
			</div>
		</div>
	)
}

export default Visit
