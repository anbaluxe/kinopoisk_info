import SearchIcon from '@mui/icons-material/Search'
import {
	AppBar,
	Box,
	Button,
	Container,
	IconButton,
	TextField,
	Toolbar,
} from '@mui/material'
import { useState } from 'react'

export function Header() {
	const [openSearch, setOpenSearch] = useState(false)

	return (
		<AppBar position='static' sx={{ backgroundColor: 'black' }}>
			<Container maxWidth='xl'>
				<Toolbar>
					{/* Иконка-кнопка */}
					<IconButton
						edge='start'
						color='inherit'
						aria-label='menu'
						sx={{ mr: 2 }}
					>
						<img src='/favicon.svg' alt='Logo' width={50} height={50} />
					</IconButton>

					{/* Навигация */}
					<Box sx={{ display: 'flex', gap: 2, flexGrow: 1 }}>
						<Button
							color='inherit'
							sx={{
								'&:hover': {
									background: `linear-gradient(90deg,rgba(255, 84, 1, 1) 0%, rgba(252, 84, 0, 1) 50%, rgba(217, 181, 0, 1) 100%)`,
								},
							}}
						>
							Главная
						</Button>
						<Button
							color='inherit'
							sx={{
								'&:hover': {
									background: `linear-gradient(90deg,rgba(255, 84, 1, 1) 0%, rgba(252, 84, 0, 1) 50%, rgba(217, 181, 0, 1) 100%)`,
								},
							}}
						>
							Фильмы
						</Button>
						<Button
							color='inherit'
							sx={{
								'&:hover': {
									background: `linear-gradient(90deg,rgba(255, 84, 1, 1) 0%, rgba(252, 84, 0, 1) 50%, rgba(217, 181, 0, 1) 100%)`,
								},
							}}
						>
							Сериалы
						</Button>
						<Button
							color='inherit'
							sx={{
								'&:hover': {
									background: `linear-gradient(90deg,rgba(255, 84, 1, 1) 0%, rgba(252, 84, 0, 1) 50%, rgba(217, 181, 0, 1) 100%)`,
								},
							}}
						>
							Буду смотреть
						</Button>
					</Box>

					{/* Поиск */}
					<Box sx={{ display: 'flex', gap: 1 }}>
						{openSearch && (
							<TextField
								size='small'
								variant='outlined'
								placeholder='Поиск...'
								sx={{ backgroundColor: 'white', borderRadius: 1 }}
							/>
						)}
						<IconButton
							color='inherit'
							onClick={() => setOpenSearch(prev => !prev)}
						>
							<SearchIcon
								sx={{
									fill: `${openSearch ? '#fc5400' : 'white'}`,
								}}
							/>
						</IconButton>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	)
}
