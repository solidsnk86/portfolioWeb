import Link from 'next/link'
import { supabase } from '@/utils/supabase'
import { redirect } from 'next/navigation'

export default function Page({ searchParams }: { searchParams: { message: string } }) {
	const signInWithGitHub = async () => {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'github',
			options: {
				redirectTo: 'http://localhost:3000/auth/callback'
			}
		})

		if (error) {
			return redirect('/login?message=Could not authenticate user')
		}

		return redirect(data.url)
	}

	return (
		<div className='flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2'>
			<Link
				href='/'
				className='absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm'
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='24'
					height='24'
					viewBox='0 0 24 24'
					fill='none'
					stroke='currentColor'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
					className='mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1'
				>
					<polyline points='15 18 9 12 15 6' />
				</svg>{' '}
				Back
			</Link>

			<form
				className='flex-1 flex flex-col w-full justify-center gap-2 text-foreground'
				onSubmit={async (e) => {
					e.preventDefault()
					await signInWithGitHub()
				}}
			>
				<button
					className='w-fit bg-[#24292e] text-white rounded-md px-4 py-2 text-foreground mb-2 flex items-center justify-center'
					type='submit'
				>
					<svg viewBox='0 0 24 24' width='24' height='24' className='mr-2'>
						<path
							fill='currentColor'
							d='M12 0a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2 0 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.4 1 .2-.8.5-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8 0 3.2.9.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1 .9 2.2v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 0z'
						/>
					</svg>
					Sign In with GitHub
				</button>
				{searchParams?.message && (
					<p className='mt-4 p-4 bg-foreground/10 text-foreground text-center'>
						{searchParams.message}
					</p>
				)}
			</form>
		</div>
	)
}
