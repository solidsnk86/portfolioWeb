import { useState, useEffect } from 'react'

const ChangeThemeColor = () => {
	const [theme, setTheme] = useState('')
	const oneDay = 1

	useEffect(() => {
		const intervalId = setInterval(() => {
			const newColor = getRamdomColor()
			setTheme(newColor)
		}, oneDay * 24 * 24 * 60 * 1000)

		return () => {
			clearInterval(intervalId)
		}
	}, [])

	const getRamdomColor = () => {
		const colors = ['#D4D4D8', '#48484C', '#23272E']
		const randomColor = Math.floor(Math.random() * colors.length)
		return colors[randomColor]
	}

	return theme
}
export default ChangeThemeColor
