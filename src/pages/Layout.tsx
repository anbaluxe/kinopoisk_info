import { Box, Container, Grid, Skeleton } from '@mui/material'

export default function Layout() {
	return (
		<>
			{/* Full width banner */}
			<Container maxWidth='xl'>
				<Box sx={{ width: '100%', marginBlock: 6 }}>
					<Skeleton variant='rectangular' height={500} />
				</Box>

				{/* Content */}

				<Grid container spacing={4} sx={{ mb: 6 }}>
					{Array.from({ length: 9 }).map((_, index) => (
						<Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
							<Skeleton
								variant='rectangular'
								height={400}
								sx={{ borderRadius: 2 }}
							/>
						</Grid>
					))}
				</Grid>
			</Container>
		</>
	)
}
