export const BackgroundFlares = () => {
	return (
		<div className='flares w-full h-full'>
			<img
				src='img/flare-top.png'
				loading='lazy'
				sizes='(max-width: 1920px) 100vw, 1920px'
				srcSet='img/flare-top-500.png 500w, img/flare-top-800.png 800w, img/flare-top-1080.png 1080w, img/flare-top.png 1920w'
				alt=''
				className='flares-top w-full h-full'
			/>
			<img
				src='img/flare-right.png'
				loading='lazy'
				sizes='(max-width: 1622px) 100vw, 1622px'
				srcSet='img/flare-right-500.png 500w, img/flare-right-800.png 800w, img/flare-right-1080.png 1080w, img/flare-right.png 1622w'
				alt=''
				className='new-flare-nav top-right hide-mobile w-full h-full'
			/>
			<img
				src='img/flare-left.png'
				loading='lazy'
				sizes='(max-width: 1518px) 100vw, 1518px'
				srcSet='img/flare-left-500.png 500w, img/flare-left-800.png 800w, img/flare-left.png 1518w'
				alt=''
				className='new-flare-nav top-left hide-mobile w-full h-full'
			/>
		</div>
	)
}

export default BackgroundFlares