import { Box, Container, Grid, Skeleton } from '@mui/material'
import { MovieBanner } from '../components/MovieBanner'
import { MovieCard } from '../components/MovieCard'
import { useFetchBanner } from '../hooks/useFetchBanner'
import { useFetchNew } from '../hooks/useFetchNew'

export default function Layout() {
	const movie = useFetchNew('2026')
	const banners = useFetchBanner()
	return (
		<>
			{/* Full width banner */}
			<Container maxWidth='xl'>
				<Box sx={{ width: '100%', marginBlock: 6 }}>
					{banners.length === 0 ? (
						<Skeleton variant='rectangular' height={500} />
					) : (
						<MovieBanner banners={banners} />
					)}
				</Box>

				{/* Content */}

				<Grid container spacing={4} sx={{ mb: 6 }}>
					{movie.length === 0
						? Array.from({ length: 9 }).map((_, index) => (
								<Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
									<Skeleton
										variant='rectangular'
										height={700}
										sx={{ borderRadius: 2 }}
									/>
								</Grid>
							))
						: movie.map(el => (
								<Grid key={el.id} size={{ xs: 12, sm: 6, md: 4 }}>
									<MovieCard movie={el} />
								</Grid>
							))}
				</Grid>
			</Container>
		</>
	)
}
