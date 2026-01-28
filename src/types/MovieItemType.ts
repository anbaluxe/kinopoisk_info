type Rating = {
	kp: number
	imdb: number
}

type Poster = {
	url?: string
}

type Logo = {
	url?: string
}

type Video = {
	trailers: [
		{
			url: string
		},
	]
}

type Countries = {
	name: string
}

type Persons = {
	name: string
	photo: string
	enProfession: string
	id: number
}

type Genres = Countries

export type MovieItem = {
	id: number
	name: string
	description: string
	rating?: Rating
	poster?: Poster
	logo?: Logo
	videos?: Video
	isFavorite: boolean
	year?: number
	countries?: Countries[]
	genres?: Genres[]
	persons?: Persons[]
}
