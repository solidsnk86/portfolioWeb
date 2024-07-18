export default function Experience() {
	const currentYear = new Date().getFullYear()
	let experience = currentYear - 2023
	return experience

	// const readLocal = () => {
	// 	if (typeof window !== 'undefined') {
	// 		const value = window.localStorage.getItem('language')
	// 		return value
	// 	}
	// }
	// const value = readLocal()
	// if (experience > 1 && value === 'es') {
	// 	return experience + ' ' + 'años'
	// } else if (experience > 1 && value === 'en') {
	// 	return experience + ' ' + 'years'
	// } else if (experience <= 1 && value === 'es') {
	// 	return experience + ' ' + 'año'
	// } else if (experience <= 1 && value === 'en') {
	// 	return experience + ' ' + 'year'
	// }
}
