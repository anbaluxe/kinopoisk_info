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
	}
}
