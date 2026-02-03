const BASE_URL = import.meta.env.VITE_BASE_URL
const API_KEY = import.meta.env.VITE_HEADER_API

export const kinoPoiskFetch = async <T>(
	query: string,
	signal?: AbortSignal,
): Promise<T> => {
	const res = await fetch(`${BASE_URL}?${query}`, {
		headers: {
			'X-API-KEY': API_KEY,
		},
		signal,
	})
	if (!res.ok) {
		throw new Error('Kinopoisk API Error')
	}
	const data = await res.json()
	return data
}
