export const FormatDate = ({ post }) => {
	const formatDate = (dateString) => {
		const formattedDate = new Date(dateString).toLocaleDateString('es-ES', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: 'numeric',
			minute: '2-digit'
		})
		return formattedDate
	}
	return <span className='text-zinc-400 text-sm'>{formatDate(post.posted)}</span>
}
