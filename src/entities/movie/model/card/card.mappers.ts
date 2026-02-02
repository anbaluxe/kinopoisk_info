import type { MoviePreviewDto } from '@/shared/api/kinopoisk/types'
import type { MovieCardTypes } from './card.types'

export const mapMovieToCard = (dto: MoviePreviewDto): MovieCardTypes => ({
	id: dto.id,
	name: dto.name,
	description: dto.description ?? 'Описание отсутствует',
	posterUrl: dto.poster?.url ?? null,
	ratingKp: dto.rating?.kp ?? null,
	ratingImdb: dto.rating?.imdb ?? null,
	isFavorite: false,
})
