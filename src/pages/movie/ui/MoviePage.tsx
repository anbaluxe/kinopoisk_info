import { useContentMovie } from '@/features/content-movie/model/useContentMovie'
import { MoviePageSkeleton } from '@/pages/movie/ui/MoviePageSkeleton'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import {
	Box,
	Button,
	Card,
	CardMedia,
	Grid,
	Tooltip,
	Typography,
} from '@mui/material'
import { useParams } from 'react-router'

export const MoviePage = () => {
	const { idMovie } = useParams<{ idMovie: string }>()
	const items = useContentMovie({ id: Number(idMovie) })
	const isLoading = items.length === 0
	const item = items?.[0]
	function upperCase(str: string) {
		return `${str.charAt(0).toUpperCase() + str.slice(1)}`
	}
	const actors =
		item?.persons
			?.filter(p => p.enProfession === 'actor' && p.photo && p.name)
			.slice(0, 10) || []

	if (isLoading) {
		return <MoviePageSkeleton />
	}

	if (!item) {
		return null
	}

	return (
		<Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
			<Grid
				container
				spacing={3}
				sx={{
					display: 'grid',
					gridTemplateColumns: '300px 1fr',
					gridTemplateRows: 'auto auto',
				}}
			>
				<Box sx={{ position: 'relative' }}>
					<Card sx={{ height: '100%' }}>
						<CardMedia
							component='img'
							image={item.poster?.url}
							alt='Movie poster'
							sx={{
								height: '100%',
								objectFit: 'cover',
							}}
						/>
					</Card>

					{item.videos ? (
						<Tooltip
							title={item.videos ? 'Смотреть трейлер' : 'Трейлер недоступен'}
						>
							<span>
								<Button
									variant='contained'
									startIcon={<PlayArrowIcon />}
									href={`${item?.videos?.trailers[0]?.url}`}
									disabled={Boolean(!item?.videos?.trailers[0]?.url)}
									target='_blank'
									sx={{
										position: 'absolute',
										bottom: 16,
										left: '50%',
										transform: 'translateX(-50%)',
										px: 4,
										py: 1.2,
										background:
											'linear-gradient(90deg,rgba(255, 84, 1, 1) 0%, rgba(252, 84, 0, 1) 50%, rgba(217, 181, 0, 1) 100%)',
									}}
								>
									Трейлер
								</Button>
							</span>
						</Tooltip>
					) : null}
				</Box>

				<Card
					sx={{
						p: 3,
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'start',
					}}
				>
					<Typography variant='h4'>{item?.name}</Typography>
					<Typography variant='subtitle1' color='text.secondary'>
						{item?.year} •{' '}
						{item?.genres?.map(el => upperCase(el.name)).join(', ')} •{' '}
						{item?.countries?.map(el => el.name).join(', ')}
					</Typography>

					<Card
						sx={{
							gridColumn: '1 / 3',
							p: 3,
						}}
					>
						<Typography variant='h6' gutterBottom>
							Актёры
						</Typography>

						<Grid container spacing={2} justifyContent='flex-start'>
							{actors.map(actor => (
								<Grid
									key={actor.id}
									size={{ xs: 4, sm: 2.4 }}
									display='flex'
									justifyContent='center'
								>
									<Box
										sx={{
											display: 'flex',
											flexDirection: 'column',
											alignItems: 'center',
											width: 96,
											textAlign: 'center',
										}}
									>
										<Box
											sx={{
												width: 88,
												height: 88,
												borderRadius: '50%',
												overflow: 'hidden',
												mb: 1,
												boxShadow: 2,
											}}
										>
											<CardMedia
												component='img'
												image={actor.photo || '/no-avatar.png'}
												alt={actor.name}
												sx={{
													width: '100%',
													height: '100%',
													objectFit: 'cover',
												}}
											/>
										</Box>

										<Typography
											variant='body2'
											sx={{
												fontWeight: 500,
												lineHeight: 1.2,
												display: '-webkit-box',
												WebkitLineClamp: 2,
												WebkitBoxOrient: 'vertical',
												overflow: 'hidden',
											}}
										>
											{actor.name}
										</Typography>
									</Box>
								</Grid>
							))}
						</Grid>
					</Card>
				</Card>

				<Card
					sx={{
						gridColumn: '1 / 3',
						p: 3,
					}}
				>
					<Typography variant='h6' gutterBottom>
						Описание
					</Typography>
					<Typography variant='body1' color='text.secondary'>
						{item.description}
					</Typography>
				</Card>
			</Grid>
		</Box>
	)
}
