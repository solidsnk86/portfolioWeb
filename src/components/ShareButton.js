import { Share2Icon } from 'lucide-react'

export function ShareButton({ postTitle, postDescription, postUrl }) {
	const shareButton = () => {
		try {
			if (navigator.share) {
				navigator.share({
					title: postDescription,
					text: postTitle,
					url: postUrl
				})
			}
		} catch (error) {
			throw new Error(error)
		}
	}

	return (
		<section
			className='relative text-right space-x-4 text-lg cursor-pointer hover:opacity-[.6] transition-all text-primary'
			onClick={shareButton}
		>
			<Share2Icon className='inline-flex text-xl mx-4 mt-[1px]' title='Compartir' />
		</section>
	)
}
