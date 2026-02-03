import { mapMovieToCard } from '@/entities/movie/model/card/card.mappers'
import type { MovieCardTypes } from '@/entities/movie/model/card/card.types'
import { fetchMoviesByYear } from '@/shared/api/kinopoisk/queries'
import { useEffect, useState } from 'react'

type Props = {
	year: number
	limit?: number
}

// Feature-хук: получаем DTO -> маппим в модель сущности для UI.
export const useContentPreview = ({ year, limit = 6 }: Props) => {
	const [movies, setMovies] = useState<MovieCardTypes[]>([])

	useEffect(() => {
		fetchMoviesByYear({ year, limit }).then(res => {
			setMovies(res.docs.map(mapMovieToCard))
		})
	}, [year, limit])

	return movies
}
