import { Box, Button, Container, Typography } from '@mui/material'
import { useMemo } from 'react'
import { Link } from 'react-router'

const gifModules = import.meta.glob('@/shared/assets/404/*.{gif,webp,png,jpg,jpeg}', {
	eager: true,
	import: 'default',
})

const gifs = Object.values(gifModules) as string[]

export function NotFoundPage() {
	const randomGif = useMemo(() => {
		if (gifs.length === 0) return null
		const index = Math.floor(Math.random() * gifs.length)
		return gifs[index]
	}, [])

	return (
		<Box
			sx={{
				minHeight: '100vh',
				background:
					'radial-gradient(circle at 20% 10%, rgba(252,84,0,0.15), transparent 40%), #0f0f0f',
				color: '#fff',
				display: 'flex',
				alignItems: 'center',
			}}
		>
			<Container maxWidth='lg'>
				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
						gap: { xs: 4, md: 8 },
						alignItems: 'center',
					}}
				>
					<Box>
						<Typography
							variant='overline'
							sx={{ letterSpacing: 2, opacity: 0.7, fontSize: { xs: 10, md: 12 } }}
						>
							КИНОПОИСК
						</Typography>

						<Typography
							variant='h2'
							sx={{ fontWeight: 800, mt: 2, fontSize: { xs: 28, sm: 36, md: 48 } }}
						>
							404. Страница не найдена
						</Typography>

						<Typography
							variant='body1'
							sx={{
								mt: 2,
								maxWidth: 520,
								color: 'rgba(255,255,255,0.7)',
								fontSize: { xs: 13, sm: 14, md: 16 },
							}}
						>
							Возможно, она была перемещена, или вы просто неверно указали
							адрес страницы.
						</Typography>

						<Button
							component={Link}
							to='/'
							variant='contained'
							sx={{
								mt: 4,
								px: { xs: 3, md: 4 },
								py: { xs: 1, md: 1.2 },
								background:
									'linear-gradient(90deg,rgba(255, 84, 1, 1) 0%, rgba(252, 84, 0, 1) 50%, rgba(217, 181, 0, 1) 100%)',
							}}
						>
							Перейти на главную
						</Button>
					</Box>

					<Box
						sx={{
							borderRadius: 3,
							overflow: 'hidden',
							boxShadow: '0 20px 60px rgba(0,0,0,0.45)',
							bgcolor: '#111',
							minHeight: { xs: 220, md: 360 },
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						{randomGif ? (
							<Box
								component='img'
								src={randomGif}
								alt='404 gif'
								sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
							/>
						) : (
							<Typography sx={{ opacity: 0.7 }}>
								Добавь gif в `src/shared/assets/404`
							</Typography>
						)}
					</Box>
				</Box>
			</Container>
		</Box>
	)
}
