export function resizeTextarea() {
	const textarea = document.getElementById('text-area')
	if (textarea) {
		textarea.addEventListener('input', () => {
			textarea.style.height = 'auto'
			textarea.style.height = textarea.scrollHeight + 'px'
		})
	}
}
