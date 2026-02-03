import { Box, Skeleton } from '@mui/material'

type ResponsiveHeight = {
	xs?: number
	sm?: number
	md?: number
	lg?: number
	xl?: number
}

type MovieCardSkeletonProps = {
	height?: number | ResponsiveHeight
}

export function MovieCardSkeleton({ height = 700 }: MovieCardSkeletonProps) {
	return (
		<Box sx={{ height }}>
			<Skeleton variant='rectangular' sx={{ borderRadius: 2, height }} />
		</Box>
	)
}
