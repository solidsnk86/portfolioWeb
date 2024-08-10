export const HomeTitle = ({ Tag = 'h2', children, className = '' }) => {
	return (
		<Tag
			id='proyectos'
			className={`${className} flex justify-center m-auto my-36 text-sky-100 text-4xl xl:text-5xl md:text-5xl font-bold`}
		>
			{children}
		</Tag>
	)
}

export default HomeTitle
