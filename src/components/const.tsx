import { Inter, Inter_Tight as InterTight } from 'next/font/google'

export const title = 'Portfolio Calcagni Gabriel'
export const description = '¡Ey, pásate y echa un vistazo a mi portfolio!'
export const ogImg = 'https://raw.githubusercontent.com/solidsnk86/portfolioWeb/master/public/img/og/og-img.png'

export const csvData = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL
export const geolocation = 'https://geolocation.microlink.io'

export const favicon = 'https://github.com/solidsnk86/CV_GEC/blob/master/solidsnk86.png?raw=true'

export const inter = Inter({ weight: ['400', '500', '600', '700', '900'], subsets: ['latin'] })
export const interTight = InterTight({ weight: ['500', '800', '900'], subsets: ['greek'] })
