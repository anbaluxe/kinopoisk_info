import { mapMovieToCard } from '@/entities/movie/model/card/card.mappers'
import type { MovieCardTypes } from '@/entities/movie/model/card/card.types'
import { fetchMoviesByYear } from '@/shared/api/kinopoisk/queries'
import { useEffect, useState } from 'react'

type Props = {
	year: number
	limit?: number
	type?: '1' | '2'
}

export const useTopMovies = ({ year, limit = 6, type = '1' }: Props) => {
	const [movies, setMovies] = useState<MovieCardTypes[]>([])

	useEffect(() => {
		fetchMoviesByYear({ year, limit, type }).then(res => {
			setMovies(res.docs.map(mapMovieToCard))
		})
	}, [year, limit, type])

	return movies
}
