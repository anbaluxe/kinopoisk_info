import { MovieCard } from '@/entities/movie/ui/MovieCard'
import { useBannerList } from '@/features/banner/model/useBannerList'
import { useContentPreview } from '@/features/content-preview/model/useContentPreview'
import { useFavoriteMovie } from '@/features/favorite-movie/model/useFavoriteMovie'
import { MovieCardSkeleton } from '@/shared/ui/movie-card-skeleton/MovieCardSkeleton'
import { Box, Container, Grid, Skeleton } from '@mui/material'
import { useMemo } from 'react'
import { MovieBanner } from '../../../widgets/movie-banner/ui/MovieBanner'

export default function HomePage() {
	const movies = useContentPreview({ year: 2026 })
	const banners = useBannerList({ year: 2026 })
	const { toggleFavorite, isFavorite } = useFavoriteMovie()

	const previewSkeletons = useMemo(
		() =>
			Array.from({ length: 6 }).map((_, index) => (
				<Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
					<MovieCardSkeleton height={700} />
				</Grid>
			)),
		[],
	)

	const previewCards = useMemo(
		() =>
			movies.map(el => (
				<Grid key={el.id} size={{ xs: 12, sm: 6, md: 4 }}>
					<MovieCard
						movie={el}
						isFavorite={isFavorite(el.id)}
						toggleFavorite={toggleFavorite}
					/>
				</Grid>
			)),
		[movies, isFavorite, toggleFavorite],
	)

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
					{movies.length === 0 ? previewSkeletons : previewCards}
				</Grid>
			</Container>
		</>
	)
}
