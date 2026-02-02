import type { MovieCardTypes } from '@/entities/movie/model/card/card.types'
import { useLocalStorage } from '@/shared/lib/useLocalStorage'

export const useFavoriteMovie = () => {
	const [favorites, setFavorites] = useLocalStorage<MovieCardTypes[]>(
		'favoritesMovie',
		[],
	)

	const isFavorite = (id: number) => favorites.some(movie => movie.id === id)

	const toggleFavorite = (movie: MovieCardTypes) => {
		setFavorites(prev => {
			const exists = prev.some(m => m.id === movie.id)
			if (exists) {
				return prev.filter(m => m.id !== movie.id)
			}

			return [...prev, { ...movie, isFavorite: true }]
		})
	}

	return { favorites, isFavorite, toggleFavorite }
}
