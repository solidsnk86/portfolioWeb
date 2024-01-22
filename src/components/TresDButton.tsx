import { useTranslation } from 'react-i18next'
import { TwitterIcon } from './TwitterIcon'

export const TresDButton = () => {
	const { t } = useTranslation()
	const followMe = () => {
		const twitterUrl = 'https://twitter.com/CalcagniGabriel'
		window.open(twitterUrl)
	}
	return (
		<article className='justify-center flex m-auto my-10'>
			<button type='button' className='button' onClick={followMe}>
				<div className='button-top font-bold'>
					{t('twitterButton')} <TwitterIcon className='w-4 h-4 inline-flex ml-1 font-bold x-shadow' />
				</div>
				<div className='button-bottom'></div>
				<div className='button-base'></div>
			</button>
		</article>
	)
}
