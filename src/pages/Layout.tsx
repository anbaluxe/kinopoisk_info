import { Box, Container, Grid, Skeleton } from '@mui/material'
import { useEffect, useState } from 'react'
import { MovieBanner } from '../components/MovieBanner'
import { MovieCard } from '../components/MovieCard'
import { useFetchBanner } from '../hooks/useFetchBanner'
import { useFetchNew } from '../hooks/useFetchNew'
import type { MovieItem } from '../types/MovieItemType'

export default function Layout() {
	const fetchedMovies = useFetchNew('2025-2026')
	const [movies, setMovies] = useState<MovieItem[]>([])

	useEffect(() => {
		if (fetchedMovies.length) {
			setMovies(fetchedMovies)
		}
	}, [fetchedMovies])

	const toggleFavorite = (id: number) => {
		setMovies(prev =>
			prev.map(movie =>
				movie.id === id ? { ...movie, isFavorite: !movie.isFavorite } : movie,
			),
		)
	}

	console.log(movies)

	const banners: MovieItem[] = useFetchBanner()
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
