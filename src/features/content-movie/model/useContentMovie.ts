import { mapMovieToDetails } from '@/entities/movie/model/details/details.mappers'
import type { MovieDetails } from '@/entities/movie/model/details/details.types'
import { fetchMovieById } from '@/shared/api/kinopoisk/queries'
import { useEffect, useState } from 'react'

export const useContentMovie = ({ id }: { id: number }) => {
	// Feature-хук: DTO -> доменная модель страницы.
	const [movies, setMovies] = useState<MovieDetails[]>([])

	useEffect(() => {
		fetchMovieById(id).then(res => {
			setMovies(res.docs.map(mapMovieToDetails))
		})
	}, [id])

	return movies
}
