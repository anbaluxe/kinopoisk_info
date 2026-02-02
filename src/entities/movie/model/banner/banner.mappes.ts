import type { MovieDetailsDto } from '@/shared/api/kinopoisk/types'
import type { MovieBannerItem } from './banner.types'

export const mapMovieToBanner = (movie: MovieDetailsDto): MovieBannerItem => ({
	id: movie.id,
	name: movie.name,
	description: movie.description,
	posterUrl: movie.poster?.url ?? '',
	logoUrl: movie.logo?.url,
	trailerUrl: movie.videos?.trailers?.[0]?.url,
})
