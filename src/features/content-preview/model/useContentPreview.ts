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
		const controller = new AbortController()
		let cancelled = false

		fetchMoviesByYear({ year, limit }, controller.signal)
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
	}, [year, limit])

	return movies
}
