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
import { Link } from 'react-router'
import type { MovieCardTypes } from '../model/card/card.types'

interface CardProps {
	movie: MovieCardTypes
	isFavorite: boolean
	toggleFavorite: (movie: MovieCardTypes) => void
}

const getColor = (rating: number) => {
	switch (true) {
		case rating >= 9:
			return 'gold'
		case rating > 6 && rating < 9:
			return 'green'
		case rating < 6:
			return 'red'
		default:
			break
	}
}

export const MovieCard = ({ movie, toggleFavorite, isFavorite }: CardProps) => {
	return (
		<Link to={`/movie/${movie.id}`}>
			<Card
				sx={{
					height: 700,
					borderRadius: 2,
					overflow: 'hidden',
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<Box
					sx={{
						height: 500,
						position: 'relative',
						bgcolor: 'white',
						flexShrink: 0,
					}}
				>
					{movie.posterUrl ? (
						<CardMedia
							component='img'
							image={movie.posterUrl}
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
								bgcolor:
									'linear-gradient(90deg,rgba(0, 0, 0, 1) 45%, rgba(252, 84, 0, 1) 80%, rgba(217, 181, 0, 1) 100%)',
							}}
						>
							<ImageNotSupportedIcon sx={{ fontSize: 56, color: 'grey.500' }} />
						</Box>
					)}

					<Box
						sx={{
							position: 'absolute',
							top: 8,
							right: 8,
						}}
					>
						<IconButton
							size='small'
							onClick={e => {
								e.preventDefault()
								e.stopPropagation()
								toggleFavorite(movie)
							}}
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

					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							gap: 1.5,
						}}
					>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								gap: 1,
							}}
						>
							{movie.ratingKp ? (
								<>
									<Typography
										variant='subtitle1'
										fontWeight={600}
										sx={{ color: `${getColor(movie.ratingKp)}` }}
									>
										{movie.ratingKp.toFixed(1) || null}
									</Typography>
									<Typography variant='body2' color='text.secondary'>
										{movie.ratingKp ? (
											<img src='/kinopoisk.png' width={100} />
										) : null}
									</Typography>
								</>
							) : null}
						</Box>
						<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
							{movie.ratingImdb ? (
								<>
									<Typography
										variant='subtitle1'
										fontWeight={600}
										sx={{ color: `${getColor(movie.ratingImdb)}` }}
									>
										{movie.ratingImdb || null}
									</Typography>
									<Typography variant='body2' color='text.secondary'>
										{movie.ratingImdb ? (
											<img src='/imdb.png' width={40} />
										) : null}
									</Typography>
								</>
							) : null}
						</Box>
					</Box>
				</CardContent>
			</Card>
		</Link>
	)
}
