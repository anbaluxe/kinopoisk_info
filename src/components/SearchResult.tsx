import { Avatar, Box, Paper, Typography } from '@mui/material'
import type { MovieItem } from '../types/MovieItemType'

interface SearchProps {
	items: MovieItem[]
}

export function SearchResults({ items }: SearchProps) {
	const visibleItems = items.slice(0, 5)

	return (
		<Paper elevation={4}>
			{visibleItems.map(item => (
				<Box
					key={item.id}
					sx={{
						height: 94,
						flex: 1,
						display: 'flex',
						alignItems: 'center',
						gap: 2,
						px: 2,
						borderBottom: '1px solid',
						borderColor: 'divider',
						cursor: 'pointer',
						'&:last-child': {
							borderBottom: 'none',
						},
						'&:hover': {
							backgroundColor: 'action.hover',
						},
					}}
				>
					<Avatar
						src={item.poster?.url}
						variant='rounded'
						sx={{ width: 68, height: 83, flexShrink: 0 }}
					/>

					<Typography variant='body1' noWrap>
						{item.name}
					</Typography>
				</Box>
			))}
		</Paper>
	)
}
