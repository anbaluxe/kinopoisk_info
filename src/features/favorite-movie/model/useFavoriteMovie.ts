import type { MoviePreviewDto } from '@/shared/api/kinopoisk/types'
import { useLocalStorage } from '@/shared/lib/useLocalStorage'

export const useFavoriteMovie = () => {
	const [favorites, setFavorites] = useLocalStorage<MoviePreviewDto[]>(
		'favoritesMovie',
		[],
	)

	const isFavorite = (id: number) => favorites.some(movie => movie.id === id)

	const toggleFavorite = (movie: MoviePreviewDto) => {
		setFavorites(prev =>
			prev.some(m => m.id === movie.id)
				? prev.filter(m => m.id !== movie.id)
				: [...prev, { ...movie, isFavorite: true }],
		)
	}

	return { isFavorite, toggleFavorite }
}
