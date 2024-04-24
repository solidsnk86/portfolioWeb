import { ArrowLeft } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import React from 'react'

interface ButtonsProps {
	className?: string
}

export const BackButton: React.FC<ButtonsProps> = ({ className }) => {
	const { t } = useTranslation()

	return (
		<span
			className={`${className} flex xl:sticky w-fit left-[12px] top-[1.8rem] border hover:bg-zinc-800/10 group md:gap-8 hover:border-zinc-400/50 border-zinc-600 rounded-md p-1 hover:brightness-150 duration-300 cursor-pointer z-50`}
			title={t('backButton')}
			onClick={() => history.back()}
		>
			<ArrowLeft className='text-zinc-300' />
		</span>
	)
}
