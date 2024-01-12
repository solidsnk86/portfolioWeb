import { useTranslation } from 'react-i18next'

export const BlogHeader = () => {
	const { t } = useTranslation()
	return (
		<header className='text-slate-100 flex flex-col justify-center m-auto p-6 pt-12 xl:w-1/2 space-y-3'>
			<h1 className='text-4xl font-bold text-shadow-md shadow-slate-100'>{t('blogTitle')}</h1>
			<hr className='border-zinc-600' />
			<ul className='pt-6'>
				<li className='text-zinc-400'>{t('latestPost')}</li>
			</ul>
		</header>
	)
}
