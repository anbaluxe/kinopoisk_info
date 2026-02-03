// DTO — это «сырой» ответ API (nullable/optional поля остаются как есть).
export type MoviePreviewDto = {
	id: number
	name: string
	description: string
	poster?: {
		url?: string
	}
	rating?: {
		kp?: number
		imdb?: number
	}
}

// DTO с деталями расширяет поля превью из API.
export type MovieDetailsDto = MoviePreviewDto & {
	year?: number
	logo?: {
		url?: string
	}
	videos?: {
		trailers: {
			url: string
		}[]
	}
	countries?: { name: string }[]
	genres?: { name: string }[]
	persons?: {
		id: number
		name: string
		photo: string
		enProfession: string
	}[]
}
