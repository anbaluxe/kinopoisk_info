import type { MovieCardTypes } from '@/entities/movie/model/card/card.types'
import { useMemo, useState } from 'react'

const ITEMS_PER_PAGE = 9

export function useFavoriteList(favorites: MovieCardTypes[]) {
	const [page, setPage] = useState(1)

	const sortedFavorites = useMemo(() => [...favorites].reverse(), [favorites])

	const pageCount = Math.ceil(sortedFavorites.length / ITEMS_PER_PAGE)

	const moviesOnPage = useMemo(
		() =>
			sortedFavorites.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE),
		[sortedFavorites, page],
	)

	return {
		moviesOnPage,
		page,
		setPage,
		pageCount,
	}
}
