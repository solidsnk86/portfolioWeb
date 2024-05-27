import { supabase } from '../../utils/supabase'

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const { nombre, telefono, correo, tema, mensaje } = req.body

		const { data, error } = await supabase
			.from('contacto')
			.insert([{ nombre, telefono, correo, tema, mensaje }])

		if (error) {
			return res.status(500).json({ error: 'Error al enviar los datos', details: error.message })
		}

		return res.status(200).json({ success: true, message: 'Datos enviados correctamente', data })
	} else {
		return res.status(405).json({ error: 'Método no permitido' })
	}
}
