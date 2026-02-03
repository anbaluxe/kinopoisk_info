import { Box } from '@mui/material'
import { useEffect, useRef, useState } from 'react'

const IDLE_MS = 10000
const LOGO_SIZE = { width: 220, height: 120 }
const SPEED = { x: 1.2, y: 0.9 }
const DESKTOP_MIN_WIDTH = 768

export function DvdScreensaver() {
	const [isVisible, setIsVisible] = useState(false)
	const logoRef = useRef<HTMLDivElement | null>(null)
	const rafRef = useRef<number | null>(null)
	const idleTimerRef = useRef<number | null>(null)
	const posRef = useRef({ x: 40, y: 40 })
	const velocityRef = useRef({ x: SPEED.x, y: SPEED.y })
	const isDesktopRef = useRef(true)

	useEffect(() => {
		const checkDesktop = () => {
			isDesktopRef.current = window.innerWidth >= DESKTOP_MIN_WIDTH
			if (!isDesktopRef.current) {
				setIsVisible(false)
			}
		}

		checkDesktop()
		window.addEventListener('resize', checkDesktop)
		return () => window.removeEventListener('resize', checkDesktop)
	}, [])

	useEffect(() => {
		const stopAnimation = () => {
			if (rafRef.current !== null) {
				cancelAnimationFrame(rafRef.current)
				rafRef.current = null
			}
		}

		const startAnimation = () => {
			stopAnimation()

			const step = () => {
				const logo = logoRef.current
				if (!logo) {
					rafRef.current = requestAnimationFrame(step)
					return
				}

				const maxX = window.innerWidth - LOGO_SIZE.width
				const maxY = window.innerHeight - LOGO_SIZE.height

				let { x, y } = posRef.current
				let { x: vx, y: vy } = velocityRef.current

				x += vx
				y += vy

				if (x <= 0 || x >= maxX) {
					vx = -vx
					x = Math.max(0, Math.min(x, maxX))
				}

				if (y <= 0 || y >= maxY) {
					vy = -vy
					y = Math.max(0, Math.min(y, maxY))
				}

				posRef.current = { x, y }
				velocityRef.current = { x: vx, y: vy }

				logo.style.transform = `translate3d(${x}px, ${y}px, 0)`
				rafRef.current = requestAnimationFrame(step)
			}

			rafRef.current = requestAnimationFrame(step)
		}

		if (isVisible) {
			startAnimation()
		} else {
			stopAnimation()
		}

		return () => stopAnimation()
	}, [isVisible])

	useEffect(() => {
		const resetIdleTimer = () => {
			if (!isDesktopRef.current) return
			setIsVisible(false)
			if (idleTimerRef.current !== null) {
				window.clearTimeout(idleTimerRef.current)
			}
			idleTimerRef.current = window.setTimeout(() => {
				setIsVisible(true)
			}, IDLE_MS)
		}

		const events: (keyof WindowEventMap)[] = [
			'mousemove',
			'keydown',
			'scroll',
			'click',
			'touchstart',
		]

		events.forEach(event => window.addEventListener(event, resetIdleTimer))
		resetIdleTimer()

		return () => {
			events.forEach(event =>
				window.removeEventListener(event, resetIdleTimer),
			)
			if (idleTimerRef.current !== null) {
				window.clearTimeout(idleTimerRef.current)
			}
		}
	}, [])

	if (!isVisible) return null

	return (
		<Box
			sx={{
				position: 'fixed',
				inset: 0,
				backgroundColor: '#000',
				zIndex: 1999,
				pointerEvents: 'none',
			}}
		>
			<Box
				ref={logoRef}
				sx={{
					position: 'fixed',
					left: 0,
					top: 0,
					width: LOGO_SIZE.width,
					height: LOGO_SIZE.height,
					zIndex: 2000,
					pointerEvents: 'none',
					backgroundImage: "url('/wait.jpg')",
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'center',
					backgroundSize: 'contain',
					filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.35))',
				}}
			/>
		</Box>
	)
}
