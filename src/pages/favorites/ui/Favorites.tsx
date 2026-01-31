import { MovieCard } from '@/entities/movie/ui/MovieCard'
import { useLocalStorage } from '@/shared/lib/useLocalStorage'
import type { MovieItem } from '@/types/MovieItemType'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { Box, Container, Grid, Pagination, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
export default function FavoritesPage() {
	const [favorites, setFavorites] = useLocalStorage<MovieItem[]>(
		'favoritesMovie',
		[],
	)

	const sortedFavorites = [...favorites].reverse()

	const ITEMS_PER_PAGE = 9
	const [page, setPage] = useState(1)

	const pageCount = Math.ceil(favorites.length / ITEMS_PER_PAGE)

	const moviesOnPage = sortedFavorites.slice(
		(page - 1) * ITEMS_PER_PAGE,
		page * ITEMS_PER_PAGE,
	)

	const removeFromFavorites = (movie: MovieItem) => {
		setFavorites(prev => prev.filter(m => m.id !== movie.id))
	}

	useEffect(() => {
		if (page > 1 && moviesOnPage.length === 0) {
			setPage(prev => prev - 1)
		}
	}, [moviesOnPage.length, page])

	if (!favorites.length) {
		return (
			<Box
				sx={{
					minHeight: '60vh',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					textAlign: 'center',
					color: 'text.secondary',
					gap: 2,
				}}
			>
				<FavoriteBorderIcon sx={{ fontSize: 64, opacity: 0.4 }} />

				<Typography variant='h5' fontWeight={600}>
					Избранных фильмов нет
				</Typography>

				<Typography variant='body1' sx={{ maxWidth: 420 }}>
					Добавляй фильмы в избранное, нажимая на сердечко — здесь они появятся
					✨
				</Typography>
			</Box>
		)
	}

	return (
		<Container maxWidth='xl'>
			<Grid container spacing={4} sx={{ mb: 5, marginBlock: 5 }}>
				{moviesOnPage.map(movie => (
					<Grid key={movie.id} size={{ xs: 12, sm: 6, md: 4 }}>
						<MovieCard movie={movie} toggleFavorite={removeFromFavorites} />
					</Grid>
				))}
			</Grid>
			{pageCount > 1 && (
				<Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
					<Pagination
						count={pageCount}
						page={page}
						onChange={(_, value) => setPage(value)}
						size='large'
					/>
				</Box>
			)}
		</Container>
	)
}
