import { Box, Button, Container } from '@mui/material'
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
			<Box
				sx={{
					display: 'grid',
					gridTemplateColumns: {
						xs: 'repeat(2, minmax(0, 1fr))',
						sm: 'repeat(3, minmax(0, 1fr))',
						md: 'repeat(4, minmax(0, 1fr))',
						lg: 'repeat(5, minmax(0, 1fr))',
					},
					gap: { xs: 2, sm: 3, md: 4 },
					marginBlock: 6,
				}}
			>
				{yearArray.slice(0, visibleCount).map((year, index) => (
					<Box key={index} display='flex' justifyContent='center'>
						<TopYearBadge year={year} type={type} />
					</Box>
				))}
			</Box>

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
