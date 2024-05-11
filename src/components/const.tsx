import { Github, Mail } from 'lucide-react'
import { Inter, Inter_Tight as InterTight } from 'next/font/google'
import { TwitterIcon } from '@/components/icons/TwitterIcon'

export const title = 'Portfolio Calcagni Gabriel'
export const description = '¡Ey, pásate y echa un vistazo a mi portfolio!'
export const ogImg =
	'https://raw.githubusercontent.com/solidsnk86/portfolioWeb/master/public/img/og/og-img.png'

export const csvData = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL
export const geolocation = 'https://geolocation.microlink.io'

export const favicon = 'https://github.com/solidsnk86/CV_GEC/blob/master/solidsnk86.png?raw=true'

export const inter = Inter({ weight: ['400', '500', '600', '700', '900'], subsets: ['latin'] })
export const interTight = InterTight({ weight: ['500', '800', '900'], subsets: ['greek'] })

export const documentEnCv =
	'https://docs.google.com/document/d/e/2PACX-1vR6-zR2iVWBSFHnQyRzIuAHQVb231uABnZMYT-jH4_EdG2zKLti8iQh2qqa4SRGZSiyrq1Yc03cx5hk/pub'
export const documentEsCv =
	'https://docs.google.com/document/d/e/2PACX-1vQAF9rx-XQdjxbFTheypncBwCN4gTdrKJhRIotss9eQhmnF_eF_SaHS2WKeTD6MMe1F3v1owExNCxlQ/pub'

export const socials = [
	{
		icon: <TwitterIcon />,
		href: 'https://twitter.com/CalcagniGabriel',
		label: 'Twitter',
		handle: '@CalcagniGabriel',
		title: 'Ir al perfil de Twitter de '
	},
	{
		icon: <Mail size={24} />,
		href: 'mailto:calcagni.gabriel86@gmail.com',
		label: 'Mail',
		handle: 'calcagni.gabriel86@gmail.com',
		title: 'Enviar correo electrónico a '
	},
	{
		icon: <Github size={24} />,
		href: 'https://github.com/solidsnk86',
		label: 'Github',
		handle: 'solidsnk86',
		title: 'Ir al perfil de Github de '
	}
]

export function dateFormat(repo) {
	const date = new Date(repo).toLocaleDateString('es-Es', {
		year: 'numeric',
		month: 'short',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit'
	})
	return date
}
