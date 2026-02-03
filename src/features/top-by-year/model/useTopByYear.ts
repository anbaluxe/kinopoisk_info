import { mapMovieToCard } from '@/entities/movie/model/card/card.mappers'
import type { MovieCardTypes } from '@/entities/movie/model/card/card.types'
import { fetchMoviesByYear } from '@/shared/api/kinopoisk/queries'
import { useEffect, useState } from 'react'

type ContentType = 'films' | 'tv-show'

export const useTopByYear = ({
	year,
	type,
	limit = 10,
}: {
	year: number
	type: ContentType
	limit?: number
}) => {
	const [movies, setMovies] = useState<MovieCardTypes[]>([])

	useEffect(() => {
		const apiType = type === 'films' ? '1' : '2'

		const controller = new AbortController()
		let cancelled = false

		fetchMoviesByYear({ year, limit, type: apiType }, controller.signal)
			.then(res => {
				if (!cancelled) {
					setMovies(res.docs.map(mapMovieToCard))
				}
			})
			.catch(error => {
				const isAbort =
					typeof error === 'object' &&
					error !== null &&
					'name' in error &&
					error.name === 'AbortError'
				if (!cancelled && !isAbort) {
					setMovies([])
				}
			})

		return () => {
			cancelled = true
			controller.abort()
		}
	}, [year, type, limit])

	return movies
}
