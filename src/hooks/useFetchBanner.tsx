import { useEffect, useState } from 'react'

const BASE_URL = import.meta.env.VITE_BASE_URL
const API_KEY = import.meta.env.VITE_HEADER_API

export const useFetchBanner = () => {
	const [data, setData] = useState([])
	useEffect(() => {
		const fetchApi = async () => {
			try {
				const res = await fetch(
					`${BASE_URL}/movie?&field=year&search=2026&sortType=-1&limit=1&selectFields=poster&selectFields=videos&selectFields=name&selectFields=description&selectFields=logo`,
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
		fetchApi()
	}, [])
	return data
}
