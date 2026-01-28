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
import { useFetchNew } from '../hooks/useFetchNew'

export const MoviePage = () => {
	const { idMovie } = useParams<{ idMovie: string }>()
	const items = useFetchNew({ id: idMovie })
	const item = items[0]
	console.log(item)
	function upperCase(str: string) {
		return `${str.charAt(0).toUpperCase() + str.slice(1)}`
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
				{/* POSTER */}
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
					{/* Trailer button */}
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

				{/* INFO */}
				<Card
					sx={{
						p: 3,
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'start',
					}}
				>
					<Typography variant='h4'>{item.name}</Typography>
					<Typography variant='subtitle1' color='text.secondary'>
						{item.year} •{' '}
						{item?.genres?.map(el => upperCase(el.name)).join(', ')} •{' '}
						{item?.countries?.map(el => el.name)}
					</Typography>

					{/* сюда потом добавишь рейтинги, длительность, актёров */}
				</Card>

				{/* DESCRIPTION (на 2 колонки) */}
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
