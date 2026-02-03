import { mapMovieToSearchItem } from '@/entities/movie/model/search/search.mappers'
import type { MovieSearchItem } from '@/entities/movie/model/search/search.types'
import { searchMoviesByName } from '@/shared/api/kinopoisk/queries'
import { useEffect, useState } from 'react'

export const useSearchMovie = (query: string) => {
	const [movies, setMovies] = useState<MovieSearchItem[]>([])

	useEffect(() => {
		if (!query) {
			setMovies([])
			return
		}

		const controller = new AbortController()
		let cancelled = false

		searchMoviesByName(query, controller.signal)
			.then(res => {
				if (!cancelled) {
					setMovies(res.docs.map(mapMovieToSearchItem))
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
	}, [query])

	return movies
}
