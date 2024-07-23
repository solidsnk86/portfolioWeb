import React from 'react'
import { cn } from '@/lib/utils'

interface HeaderProps {
	className?: string
	h1?: string
}

export const Header: React.FC<HeaderProps> = ({ className, h1 }) => {
	return (
		<header className={`h-14 ${className}`}>
			<nav>
				<h3 className={cn('font-semibold text-2xl', h1)}>Dashboard</h3>
			</nav>
		</header>
	)
}
