import { Avatar, Box, Paper, Typography } from '@mui/material'
import { memo } from 'react'
import { Link } from 'react-router'
import type { MovieSearchItem } from '../model/search/search.types'

interface SearchProps {
	items: MovieSearchItem[]
}

function SearchResultsComponent({ items }: SearchProps) {
	const visibleItems = items.slice(0, 5)

	return (
		<Paper elevation={4}>
			{visibleItems.map(item => (
				<Link to={`/movie/${item.id}`} key={item.id}>
					<Box
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
							src={item.posterUrl}
							variant='rounded'
							sx={{ width: 68, height: 83, flexShrink: 0 }}
						/>

						<Typography variant='body1' noWrap>
							{item.name}
						</Typography>
					</Box>
				</Link>
			))}
		</Paper>
	)
}

export const SearchResults = memo(SearchResultsComponent)
SearchResults.displayName = 'SearchResults'
