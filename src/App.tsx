import { createBrowserRouter, RouterProvider } from 'react-router'
import { Layout } from './components/Layout'
import FavoritesPage from './pages/Favorites'
import Home from './pages/Home'
import { ItemsPage } from './pages/ItemsPage'
import { MoviePage } from './pages/MoviePage'
import { TopMoviesPage } from './pages/TopMoviesPage'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: 'films',
				element: <ItemsPage type={'films'} />,
			},
			{
				path: 'tv-show',
				element: <ItemsPage type={'tv-show'} />,
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
		],
	},
])

function App() {
	return <RouterProvider router={router} />
}

export default App
