import React from 'react'
import Link from 'next/link'
import { icons } from 'lucide-react'

interface Linkparams {
	url: string
	children?: string
	iconName?: string
	color?: string
	className?: string
}

export const LinkComponent: React.FC<Linkparams> = ({
	url,
	children,
	iconName,
	color,
	className
}) => {
	const Icon = icons[iconName]
	return (
		<Link href={url} className={className}>
			{children}
			{Icon && (
				<Icon className={`text-${color} mx-1 font-extralight h-[16px] -translate-x-[3px] inline`} />
			)}
		</Link>
	)
}
