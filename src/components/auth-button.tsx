'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Github } from 'lucide-react'

export function AuthButton() {
	const supabase = createClientComponentClient()

	const handleSigIn = async () => {
		await supabase.auth.signInWithOAuth({
			provider: 'github',
			options: {
				redirectTo: 'http://localhost:3000/auth/callback'
			}
		})
	}

	const handleSignOut = async () => {
		await supabase.auth.signOut()
	}

	return (
		<header>
			<button onClick={handleSigIn}>
				<Github className='w-4 h-5' /> Sign In
			</button>
			<button onClick={handleSignOut}>Sign Out</button>
		</header>
	)
}
