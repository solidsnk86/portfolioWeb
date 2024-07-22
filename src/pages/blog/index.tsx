import { FetchPost } from '@/components/FetchPosts'
import { PostSender } from '@/components/PostSender'

function Blog() {
	return (
		<main className='m-4'>
			<PostSender />
			<h1 className='text-4xl font-bold text-center text-zinc-300 my-6'>Blog</h1>
			<FetchPost />
		</main>
	)
}

export default Blog
