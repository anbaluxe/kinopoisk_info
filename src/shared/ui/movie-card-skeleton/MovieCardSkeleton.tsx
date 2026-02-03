import { Box, Skeleton } from '@mui/material'

type MovieCardSkeletonProps = {
	height?: number
}

export function MovieCardSkeleton({ height = 700 }: MovieCardSkeletonProps) {
	return (
		<Box sx={{ height }}>
			<Skeleton variant='rectangular' height={height} sx={{ borderRadius: 2 }} />
		</Box>
	)
}
