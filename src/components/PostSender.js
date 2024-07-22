import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useIP } from './GetIP'
import { resizeTextarea } from './BlogForm'

export function PostSender() {
	const { t } = useTranslation()
	const ipData = useIP()

	const [formData, setFormData] = useState({
		ip: '',
		city: '',
		title: '',
		description: '',
		message: ''
	})

	const {
		register,
		handleSubmit,
		reset,
		formState: { isSubmitting }
	} = useForm()

	useEffect(() => {
		if (ipData.ip_address && ipData.city_name) {
			setFormData((prev) => ({ ...prev, ip: ipData.ip_address, city: ipData.city_name }))
		}

		resizeTextarea()
	}, [ipData])

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const sendFormData = async () => {
		try {
			const res = await fetch('/api/post-sender', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			})

			if (res.ok) {
				reset()
				setTimeout(() => {
					location.reload()
				}, 600)
				setFormData((prev) => ({
					ip: prev.ip,
					city: prev.city,
					title: '',
					description: '',
					message: ''
				}))
			} else {
				console.error('Data not sent properly', res.statusText)
			}
		} catch (error) {
			console.error('Error sending data', error)
		}
	}

	return (
		<div>
			<h2 className='text-3xl text-zinc-100 font-bold text-center md:py-10 py-8'>
				{t('postTitle')}
			</h2>
			<form
				onSubmit={handleSubmit(sendFormData)}
				className='grid justify-center mx-auto text-zinc-300 gap-3 border border-zinc-800 p-4 rounded-md m-4 w-fit post-form'
			>
				<input
					{...register('title')}
					name='title'
					value={formData.title}
					onChange={handleChange}
					placeholder={'Title'}
					required
				/>
				<input
					{...register('description')}
					name='description'
					value={formData.description}
					onChange={handleChange}
					placeholder={'Description'}
					required
				/>
				<textarea
					{...register('message')}
					className='border-none resize-none'
					id='text-area'
					name='message'
					value={formData.message}
					onChange={handleChange}
					placeholder={t('comment')}
					maxLength={100}
					required
				/>
				<button
					id='send-button'
					type='submit'
					disabled={isSubmitting}
					className='bg-sky-600 text-zinc-300 font-semibold rounded-full hover:brightness-125 active:border-[#928BF9]'
				>
					{isSubmitting ? t('sending') : t('send')}
				</button>
			</form>
		</div>
	)
}
