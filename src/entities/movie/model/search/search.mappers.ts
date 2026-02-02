import type { MoviePreviewDto } from '@/shared/api/kinopoisk/types'
import type { MovieSearchItem } from './search.types'

export const mapMovieToSearchItem = (
	dto: MoviePreviewDto,
): MovieSearchItem => ({
	id: dto.id,
	name: dto.name,
	posterUrl: dto.poster?.url,
})
