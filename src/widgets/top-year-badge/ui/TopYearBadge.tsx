import { Box, ButtonBase, Typography } from '@mui/material'
import { Link } from 'react-router'

type TopYearBadgeProps = {
	year: number
	type: string
}

export function TopYearBadge({ year, type }: TopYearBadgeProps) {
	return (
		<Link to={`/top-year/${type}/${year}`}>
			<ButtonBase
				sx={{
					borderRadius: 2,
					textAlign: 'center',
				}}
			>
				<Box display='flex' flexDirection='column' alignItems='center'>
					{/* Круг */}

					<Box
						sx={{
							width: { xs: 140, sm: 170, md: 200 },
							height: { xs: 140, sm: 170, md: 200 },
							borderRadius: '50%',
							background: `radial-gradient(
            circle at center,
            rgba(252,84,0,1) 0%,
            rgba(0,0,0,1) 70%
          )`,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							color: '#fff',
						}}
					>
						<Typography
							sx={{
								fontSize: { xs: 32, sm: 40, md: 48 },
								fontWeight: 700,
								lineHeight: 1,
								fontFamily: 'Inter, sans-serif',
							}}
						>
							{year}
						</Typography>
					</Box>

					{/* Подпись */}
					<Typography
						sx={{
							mt: 2,
							fontSize: { xs: 14, sm: 16, md: 18 },
							opacity: 1,
							textAlign: 'center',
						}}
					>
						Топ 10 {type === 'films' ? 'фильмов' : 'сериалов'} <b>{year}</b>{' '}
						года
					</Typography>
				</Box>
			</ButtonBase>
		</Link>
	)
}
