import { supabase } from '@/utils/supabase'

export default async function sendLike(article_id: any) {
	const userId = ''

	try {
		const { data: postExists, error: postExistsError } = await supabase
			.from('posts')
			.select('id')
			.eq('article_id', article_id)
			.single()

		if (postExistsError) {
			console.error('Error checking if post exists:', postExistsError)
			return
		}

		if (!postExists) {
			console.error('Post does not exist')
			return
		}
		const user_id = userId
		const { data, error } = await supabase
			.from('likes')
			.upsert([{ post_id: article_id, user_id }])

		if (error) {
			console.error('Error sending like:', error)
		} else {
			console.log('Like sent successfully:', data)
		}
	} catch (error) {
		console.error('Error sending like:', error)
	}
}