import { useState, useEffect } from 'react'
import { supabase } from '@/utils/supabase'

export default function ArticlesViews() {
	const [articleViews, setViews] = useState({})

	useEffect(() => {
		const fetchArticleViews = async () => {
			try {
				const { data, error } = await supabase.from('views').select()

				if (error) {
					console.error('Error fetching article views:', error)
				} else {
					const viewsData = data.reduce((acc, view) => {
						if (!acc[view.article_id]) {
							acc[view.article_id] = 0
						}
						acc[view.article_id]++
						return acc
					}, {})

					setViews(viewsData)
				}
			} catch (error) {
				console.error('Error fetching article views:', error)
			}
		}
		fetchArticleViews()
	}, [])

	return articleViews
}