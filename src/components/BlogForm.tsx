import React from 'react'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { MessageCircleIcon } from 'lucide-react'

const BlogForm = ({ newPost, setNewPost, sendPost }) => {
	const [showForm, setShowForm] = useState(false)
	const {
		register,
		handleSubmit,
		formState: { isSubmitting }
	} = useForm()

	const onSubmit = async (data) => {
		await sendPost(data)
	}

	const toggleForm = () => {
		setShowForm(!showForm)
	  }

	return (
		<section className='xl:w-1/2 xl:justify-center xl:m-auto'>
			<div className='m-10'>
				<h1 className='text-xl font-semibold border-l-4 border-zinc-600 my-3 pl-3'>
					What Can You Post?
				</h1>
				<ul className='list-decimal m-8 space-y-2 text-sm xl:text-[16px]'>
					<li>
						🍪 Projects Showcase:
						<br /> Share your latest and greatest projects! Whether it's a web app, a mobile
						application, or even a hardware project, I want to see what you've been working on.
						Don't forget to include details about the technologies you used and the challenges you
						overcame.
					</li>
					<li>
						⏳ At the moment in this blog, everyone can post. I'm working 👨‍💻 on the user login auth
						to generate a post with the user's GitHub avatar and username!
					</li>
					<li className='border-l-4 border-red-500 rounded border px-1 w-fit bg-red-900 bg-opacity-[0.6]'>
						🍦 This feature is in development, use with caution!
					</li>
				</ul>
			</div>
			<button onClick={toggleForm} className='flex font-bold cursor-pointer rounded-lg p-2 border border-zinc-600 outline-slate-200 outline-offset-2 outline-4 hover:bg-red-500'>
			Post Something! <MessageCircleIcon className='mx-1' />
			</button>
			<form
        className={`${
          showForm ? 'block' : 'hidden'
        } flex flex-col gap-4 items-center m-auto justify-center text-slate-100 p-5 form`}
        onSubmit={handleSubmit(onSubmit)}
      >
				<input
					type='text'
					{...register('name')}
					placeholder='Name'
					className='placeholder:text-slate-100'
					onChange={(e) => setNewPost({ ...newPost, name: e.target.value })}
				/>
				<input
					type='text'
					{...register('user_id')}
					placeholder='User GitHub ID'
					className='placeholder:text-slate-100'
					onChange={(e) => setNewPost({ ...newPost, user_id: e.target.value })}
				/>
				<input
					type='text'
					{...register('title')}
					placeholder='Post Title'
					className='placeholder:text-slate-100'
					onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
				/>
				<textarea
					{...register('description')}
					placeholder='Description about your post..'
					className='placeholder:text-zinc-400'
					maxLength={500}
					onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
				/>
				<input
					type='text'
					{...register('company_dev')}
					placeholder='Dev name'
					className='placeholder:text-slate-100'
					onChange={(e) => setNewPost({ ...newPost, company_dev: e.target.value })}
				/>
				<input
					type='text'
					{...register('url')}
					placeholder='Your site URL here'
					className='placeholder:text-slate-100'
					onChange={(e) => setNewPost({ ...newPost, url: e.target.value })}
				/>
				<button
					className='border border-salte-800 rounded-full px-4 py-1 my-2 hover:bg-zinc-100 hover:text-black font-bold'
					type='submit'
					disabled={isSubmitting}
				>
					{isSubmitting ? 'Posting' : 'Post'}
				</button>
			</form>
		</section>
	)
}

export default BlogForm
