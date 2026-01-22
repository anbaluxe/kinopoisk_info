import { ThemeProvider } from '@mui/material/styles'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { theme } from './theme/theme.ts'

createRoot(document.getElementById('root')!).render(
	<ThemeProvider theme={theme}>
		<App />
	</ThemeProvider>,
)
