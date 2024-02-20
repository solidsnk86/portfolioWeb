import '@/styles/globals.css'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import i18n from '../lib/i18next'

const App = ({ Component, pageProps }) => {
	return (
		<I18nextProvider i18n={i18n}>
			<Component {...pageProps} />
		</I18nextProvider>
	)
}

export default App
