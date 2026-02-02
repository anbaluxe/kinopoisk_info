import { fetchMovieById } from '@/shared/api/kinopoisk/queries'
import type { MovieDetailsDto } from '@/shared/api/kinopoisk/types'
import { useEffect, useState } from 'react'

export const useContentMovie = ({ id }: { id: number }) => {
	const [movies, setMovies] = useState<MovieDetailsDto[]>([])

	useEffect(() => {
		fetchMovieById(id).then(res => {
			setMovies(res.docs)
		})
	}, [id])

	return movies
}
