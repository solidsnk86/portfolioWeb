export default function FormatPostDate(timestamp: string | number | Date) {
	const date = new Date(timestamp).toLocaleDateString('es-Es', {
		month: 'short',
		day: '2-digit'
	})
	return date
}
