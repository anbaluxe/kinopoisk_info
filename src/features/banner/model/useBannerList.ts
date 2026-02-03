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
		fetchBannersByYear({ year, limit }).then(res => {
			setBanners(res.docs.map(mapMovieToBanner))
		})
	}, [year, limit])

	return banners
}
