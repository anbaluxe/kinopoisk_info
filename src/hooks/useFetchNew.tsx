import { useEffect, useState } from 'react'
import type { MovieItem } from '../types/MovieItemType'

const BASE_URL = import.meta.env.VITE_BASE_URL
const API_KEY = import.meta.env.VITE_HEADER_API

export const useFetchNew = (year: string) => {
	const [data, setData] = useState<MovieItem[]>([])
	useEffect(() => {
		const fetchApi = async () => {
			try {
				const res = await fetch(
					`${BASE_URL}?field=year&search=${year}&sortField=votes.kp&sortType=-1&limit=2`,
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
				console.log(data)
				setData(data.docs)
			} catch (error) {
				console.log(error)
			}
		}
		fetchApi()
	}, [year])
	return data
}
