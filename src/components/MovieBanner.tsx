import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import { Box, Button, IconButton, Stack, Typography } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import type { MovieItem } from '../types/MovieItemType'

interface BannerProps {
	banners: MovieItem[]
}

export const MovieBanner = ({ banners }: BannerProps) => {
	const [id, setId] = useState(0)
	const [isAnimating, setIsAnimating] = useState(false)

	const banner = banners[id]

	const next = useCallback(() => {
		if (isAnimating) return

		setIsAnimating(true)

		setTimeout(() => {
			setId(prev => (prev >= banners.length - 1 ? 0 : prev + 1))
			setIsAnimating(false)
		}, 300)
	}, [isAnimating, banners.length])

	const prev = useCallback(() => {
		if (isAnimating) return

		setIsAnimating(true)

		setTimeout(() => {
			setId(prev => (prev <= 0 ? banners.length - 1 : prev - 1))
			setIsAnimating(false)
		}, 300)
	}, [isAnimating, banners.length])

	useEffect(() => {
		const timer = setInterval(() => {
			next()
		}, 10000)
		return () => clearInterval(timer)
	}, [next])

	return (
		<Box
			sx={{
				width: '100%',
				height: '100%',
				transition: 'opacity 300ms ease, transform 300ms ease',
				opacity: isAnimating ? 0 : 1,
				transform: isAnimating ? 'translateY(12px)' : 'translateY(0)',
			}}
		>
			<Box
				sx={{
					width: '100%',
					position: 'relative',
					height: 500,
					borderRadius: 4,
					overflow: 'hidden',
				}}
			>
				<Box
					component='img'
					src={banner.poster?.url}
					alt={banner.name}
					sx={{
						position: 'absolute',
						right: 80,
						top: 10,
						height: '95%',
						width: 'auto',
						maxWidth: '45%',
						objectFit: 'contain',
						zIndex: 1,
						borderRadius: 25,
					}}
				/>

				<Box
					sx={{
						position: 'absolute',
						inset: 0,
						background:
							'linear-gradient(90deg,rgba(0, 0, 0, 1) 45%, rgba(252, 84, 0, 1) 80%, rgba(217, 181, 0, 1) 100%)',
					}}
				/>

				<Box
					sx={{
						position: 'relative',
						height: '100%',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'flex-end',
						p: 4,
						maxWidth: '55%',
					}}
				>
					<Box
						sx={{
							ml: 6,
							mb: 4,
						}}
					>
						{banner.logo?.url && (
							<Box
								component='img'
								src={banner.logo.url}
								alt={banner.name}
								sx={{
									maxWidth: 220,
									maxHeight: 70,
									objectFit: 'contain',
									mb: 1,
								}}
							/>
						)}

						<Typography
							variant='h4'
							sx={{
								color: '#fff',
								fontWeight: 700,
								mb: 1,
							}}
						>
							{banner.name}
						</Typography>

						<Typography
							sx={{
								color: 'rgba(255,255,255,0.85)',
								fontSize: 14,
								lineHeight: 1.5,
								maxWidth: 520,
								mb: 3,
								display: '-webkit-box',
								WebkitBoxOrient: 'vertical',
								WebkitLineClamp: 6,
								overflow: 'hidden',
							}}
						>
							{banner.description}
						</Typography>

						<Stack direction='row' spacing={2} alignItems='center'>
							<Button
								variant='contained'
								startIcon={<PlayArrowIcon />}
								href={`${banner?.videos?.trailers[0]?.url}`}
								disabled={Boolean(!banner?.videos?.trailers[0]?.url)}
								target='_blank'
								sx={{
									px: 4,
									py: 1.2,
									background:
										'linear-gradient(90deg,rgba(255, 84, 1, 1) 0%, rgba(252, 84, 0, 1) 50%, rgba(217, 181, 0, 1) 100%)',
								}}
							>
								Трейлер
							</Button>
						</Stack>
					</Box>
				</Box>

				<Stack
					direction='row'
					spacing={1}
					sx={{
						position: 'absolute',
						bottom: 24,
						left: '50%',
						transform: 'translateX(-50%)',
					}}
				>
					{banners.map((_, i) => (
						<Box
							key={i}
							sx={{
								width: 10,
								height: 10,
								borderRadius: '50%',
								backgroundColor: i === id ? '#fff' : 'rgba(255,255,255,0.4)',
								cursor: 'pointer',
								transition: 'opacity 0.2s',
								'&:hover': {
									opacity: 1,
								},
							}}
						/>
					))}
				</Stack>

				{/* Arrows */}
				<IconButton
					onClick={prev}
					sx={{
						position: 'absolute',
						left: 16,
						top: '50%',
						transform: 'translateY(-50%)',
						color: '#fff',
						backgroundColor: 'rgba(0,0,0,0.4)',
					}}
				>
					<ArrowBackIosNewIcon />
				</IconButton>

				<IconButton
					onClick={next}
					sx={{
						position: 'absolute',
						right: 16,
						top: '50%',
						transform: 'translateY(-50%)',
						color: '#fff',
						backgroundColor: 'rgba(0,0,0,0.4)',
					}}
				>
					<ArrowForwardIosIcon />
				</IconButton>
			</Box>
		</Box>
	)
}
