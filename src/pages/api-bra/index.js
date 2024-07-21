import React, { useState, useEffect } from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import useMatchMedia from '@/hooks/useMatchMedia'

const filterData = ({ type = '', key = '', data = [] }) => {
	return data.filter((d) => d[key] === type)
}

function ApiBra() {
	const [dataApi, setDataApi] = useState([])
	const [filterType, setFilterType] = useState('Alimentadora')

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch('http://gistapis.etufor.ce.gov.br:8081/api/linhas/', {
				mode: 'cors',
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			})

			const textData = await response.text()

			try {
				const dataJSON = JSON.parse(textData)
				setDataApi(dataJSON)
			} catch (error) {
				console.error('Failed to parse JSON', error)
			}
		}
		fetchData()
	}, [])

	const filteredData = filterData({ type: filterType, key: 'tipoLinha', data: dataApi })
	const mobile = useMatchMedia('(max-width: 768px)', false)

	return (
		<div className='mt-4 xl:m-10 m-2 text-zinc-50'>
			<label
				htmlFor='filterType'
				className='block mb-2 text-sm font-medium text-zinc-100'
			>
				Filtrar por tipo de línea:
			</label>
			<select
				id='filterType'
				value={filterType}
				onChange={(e) => setFilterType(e.target.value)}
				className='block w-1/2 p-2 mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500'
			>
				<option value='Convencional'>Convencional</option>
				<option value='Alimentadora'>Alimentadora</option>
				<option value='Troncal'>Troncal</option>
				<option value='Complementar'>Complementar</option>
			</select>

			<ResponsiveMasonry columnsCountBreakPoints={{ 750: 2, 900: 3, 1200: 4 }}>
				<Masonry gutter={mobile ? '0.2rem' : '0.3rem'}>
					{filteredData.map((data, index) => (
						<article
							key={index}
							className='text-pretty text-sm justify-center grid border border-zinc-800 rounded-md p-4'
						>
							<h2>Aerolínea: {data.nome}</h2>
							<p>Línea número: {data.numero}</p>
							<p>Tipo de línea: {data.tipoLinha}</p>
						</article>
					))}
				</Masonry>
			</ResponsiveMasonry>
		</div>
	)
}

export default ApiBra
