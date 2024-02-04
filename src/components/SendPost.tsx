import { useState } from 'react'
import { supabase } from '@/utils/supabase'
import { v4 as uuidv4 } from 'uuid'
import sendViews from '@/components/SendViews'

export default async function sendPost({ session }) {
	const [posts, setPosts] = useState([])
	const userId = session?.user?.id || ''

	const [newPost, setNewPost] = useState({
		user_id: userId,
		name: '',
		company_dev: '',
		title: '',
		description: '',
		url: '',
		posted: new Date().toISOString(),
		article_id: uuidv4()
	})
	try {
		const { data, error } = await supabase.from('posts').upsert([newPost])

		if (error) {
			console.error('Error sending post:', error)
		} else {
			console.log('Post sent successfully:', data)
			sendViews(newPost.article_id)
			setPosts([...posts, { ...newPost, user_id: userId }])
		}
	} catch (error) {
		console.error('Error sending post:', error)
	}
	setNewPost(session)

	return posts
}