import { useEffect, useState } from 'react'
import { Header } from './components/Header'

const BASE_URL = import.meta.env.VITE_BASE_URL
const API_KEY = import.meta.env.VITE_HEADER_API

function App() {
	const [data, setData] = useState([])
	useEffect(() => {
		const fetchApi = async () => {
			try {
				const res = await fetch(
					`${BASE_URL}/movie?field=year&search=2025-2026&sortField=year&sortType=-1&limit=1`,
					{
						headers: {
							'X-API-KEY': API_KEY,
						},
					},
				)
				if (!res.ok) {
					throw new Error('API Error')
				}
				const data = await res.json()
				setData(data.docs)
			} catch (error) {
				console.log(error)
			}
		}
		// fetchApi()
	}, [])
	console.log(data)
	return (
		<>
			<Header />
		</>
	)
}

export default App
