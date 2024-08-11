import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const createClient = () => {
	const cookieStore = cookies()

	return createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookieOptions: {
				get(name: string) {
					const cookie = cookieStore.get(name)
					return cookie ? cookie.value : undefined
				},
				set(name: string, value: string, options?: any) {
					try {
						cookieStore.set(name, value, options)
					} catch (error) {
						console.error('Error:', error)
					}
				},
				delete(name: string) {
					try {
						cookieStore.delete(name)
					} catch (error) {
						console.error('Error:', error)
					}
				},
				setAll(cookiesToSet: { name: string; value: string; options?: any }[]) {
					try {
						cookiesToSet.forEach(({ name, value, options }) => {
							cookieStore.set(name, value, options)
						})
					} catch (error) {
						console.error('Error:', error)
					}
				}
			},
			cookies: {
				get: function (): Promise<string | null | undefined> | string | null | undefined {
					throw new Error('Function not implemented.')
				},
				set: function (_key: string, _value: string): Promise<void> | void {
					throw new Error('Function not implemented.')
				},
				remove: function (_key: string): Promise<void> | void {
					throw new Error('Function not implemented.')
				}
			}
		}
	)
}
