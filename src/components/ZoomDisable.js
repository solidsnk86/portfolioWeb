export default function disableZoom() {
	if (typeof window !== 'undefined') {
		let metaViewport = document.querySelector('meta[name="viewport"]')
		if (metaViewport) {
			metaViewport.setAttribute(
				'content',
				'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
			)
		} else {
			metaViewport = document.createElement('meta')
			metaViewport.setAttribute('name', 'viewport')
			metaViewport.setAttribute(
				'content',
				'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
			)
			document.head.appendChild(metaViewport)
		}
	}
}
