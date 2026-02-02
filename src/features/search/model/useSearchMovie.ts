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

		let cancelled = false

		searchMoviesByName(query).then(res => {
			if (!cancelled) {
				setMovies(res.docs.map(mapMovieToSearchItem))
			}
		})

		return () => {
			cancelled = true
		}
	}, [query])

	return movies
}
