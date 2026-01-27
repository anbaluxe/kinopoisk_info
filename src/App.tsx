import { createBrowserRouter, RouterProvider } from 'react-router'
import { Layout } from './components/Layout'
import FavoritesPage from './pages/Favorites'
import Home from './pages/Home'
import { ItemsPage } from './pages/ItemsPage'

/* const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<>
				<Header />
				<Home />
			</>
		),
	},
	{
		path: 'favorites',
		element: <FavoritesPage />,
	},
]) */

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '',
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
		],
	},
])

function App() {
	return <RouterProvider router={router} />
}

export default App
