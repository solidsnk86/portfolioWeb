import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

const ContactForm = () => {
	const { t } = useTranslation()
	const [formData, setFormData] = useState({
		nombre: '',
		telefono: '',
		correo: '',
		asunto: '',
		mensaje: ''
	})
	const {
		handleSubmit,
		formState: { isSubmitting }
	} = useForm()

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	useEffect(() => {
		function resize() {
			const comentario = document.getElementById('mensaje')
			if (comentario) {
				comentario.style.height = 'auto'
				comentario.style.height = comentario.scrollHeight + 'px'
			}
		}

		resize()
	}, [formData.mensaje])

	const onSubmit = async () => {
		if (
			!formData.nombre ||
			!formData.correo ||
			!formData.mensaje ||
			!formData.asunto ||
			!formData.telefono
		) {
			toast.warning(t('toastAlert'), {
				position: 'top-center',
				theme: 'dark'
			})
			return
		}
		try {
			const response = await fetch('/api/send-mail', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			})

			if (response.ok) {
				toast.success(
					`Muchas gracias por tu mensaje ${formData.nombre}. Estaremos en contacto pronto al correo ${formData.correo}!`,
					{
						position: 'top-center',
						theme: 'dark'
					}
				)
			} else {
				toast.error('Error al enviar el formulario. Por favor, intenta nuevamente más tarde.', {
					position: 'top-center',
					theme: 'dark'
				})
			}
		} catch (error) {
			toast.error('Error al enviar el formulario. Por favor, intenta nuevamente más tarde.', {
				position: 'top-center',
				theme: 'dark'
			})
		}
	}

	return (
		<div>
			<h2 className='text-3xl text-zinc-100 font-bold text-center md:py-10 py-8'>
				{t('contact')}
			</h2>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='grid justify-center mx-auto gap-3 contact-form'
			>
				<input
					name='nombre'
					value={formData.nombre}
					onChange={handleChange}
					placeholder={t('name')}
				/>
				<input
					name='telefono'
					value={formData.telefono}
					onChange={handleChange}
					placeholder={t('telephone')}
				/>
				<input
					name='correo'
					value={formData.correo}
					onChange={handleChange}
					placeholder={t('email')}
				/>
				<input
					name='asunto'
					value={formData.asunto}
					onChange={handleChange}
					placeholder={t('subject')}
				/>
				<textarea
					name='mensaje'
					id='mensaje'
					value={formData.mensaje}
					onChange={handleChange}
					placeholder={t('comment')}
				/>
				<button
					type='submit'
					disabled={isSubmitting}
					className='border border-zinc-800 rounded-md p-2 text-zinc-100 hover:border-zinc-700 hover:brightness-125 active:border-blue-600'
				>
					{isSubmitting ? t('sending') : t('send')}
				</button>
			</form>
			<ToastContainer closeButton closeOnClick />
		</div>
	)
}

export default ContactForm
