import { Box, Button, Container, Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import { TopYearBadge } from '../components/TopYearBadge'
import { generateYear } from '../utils/generateYear'

const ITEMS_IN_ROW = 5
const ROWS_STEP = 2
const ITEMS_STEP = ITEMS_IN_ROW * ROWS_STEP // 10

export function ItemsPage({ value }: { value: string }) {
	const [visibleCount, setVisibleCount] = useState(ITEMS_STEP)

	const handleShowMore = () => {
		setVisibleCount(prev => prev + ITEMS_STEP)
	}

	useEffect(() => {
		setVisibleCount(ITEMS_STEP)
	}, [value])

	const yearArray = generateYear()

	return (
		<Container maxWidth='xl'>
			<Grid container spacing={4} sx={{ marginBlock: 6 }}>
				{yearArray.slice(0, visibleCount).map((year, index) => (
					<Grid key={index} size={{ xs: 12 / ITEMS_IN_ROW }}>
						<TopYearBadge year={year} value={value} />
					</Grid>
				))}
			</Grid>

			{visibleCount !== yearArray.length ? (
				<Box mt={4} display='flex' justifyContent='center'>
					<Button variant='contained' onClick={handleShowMore}>
						Показать ещё
					</Button>
				</Box>
			) : null}
		</Container>
	)
}
