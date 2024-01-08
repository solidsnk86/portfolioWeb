import AuthButton from '@/pages/Login'

export const BlogHeader = ({ session }) => {
	return (
		<header className='text-slate-100 flex flex-col justify-center m-auto p-6 pt-12 xl:w-1/2 space-y-3'>
			<h1 className='text-4xl font-bold text-shadow-md shadow-slate-100'>Welcome to my Blog!</h1>
			<hr className='border-zinc-600' />
			<ul className='pt-6'>
				<li className='text-zinc-400'>Latest Posts:</li>
			</ul>
		</header>
	)
}
