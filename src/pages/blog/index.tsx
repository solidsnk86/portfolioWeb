import { FetchPost } from '@/components/FetchPosts'
import { Footer } from '@/components/Footer'
import Visit from '@/components/Visits'

function Blog() {
	return (
		<>
			<main className='m-4'>
				<h1 className='text-4xl font-bold text-center text-zinc-300 my-10'>Blog</h1>
				<article className='my-6'>
					<p className='w-1/2 justify-center mx-auto bg-gray-100 border border-gray-300 p-5 rounded-lg shadow-lg text-gray-800 text-pretty'>
						¡Bienvenido a mi blog! Aquí encontrarás una amplia variedad de contenido sobre las
						últimas noticias relevantes en el mundo de la programación y tutoriales detallados para
						aprender sobre configuraciones de dispositivos inalámbricos como Wi-Fi, entre otros. Mi
						objetivo es proporcionarte información actualizada y recursos útiles para que puedas
						estar al día en tecnología y mejorar tus habilidades técnicas. ¡Espero que disfrutes y
						encuentres valiosa la información compartida!
					</p>
				</article>
				<FetchPost />
				<Footer />
				<Visit className='mt-10' />
			</main>
		</>
	)
}

export default Blog

Blog.title = 'Blog'
