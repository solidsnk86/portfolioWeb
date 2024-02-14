import { renderToString } from 'react-dom/server'
import { MyIcon } from './MyIcon'
import { Inter, Inter_Tight as InterTight } from 'next/font/google'

export const title = 'Portfolio Calcagni Gabriel'
export const description = '¡Ey, pásate y echa un vistazo a mi portfolio!'
export const ogImg =
	'https://raw.githubusercontent.com/solidsnk86/NeoTecs/master/public/images/logos/NeoTecs_Tutorial_logo.png'

export const csvData = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL
export const geolocation = 'https://geolocation.microlink.io'

export const favicon = renderToString(<MyIcon />)

export const inter = Inter({ weight: ['400', '500', '600', '700', '900'], subsets: ['latin'] })
export const interTight = InterTight({ weight: ['500', '800', '900'], subsets: ['greek'] })
