import { Html, Head, Main, NextScript } from 'next/document'
import disableZoom from '../components/ZoomDisable.js'
import { useEffect } from 'react'

export default function Document() {
	useEffect(() => {
		disableZoom()
	}, [])

	return (
		<Html lang='es-ES'>
			<Head />
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
