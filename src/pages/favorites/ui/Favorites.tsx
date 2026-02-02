import { MovieCard } from '@/entities/movie/ui/MovieCard'
import { useFavoriteMovie } from '@/features/favorite-movie/model/useFavoriteMovie'
import { useFavoriteList } from '@/shared/lib/useFavoriteList'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { Box, Container, Grid, Pagination, Typography } from '@mui/material'
export default function FavoritesPage() {
	const { favorites, toggleFavorite, isFavorite } = useFavoriteMovie()

	const { moviesOnPage, page, setPage, pageCount } = useFavoriteList(favorites)

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
						<MovieCard
							movie={movie}
							isFavorite={isFavorite(movie.id)}
							toggleFavorite={toggleFavorite}
						/>
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
