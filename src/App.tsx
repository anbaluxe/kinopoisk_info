import { Header } from './components/Header'
import { useFetchNew } from './hooks/useFetchNew'

function App() {
	const movie = useFetchNew(2026)
	console.log(movie)
	return (
		<>
			<Header />
		</>
	)
}

export default App
