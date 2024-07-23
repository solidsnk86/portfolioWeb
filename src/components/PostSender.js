import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useIP } from './GetIP'
import { resizeTextarea } from './BlogForm'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function PostSender() {
	const { t } = useTranslation()
	const ipData = useIP()

	const [formData, setFormData] = useState({
		ip: '',
		city: '',
		country: '',
		flag: '',
		title: '',
		description: '',
		message: '',
		url: ''
	})

	const {
		register,
		handleSubmit,
		reset,
		formState: { isSubmitting }
	} = useForm()

	useEffect(() => {
		if (ipData.ip_address && ipData.city_name && ipData.country_name && ipData.country_flag) {
			setFormData((prev) => ({
				...prev,
				ip: ipData.ip_address,
				city: ipData.city_name,
				country: ipData.country_name,
				flag: ipData.country_flag
			}))
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
				toast.success('Post enviado Correctamente!', {
					position: 'top-center',
					theme: 'light'
				})
				setTimeout(() => {
					location.reload()
				}, 2000)
				setFormData((prev) => ({
					ip: prev.ip,
					city: prev.city,
					country: prev.country,
					flag: prev.flag,
					title: '',
					description: '',
					message: '',
					url: ''
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
			<h2 className='text-3xl text-zinc-100 font-bold text-center md:py-10 py-10'>
				{t('postTitle')}
			</h2>
			<form
				onSubmit={handleSubmit(sendFormData)}
				className='grid justify-center mx-auto text-zinc-300 gap-3 border border-zinc-800 p-4 rounded-md m-4 w-fit post-form mb-20'
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
					maxLength={125}
					required
				/>
				<input
					{...register('url')}
					name='url'
					value={formData.url}
					onChange={handleChange}
					placeholder={'Your URL post'}
					required
				/>
				<button
					id='send-button'
					type='submit'
					disabled={resizeTextarea}
					className='bg-sky-600 px-4 py-1 flex mx-auto w-fit text-zinc-300 font-semibold rounded-full hover:brightness-125'
				>
					{isSubmitting ? t('sending') : t('send')}
				</button>
			</form>
			<ToastContainer closeButton closeOnClick />
		</div>
	)
}
