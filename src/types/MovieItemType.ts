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

export type MovieItem = {
	id: number
	name: string
	description: string
	rating?: Rating
	poster?: Poster
	logo?: Logo
	videos?: Video
}
