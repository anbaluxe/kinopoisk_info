import { Card, Container, Grid, Skeleton, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { MovieCard } from '../components/MovieCard'
import { useFetchNew } from '../hooks/useFetchNew'
import { useLocalStorage } from '../hooks/useLocalStorage'
import type { MovieItem } from '../types/MovieItemType'

export const TopMoviesPage = () => {
	const { type, year } = useParams<{ type: string; year: string }>()
	const types = type === 'films' ? '1' : '2'
	const items = useFetchNew({ year: year, limit: 10, type: types })
	const [movies, setMovies] = useState<MovieItem[]>([])
	const [cookie, setCookie] = useLocalStorage<MovieItem[]>('favoritesMovie', [])
	useEffect(() => {
		if (!items) return

		setMovies(prev => {
			if (prev.length) return prev

			return items.map(movie => ({
				...movie,
				isFavorite: cookie.some(fav => fav.id === movie.id),
			}))
		})
	}, [items, cookie])

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

	const isLoading = items.length === 0

	const isLastRowSingle = movies.length % 3 === 1

	return (
		<Container maxWidth='lg'>
			<Typography
				variant='h5'
				fontWeight={600}
				marginBlock={5}
				textAlign={'center'}
			>
				Топ 10 лучших {types === '1' ? 'фильмов' : 'сериалов'} {year}
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
								<MovieCard movie={movie} toggleFavorite={toggleFavorite} />
							</Card>
						</Grid>
					))}
			</Grid>
		</Container>
	)
}
