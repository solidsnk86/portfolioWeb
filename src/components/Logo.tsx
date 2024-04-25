import { interTight } from '../components/const'

export function Logo() {
	return (
		<h1
			className={`${interTight.className} mx-auto text-md font-black bg-clip-text text-transparent bg-gradient-to-r text-zinc-300 xl:pt-6 h-[120px] text-center min-w-[370px] text-[3.6rem] sm:text-[6rem] md:text-[6rem] lg:text-[10rem] xl:text-[8rem] transition-[ease] cursor-default`}
		>
			<span className=' text-[#ffa600ab] [-webkit-text-stroke-width:2px] duration-500 transition-colors relative bottom-[2px] [-webkit-text-stroke-color:#D4D4D8]'>
				solid
			</span>
			Snk86
		</h1>
	)
}
