import { Avatar, Box, Paper, Typography } from '@mui/material'

export function SearchResults({ items, maxItems = 5, height = 94 }) {
	const visibleItems = items.slice(0, maxItems)

	return (
		<Paper elevation={4}>
			{visibleItems.map(item => (
				<Box
					key={item.id}
					sx={{
						height,
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
