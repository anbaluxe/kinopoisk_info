import { Box, Button, Container, Grid } from '@mui/material'
import { useState } from 'react'
import { TopYearBadge } from '../components/TopYearBadge'

const ITEMS_IN_ROW = 5
const ROWS_STEP = 2
const ITEMS_STEP = ITEMS_IN_ROW * ROWS_STEP // 10

export function ItemsPage({ value }: { value: string }) {
	const [visibleCount, setVisibleCount] = useState(ITEMS_STEP)

	const handleShowMore = () => {
		setVisibleCount(prev => prev + ITEMS_STEP)
	}

	return (
		<Container maxWidth='xl'>
			<Grid container spacing={4} sx={{ marginBlock: 6 }}>
				{Array.from({ length: visibleCount }).map((_, index) => (
					<Grid key={index} size={{ xs: 12 / ITEMS_IN_ROW }}>
						<TopYearBadge year={2026} value={value} />
					</Grid>
				))}
			</Grid>

			<Box mt={4} display='flex' justifyContent='center'>
				<Button variant='contained' onClick={handleShowMore}>
					Показать ещё
				</Button>
			</Box>
		</Container>
	)
}
