import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { MessageCircleIcon } from 'lucide-react'
import { InfoCircle } from 'tabler-icons-react'

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
				<h1 className='text-xl font-semibold border-l-4 border-zinc-600 pl-3'>
					What Can You Post?
				</h1>
				<ul className='list-decimal m-8 space-y-2 text-sm xl:text-[16px]'>
					<li>Basically you can post whatever</li>
					<li>What's going on?</li>
				</ul>
				<div className='border-l-4 border-red-500 px-1 w-fit bg-opacity-[0.6] p-3 pl-4 text-red-500'>
					<p className='font-semibold text-lg'>
						<InfoCircle className='w-5 inline mb-1' /> Note
					</p>
					<p>This feature is in development, use with caution!</p>
				</div>
			</div>
			<button
				onClick={toggleForm}
				className='flex justify-center mx-auto font-bold cursor-pointer rounded-lg p-2 border border-zinc-600 outline-slate-200 outline-offset-2 outline-4 hover:bg-red-500'
			>
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
