import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'

const formSchema = z.object({
	nombre: z.string().min(1, { message: 'El nombre es requerido' }),
	telefono: z
		.number({ invalid_type_error: 'El teléfono debe ser un número' })
		.int('El teléfono debe ser un número entero')
		.positive('El teléfono debe ser un número positivo'),
	correo: z.string().email({ message: 'Correo electrónico inválido' }),
	asunto: z
		.string()
		.min(1, { message: 'El asunto es requerido' })
		.max(50, { message: 'El asunto no debe exceder 50 caracteres' }),
	mensaje: z
		.string()
		.min(50, { message: 'El mensaje debe tener al menos 50 caracteres' })
		.max(160, { message: 'El mensaje no debe exceder 160 caracteres' })
})

type FormData = z.infer<typeof formSchema>

const ContactForm = () => {
	const { t } = useTranslation()
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting }
	} = useForm<FormData>({
		resolver: zodResolver(formSchema)
	})

	const [mensaje, setMensaje] = useState('')

	useEffect(() => {
		function resize() {
			const comentario = document.getElementById('mensaje')
			if (comentario) {
				comentario.style.height = 'auto'
				comentario.style.height = comentario.scrollHeight + 'px'
			}
		}

		resize()
	}, [mensaje])

	const onSubmit = async (data: FormData) => {
		try {
			const response = await fetch('/api/send-mail', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			})

			if (response.ok) {
				toast.success(
					`Muchas gracias por tu mensaje ${data.nombre}. Estaremos en contacto pronto al correo ${data.correo}!`,
					{
						position: 'top-center',
						theme: 'dark'
					}
				)
				reset()
				setMensaje('')
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
		<div className='md:max-w-sm max-w-xs mx-auto'>
			<h2 className='text-3xl text-zinc-100 font-bold text-center md:py-10 py-8'>{t('contact')}</h2>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='grid gap-3 contact-form'
			>
				<input {...register('nombre')} placeholder={t('name')} />
				{errors.nombre && <small className='error'>{errors.nombre.message}</small>}

				<input {...register('telefono')} placeholder={t('telephone')} />
				{errors.telefono && <small className='error'>{errors.telefono.message}</small>}

				<input {...register('correo')} placeholder={t('email')} />
				{errors.correo && <small className='error'>{errors.correo.message}</small>}

				<input {...register('asunto')} placeholder={t('subject')} />
				{errors.asunto && <small className='error'>{errors.asunto.message}</small>}

				<textarea
					{...register('mensaje')}
					id='mensaje'
					placeholder={t('comment')}
					onChange={(e) => setMensaje(e.target.value)}
				/>
				{errors.mensaje && <small className='error'>{errors.mensaje.message}</small>}

				<button
					type='submit'
					disabled={isSubmitting}
					className='border border-zinc-800 rounded-md p-2 text-zinc-100 hover:border-zinc-700 hover:brightness-125 active:border-[#928BF9]'
				>
					{isSubmitting ? t('sending') : t('send')}
				</button>
			</form>
			<ToastContainer closeButton closeOnClick />
		</div>
	)
}

export default ContactForm
