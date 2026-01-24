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
import { useEffect, useMemo, useRef, useState } from 'react'
import { useFetchSearch } from '../hooks/useFetchSearch'
import { SearchResults } from './SearchResult'

export function Header() {
	const [openSearch, setOpenSearch] = useState(false)
	const [inputValue, setInputValue] = useState('')
	const [query, setQuery] = useState('')
	const searchRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				searchRef.current &&
				!searchRef.current.contains(event.target as Node)
			) {
				setOpenSearch(false)
				setInputValue('')
				setQuery('')
			}
		}

		document.addEventListener('mousedown', handleClickOutside)

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	useEffect(() => {
		const id = setTimeout(() => {
			const trimmed = inputValue.trim()
			if (trimmed.length >= 3) {
				setQuery(trimmed)
			} else {
				setQuery('')
			}
		}, 500)

		return () => clearTimeout(id)
	}, [inputValue])

	const searchArr = useFetchSearch(query)

	function sortByStartsWith(items, query) {
		const q = query.toLowerCase()

		return [...items].sort((a, b) => {
			const aStarts = a.name.toLowerCase().startsWith(q)
			const bStarts = b.name.toLowerCase().startsWith(q)

			if (aStarts === bStarts) return 0
			return aStarts ? -1 : 1
		})
	}

	const sortedResults = useMemo(() => {
		if (!query) return []
		return sortByStartsWith(searchArr, query)
	}, [searchArr, query])

	console.log(searchArr)

	return (
		<AppBar position='static' sx={{ backgroundColor: 'black' }}>
			<Container maxWidth='xl'>
				<Toolbar>
					{/* Лого */}
					<IconButton edge='start' color='inherit' sx={{ mr: 2 }}>
						<img src='/favicon.svg' alt='Logo' width={50} height={50} />
					</IconButton>

					{/* Навигация */}
					<Box sx={{ display: 'flex', gap: 2, flexGrow: 1 }}>
						{['Главная', 'Фильмы', 'Сериалы', 'Буду смотреть'].map(label => (
							<Button
								key={label}
								color='inherit'
								sx={{
									'&:hover': {
										background:
											'linear-gradient(90deg,rgba(255,84,1,1) 0%, rgba(252,84,0,1) 50%, rgba(217,181,0,1) 100%)',
									},
								}}
							>
								{label}
							</Button>
						))}
					</Box>

					{/* Поиск */}

					<Box
						ref={searchRef}
						sx={{
							position: 'relative', // КРИТИЧЕСКИ ВАЖНО
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

						{/* Выпадающие результаты */}
						{openSearch && (
							<Box
								sx={{
									position: 'absolute',
									top: '100%', // ровно под input
									right: 0,
									mt: 1,
									width: 300,
									zIndex: 10,
								}}
							>
								{sortedResults.length !== 0 ? (
									<SearchResults items={sortedResults} />
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
