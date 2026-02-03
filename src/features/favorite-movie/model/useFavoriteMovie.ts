import type { MovieCardTypes } from '@/entities/movie/model/card/card.types'
import { useLocalStorage } from '@/shared/lib/useLocalStorage'
import { useCallback, useMemo } from 'react'

export const useFavoriteMovie = () => {
	const [favorites, setFavorites] = useLocalStorage<MovieCardTypes[]>(
		'favoritesMovie',
		[],
	)

	const favoriteIds = useMemo(
		() => new Set(favorites.map(movie => movie.id)),
		[favorites],
	)

	const isFavorite = useCallback(
		(id: number) => favoriteIds.has(id),
		[favoriteIds],
	)

	const toggleFavorite = useCallback((movie: MovieCardTypes) => {
		setFavorites(prev => {
			const exists = prev.some(m => m.id === movie.id)
			if (exists) {
				return prev.filter(m => m.id !== movie.id)
			}

			return [...prev, { ...movie, isFavorite: true }]
		})
	}, [setFavorites])

	return useMemo(
		() => ({ favorites, isFavorite, toggleFavorite }),
		[favorites, isFavorite, toggleFavorite],
	)
}
