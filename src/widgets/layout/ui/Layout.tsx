import { Header } from '@/widgets/header/ui/Header'
import { DvdScreensaver } from '@/widgets/dvd-screensaver/ui/DvdScreensaver'
import { Outlet, useMatches } from 'react-router'

type RouteHandle = { hideHeader?: boolean }

const hasRouteHandle = (value: unknown): value is RouteHandle => {
	return typeof value === 'object' && value !== null && 'hideHeader' in value
}

export const Layout = () => {
	const matches = useMatches()
	const hideHeader = matches.some(
		match => hasRouteHandle(match.handle) && Boolean(match.handle.hideHeader),
	)
	return (
		<>
			{!hideHeader && <Header />}
			<main>
				<Outlet />
			</main>
			<DvdScreensaver />
		</>
	)
}
