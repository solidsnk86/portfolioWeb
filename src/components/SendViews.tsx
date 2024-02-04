import { supabase } from '@/utils/supabase'

export default async function sendViews(articleId) {
	try {
		const { data, error } = await supabase.from('views').upsert([{ article_id: articleId }])

		if (error) {
			console.error('Error sending views:', error)
		} else {
			console.log('Views sent successfully:', data)
		}
	} catch (error) {
		console.error('Error sending views:', error)
	}

	return sendViews(articleId)
}
