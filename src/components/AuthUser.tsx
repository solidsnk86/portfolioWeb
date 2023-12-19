import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import AuthButton from '../pages/Login'

export async function AuthButtonServer() {
	const supabase = createServerComponentClient({ cookies })
	const { data: { session } } = await supabase.auth.getSession()

	return <AuthButton session={session} />
}
