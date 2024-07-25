import React from 'react'
import { cn } from '@/lib/utils'

interface HeaderProps {
	className?: string
	h3?: string
}

const Header: React.FC<HeaderProps> = ({ className, h3 }) => {
	return (
		<header className={`relative bg-[#1C1C1C] ${className}`}>
			<h3 className={cn('text-md font-semibold', h3)}> SolidSnk86</h3>
		</header>
	)
}

export default Header
