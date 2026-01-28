import SearchIcon from '@mui/icons-material/Search'
import {
	AppBar,
	Box,
	Button,
	Container,
	IconButton,
	Paper,
	TextField,
	Toolbar,
} from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router'
import { useDebounce } from '../hooks/useDebounce'
import { useFetchSearch } from '../hooks/useFetchSearch'
import { SearchResults } from './SearchResult'

export function Header() {
	const [openSearch, setOpenSearch] = useState(false)
	const [inputValue, setInputValue] = useState('')
	const searchRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				searchRef.current &&
				!searchRef.current.contains(event.target as Node)
			) {
				setOpenSearch(false)
				setInputValue('')
			}
		}

		document.addEventListener('mousedown', handleClickOutside)

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	const debouncedQuery = useDebounce(inputValue, 400)
	const searchArr = useFetchSearch(debouncedQuery)

	return (
		<AppBar position='static' sx={{ backgroundColor: 'black' }}>
			<Container maxWidth='xl'>
				<Toolbar>
					<IconButton edge='start' color='inherit' sx={{ mr: 2 }}>
						<NavLink to={'/'}>
							<img src='/favicon.svg' alt='Logo' width={50} height={50} />
						</NavLink>
					</IconButton>

					<Box sx={{ display: 'flex', gap: 2, flexGrow: 1 }}>
						{[
							{ element: 'Главная', path: '/' },
							{ element: 'Фильмы', path: '/films' },
							{ element: 'Сериалы', path: '/tv-show' },
							{ element: 'Буду смотреть', path: '/favorites' },
						].map(label => (
							<Button
								key={label.element}
								color='inherit'
								sx={{
									'&:hover': {
										background:
											'linear-gradient(90deg,rgba(255,84,1,1) 0%, rgba(252,84,0,1) 50%, rgba(217,181,0,1) 100%)',
									},
								}}
							>
								<NavLink to={label.path} style={{ color: 'inherit' }}>
									{label.element}
								</NavLink>
							</Button>
						))}
					</Box>

					<Box
						ref={searchRef}
						sx={{
							position: 'relative',
							display: 'flex',
							alignItems: 'center',
							gap: 1,
						}}
					>
						{openSearch && (
							<TextField
								size='small'
								variant='outlined'
								placeholder='Поиск...'
								sx={{
									backgroundColor: 'white',
									borderRadius: 1,
									width: 240,
								}}
								value={inputValue}
								onChange={e => setInputValue(e.currentTarget.value)}
							/>
						)}

						<IconButton
							color='inherit'
							onClick={() => setOpenSearch(prev => !prev)}
						>
							<SearchIcon
								sx={{
									fill: openSearch ? '#fc5400' : 'white',
								}}
							/>
						</IconButton>

						{openSearch && (
							<Box
								sx={{
									position: 'absolute',
									top: '100%',
									right: 0,
									mt: 1,
									width: 300,
									zIndex: 10,
								}}
							>
								{searchArr.length !== 0 ? (
									<SearchResults items={searchArr} />
								) : (
									<Paper elevation={4}>
										<Box
											sx={{
												height: 94,
												flex: 1,
												display: 'flex',
												alignItems: 'center',
												gap: 2,
												px: 2,
												borderBottom: '1px solid',
												borderColor: 'divider',
												cursor: 'pointer',
												'&:last-child': {
													borderBottom: 'none',
												},
												'&:hover': {
													backgroundColor: 'action.hover',
												},
											}}
										>
											Ничего не найдено
										</Box>
									</Paper>
								)}
							</Box>
						)}
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	)
}
