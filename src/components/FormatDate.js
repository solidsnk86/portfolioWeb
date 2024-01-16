export default function FormatDate(dateString) {
	const formattedDate = new Date(dateString).toLocaleDateString('es-ES', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: '2-digit'
	})
	return formattedDate
}
