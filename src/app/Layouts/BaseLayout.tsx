import { Layout } from '@/widgets/layout/ui/Layout'

import HomePage from '@/pages/main/ui/HomePage'
import { MoviePage } from '@/pages/movie/ui/MoviePage'
import { TopByYearPage } from '@/pages/top-year-page/ui/TopByYearPage'

import FavoritesPage from '@/pages/favorites/ui/Favorites'
import { NotFoundPage } from '@/pages/not-found/ui/NotFoundPage'
import { TopMoviesPage } from '@/pages/top-movies/ui/TopMoviesPage'
import { createBrowserRouter, RouterProvider } from 'react-router'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: 'films',
				element: <TopByYearPage type={'films'} />,
			},
			{
				path: 'tv-show',
				element: <TopByYearPage type={'tv-show'} />,
			},
			{
				path: 'favorites',
				element: <FavoritesPage />,
			},
			{
				path: 'movie/:idMovie',
				element: <MoviePage />,
			},
			{
				path: 'top-year/:type/:year',
				element: <TopMoviesPage />,
			},
			{
				path: '404',
				element: <NotFoundPage />,
				handle: { hideHeader: true },
			},
			{
				path: '*',
				element: <NotFoundPage />,
				handle: { hideHeader: true },
			},
		],
	},
])

function BaseLayout() {
	return <RouterProvider router={router} />
}

export default BaseLayout
