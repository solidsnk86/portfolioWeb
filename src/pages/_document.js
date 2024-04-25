import { Html, Head, Main, NextScript } from 'next/document'
import disableZoom from '../components/ZoomDisable.js'
import { useEffect } from 'react'

export default function Document() {
	useEffect(() => {
		try {
			disableZoom()
		} catch (error) {
			throw new Error(error)
		}
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
