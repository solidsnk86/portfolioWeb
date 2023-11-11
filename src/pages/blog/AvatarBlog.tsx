export const ImageAvatar = ({ user }) => {
	return (
		<div>
			<img src={`https://avatars.githubusercontent.com/u/${user}?v=4`}
				className="rounded-full"
				alt="Avatar Image."
				width={45}
				height={45}
			/>
		</div>
	)
}