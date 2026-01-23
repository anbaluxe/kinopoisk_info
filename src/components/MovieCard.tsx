import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported'
import {
	Box,
	Card,
	CardContent,
	CardMedia,
	IconButton,
	Typography,
} from '@mui/material'
import { useState } from 'react'

export const MovieCard = ({ movie }) => {
	const [isFavorite, setIsFavorite] = useState(false)
	console.log(movie.votes.kp)
	return (
		<Card
			sx={{
				height: 700,
				borderRadius: 2,
				overflow: 'hidden',
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			{/* Image + icons */}

			<Box
				sx={{
					aspectRatio: '2 / 3',
					position: 'relative',
					bgcolor: 'white',
					flexShrink: 0,
				}}
			>
				{movie.poster ? (
					<CardMedia
						component='img'
						image={movie.poster?.url}
						alt='Movie poster'
						sx={{ height: '100%', width: '100%', objectFit: 'cover' }}
					/>
				) : (
					<Box
						sx={{
							aspectRatio: '2 / 3',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							bgcolor: 'grey.900',
						}}
					>
						<ImageNotSupportedIcon sx={{ fontSize: 56, color: 'grey.500' }} />
					</Box>
				)}

				{/* Icons */}
				<Box
					sx={{
						position: 'absolute',
						top: 8,
						right: 8,
					}}
				>
					<IconButton
						size='small'
						onClick={() => setIsFavorite(prev => !prev)}
						sx={{
							bgcolor: 'rgba(0,0,0,0.45)',
							backdropFilter: 'blur(4px)',
							'&:hover': {
								bgcolor: 'rgba(0,0,0,0.6)',
							},
						}}
					>
						{isFavorite ? (
							<FavoriteIcon sx={{ color: '#e53935' }} />
						) : (
							<FavoriteBorderIcon sx={{ color: '#fff' }} />
						)}
					</IconButton>
				</Box>
			</Box>

			{/* Content */}
			<CardContent
				sx={{
					flexGrow: 1,
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
				}}
			>
				<Typography variant='h6' noWrap>
					{movie.name}
				</Typography>

				<Typography
					variant='body2'
					color='text.secondary'
					sx={{
						mt: 0.5,
						display: '-webkit-box',
						WebkitLineClamp: 2,
						WebkitBoxOrient: 'vertical',
						overflow: 'hidden',
					}}
				>
					{movie.description || 'Описание отстутствует'}
				</Typography>

				{/* Rating */}
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						gap: 1.5,
					}}
				>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
						<Typography variant='subtitle1' fontWeight={600}>
							{Math.floor(movie.rating.kp) || null}
						</Typography>
						<Typography variant='body2' color='text.secondary'>
							{movie.rating.kp ? 'Кинопоиск' : null}
						</Typography>
					</Box>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
						<Typography variant='subtitle1' fontWeight={600}>
							{movie.rating.imdb || null}
						</Typography>
						<Typography variant='body2' color='text.secondary'>
							{movie.rating.imdb ? 'IMDb' : null}
						</Typography>
					</Box>
				</Box>
			</CardContent>
		</Card>
	)
}
