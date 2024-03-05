import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '@/utils/supabase'

const PrivateRoute = ({ children }) => {
	const router = useRouter()

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const { user } = await supabase.auth.getUser()

				if (!user) {
					console.log('Usuario no autenticado. Redirigiendo a /login')
					router.replace('/login')
				}
			} catch (error) {
				console.error('Error al verificar la autenticación:', error)
			}
		}

		checkAuth()
	}, [router])

	return children
}

export default PrivateRoute
