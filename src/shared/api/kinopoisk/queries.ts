import { kinoPoiskFetch } from './http'
import type { MovieDetailsDto, MoviePreviewDto } from './types'

type FetchParams = {
	year: number
	limit: number
}

type FetchTopParams = FetchParams & { type?: '1' | '2' }

export const fetchMoviesByYear = ({ year, limit, type }: FetchTopParams) => {
	const typeQuery = type ? `field=typeNumber&search=${type}&` : ''
	return kinoPoiskFetch<{ docs: MoviePreviewDto[] }>(
		`${typeQuery}` +
			`field=year&search=${year}&` +
			`field=rating.kp&search=7-10&` +
			`sortField=rating.kp&sortType=1&` +
			`limit=${limit}`,
	)
}

export const fetchMovieById = (id: number) =>
	kinoPoiskFetch<{ docs: MovieDetailsDto[] }>(
		`field=id&search=${id}&selectFields=poster&selectFields=videos&selectFields=name&selectFields=description&selectFields=genres&selectFields=countries&selectFields=persons&selectFields=year&`,
	)

export const searchMoviesByName = (query: string) =>
	kinoPoiskFetch<{ docs: MoviePreviewDto[] }>(
		`field=name&search=${query}&limit=4`,
	)

export const fetchBannersByYear = ({ year, limit }: FetchParams) => {
	return kinoPoiskFetch<{ docs: MovieDetailsDto[] }>(
		`field=year&search=${year}&sortType=1&limit=${limit}&selectFields=poster&selectFields=videos&selectFields=name&selectFields=description&selectFields=logo`,
	)
}
