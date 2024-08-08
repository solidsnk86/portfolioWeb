import React, { useState, useEffect } from 'react'

interface TypingEffectProps {
	children: string
	typingSpeed?: number
}

const TypingEffect: React.FC<TypingEffectProps> = ({ children, typingSpeed }) => {
	const [text, setText] = useState('')

	useEffect(() => {
		setText('')
		const typeText = async () => {
			for (let i = 0; i <= children.length; i++) {
				setText(children.slice(0, i))
				await new Promise((resolve) => setTimeout(resolve, typingSpeed))
			}
		}
		typeText()
	}, [children, typingSpeed])

	return <span className='welcome'>{text}</span>
}

export default TypingEffect
