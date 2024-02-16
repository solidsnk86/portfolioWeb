import { ogImg } from './const'
import { TwitterIcon } from '@/components/icons/TwitterIcon'

export default function TwitterShare() {
	const TwitterFollow = () => {
		const title = 'Portfolio solidsnk86'
		const encodeUri = encodeURIComponent(window.location.href)
		const urlImg = encodeURIComponent(ogImg)
		window.open(`https://twitter.com/share?url=${encodeUri}&title=${title}&image=${urlImg}`)
	}

	return (
		<div className='flex justify-center m-auto'>
			<span className='flex mx-1 my-3 text-[#00000] text-sm bg-[#1D9BF0] py-2 px-3 rounded cursor-pointer hover:opacity-[.6] transition-all' onClick={TwitterFollow}>
				<TwitterIcon className='w-4 h-4 mx-1 mt-[2px]' />
				¡Compartir en Twitter!
			</span>
		</div>
	)
}



