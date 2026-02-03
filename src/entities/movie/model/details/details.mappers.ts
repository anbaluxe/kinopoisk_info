import type { MovieDetailsDto } from '@/shared/api/kinopoisk/types'
import type { MovieDetails } from './details.types'

// Маппер переводит DTO с деталями -> доменную модель для страницы фильма.
export const mapMovieToDetails = (dto: MovieDetailsDto): MovieDetails => ({
	id: dto.id,
	name: dto.name ?? '',
	description: dto.description ?? '',
	year: dto.year ?? null,
	posterUrl: dto.poster?.url ?? null,
	genres: dto.genres?.map(g => g.name).filter(Boolean) ?? [],
	countries: dto.countries?.map(c => c.name).filter(Boolean) ?? [],
	trailerUrl: dto.videos?.trailers?.[0]?.url ?? null,
	persons:
		dto.persons?.map(p => ({
			id: p.id,
			name: p.name ?? '',
			photo: p.photo ?? null,
			profession: p.enProfession ?? '',
		})) ?? [],
})
