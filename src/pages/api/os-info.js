import os from 'node:os'

const formatDate = (string) => {
	const date = new Date(string).toLocaleDateString('es-ES', {
		year: 'numeric',
		month: 'long',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit'
	})
	return date
}

export default function handler(req, res) {
	try {
		res.status(200).json({
			success: true,
			timestamp: formatDate(Date.now()),
			'server-info': {
				system: {
					processor: os.cpus().shift().model.trim(),
					'cpu-cores': os.cpus().length / 2,
					'cpu-threads': os.cpus().length + ' CPUs',
					'cpu-speed': os.cpus().shift().speed + ' GHz',
					'total-memory': (os.totalmem() / 1024 ** 3).toFixed(2) + ' GB',
					'available-memory': (os.freemem() / 1024 ** 3).toFixed(2) + ' GB',
					OS: os.version(),
					build: os.release().replace(/10.0./, ''),
					arch: os.arch() + ' bits',
					user: os.userInfo().username
				}
			}
		})
	} catch (error) {
		console.error('No ha sido posible desplegar la API')
		res.status(500).json({
			success: false,
			message: 'Error message: ' + error.message
		})
	}
}
