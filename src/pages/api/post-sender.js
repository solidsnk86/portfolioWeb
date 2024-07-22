import { supabase } from '@/utils/supabase'

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const { title, description, message, ip, city } = req.body

		const { data, error } = await supabase
			.from('posts')
			.insert([{ title, description, message, ip, city }])

		if (error) {
			return res
				.status(500)
				.json({ error: 'Error sending data to database', details: error.message })
		}

		return res.status(200).json({ success: true, message: 'Data sent correctly to database', data })
	} else {
		res.status(405).json({ error: 'Method not allowed' })
	}
}
