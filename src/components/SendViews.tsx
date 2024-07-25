import { supabase } from '@/utils/supabase'

export default async function sendViews(id) {
	try {
		const { data, error } = await supabase.from('posts').upsert([{ views: id }])

		if (error) {
			console.error('Error sending views:', error)
		} else {
			console.log('Views sent successfully:', data)
		}
	} catch (error) {
		console.error('Error sending views:', error)
	}

	return sendViews(id)
}
