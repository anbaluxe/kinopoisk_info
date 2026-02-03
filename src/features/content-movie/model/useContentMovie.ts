import { mapMovieToDetails } from '@/entities/movie/model/details/details.mappers'
import type { MovieDetails } from '@/entities/movie/model/details/details.types'
import { fetchMovieById } from '@/shared/api/kinopoisk/queries'
import { useEffect, useState } from 'react'

export const useContentMovie = ({ id }: { id: number }) => {
	// Feature-хук: DTO -> доменная модель страницы.
	const [movies, setMovies] = useState<MovieDetails[] | null>(null)

	useEffect(() => {
		const controller = new AbortController()
		let cancelled = false

		fetchMovieById(id, controller.signal)
			.then(res => {
				if (!cancelled) {
					setMovies(res.docs.map(mapMovieToDetails))
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
	}, [id])

	return movies
}
