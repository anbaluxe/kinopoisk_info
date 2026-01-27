import { Box, Container, Grid, Skeleton } from '@mui/material'
import { useEffect, useState } from 'react'
import { MovieBanner } from '../components/MovieBanner'
import { MovieCard } from '../components/MovieCard'
import { useFetchNew } from '../hooks/useFetchNew'
import { useLocalStorage } from '../hooks/useLocalStorage'
import type { MovieItem } from '../types/MovieItemType'

export default function Home() {
	const fetchedMovies = useFetchNew({ year: 2026 })
	const [movies, setMovies] = useState<MovieItem[]>([])

	const [cookie, setCookie] = useLocalStorage<MovieItem[]>('favoritesMovie', [])

	useEffect(() => {
		if (!fetchedMovies.length) return

		setMovies(prev => {
			if (prev.length) return prev

			return fetchedMovies.map(movie => ({
				...movie,
				isFavorite: cookie.some(fav => fav.id === movie.id),
			}))
		})
	}, [fetchedMovies, cookie])

	const toggleFavorite = (movie: MovieItem) => {
		setMovies(prev =>
			prev.map(m =>
				m.id === movie.id ? { ...m, isFavorite: !m.isFavorite } : m,
			),
		)

		setCookie(prev => {
			const exists = prev.some(m => m.id === movie.id)

			if (exists) {
				return prev.filter(m => m.id !== movie.id)
			}

			return [...prev, { ...movie, isFavorite: true }]
		})
	}

	const banners: MovieItem[] = useFetchNew({
		year: 2026,
		limit: 5,
		type: 'banner',
	})
	return (
		<>
			<Container maxWidth='xl'>
				<Box sx={{ width: '100%', marginBlock: 6 }}>
					{banners.length === 0 ? (
						<Skeleton variant='rectangular' height={500} />
					) : (
						<MovieBanner banners={banners} />
					)}
				</Box>

				<Grid container spacing={4} sx={{ mb: 6 }}>
					{movies.length === 0
						? Array.from({ length: 9 }).map((_, index) => (
								<Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
									<Skeleton
										variant='rectangular'
										height={700}
										sx={{ borderRadius: 2 }}
									/>
								</Grid>
							))
						: movies.map(el => (
								<Grid key={el.id} size={{ xs: 12, sm: 6, md: 4 }}>
									<MovieCard movie={el} toggleFavorite={toggleFavorite} />
								</Grid>
							))}
				</Grid>
			</Container>
		</>
	)
}
