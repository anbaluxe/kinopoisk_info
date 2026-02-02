import { MovieCard } from '@/entities/movie/ui/MovieCard'
import { useFavoriteMovie } from '@/features/favorite-movie/model/useFavoriteMovie'
import { useTopByYear } from '@/features/top-by-year/model/useTopByYear'
import { Card, Container, Grid, Skeleton, Typography } from '@mui/material'
import { useParams } from 'react-router'

export const TopMoviesPage = () => {
	const { type, year } = useParams<{
		type: string
		year: string
	}>()
	const contentType = type === 'films' ? 'films' : 'tv-show'
	const movies = useTopByYear({ year: Number(year), type: contentType })
	const { toggleFavorite, isFavorite } = useFavoriteMovie()

	const isLoading = movies.length === 0
	const isLastRowSingle = movies.length % 3 === 1

	return (
		<Container maxWidth='lg'>
			<Typography
				variant='h5'
				fontWeight={600}
				marginBlock={5}
				textAlign={'center'}
			>
				Топ 10 лучших {type === 'films' ? 'фильмов' : 'сериалов'} {year}
			</Typography>

			<Grid
				container
				spacing={2}
				justifyContent={isLastRowSingle ? 'center' : 'flex-start'}
			>
				{isLoading &&
					Array.from({ length: 10 }).map((_, index) => (
						<Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
							<Skeleton
								variant='rectangular'
								height={700}
								sx={{ borderRadius: 2 }}
							/>
						</Grid>
					))}

				{!isLoading &&
					movies.map(movie => (
						<Grid key={movie.id} size={{ xs: 12, sm: 6, md: 4 }}>
							<Card sx={{ height: 700 }}>
								<MovieCard
									movie={movie}
									isFavorite={isFavorite(movie.id)}
									toggleFavorite={toggleFavorite}
								/>
							</Card>
						</Grid>
					))}
			</Grid>
		</Container>
	)
}
