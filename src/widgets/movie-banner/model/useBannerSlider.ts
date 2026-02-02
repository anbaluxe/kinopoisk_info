import { useCallback, useEffect, useState } from 'react'

export function useBannerSlider(length: number) {
	if (length === 0) {
		throw new Error('Banner: length = 0')
	}

	const [index, setIndex] = useState(0)
	const [isAnimating, setIsAnimating] = useState(false)

	const next = useCallback(() => {
		if (isAnimating) return

		setIsAnimating(true)

		setTimeout(() => {
			setIndex(prev => (prev >= length - 1 ? 0 : prev + 1))
			setIsAnimating(false)
		}, 300)

		return () => {
			setIsAnimating(false)
		}
	}, [isAnimating, length])

	const prev = useCallback(() => {
		if (isAnimating) return

		setIsAnimating(true)

		setTimeout(() => {
			setIndex(prev => (prev <= 0 ? length - 1 : prev - 1))
			setIsAnimating(false)
		}, 300)
	}, [isAnimating, length])

	useEffect(() => {
		const timer = setInterval(next, 10000)
		return () => clearInterval(timer)
	}, [next])

	return {
		index,
		isAnimating,
		next,
		prev,
	}
}
