import { mapMovieToBanner } from '@/entities/movie/model/banner/banner.mappes'
import type { MovieBannerItem } from '@/entities/movie/model/banner/banner.types'
import { fetchBannersByYear } from '@/shared/api/kinopoisk/queries'
import { useEffect, useState } from 'react'

type Props = {
	year: number
	limit?: number
}

// Feature-хук: тянем DTO с деталями и маппим в баннерные сущности.
export const useBannerList = ({ year, limit = 5 }: Props) => {
	const [banners, setBanners] = useState<MovieBannerItem[]>([])

	useEffect(() => {
		const controller = new AbortController()
		let cancelled = false

		fetchBannersByYear({ year, limit }, controller.signal)
			.then(res => {
				if (!cancelled) {
					setBanners(res.docs.map(mapMovieToBanner))
				}
			})
			.catch(error => {
				const isAbort =
					typeof error === 'object' &&
					error !== null &&
					'name' in error &&
					error.name === 'AbortError'
				if (!cancelled && !isAbort) {
					setBanners([])
				}
			})

		return () => {
			cancelled = true
			controller.abort()
		}
	}, [year, limit])

	return banners
}
