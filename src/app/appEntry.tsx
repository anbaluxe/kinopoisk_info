import { theme } from '@/shared/theme/theme'
import '@/shared/ui/styles/reset.css'
import { ThemeProvider } from '@mui/material/styles'
import { createRoot } from 'react-dom/client'
import BaseLayout from './Layouts/BaseLayout'

createRoot(document.getElementById('root')!).render(
	<ThemeProvider theme={theme}>
		<BaseLayout />
	</ThemeProvider>,
)
