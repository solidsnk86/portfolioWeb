// components/PrivateRoute.js
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { supabaseClient } from '@/utils/supabase'

const PrivateRoute = ({ children }) => {
	const router = useRouter()

	useEffect(() => {
		const checkAuth = async () => {
			const { user } = await supabaseClient.auth.session()

			if (!user) {
				console.log('Usuario no autenticado. Redirigiendo a /login')
				router.replace('/login')
			}
		}

		checkAuth()
	}, [router])

	return children
}

export default PrivateRoute
