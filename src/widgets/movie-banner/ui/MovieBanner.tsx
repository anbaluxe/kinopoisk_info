import type { MovieBannerItem } from '@/entities/movie/model/banner/banner.types'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import { Box, Button, IconButton, Stack, Typography } from '@mui/material'
import { memo } from 'react'
import { useBannerSlider } from '../model/useBannerSlider'

interface BannerProps {
	banners: MovieBannerItem[]
}

const MovieBannerComponent = ({ banners }: BannerProps) => {
	const { index, isAnimating, next, prev } = useBannerSlider(banners.length)

	if (!banners.length) return null

	const banner = banners[index]
	let touchStartX = 0

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
					height: { xs: 360, sm: 420, md: 500 },
					borderRadius: 4,
					overflow: 'hidden',
				}}
				onTouchStart={event => {
					touchStartX = event.touches[0]?.clientX ?? 0
				}}
				onTouchEnd={event => {
					const touchEndX = event.changedTouches[0]?.clientX ?? 0
					const delta = touchEndX - touchStartX
					if (Math.abs(delta) < 40) return
					if (delta < 0) next()
					if (delta > 0) prev()
				}}
			>
				<Box
					component='img'
					src={banner.posterUrl}
					alt={banner.name}
					sx={{
						position: { xs: 'absolute', md: 'absolute' },
						right: { xs: 16, md: 80 },
						top: { xs: 16, md: 10 },
						height: { xs: '60%', sm: '70%', md: '95%' },
						width: { xs: 'auto', md: 'auto' },
						maxWidth: { xs: '55%', md: '45%' },
						objectFit: 'contain',
						zIndex: 1,
						borderRadius: { xs: 16, md: 25 },
						display: { xs: 'none', md: 'block' },
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
						justifyContent: { xs: 'center', md: 'flex-end' },
						p: { xs: 2, sm: 3, md: 4 },
						maxWidth: { xs: '100%', md: '55%' },
						textAlign: { xs: 'center', md: 'left' },
						alignItems: { xs: 'center', md: 'flex-start' },
					}}
				>
					<Box
						sx={{
							ml: { xs: 0, md: 6 },
							mb: { xs: 2, md: 4 },
							width: { xs: '100%', md: 'auto' },
							display: 'flex',
							flexDirection: 'column',
							alignItems: { xs: 'center', md: 'flex-start' },
						}}
					>
						{banner.logoUrl && (
							<Box
								component='img'
								src={banner.logoUrl}
								alt={banner.name}
								sx={{
									maxWidth: { xs: 160, md: 220 },
									maxHeight: { xs: 56, md: 70 },
									objectFit: 'contain',
									mb: 1,
									display: { xs: 'none', md: 'block' },
								}}
							/>
						)}

						<Typography
							variant='h4'
							sx={{
								color: '#fff',
								fontWeight: 700,
								mb: 1,
								fontSize: { xs: 22, sm: 28, md: 34 },
							}}
						>
							{banner.name}
						</Typography>

						{
							<Typography
								sx={{
									color: 'rgba(255,255,255,0.85)',
									fontSize: { xs: 12, sm: 13, md: 14 },
									lineHeight: 1.5,
									maxWidth: { xs: '100%', md: 520 },
									mb: { xs: 2, md: 3 },
									display: '-webkit-box',
									WebkitBoxOrient: 'vertical',
									WebkitLineClamp: 6,
									overflow: 'hidden',
								}}
							>
								{banner.description}
							</Typography>
						}

						<Stack
							direction='row'
							spacing={2}
							alignItems='center'
							sx={{ flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-start' } }}
						>
							<Button
								variant='contained'
								startIcon={<PlayArrowIcon />}
								href={`${banner.trailerUrl}`}
								disabled={Boolean(!banner.trailerUrl)}
								target='_blank'
								sx={{
									px: { xs: 3, md: 4 },
									py: { xs: 1, md: 1.2 },
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
						bottom: { xs: 12, md: 24 },
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
								backgroundColor: i === index ? '#fff' : 'rgba(255,255,255,0.4)',
								transition: 'opacity 0.2s',
								'&:hover': {
									opacity: 1,
								},
							}}
						/>
					))}
				</Stack>

				<IconButton
					onClick={prev}
					sx={{
						position: 'absolute',
						left: { xs: 8, md: 16 },
						top: '50%',
						transform: 'translateY(-50%)',
						color: '#fff',
						backgroundColor: 'rgba(0,0,0,0.4)',
						display: { xs: 'none', sm: 'inline-flex' },
					}}
				>
					<ArrowBackIosNewIcon />
				</IconButton>

				<IconButton
					onClick={next}
					sx={{
						position: 'absolute',
						right: { xs: 8, md: 16 },
						top: '50%',
						transform: 'translateY(-50%)',
						color: '#fff',
						backgroundColor: 'rgba(0,0,0,0.4)',
						display: { xs: 'none', sm: 'inline-flex' },
					}}
				>
					<ArrowForwardIosIcon />
				</IconButton>
			</Box>
		</Box>
	)
}

export const MovieBanner = memo(MovieBannerComponent)
MovieBanner.displayName = 'MovieBanner'
