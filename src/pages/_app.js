import '@/styles/globals.css'
import { I18nextProvider } from 'react-i18next'
import i18n from '../lib/i18next'
import React, { useEffect } from 'react'
import disableZoom from '../components/ZoomDisable.js'

const App = ({ Component, pageProps }) => {
	useEffect(() => {
		try {
			disableZoom()
		} catch (error) {
			throw new Error(error)
		}
	}, [])

	return (
		<I18nextProvider i18n={i18n}>
			<Component {...pageProps} />
		</I18nextProvider>
	)
}

export default App
