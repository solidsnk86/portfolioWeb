import { supabase } from '@/utils/supabase'
import { useState, useEffect } from 'react'

export const useIP = () => {
	const [item, setItem] = useState({})
	useEffect(() => {
		const fetchDataIP = async () => {
			try {
				const { data, error } = await supabase
					.from('address')
					.select('ip_address, city_name')
					.limit(1)
					.order('created_at', { ascending: false })

				if (error) {
					console.error('Error to retrieve data IP', error)
				} else if (data.length > 0) {
					const lastVisitData = data[0]
					setItem(lastVisitData)
				}
			} catch (error) {
				console.error('Error to fetch data from supabase', error)
			}
		}
		fetchDataIP()
	}, [])

	return item
}
