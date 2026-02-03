import { Header } from '@/widgets/header/ui/Header'
import { Outlet, useMatches } from 'react-router'

export const Layout = () => {
	const matches = useMatches()
	const hideHeader = matches.some(
		match => typeof match.handle === 'object' && match.handle?.hideHeader,
	)
	return (
		<>
			{!hideHeader && <Header />}
			<main>
				<Outlet />
			</main>
		</>
	)
}
