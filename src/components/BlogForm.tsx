const BlogForm = ({ newPost, setNewPost, sendPost }) => {
	return (
		<section className='xl:w-1/2 xl:justify-center xl:m-auto'>
			<div className='m-10'>
				<h1 className='text-xl font-semibold border-l-4 border-zinc-600 my-3 pl-3'>
					What Can You Post?
				</h1>
				<ul className='list-disc'>
					<li>
						Projects Showcase: Share your latest and greatest projects! Whether
						it's a web app, a mobile application, or even a hardware project, we want to see what you've
						been working on. Don't forget to include details about the technologies you used and the
						challenges you overcame.
					</li>
					<li>
						This feature is in development, use with caution!
					</li>
				</ul>
			</div>
			<form className='flex flex-col gap-4 items-center m-auto justify-center text-slate-100 p-5 form'>
				<input
					type='text'
					value={newPost.name}
					placeholder='Name'
					className='placeholder:text-slate-100'
					onChange={(e) => setNewPost({ ...newPost, name: e.target.value })}
				/>
				<input
					type='text'
					value={newPost.user}
					placeholder='User GitHub ID'
					className='placeholder:text-slate-100'
					onChange={(e) => setNewPost({ ...newPost, user_id: e.target.value })}
				/>
				<input
					type='text'
					value={newPost.title}
					placeholder='Post Title'
					className='placeholder:text-slate-100'
					onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
				/>
				<textarea
					value={newPost.description}
					placeholder='Description about your post..'
					className='placeholder:text-zinc-400 w-[64%] xl:w-[30%]'
					onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
				/>
				<input
					type='text'
					value={newPost.url}
					placeholder='Your site url here'
					className='placeholder:text-slate-100'
					onChange={(e) => setNewPost({ ...newPost, url: e.target.value })}
				/>
				<button
					className='border border-salte-800 rounded-full px-4 py-1 my-2 hover:bg-zinc-100 hover:text-black font-bold'
					type='button'
					onClick={() => sendPost()}
				>
					Post
				</button>
			</form>
		</section>
	)
}

export default BlogForm
