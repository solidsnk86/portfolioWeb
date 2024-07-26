import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useIP } from '../../../components/GetIP'
import { resizeTextarea } from '../../../components/ResizeTextarea'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './Header'

export const PostSender = () => {
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
		if (ipData.ip && ipData.city.name && ipData.country.name && ipData.country.flag) {
			setFormData((prev) => ({
				...prev,
				ip: ipData.ip.address,
				city: ipData.city.name,
				country: ipData.country.name,
				flag: ipData.country.flag
			}))
		}

		resizeTextarea()
	}, [ipData])

	console.log(ipData)

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
					theme: 'light',
					hideProgressBar: true
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
			<Header
				className='h-[53px] border-b border-zinc-700 p-4 sticky top-0'
				h3=' -translate-y-[2px]'
			/>
			<h2 className='text-3xl text-zinc-100 font-bold text-center md:py-10 py-10'>Crear Blog</h2>
			<form
				onSubmit={handleSubmit(sendFormData)}
				className='justify-center bg-gray-300 mx-auto text-zinc-300 gap-3 border border-zinc-700 p-6 rounded-lg m-4 w-fit post-form mb-20'
			>
				<input
					{...register('title')}
					name='title'
					value={formData.title}
					onChange={handleChange}
					placeholder={'Título'}
					required
				/>

				<input
					{...register('description')}
					name='description'
					value={formData.description}
					onChange={handleChange}
					placeholder={'Descripción'}
					required
				/>
				<textarea
					{...register('message')}
					id='text-area'
					className='border-none resize-none'
					name='message'
					value={formData.message}
					onChange={handleChange}
					placeholder={'Mensaje'}
					maxLength={160}
					required
				/>
				<input
					{...register('url')}
					name='url'
					value={formData.url}
					onChange={handleChange}
					placeholder={'La URL de tu post'}
					required
				/>
				<button
					id='send-button'
					type='submit'
					disabled={isSubmitting}
					className='bg-sky-600 px-4 py-1 flex mx-auto w-fit text-zinc-300 font-semibold rounded-sm hover:brightness-125'
				>
					{isSubmitting ? 'Enviando' : 'Enviar'}
				</button>
			</form>
			<ToastContainer closeButton closeOnClick />
		</div>
	)
}

export default PostSender
