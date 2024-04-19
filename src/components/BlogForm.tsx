import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { MessageCircleIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

function resizeTextarea() {
	const textarea = document.getElementById('text-area')
	if (textarea) {
		textarea.addEventListener('input', () => {
			textarea.style.height = textarea.scrollHeight + 'px'
		})
	}
}

const BlogForm = ({ newPost, setNewPost, sendPost }) => {
	const { t } = useTranslation()

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

	useEffect(() => {
		resizeTextarea()
	}, [])

	return (
		<section className='xl:w-1/2 xl:justify-center xl:m-auto'>
			<div className='m-10'>
				<h1 className='text-xl font-semibold border-l-4 border-zinc-600 pl-3'>{t('whatCanI')}</h1>
				<ul className='list-decimal m-8 space-y-2 text-sm xl:text-[16px]'>
					<li>{t('m1')}</li>
					<li>{t('m2')}</li>
				</ul>
			</div>
			<button
				onClick={toggleForm}
				className='flex justify-center mx-auto font-bold cursor-pointer rounded-lg p-2 border border-zinc-600 outline-slate-200 outline-offset-2 outline-4 hover:bg-red-500'
			>
				{t('buttonPost')} <MessageCircleIcon className='mx-1' />
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
					placeholder={t('name')}
					className='placeholder:text-slate-100'
					onChange={(e) => setNewPost({ ...newPost, name: e.target.value })}
				/>
				<input
					type='text'
					{...register('user_id')}
					placeholder={t('githubUser')}
					className='placeholder:text-slate-100'
					onChange={(e) => setNewPost({ ...newPost, user_id: e.target.value })}
				/>
				<input
					type='text'
					{...register('title')}
					placeholder={t('titlePost')}
					className='placeholder:text-slate-100'
					onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
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
					placeholder={t('urlPost')}
					className='placeholder:text-slate-100'
					onChange={(e) => setNewPost({ ...newPost, url: e.target.value })}
				/>
				<textarea
					{...register('description')}
					placeholder={t('postDescription')}
					className='placeholder:text-zinc-400 text-area'
					id='text-area'
					maxLength={500}
					onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
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
