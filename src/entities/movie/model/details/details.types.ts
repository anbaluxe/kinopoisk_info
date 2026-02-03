export type MoviePerson = {
	id: number
	name: string
	photo: string | null
	profession: string
}

export type MovieDetails = {
	id: number
	name: string
	description: string
	year: number | null
	posterUrl: string | null
	genres: string[]
	countries: string[]
	trailerUrl: string | null
	persons: MoviePerson[]
}
