export const BlogHeader = () => {
	return (
		<header className='text-slate-100 flex flex-col justify-center m-auto p-6 pt-12 xl:w-1/2 space-y-3'>
			<h1 className='text-4xl font-bold text-shadow-md shadow-slate-100'>Welcome to my Blog!</h1>
			<hr className='border-zinc-600' />
			<p>
				Here, I showcase my latest projects and other stuff, and I would love the idea of having
				your projects featured on this blog or even the stuff you consider intrest!. It's currently
				in the development and testing phase. Your participation would be greatly appreciated!
			</p>
			<ul className="pt-6">
				<li className="text-zinc-400">
					Latest Posts:
				</li>
			</ul>
		</header>
	)
}
