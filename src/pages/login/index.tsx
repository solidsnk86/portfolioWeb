'use client'

import { type Session } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/router'
import { Button } from '@nextui-org/button'
import { supabase } from '@/utils/supabase'

export default function AuthButton({ session }: { session: Session | null }) {
	const router = useRouter()

	const handleSignIn = async () => {
		try {
			await supabase.auth.signInWithOAuth({
				provider: 'github',
				options: {
					redirectTo: 'http://portfolio-mgc.vercel.app/auth/callback'
				}
			})

			const user = supabase.auth.getUser()
			console.log('Usuario:', user)
		} catch (error) {
			console.error('Error al iniciar sesión con GitHub:', error.message)
		}
	}

	const handleSignOut = async () => {
		try {
			await supabase.auth.signOut()
			router.reload()
		} catch (error) {
			console.error('Error al cerrar sesión:', error.message)
		}
	}

	return (
		<header className='grid justify-center mx-auto mt-10 w-fit'>
			<div>
				{/* eslint-disable-next-line multiline-ternary */}
				{session === null ? (
					<button
						onClick={handleSignIn}
						type='button'
						className='text-white hover:bg-zinc-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center focus:ring-gray-500 hover:bg-[#050708]/30 mr-2 mb-2 border border-zinc-700 focus:outline-2 outline-red-400 transition-shadow'
					>
						<svg
							className='w-4 h-4 mr-2'
							aria-hidden='true'
							xmlns='http://www.w3.org/2000/svg'
							fill='currentColor'
							viewBox='0 0 20 20'
						>
							<path
								fillRule='evenodd'
								d='M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z'
								clipRule='evenodd'
							/>
						</svg>
						Iniciar sesión con Github
					</button>
				) : (
					<Button
						className='text-zinc-100 p-2 border border-zinc-800 rounded-md'
						onClick={handleSignOut}
					>
						Cerrar sesión
					</Button>
				)}
			</div>
		</header>
	)
}
