import React from "react"
import { ImageAvatar } from "./AvatarBlog"

const formatedDate = { year: 'numeric', month: 'short', day: 'numeric' };


const articles = [{
	user: '93176365',
	name: 'Calcagni Gabriel',
	posted: `${formatedDate}`,
	title: 'Exciting News: "I am grateful to present to you this project from NeoTecs."',
	description: 'Explore our comprehensive web documentation designed to guide you through the process of programming and configuring wireless access points from various leading brands. Whether you are a seasoned developer or just getting started, our documentation offers step-by-step instructions, code examples, and valuable insights to streamline your experience.',
}]


export default function MyBlog() {
	return (
		<main className="text-slate-100">
			{[
				articles.map(({ user, name, title, description, posted }) => (
					<div className='w-1/2 space-y-6 border border-slate-800 rounded p-6'>
						<header>
							<span>{posted}</span>
							<h1 className="text-2xl font-semibold my-2">{title}</h1>
							<p>{description}</p>
						</header>
						<aside className="flex space-x-3">
							<ImageAvatar key={user} user={user} />
							<div className='flex-col'>
								<span className='font-bold'>{name}</span>
								<p className='font-light text-[#5D5D5D]'>NeoTecs Dev</p>
							</div>
						</aside>
					</div>
				))
			]}
		</main>
	)
}
