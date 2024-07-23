import { useIP } from '../components/GetIP'

export const detectIf = () => {
	const ip = useIP()

	if (
		ip.ip_address !== process.env.NEXT_PUBLIC_DATA_IP_1 &&
		ip.ip_address !== process.env.NEXT_PUBLIC_DATA_IP_2 &&
		ip.ip_address !== '45.178.0.111'
	) {
		return null
	} else {
		return ip
	}
}
