import { useEffect, useState } from 'react'
import type { MovieItem } from '../types/MovieItemType'

const BASE_URL = import.meta.env.VITE_BASE_URL
const API_KEY = import.meta.env.VITE_HEADER_API

interface useFetchProps {
	year?: number | string
	limit?: number
	type?: string
	id?: string
}

export const useFetchNew = ({
	year = 2025,
	limit = 6,
	type = '',
	id,
}: useFetchProps) => {
	const typeInfo = type ? `field=typeNumber&search=${type}&` : ''
	const banner =
		type === 'banner'
			? `field=year&search=${year}&sortType=1&limit=${limit}&selectFields=poster&selectFields=videos&selectFields=name&selectFields=description&selectFields=logo`
			: ''
	const cards =
		type === '1' || type === '2' || type.length === 0
			? `field=year&search=${year}&` +
				`field=rating.kp&search=7-10&` +
				`sortField=rating.kp&sortType=1&` +
				`limit=${limit}` +
				`${typeInfo}`
			: ''
	const ids = id ? `field=id&search=${id}` : null
	const [data, setData] = useState<MovieItem[]>([])
	useEffect(() => {
		const fetchApi = async () => {
			try {
				const res = await fetch(
					`${BASE_URL}?` + `${ids ? ids : cards ? cards : banner}`,
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
	}, [cards, banner, ids])
	return data
}
