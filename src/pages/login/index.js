// Importa useRouter desde next/router
import { useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '@/utils/supabase'

const LoginForm = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const router = useRouter()

	const handleLogin = async () => {
		try {
			const { user, error } = await supabase.auth.signIn({
				email,
				password
			})

			if (error) {
				alert('⛔ No está permitido el ingreso a ésta sección', error)
			} else {
				router.push('/table')
				console.log('Usuario autenticado correctamente', user)
			}
		} catch (error) {
			console.error('Error en el inicio de sesión:', error.message)
		}
	}

	return (
		<section className='p-10 items-center'>
			<div className='text-zinc-100 justify-center mx-auto grid border w-fit p-8 rounded-lg'>
				<h2>Iniciar Sesión</h2>
				<label>Email:</label>
				<input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
				<label>Contraseña:</label>
				<input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
				<button onClick={handleLogin}>Iniciar Sesión</button>
			</div>
		</section>
	)
}

export default LoginForm
