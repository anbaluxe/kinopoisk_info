import '@/shared/ui/styles/reset.css'
import { theme } from '@/theme/theme.ts'
import { ThemeProvider } from '@mui/material/styles'
import { createRoot } from 'react-dom/client'
import BaseLayout from './Layouts/BaseLayout'

createRoot(document.getElementById('root')!).render(
	<ThemeProvider theme={theme}>
		<BaseLayout />
	</ThemeProvider>,
)
