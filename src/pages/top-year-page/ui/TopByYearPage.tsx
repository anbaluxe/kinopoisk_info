import { Box, Button, Container, Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import { generateYear } from '../../../shared/lib/date/generateYear'
import { TopYearBadge } from '../../../widgets/top-year-badge/ui/TopYearBadge'

const ITEMS_IN_ROW = 5
const ROWS_STEP = 2
const ITEMS_STEP = ITEMS_IN_ROW * ROWS_STEP // 10

export function TopByYearPage({ type }: { type: string }) {
	const [visibleCount, setVisibleCount] = useState(ITEMS_STEP)

	const handleShowMore = () => {
		setVisibleCount(prev => prev + ITEMS_STEP)
	}

	useEffect(() => {
		setVisibleCount(ITEMS_STEP)
	}, [type])

	const yearArray = generateYear()

	return (
		<Container maxWidth='xl'>
			<Grid container spacing={4} sx={{ marginBlock: 6 }}>
				{yearArray.slice(0, visibleCount).map((year, index) => (
					<Grid key={index} size={{ xs: 12 / ITEMS_IN_ROW }}>
						<TopYearBadge year={year} type={type} />
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
