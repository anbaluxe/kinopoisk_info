import { MovieCard } from '@/entities/movie/ui/MovieCard'
import { useFavoriteMovie } from '@/features/favorite-movie/model/useFavoriteMovie'
import { useTopByYear } from '@/features/top-by-year/model/useTopByYear'
import { MovieCardSkeleton } from '@/shared/ui/movie-card-skeleton/MovieCardSkeleton'
import { Card, Container, Grid, Typography } from '@mui/material'
import { useMemo } from 'react'
import { Navigate, useParams } from 'react-router'

export const TopMoviesPage = () => {
	const { type, year } = useParams<{
		type: string
		year: string
	}>()
	const contentType = type === 'films' || type === 'tv-show' ? type : null
	const yearNumber = Number(year)
	const currentYear = new Date().getFullYear()
	const isValidYear =
		Number.isFinite(yearNumber) && yearNumber >= 1888 && yearNumber <= currentYear
	const movies = useTopByYear({
		year: isValidYear ? yearNumber : currentYear,
		type: contentType ?? 'films',
	})
	const { toggleFavorite, isFavorite } = useFavoriteMovie()

	const isLoading = movies.length === 0
	const isLastRowSingle = movies.length % 3 === 1
	const skeletonCards = useMemo(
		() =>
			Array.from({ length: 10 }).map((_, index) => (
				<Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
					<MovieCardSkeleton height={{ xs: 560, sm: 620, md: 700 }} />
				</Grid>
			)),
		[],
	)
	const movieCards = useMemo(
		() =>
			movies.map(movie => (
				<Grid key={movie.id} size={{ xs: 12, sm: 6, md: 4 }}>
					<Card sx={{ height: { xs: 560, sm: 620, md: 700 } }}>
						<MovieCard
							movie={movie}
							isFavorite={isFavorite(movie.id)}
							toggleFavorite={toggleFavorite}
						/>
					</Card>
				</Grid>
			)),
		[movies, isFavorite, toggleFavorite],
	)

	if (!contentType || !isValidYear) {
		return <Navigate to='/404' replace />
	}

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
				{isLoading ? skeletonCards : movieCards}
			</Grid>
		</Container>
	)
}
