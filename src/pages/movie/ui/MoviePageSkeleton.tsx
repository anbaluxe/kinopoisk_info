import { Box, Card, Grid, Skeleton } from '@mui/material'

export const MoviePageSkeleton = () => {
	return (
		<Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
			<Grid
				container
				spacing={3}
				sx={{
					display: 'grid',
					gridTemplateColumns: '300px 1fr',
					gridTemplateRows: 'auto auto',
				}}
			>
				{/* POSTER */}
				<Card>
					<Skeleton variant='rectangular' height={450} />
				</Card>

				{/* INFO */}
				<Card sx={{ p: 3 }}>
					<Skeleton width='60%' height={40} />
					<Skeleton width='80%' height={24} sx={{ mb: 2 }} />

					<Skeleton width='30%' height={28} sx={{ mb: 2 }} />

					<Grid container spacing={2}>
						{Array.from({ length: 10 }).map((_, i) => (
							<Grid
								key={i}
								size={{ xs: 4, sm: 2.4 }}
								display='flex'
								justifyContent='center'
							>
								<Box display='flex' flexDirection='column' alignItems='center'>
									<Skeleton variant='circular' width={88} height={88} />
									<Skeleton width={72} height={16} sx={{ mt: 1 }} />
								</Box>
							</Grid>
						))}
					</Grid>
				</Card>

				{/* DESCRIPTION */}
				<Card
					sx={{
						gridColumn: '1 / 3',
						p: 3,
					}}
				>
					<Skeleton width='20%' height={28} sx={{ mb: 2 }} />
					<Skeleton height={20} />
					<Skeleton height={20} />
					<Skeleton height={20} width='80%' />
				</Card>
			</Grid>
		</Box>
	)
}
