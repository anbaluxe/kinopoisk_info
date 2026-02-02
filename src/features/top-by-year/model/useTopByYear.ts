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

		fetchMoviesByYear({ year, limit, type: apiType }).then(res => {
			setMovies(res.docs.map(mapMovieToCard))
		})
	}, [year, type, limit])

	return movies
}
